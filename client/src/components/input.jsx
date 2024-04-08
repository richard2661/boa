import React from "react";

const Input = ({ title, children, ...rest }) => {
  return (
    <div className="w-full relative cursor-pointer mb-5">
      {/* <label className="text-[14px] mb-1 block">{title}</label> */}
      <input
        type="text"
        className={`p-[11px] text-[#333333] bg-[#ffffff] rounded-lg w-full border-[1px] border-[#a8a8a8] focus:bg-[#eff3f8] focus:border-[#056dae]`}
        placeholder={title}
        required
        {...rest}
      />
      {children ? children : null}
    </div>
  );
};

export default Input;
