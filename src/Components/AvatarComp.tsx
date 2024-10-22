import React from "react";
import { FaUserCircle } from "react-icons/fa";
interface AvatarProps {
  src?: string | undefined | null;
}

const AvatarComp: React.FC<AvatarProps> = ({ src }) => {
  return src ? (
    <img
      src={src}
      alt="Avatar"
      className="max-h-[24px] max-w-24px object-contain"
    />
  ) : (
    <FaUserCircle className="text-2xl" />
  );
};

export default AvatarComp;
