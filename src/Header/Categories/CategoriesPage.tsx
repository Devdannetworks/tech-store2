import React from "react";
import { Categories } from "../../Utils/Categoriies";
import EachCategory from "./EachCategory";
import { useSearchParams } from "react-router-dom";

const CategoriesPage = () => {
  const [params] = useSearchParams();

  const category = params?.get("category");

  return (
    <div className="bg-white">
      <div className="pt-4 flex flex-row gap-4 md:gap-0 items-center justify-between overflow-x-scroll scrollbar-hide">
        {Categories.map((item) => {
          return (
            <EachCategory
              key={item.label}
              label={item.label}
              icon={item.icon}
              selected={
                category === item.label || (!category && item.label === "All")
              }
            />
          );
        })}
      </div>
    </div>
  );
};

export default CategoriesPage;
