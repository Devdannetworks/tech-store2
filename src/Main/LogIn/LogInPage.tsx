import { Container } from "@mui/material";
import React from "react";
import FormWrap from "../Register/FormWrap";
import LogInForm from "./LogInForm";
import Footer from "../../Footer/Footer";

const LogInPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Container className="flex-grow">
        <FormWrap>
          <LogInForm />
        </FormWrap>
      </Container>
      <Footer />
    </div>
  );
};

export default LogInPage;
