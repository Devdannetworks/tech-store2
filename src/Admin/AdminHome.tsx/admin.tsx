import { Container } from "@mui/material";
import React from "react";
import Footer from "../../Footer/Footer";
import Home from "./Home";
import AdminNav from "../AdminNav/AdminNav";

const Admin = () => {
  return (
    <div className="relative flex flex-col min-h-screen">
      <AdminNav />
      <Container maxWidth={"xl"} className="flex-grow">
        <Home />
      </Container>
      <Footer />
    </div>
  );
};

export default Admin;
