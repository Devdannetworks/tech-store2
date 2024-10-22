import queryString from "query-string";
import React, { useCallback } from "react";
import { IconType } from "react-icons";
import { useNavigate, useSearchParams } from "react-router-dom";

interface EachCategoryProps {
  label: string;
  icon: IconType;
  selected?: boolean;
}

const EachCategory: React.FC<EachCategoryProps> = ({
  label,
  icon: Icon,
  selected,
}) => {
  const navigate = useNavigate();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    if (label === "All") {
      navigate("/Popular");
    } else {
      let currentQuery = {};

      if (params[0]) {
        currentQuery = queryString.parse(params[0].toString());
      }

      const updatedQuery = { ...currentQuery, category: label };

      const url = queryString.stringifyUrl(
        {
          url: "/Shop",
          query: updatedQuery,
        },
        {
          skipNull: true,
        }
      );

      navigate(url);
    }
  }, [params, label, navigate]);

  return (
    <div
      onClick={handleClick}
      className={`flex items-center justify-center gap-1 p-2 border-b-2 hover:text-slate-800 transition cursor-pointer ${
        selected
          ? "border-b-slate-800 text-slate-800"
          : "border-transparent text-slate-500"
      }`}
    >
      <Icon size={20} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
};

export default EachCategory;
