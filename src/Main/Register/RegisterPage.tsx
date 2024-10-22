import React from "react";
import FormWrap from "./FormWrap";
import RegisterForm from "./RegisterForm";
import { Container } from "@mui/material";
import Footer from "../../Footer/Footer";

const RegisterPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Container className="flex-grow">
        <FormWrap>
          <RegisterForm />
        </FormWrap>
      </Container>
      <Footer />
    </div>
  );
};

export default RegisterPage;
