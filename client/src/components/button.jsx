import React from "react";

const Button = ({ title, ...rest }) => {
  return (
    <button
      {...rest}
      className="my-5 px-6 py-[10px] bg-[#056dae] font-[700] rounded-[8px] text-center text-[#ffffff] text-lg w-full"
    >
      {title}
    </button>
  );
};

export default Button;
