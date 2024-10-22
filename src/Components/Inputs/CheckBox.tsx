import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface CheckBoxProps {
  label: string;
  id: string;
  disabled?: boolean;
  register: UseFormRegister<FieldValues>;
}

const CheckBox: React.FC<CheckBoxProps> = ({
  label,
  id,
  disabled,
  register,
}) => {
  return (
    <div className="flex items-center  gap-2  ">
      <input
        type="checkbox"
        disabled={disabled}
        {...register(id)}
        placeholder=""
        className="cursor-pointer"
      />
      <label htmlFor="id" className="font-medium">
        {label}
      </label>
    </div>
  );
};

export default CheckBox;
