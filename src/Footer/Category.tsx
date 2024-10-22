import { ExpandMoreRounded } from "@mui/icons-material";
import { Accordion, AccordionSummary, Typography } from "@mui/material";
import React from "react";

interface props {
  categoryName: string;
  category1: string;
  category2: string;
  category3: string;
  category4: string;
  category5: string;
}

const CategoryComponent: React.FC<props> = ({
  categoryName,
  category1,
  category2,
  category3,
  category4,
  category5,
}) => {
  return (
    <Accordion
      style={{
        width: "100%",
        boxShadow: "none",
        zIndex: "1",
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreRounded />}
        style={{
          textAlign: "start",
          fontSize: "1.1rem",
          padding: "0",
        }}
      >
        {categoryName}
      </AccordionSummary>

      <Typography variant="body1">{category1}</Typography>
      <Typography style={{ textAlign: "start", fontSize: "15px" }}>
        {category2}
      </Typography>
      <Typography style={{ textAlign: "start", fontSize: "15px" }}>
        {category3}
      </Typography>
      <Typography style={{ textAlign: "start", fontSize: "15px" }}>
        {category4}
      </Typography>
      <Typography style={{ textAlign: "start", fontSize: "15px" }}>
        {category5}
      </Typography>
    </Accordion>
  );
};

export default CategoryComponent;
