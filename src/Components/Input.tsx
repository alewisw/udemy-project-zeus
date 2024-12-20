import React from "react";

type InputProps = {
  name: string;
  value?: string;
  type?: string;
  onChange?: (e: any) => void;
  className?: string;
  onKeyDown?: (e: any) => void;
  disabled?: boolean;
};

const Input = ({
  type = "text",
  name,
  value,
  onChange,
  className,
  onKeyDown,
  disabled,
}: InputProps) => {
  return (
    <input
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      disabled={disabled}
      type={type}
      placeholder={`Enter ${name}`}
      className={`flex-1 placeholder-gray-300 bg-transparent border-2 border-gray-300 rounded-full px-3 py-1 ${className}`}
    />
  );
};

export default Input;
