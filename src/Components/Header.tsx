import React from "react";
import Button from "./Button";
import AddListBoard from "./AddListBoard";
import { BsFillChatFill } from "react-icons/bs";
import { FiList } from "react-icons/fi";
import Icon from "./Icon";

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
      <div className="flex flex-row-reverse md:flex-row items-center justify-center gap-5 flex-wrap">
        <AddListBoard />
        <Icon IconName={BsFillChatFill} ping={true} />
        <Icon IconName={FiList} />
      </div>
    </div>
  );
};

export default Header;
