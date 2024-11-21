import { toastErr } from "./toast";

const catchErr = (err: { code?: string }) => {
  const { code } = err;
  if (code === "auth/invalid-email") toastErr("Invalid e-mail.");
  else if (code === "auth/weak-password")
    toastErr("Password should be at least 6 characters.");
  else if (code === "auth/user-not-found") toastErr("User not found.");
  else if (code === "auth/email-already-in-use")
    toastErr("E-mail already exsits.");
  else if (code === "auth/wrong-password") toastErr("Wrong password.");
  else if (code === "auth/requires-recent-login")
    toastErr("Logout and login before updating your profile.");
  else toastErr(`An error occurred: ${code}`);
};

export default catchErr;
