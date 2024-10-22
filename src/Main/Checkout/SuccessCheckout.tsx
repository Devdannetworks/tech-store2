import { useEffect, useState } from "react";
import { doc, updateDoc, Timestamp } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../Firebase/FirebaseConfig";
import { Container } from "@mui/material";
import Empty from "../../Components/Empty";
import { MdArrowBack } from "react-icons/md";
import Footer from "../../Footer/Footer";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../Hooks/UseCart";

const SuccessCheckout = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const url = new URL(window.location.href);
  const pathSegments = url.pathname.split("/");
  const orderTrackingId = pathSegments[pathSegments.length - 1];

  useEffect(() => {
    if (!orderTrackingId) {
      console.error("No order ID provided.");
      setLoading(false);
      return;
    }

    // Clear cart and update order status after authentication
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        clearCart();
        updateOrderStatus(orderTrackingId, user.uid)
          .then(() => {
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error updating order status", error);
            setLoading(false);
          });
      } else {
        console.error("User not authenticated");
        setLoading(false);
      }
    });

    // Clean up the auth state listener when the component unmounts
    return () => unsubscribe();
  }, [orderTrackingId, clearCart]);

  const updateOrderStatus = async (orderId: string, userId: string) => {
    try {
      const ordersRef = doc(db, "orders", orderId);
      await updateDoc(ordersRef, {
        paymentStatus: "paid",
        updatedAt: Timestamp.now(),
      });
    } catch (error) {
      console.error("Error updating order status", error);
      throw error; // Ensure errors are thrown so they can be caught in the useEffect
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Container maxWidth={"xl"} className="flex-grow">
        {loading ? (
          <div>Loading...</div>
        ) : !orderTrackingId ? (
          <div>No OrderTrackingId provided.</div>
        ) : (
          <Empty
            heading="Successfully completed your checkout!"
            icon={MdArrowBack}
            details="view orders"
            onClick={() => navigate("/orders")}
          />
        )}
      </Container>
      <Footer />
    </div>
  );
};

export default SuccessCheckout;
