import { useState, useEffect, useCallback } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import moment from "moment";
import { fetchUserNameById } from "../../ExportedFunctions/Functions";
import { auth, db } from "../../../Firebase/FirebaseConfig";

// Custom hook to fetch user orders
const useFetchUserOrders = () => {
  // State to hold the orders
  const [orders, setOrders] = useState<any[]>([]);

  const fetchOrders = useCallback(() => {
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

    const unsubscribe = onSnapshot(
      ordersQuery,
      async (querySnapshot) => {
        const ordersList: any[] = [];
        const userIdSet = new Set<string>();

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.userId) {
            userIdSet.add(data.userId);
          }
        });

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
        setOrders(ordersList); // Set the orders state here
      },
      (error: any) => {
        console.error("Error retrieving client orders", error);
      }
    );

    return () => unsubscribe();
  }, []);

  // Fetch the orders when the component mounts
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Return the orders state
  return orders;
};

export default useFetchUserOrders;
