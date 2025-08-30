import React from "react";

interface InputProps {
    label : string
    type? : string
    placeholder : string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key : string] : any
}

const Input = ({label, type="text", placeholder, ...props} : InputProps) => {
  return (

    <div className="flex w-full flex-col gap-2 lg:gap-3">
      <label className="input-heading">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        {...props}
        className="btn-heading h-full w-full rounded-sm bg-gray-200 px-1 py-3 placeholder:text-gray-400 outline-none md:rounded-lg md:px-2 md:py-4 lg:py-5"
      />
    </div>
  );
};

export default Input;
