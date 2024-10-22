import React from "react";

interface navigationTextProps {
  onClick: () => void;
  text: string;
}

const NavigationText: React.FC<navigationTextProps> = ({ onClick, text }) => {
  return (
    <h5
      className="hover:font-semibold text-md transition cursor-pointer"
      onClick={onClick}
    >
      {text}
    </h5>
  );
};

export default NavigationText;
