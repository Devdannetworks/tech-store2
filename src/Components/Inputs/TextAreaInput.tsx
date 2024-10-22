import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

type inputTypes = {
  disabled: boolean;
  label: string;
  id: string;
  register: UseFormRegister<FieldValues>;
  required?: boolean;
  errors: FieldErrors;
};

const TextAreaInput: React.FC<inputTypes> = ({
  disabled,
  required,
  id,
  register,
  errors,
  label,
}) => {
  return (
    <div className="relative w-full ">
      <textarea
        disabled={disabled}
        {...register(id, { required })}
        className={`peer max-h-[150px] min-h-[150px]  w-full p-4 pt-6 outline-none bg-white font-light border-2 rounded-md transition disabled:opacity-70 disabled:cursor-not-allowed ${
          errors[id] ? "border-rose-500" : "border-slate-300"
        } ${errors[id] ? "focus:border-rose-500" : "focus:border-slate-300"}`}
      />
      <label
        htmlFor={id}
        className={`absolute cursor-text text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-90 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4  ${
          errors[id] ? "text-rose-500" : "text-slate-500"
        }`}
      >
        {label}
      </label>
    </div>
  );
};

export default TextAreaInput;
