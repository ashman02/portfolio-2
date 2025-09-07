import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  name: string;
  onBtnClick?: () => void;
}

const Button = ({ name, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className="btn-heading bg-primary text-background rounded-lg px-5 py-3 md:px-7 md:py-4 lg:px-10 lg:py-5 cursor-pointer disabled:opacity-70 disabled:cursor-default"
    >
      {name}
    </button>
  );
};

export default Button;
