import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import Footer from "../../Footer/Footer";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { auth, db } from "../../Firebase/FirebaseConfig";
import moment from "moment";
import OrdersPageClient from "./OrdersPageClient";
import { fetchUserNameById } from "../../Actions/ExportedFunctions/Functions";

const Orders = () => {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    // Get the current user
    const currentUser = auth.currentUser;

    if (!currentUser) {
      console.error("User not authenticated");
      return;
    }

    // Reference to the "orders" collection and filter by the current user's ID
    const ordersQuery = query(
      collection(db, "orders"),
      where("userId", "==", currentUser.uid)
    );

    // Subscribe to real-time updates
    const unsubscribe = onSnapshot(
      ordersQuery,
      async (querySnapshot) => {
        const ordersList: any[] = [];

        const userIdSet = new Set<string>();

        // Collect unique userIds
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.userId) {
            userIdSet.add(data.userId);
          }
        });

        // Fetch usernames
        const userNamePromises = Array.from(userIdSet).map(async (userId) => ({
          userId,
          name: await fetchUserNameById(userId),
        }));

        const userNames = await Promise.all(userNamePromises);
        const userNamesMap = new Map(
          userNames.map(({ userId, name }) => [userId, name])
        );

        // Populate orders list with data
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const createdAt = data.createdAt?.toDate
            ? data.createdAt.toDate()
            : new Date();

          ordersList.push({
            ...data,
            id: doc.id,
            totalAmount: data.totalAmount / 100, // Assuming totalAmount is in cents
            date: moment(createdAt).fromNow(),
            name: userNamesMap.get(data.userId) || "Unknown",
          });
        });

        setOrders(ordersList);
      },
      (error: any) => {
        console.error("Error retrieving client orders", error);
      }
    );

    return () => unsubscribe();
  }, []);

  console.log("Here are your orders", orders);

  return (
    <div className="relative flex flex-col min-h-screen">
      <Container className="flex-grow ">
        <OrdersPageClient orders={orders} />
      </Container>
      <Footer />
    </div>
  );
};

export default Orders;
