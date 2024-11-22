import React, { useState } from "react";
import Button from "./Button";
import AddListBoard from "./AddListBoard";
import { BsFillChatFill } from "react-icons/bs";
import { FiList } from "react-icons/fi";
import Icon from "./Icon";
import UserHeaderProfile from "./UserHeaderProfile";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BE_logout } from "../Backend/Queries";
import Spinner from "./Spinner";

const logo = require("../Assets/logo.png");

type HeaderProps = {};

const Header = () => {
  const routeTo = useNavigate();
  const location = useLocation();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const dispatch = useDispatch();
  const [logoutLoading, setLogoutLoading] = useState(false);

  const handleLogout = async () => {
    if (!logoutLoading) {
      await BE_logout(currentUser, setLogoutLoading, dispatch, routeTo);
    }
  };

  console.log(`pathname=${location.pathname}`);

  return (
    <div className="flex flex-wrap sm:flex-row gap-5 items-center justify-between bg-gradient-to-r from-myBlue to-myPink px-5 py-5 md:py-2 text-white drop-shadow-md">
      <img
        className="w-[70px] drop-shadow-md cursor-pointer"
        src={logo}
        alt="Logo"
      ></img>
      <div className="flex flex-row-reverse md:flex-row items-center justify-center gap-5 flex-wrap">
        {location.pathname === "/dashboard" && <AddListBoard />}

        {location.pathname !== "/dashboard/chat" && (
          <Icon
            IconName={BsFillChatFill}
            ping={true}
            onClick={() => routeTo("/dashboard/chat")}
          />
        )}

        {location.pathname !== "/dashboard" && (
          <Icon IconName={FiList} onClick={() => routeTo("/dashboard")} />
        )}

        <div className="group relative">
          <UserHeaderProfile user={currentUser} />
          <div className="absolute pt-5 hidden group-hover:block w-full min-w-max">
            <ul className="w-full bg-white overflow-hidden rounded-md shadow-md text-gray-700 pt-1">
              <Link
                to="/dashboard/profile"
                className="hover:bg-gray-200 py-2 px-4 block"
              >
                Profile
              </Link>
              <div
                onClick={handleLogout}
                className={`hover:bg-gray-200 py-2 px-4 cursor-pointer flex items-center gap-4 ${
                  logoutLoading && "cursor-wait"
                }`}
              >
                Logout
                {logoutLoading && <Spinner />}
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
