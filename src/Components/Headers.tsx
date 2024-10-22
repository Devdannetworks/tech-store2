import React from "react";

interface headersProps {
  label: string;
}

const HeadersComp: React.FC<headersProps> = ({ label }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-slate-700 flex items-center justify-center py-4">
        {label}
      </h2>
    </div>
  );
};

export default HeadersComp;
