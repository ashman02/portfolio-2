import React from "react";

interface ButtonProps {
  name: string;
  onBtnClick?: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

const Button = ({ name, onBtnClick, props }: ButtonProps) => {
  return (
    <button
      onClick={onBtnClick}
      {...props}
      className="btn-heading bg-primary text-background rounded-lg px-5 py-3 md:px-7 md:py-4 lg:px-10 lg:py-5"
    >
      {name}
    </button>
  );
};

export default Button;
