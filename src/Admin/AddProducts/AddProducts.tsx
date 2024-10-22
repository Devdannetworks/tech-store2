import React from "react";
import AdminNav from "../AdminNav/AdminNav";
import { Container } from "@mui/material";
import Footer from "../../Footer/Footer";
import FormWrap from "../../Main/Register/FormWrap";
import AddProductForm from "../../Components/AddProductForm";
import { checkIfUserIsAdmin } from "../../Actions/ExportedFunctions/Functions";
import { auth } from "../../Firebase/FirebaseConfig";

const AddProducts = () => {
  const userId = auth.currentUser?.uid;

  checkIfUserIsAdmin(userId).then((isAdmin) => {
    if (isAdmin) {
      console.log("User is an admin.");
      // Proceed with admin-specific actions
    } else {
      console.log("User is not an admin.");
      // Handle non-admin actions
    }
  });
  return (
    <div>
      {" "}
      <div className="relative flex flex-col min-h-screen">
        <AdminNav />
        <Container maxWidth={"xl"} className="flex-grow">
          <FormWrap>
            <AddProductForm />
          </FormWrap>
        </Container>
        <Footer />
      </div>
    </div>
  );
};

export default AddProducts;
