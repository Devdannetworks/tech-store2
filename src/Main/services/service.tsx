import React from "react";
import { IconType } from "react-icons";

interface serviceProps {
  icon: IconType;
  heading: string;
  text: string;
}

const Service: React.FC<serviceProps> = ({ icon: Icon, heading, text }) => {
  return (
    <div className="min-w-full md:min-w-fit flex  gap-5 items-center justify-start md:justify-self-start-center cursor-pointer">
      <div className="">
        <Icon size={60} className="" color="#334155" />
      </div>
      <div>
        <h3 className="font-bold md:text-lg ">{heading}</h3>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default Service;
