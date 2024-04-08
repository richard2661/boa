import React from "react";

const FormLayout = ({ children, handleSubmit, title, subTitle }) => {
  return (
    <div className="w-full grid place-items-center">
      <form
        className="form w-full"
        onSubmit={handleSubmit}
      >
        <h1 className="mb-[40px] font-[600] text-[34px] leading-[40px]">
          {title}
        </h1>
        {subTitle && <p className="mb-4 text-sm">{subTitle}</p>}
        <div>{children}</div>
      </form>
    </div>
  );
};

export default FormLayout;
