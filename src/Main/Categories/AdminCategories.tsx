import React from "react";
import { IconType } from "react-icons";

interface AdminCategoriesProps {
  label: string;
  icon: IconType;
  onClick: (value: string) => void;
  selected?: boolean;
}

const AdminCategories: React.FC<AdminCategoriesProps> = ({
  label,
  selected,
  onClick,
  icon: Icon,
}) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`border-2 flex rounded-xl p-4 gap-2 items-center hover:border-slate-500 cursor-pointer transition ${
        selected ? "border-slate-500" : "border-slate-200"
      }`}
    >
      <Icon size={30} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
};

export default AdminCategories;
