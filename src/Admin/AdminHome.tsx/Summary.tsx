import React, { useEffect, useState } from "react";
import { OrderInterface } from "../ManageOrders/ManageOrdersPage";
import { Item } from "../../Utils/Store";
import useFetchAllUsers from "../../Actions/FetchAllUsers/useFetchAllUsers";
import HeadersComp from "../../Components/Headers";
import { formatPrice } from "../../Actions/ExportedFunctions/Functions";

interface SummaryProps {
  orders: OrderInterface[];
  products: Item[];
}

type SummaryDataType = {
  [key: string]: {
    label: string;
    digit: number;
  };
};

const Summary: React.FC<SummaryProps> = ({ orders, products }) => {
  const { users } = useFetchAllUsers();
  const [summaryData, setSummaryData] = useState<SummaryDataType>({
    sale: {
      label: "Total Sales",
      digit: 0,
    },
    paidOrders: {
      label: "Total Paid Orders",
      digit: 0,
    },
    TotalOrders: {
      label: "Total number of Orders",
      digit: 0,
    },
    unpaidOrders: {
      label: "Total Unpaid Orders",
      digit: 0,
    },
    products: {
      label: "Total Products",
      digit: 0,
    },
    users: {
      label: "Total Users",
      digit: 0,
    },
  });

  useEffect(() => {
    setSummaryData((prev) => {
      let startData = { ...prev };

      const totalSale = orders.reduce((acc, order) => {
        if (order.paymentStatus === "paid") {
          return acc + order.totalAmount;
        }
        return acc;
      }, 0);

      const paidOrders = orders.filter(
        (order) => order.paymentStatus === "paid"
      );
      const unpaidOrders = orders.filter(
        (order) => order.paymentStatus === "pending"
      );

      startData.sale.digit = totalSale;
      startData.paidOrders.digit = paidOrders.length;
      startData.TotalOrders.digit = orders.length;
      startData.unpaidOrders.digit = unpaidOrders.length; // Fixed the key mismatch
      startData.products.digit = products.length;
      startData.users.digit = users.length;

      return startData;
    });
  }, [products, orders, users]);

  const summaryKeys = Object.keys(summaryData);
  return (
    <div className="max-w-[1200px] m-auto">
      <div className="mb-4 mt-8">
        <HeadersComp label="Shop Statistics" />
      </div>

      <div className="grid grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {summaryKeys &&
          summaryKeys.map((summaryKey) => (
            <div
              key={summaryKey}
              className="rounded-xl border-2 p-4 flex flex-col items-center gap-2 transition"
            >
              <div className="text-xl md:text-4xl font-bold">
                {summaryData[summaryKey].label === "Total Sales" ? (
                  <>Ksh: {formatPrice(summaryData[summaryKey].digit)}</>
                ) : (
                  <>{summaryData[summaryKey].digit}</>
                )}
              </div>
              <div>{summaryData[summaryKey].label}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Summary;
