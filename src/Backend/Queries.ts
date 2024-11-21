import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "@firebase/auth";
import { auth } from "./Firebase";
import { toastErr, toastSucc } from "../Utils/toast";
import catchErr from "../Utils/catchErr";
import { authDataType, setLoadingType, userType } from "../Types";
import { NavigateFunction } from "react-router-dom";
import { doc, serverTimestamp, setDoc, getDoc } from "@firebase/firestore";
import { db } from "../Backend/Firebase";
import { defaultUser } from "../Redux/userSlice";

const USERS_COLLECTION = "users";
const TASKS_COLLECTION = "tasks";
const TASK_LIST_COLLECTION = "taskList";
const CHATS_COLLECTION = "chats";
const MESSAGES_COLLECTION = "messages";

export const BE_register = (
  data: authDataType,
  setLoading: setLoadingType,
  reset: () => void,
  routeTo: NavigateFunction
) => {
  const { email, password, confirmPassword } = data;

  if (email && password) {
    if (password === confirmPassword) {
      setLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const userInfo = addUserToCollection(
            userCredential.user.uid,
            userCredential.user.email || "",
            userCredential.user.email?.split("@")[0] || "",
            "imgLink"
          );
          // TODO: set user in store and local storage

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
  routeTo: NavigateFunction
) => {
  const { email, password } = data;

  if (email && password) {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // TODO: Update online flag
        const userInfo = getUserInfo(userCredential.user.uid);
        // TODO: set user in store and local storage

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
) => {
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
      creationTime,
      lastSeen,
    };
  } else {
    toastErr("getUserInfo: user not found");
    return defaultUser;
  }
};
