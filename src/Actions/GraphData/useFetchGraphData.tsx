import { collection, getDocs, query, where } from "firebase/firestore";
import moment from "moment";
import { db } from "../../Firebase/FirebaseConfig";
import { Timestamp } from "firebase/firestore";

export const usefetchGraphData = async () => {
  try {
    // Get start and end date for the last 7 days
    const startDate = moment().subtract(6, "days").startOf("day").toDate();
    const endDate = moment().endOf("day").toDate();

    // Log dates to make sure they're correct
    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);

    // Query for orders within the date range and paymentStatus = 'paid'
    const ordersCollectionRef = collection(db, "orders");
    const ordersQuery = query(
      ordersCollectionRef,
      where("createdAt", ">=", Timestamp.fromDate(startDate)),
      where("createdAt", "<=", Timestamp.fromDate(endDate)),
      where("paymentStatus", "==", "paid")
    );

    // Fetch the orders
    const snapshot = await getDocs(ordersQuery);
    const orderDocs = snapshot.docs.map((doc) => doc.data());

    // Create an object to aggregate data
    let aggregatedData: Record<
      string,
      { date: string; day: string; totalAmount: number }
    > = {};

    // Clone startDate to iterate over each day in the date range
    let currentDate = moment(startDate);

    // Iterate over each day in the date range
    while (currentDate.isSameOrBefore(moment(endDate))) {
      const formattedDate = currentDate.format("YYYY-MM-DD");
      const day = currentDate.format("dddd"); // Get day of the week

      // Initialize the aggregated data for each day with date, dayOfWeek, and totalAmount = 0
      if (!aggregatedData[formattedDate]) {
        aggregatedData[formattedDate] = {
          date: formattedDate,
          day,
          totalAmount: 0,
        };
      }

      // Filter orders for the current date
      const ordersForDay = orderDocs.filter((order: any) => {
        const orderDate = moment(order.createdAt.toDate()).format("YYYY-MM-DD");
        return orderDate === formattedDate;
      });

      // Sum the orderAmount for the current day
      aggregatedData[formattedDate].totalAmount = ordersForDay.reduce(
        (sum: number, order: any) => sum + (order.totalAmount || 0) / 100,
        0
      );

      // Move to the next day
      currentDate.add(1, "days");
    }

    // Convert the aggregatedData object to an array and sort it by date
    const formattedData = Object.values(aggregatedData).sort((a, b) =>
      moment(a.date).diff(moment(b.date))
    );

    return formattedData;
  } catch (error) {
    console.error("Error fetching graph data", error);
  }
};
