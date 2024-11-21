import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "@firebase/auth";
import { auth } from "./Firebase";
import { toastErr, toastSucc } from "../Utils/toast";
import catchErr from "../Utils/catchErr";
import { authDataType, setLoadingType, userType } from "../Types";
import { NavigateFunction } from "react-router-dom";
import {
  doc,
  serverTimestamp,
  setDoc,
  getDoc,
  updateDoc,
} from "@firebase/firestore";
import { db } from "../Backend/Firebase";
import { defaultUser, setUser } from "../Redux/userSlice";
import { AppDispatch } from "../Redux/store";
import convertTime from "../Utils/convertTime";
import avatarGenerator from "../Utils/avatarGenerator";

const USERS_COLLECTION = "users";
const TASKS_COLLECTION = "tasks";
const TASK_LIST_COLLECTION = "taskList";
const CHATS_COLLECTION = "chats";
const MESSAGES_COLLECTION = "messages";

export const BE_register = (
  data: authDataType,
  setLoading: setLoadingType,
  reset: () => void,
  routeTo: NavigateFunction,
  dispatch: AppDispatch
) => {
  const { email, password, confirmPassword } = data;

  if (email && password) {
    if (password === confirmPassword) {
      setLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          const userName = userCredential.user.email?.split("@")[0] || "";
          const userInfo = await addUserToCollection(
            userCredential.user.uid,
            userCredential.user.email || "",
            userName,
            avatarGenerator(userName)
          );
          dispatch(setUser(userInfo));

          toastSucc("Account created successfully!");
          setLoading(false);
          reset();
        })
        .catch((error) => {
          catchErr(error);
          setLoading(false);
        });
    } else {
      toastErr("Passwords must match.");
    }
  } else {
    toastErr("Fields shouldn't be left empty.");
  }
};

export const BE_login = (
  data: authDataType,
  setLoading: setLoadingType,
  reset: () => void,
  routeTo: NavigateFunction,
  dispatch: AppDispatch
) => {
  const { email, password } = data;

  if (email && password) {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        await updateUserInfo(userCredential.user.uid, { isOnline: true });
        const userInfo = await getUserInfo(userCredential.user.uid);
        dispatch(setUser(userInfo));

        toastSucc("Login successful!");
        setLoading(false);
        reset();
        routeTo("/dashboard");
      })
      .catch((error) => {
        catchErr(error);
        setLoading(false);
      });
  } else {
    toastErr("Fields shouldn't be left empty.");
  }
};

const addUserToCollection = async (
  uid: string,
  email: string,
  username: string,
  img: string
): Promise<userType> => {
  const data = {
    isOnline: true,
    img,
    username,
    email,
    creationTime: serverTimestamp(),
    lastSeen: serverTimestamp(),
    bio: `Hi! My name is ${username}`,
  };
  await setDoc(doc(db, USERS_COLLECTION, uid), data);
  return await getUserInfo(uid);
};

const getUserInfo = async (uid: string): Promise<userType> => {
  const userResult = await getDoc(doc(db, USERS_COLLECTION, uid));
  if (userResult.exists()) {
    const { img, isOnline, username, email, bio, creationTime, lastSeen } =
      userResult.data();
    return {
      id: userResult.id,
      img,
      isOnline,
      username,
      email,
      bio,
      creationTime: creationTime
        ? convertTime(creationTime.toDate())
        : "unknown",
      lastSeen: lastSeen ? convertTime(lastSeen.toDate()) : "unknown",
    };
  } else {
    toastErr("getUserInfo: user not found");
    return defaultUser;
  }
};

const updateUserInfo = async (
  uid: string,
  data: {
    username?: string;
    img?: string;
    isOnline?: boolean;
    lastSeen?: any;
  }
) => {
  data.lastSeen = serverTimestamp();
  await updateDoc(doc(db, USERS_COLLECTION, uid), data);
};
