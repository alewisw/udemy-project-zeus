import React, { useEffect, useState } from "react";
import Input from "./Input";
import Button from "./Button";
import {
  BE_register,
  BE_userLoginBegin,
  BE_userLoginComplete,
} from "../Backend/Queries";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Redux/store";
import { popupError } from "../Utils/toast";

const Login = () => {
  const [loginLoading, setLoginLoading] = useState(false);

  const authUserUid = useSelector((state: RootState) => state.user.authUserUid);
  const dispatch = useDispatch<AppDispatch>();
  const routeTo = useNavigate();

  useEffect(() => {
    if (authUserUid) {
      console.log("auth login: UID present, completing login");
      setLoginLoading(true);
      BE_userLoginComplete(authUserUid, dispatch)
        .then(() => {
          console.log("auth login: user login completed");
          setLoginLoading(false);
          routeTo("/dashboard");
        })
        .catch((err: unknown) => {
          console.log(`auth login: user login failed ${err}`);
          popupError(err);
          setLoginLoading(false);
        });
    } else {
      setLoginLoading(false);
      console.log("auth login: UID absent");
      routeTo("/auth");
    }
  }, [authUserUid]);

  const [login, setLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registerLoading, setRegisterLoading] = useState(false);

  const handleRegister = () => {
    const data = { email, password, confirmPassword };
    BE_register(data, setRegisterLoading, reset, routeTo, dispatch);
  };

  const handleLogin = async () => {
    const data = { email, password };
    setLoginLoading(true);
    try {
      BE_userLoginBegin(data);
    } catch (err: unknown) {
      popupError(err);
      setLoginLoading(false);
    }
  };

  const reset = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="w-full md:w-[450px]">
      <h1 className="text-white text-center font-bold text-4xl md:text-6xl mb-10">
        {login ? "Login" : "Register"}
      </h1>
      <div className="flex flex-col gap-3 bg-white w-full p-6 min-h-[150px] rounded-xl drop-shadow-xl">
        <Input
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></Input>
        <Input
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></Input>
        {!login && (
          <Input
            name="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}

        {login ? (
          <>
            <Button
              text="Login"
              onClick={handleLogin}
              loading={loginLoading}
            ></Button>
            <Button text="Register" secondary onClick={() => setLogin(false)} />
          </>
        ) : (
          <>
            <Button
              text="Create Account"
              onClick={handleRegister}
              loading={registerLoading}
            ></Button>
            <Button text="Login" secondary onClick={() => setLogin(true)} />
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
