import React from "react";
import { IconType } from "react-icons";
import { userType } from "../Types";

type UserHeaderProfileProps = {
  user: userType;
  onClick?: () => void;
  className?: string;
};

const UserHeaderProfile = ({
  user,
  onClick,
  className = "",
}: UserHeaderProfileProps) => {
  return (
    <>
      <div
        onClick={onClick}
        className="flex items-center space-x-4 cursor-pointer"
      >
        <div className="relative">
          <img
            src={user.img}
            alt="User Profile"
            className="w-11 h-11 rounded-full ring-2 ring-white p-[2px]"
          />
          {/*<span className="animate-ping absolute -top-1 left-7 w-3 h-3 border-2 border-gray-800 rounded-full bg-green-400"></span>*/}
          <span className="absolute -top-1 left-7 w-3 h-3 border-2 border-gray-800 rounded-full bg-green-400"></span>
        </div>
        <div className="hidden md:block">
          <div className="-mb-1">{user.username}</div>
          <div className="text-sm text-gray-300">
            Joined {user.creationTime}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserHeaderProfile;
