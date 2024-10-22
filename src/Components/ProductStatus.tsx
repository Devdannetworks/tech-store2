import React from "react";
import { IconType } from "react-icons";

interface ProductStatusProps {
  label: string;
  icon: IconType;
  bg: string;
  color: string;
}

const ProductStatus: React.FC<ProductStatusProps> = ({
  label,
  icon: Icon,
  bg,
  color,
}) => {
  return (
    <div
      className={`${bg} ${color} flex items-center justify-between gap-2 rounded px-1 h-[25px]`}
    >
      {label}
      <Icon size={15} />
    </div>
  );
};

export default ProductStatus;
