import React from "react";
import Input from "./Input";
import Button from "./Button";

const Login = () => {
  return (
    <div className="w-full md:w-[450px]">
      <h1 className="text-white text-center font-bold text-4xl md:text-6xl mb-10">
        Login
      </h1>
      <div className="flex flex-col gap-3 bg-white w-full p-6 min-h-[150px] rounded-xl drop-shadow-xl">
        <Input name="email" type="email"></Input>
        <Input name="password" type="password"></Input>
        <Input name="confirm-password" type="password"></Input>
        <Button text="Login" loading></Button>
        <Button text="Register" secondary></Button>
      </div>
    </div>
  );
};

export default Login;
