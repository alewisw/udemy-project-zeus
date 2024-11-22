import React from "react";
import Spinner from "./Spinner";
import Button from "./Button";
import Icon from "./Icon";
import { MdAdd } from "react-icons/md";

type AddListBoardProps = {
  text?: string;
  className?: string;
  secondary?: boolean;
  onClick?: () => void;
  loading?: boolean;
};

const AddListBoard = ({}: AddListBoardProps) => {
  return (
    <>
      <Button text="Add New List Board" secondary className="hidden md:flex" />
      <Icon IconName={MdAdd} className="block md:hidden" />
    </>
  );
};

export default AddListBoard;
