import React from "react";
import { IconType } from "react-icons";

interface AdminNavItemProps {
  selected?: boolean;
  icon: IconType;
  label: string;
  onClick: () => void;
}

const AdminNavItem: React.FC<AdminNavItemProps> = ({
  selected,
  icon: Icon,
  label,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`flex gap-1 justify-center items-center cursor-pointer  py-2 hover:text-slate-800 ${
        selected
          ? "text-slate-800 border-b-slate-800 "
          : "border-transparent text-slate-600"
      }`}
    >
      <Icon size={20} />
      <p className="text-sm font-medium break-normal text-center">{label}</p>
    </div>
  );
};

export default AdminNavItem;
