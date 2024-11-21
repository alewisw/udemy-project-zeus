import { createUserWithEmailAndPassword } from "@firebase/auth";
import { Bounce, toast } from "react-toastify";
import { auth } from "./Firebase";

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
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log({ errorCode, errorMessage });
          // ..
        });
    } else {
      toast.error("Passwords must match.");
    }
  } else {
    toast.error("Fields shouldn't be left empty.");
  }
};
