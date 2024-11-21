import { createUserWithEmailAndPassword } from "@firebase/auth";
import { auth } from "./Firebase";
import { toastErr } from "../Utils/toast";
import catchErr from "../Utils/catchErr";

export const BE_register = (data: {
  email: string;
  password: string;
  confirmPassword: string;
}) => {
  const { email, password, confirmPassword } = data;
  if (email && password) {
    if (password === confirmPassword) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(userCredential);
        })
        .catch((error) => catchErr(error));
    } else {
      toastErr("Passwords must match.");
    }
  } else {
    toastErr("Fields shouldn't be left empty.");
  }
};
