import React, { useEffect, useState } from "react";
import AdminNav from "../AdminNav/AdminNav";
import { Container } from "@mui/material";
import Footer from "../../Footer/Footer";
import ManageProductsPage from "./ManageProductsPage";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../Firebase/FirebaseConfig";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const unsubscribe = onSnapshot(
      collection(db, "products"),
      (querySnapshot) => {
        try {
          const productList: any = [];

          querySnapshot.forEach((doc) => {
            productList.push({ ...doc.data(), id: doc.id });
          });

          setProducts(productList);
        } catch (error) {
          console.error("Error processing product data", error);
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        console.error("Error retrieving data from the database", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {" "}
      <div className="relative flex flex-col min-h-screen">
        <AdminNav />
        <Container className="flex-grow w-full">
          <ManageProductsPage products={products} />
        </Container>
        <Footer />
      </div>
    </div>
  );
};

export default ManageProducts;
