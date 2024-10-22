import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../Firebase/FirebaseConfig";
import { useParams } from "react-router-dom";
import OrderDetailsPage from "./OrderDetailsPage";
import Footer from "../../Footer/Footer";
import { Container } from "@mui/material";

const OrderAdmin = () => {
  const [order, setOrder] = useState<any>();
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const fetchOrder = async () => {
      if (id) {
        setLoading(true);
        const orderDocRef = doc(db, "orders", id);
        try {
          const orderDoc = await getDoc(orderDocRef);
          if (orderDoc.exists()) {
            setOrder({ ...orderDoc.data(), id: id });
          } else {
            console.log("Order not found");
          }
        } catch (error) {
          console.error("Error fetching order:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchOrder();
  }, [id]);

  console.log(order);
  console.log(id);

  if (loading) return <div>Loading...</div>;

  if (!order) {
    return <div>Order not found</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Container className="flex-grow">
        <OrderDetailsPage order={order} />
      </Container>
      <Footer />
    </div>
  );
};

export default OrderAdmin;
