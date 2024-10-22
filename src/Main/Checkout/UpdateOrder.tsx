import { useEffect, useState } from "react";

import { doc, updateDoc, Timestamp } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../Firebase/FirebaseConfig";

const UpdateOrder = () => {
  const [loading, setLoading] = useState(true);
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    // Get orderId from URL
    const params = new URLSearchParams(window.location.search);
    const orderIdFromUrl = params.get("order_id");
    setOrderId(orderIdFromUrl);

    if (!orderIdFromUrl) {
      console.error("No order ID provided.");
      setLoading(false);
      return;
    }

    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Call the function to update the order status
        updateOrderStatus(orderIdFromUrl, user.uid);
      } else {
        console.error("User not authenticated");
      }
      setLoading(false); // Hide loading state once auth is checked
    });

    // Clean up the auth state listener when the component unmounts
    return () => unsubscribe();
  }, []);

  const updateOrderStatus = async (orderId: string, userId: string) => {
    try {
      const ordersRef = doc(db, "orders", orderId);
      await updateDoc(ordersRef, {
        paymentStatus: "paid",
        updatedAt: Timestamp.now(),
      });

      console.log(`Order ${orderId} updated to paid.`);
    } catch (error) {
      console.error("Error updating order status", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!orderId) {
    return <div>No order ID provided.</div>;
  }

  return <div>Order {orderId} has been updated.</div>;
};

export default UpdateOrder;
