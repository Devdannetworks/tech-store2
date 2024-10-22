import React from "react";
import { IconType } from "react-icons";

interface EmptyCompProps {
  heading: string;
  details: string;
  icon: IconType;
  onClick?: () => void;
}

const Empty: React.FC<EmptyCompProps> = ({
  heading,
  onClick,
  details,
  icon: Icon,
}) => {
  return (
    <div className="text-sm md:text-base mt-10 flex flex-col justify-center  w-full  items-center gap-1">
      <h3>{heading}</h3>
      <div
        className="flex align-middle justify-center cursor-pointer"
        style={{ alignItems: "center" }}
        onClick={onClick}
      >
        <Icon size={20} />

        <p>{details}</p>
      </div>
    </div>
  );
};

export default Empty;
