import React from "react";
import { AiOutlineForward } from "react-icons/ai";

interface SideLinksTextProps {
  text: string;
  onClick: () => void;
}

const SideLinksText: React.FC<SideLinksTextProps> = ({ onClick, text }) => {
  return (
    <div
      onClick={onClick}
      className="flex justify-between items-center cursor-pointer"
    >
      <h5 className="font-sans">{text}</h5>
      <AiOutlineForward />
    </div>
  );
};

export default SideLinksText;
