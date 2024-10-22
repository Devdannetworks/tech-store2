import { collection, onSnapshot } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { db } from "../../../Firebase/FirebaseConfig";
import { fetchUserNameById } from "../../ExportedFunctions/Functions";
import moment from "moment";
import { OrderInterface } from "../../../Admin/ManageOrders/ManageOrdersPage";

interface useFetchAllOrdersProps {
  allOrders: OrderInterface[];
  OrdersLoading: boolean;
}

const useFetchAllOrders = (): useFetchAllOrdersProps => {
  const [allOrders, setAllOrders] = useState<OrderInterface[]>([]);
  const [OrdersLoading, setOrdersLoading] = useState(false);

  const fetchAllOrders = useCallback(() => {
    const unSubscribe = onSnapshot(
      collection(db, "orders"),
      async (querySnapshot) => {
        try {
          const ordersList: any = [];
          const userIdSet = new Set<string>();

          querySnapshot.forEach((doc) => {
            const data = doc.data();
            if (data.userId) {
              userIdSet.add(data.userId);
            }
          });

          const userNamesPromises = Array.from(userIdSet).map(
            async (userId) => ({
              userId,
              name: await fetchUserNameById(userId),
            })
          );
          const userNames = await Promise.all(userNamesPromises);
          const userNamesMap = new Map(
            userNames.map(({ userId, name }) => [userId, name])
          );

          querySnapshot.forEach((doc) => {
            const data = doc.data();
            const createdAt = data.createdAt?.toDate
              ? data.createdAt.toDate()
              : new Date();
            ordersList.push({
              ...data,
              id: doc.id,
              totalAmount: data.totalAmount / 100,
              date: moment(createdAt).fromNow(),
              name: userNamesMap.get(data.userId) || "Unknown",
            });
          });
          setAllOrders(ordersList);
          setOrdersLoading(false);
        } catch (error) {
          console.error("Error retrieving data from the database", error);
        } finally {
          setOrdersLoading(false);
        }
      },
      (error) => {
        console.error("Error listening to orders collection:", error);
      }
    );

    return () => unSubscribe();
  }, []);

  useEffect(() => {
    fetchAllOrders();
  }, [allOrders, fetchAllOrders]);

  return { allOrders, OrdersLoading };
};

export default useFetchAllOrders;
