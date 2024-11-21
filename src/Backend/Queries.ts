import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "@firebase/auth";
import { auth } from "./Firebase";
import { toastErr, toastSucc } from "../Utils/toast";
import catchErr from "../Utils/catchErr";
import { authDataType, setLoadingType } from "../Types";

export const BE_register = (
  data: authDataType,
  setLoading: setLoadingType,
  reset: () => void
) => {
  const { email, password, confirmPassword } = data;

  if (email && password) {
    if (password === confirmPassword) {
      setLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(userCredential);
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
  reset: () => void
) => {
  const { email, password } = data;

  if (email && password) {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        toastSucc("Login successful!");
        setLoading(false);
        reset();
      })
      .catch((error) => {
        catchErr(error);
        setLoading(false);
      });
  } else {
    toastErr("Fields shouldn't be left empty.");
  }
};
