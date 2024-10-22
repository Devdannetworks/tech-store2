import React from "react";
import { IconType } from "react-icons";

interface NavIconsProps {
  icon: IconType;
  value: number | undefined;
  onClick: () => void;
}

const NavIcons: React.FC<NavIconsProps> = ({ icon: Icon, value, onClick }) => {
  return (
    <div className="relative cursor-pointer" onClick={onClick}>
      <Icon className="text-3xl" />

      {value !== undefined && value !== 0 ? (
        <span className="absolute top-[-10px] right-[-10px] bg-slate-700 text-white h-6 w-6 rounded-full flex items-center justify-center text-sm">
          {value}
        </span>
      ) : null}
    </div>
  );
};

export default NavIcons;
