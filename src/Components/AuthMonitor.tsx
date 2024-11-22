import React, { useEffect, useState } from "react";

import { auth } from "../Backend/Firebase";
import { onAuthStateChanged, User } from "@firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Redux/store";
import { setAuthUserUid } from "../Redux/userSlice";

const AuthMonitor = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const r = Math.round(Math.random() * 1000);
    console.log(`auth monitor ${r}: registered`);
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(
          `auth monitor ${r}: authenticated ${user.uid}, ${user.email}`
        );
        dispatch(setAuthUserUid(user.uid));
      } else {
        console.log(`auth monitor ${r}: not logged in`);
        dispatch(setAuthUserUid(undefined));
      }
    });

    return unsub;
  }, []);
  return <></>;
};

export default AuthMonitor;
