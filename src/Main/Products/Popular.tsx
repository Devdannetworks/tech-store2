import { Container } from "@mui/material";
import React from "react";
import Products from "./Products";
import Footer from "../../Footer/Footer";

const Popular = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Container maxWidth={"xl"} className="flex-grow">
        <Products />
      </Container>
      <Footer />
    </div>
  );
};

export default Popular;
