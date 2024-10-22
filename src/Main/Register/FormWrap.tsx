import React from "react";

const FormWrap = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full min-h-fit h-full flex items-center justify-center pb-3 md:pb-12 pt-2 ">
      <div className="max-w-[600px] w-full flex flex-col gap-6 items-center shadow-xl shadow-slate-200 rounded-md p-4 md:p-8">
        {children}
      </div>
    </div>
  );
};

export default FormWrap;
