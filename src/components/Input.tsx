import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label : string
    type? : string
    placeholder : string
    ref : React.Ref<HTMLInputElement>
}

const Input = ({label, type="text", placeholder, ref, ...props} : InputProps) => {
  return (

    <div className="flex w-full flex-col gap-2 lg:gap-3">
      <label className="input-heading">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        ref={ref}
        {...props}
        className="btn-heading h-full w-full rounded-sm bg-gray-200 px-1 py-3 placeholder:text-gray-400 outline-none md:rounded-lg md:px-2 md:py-4 lg:py-5"
      />
    </div>
  );
};

export default Input;
