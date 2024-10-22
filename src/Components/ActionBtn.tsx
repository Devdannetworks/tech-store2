import React from "react";
import { IconType } from "react-icons";

interface ActionBtnProps {
  icon: IconType;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

const ActionBtn: React.FC<ActionBtnProps> = ({
  icon: Icon,
  onClick,
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`h-[30px]  flex items-center justify-center p-2 rounded border border-slate-400 cursor-pointer ${
        disabled && "cursor-not-allowed opacity-65"
      }`}
    >
      <Icon size={15} />
    </button>
  );
};

export default ActionBtn;
