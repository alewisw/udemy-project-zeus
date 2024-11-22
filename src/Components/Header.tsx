import React from "react";
import Button from "./Button";
import AddListBoard from "./AddListBoard";
const logo = require("../Assets/logo.png");

type HeaderProps = {};

const Header = () => {
  return (
    <div className="flex flex-wrap sm:flex-row gap-5 items-center justify-between bg-gradient-to-r from-myBlue to-myPink px-5 py-5 md:py-2 text-white drop-shadow-md">
      <img
        className="w-[70px] drop-shadow-md cursor-pointer"
        src={logo}
        alt="Logo"
      ></img>
      <div className="flex">
        <AddListBoard />
      </div>
    </div>
  );
};

export default Header;
