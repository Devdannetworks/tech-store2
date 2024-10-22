import React from "react";
import HeadersComp from "../../Components/Headers";
import ProductStatus from "../../Components/ProductStatus";
import { MdAccessTimeFilled, MdDeliveryDining, MdDone } from "react-icons/md";
import moment from "moment";
import { cartProductsType } from "../../Utils/Store";
import OrderItem from "./OrderItem";
import { formatPrice } from "../../Actions/ExportedFunctions/Functions";

interface orderDetailsPageProps {
  order: any;
}

const OrderDetailsPage: React.FC<orderDetailsPageProps> = ({ order }) => {
  return (
    <div className="max-w-[1200px] m-auto flex flex-col gap-2">
      <div>
        <HeadersComp label="Order details" />
      </div>
      <div>Order ID: {order.id}</div>
      <div>
        Total amount:{" "}
        <span className="font-bold">
          {formatPrice(order.totalAmount / 100)}
        </span>
      </div>
      <div className="flex gap-3 items-center">
        <div>Payment Status:</div>
        <div>
          {order.paymentStatus === "pending" ? (
            <ProductStatus
              label="pending"
              icon={MdAccessTimeFilled}
              color="text-slate-700"
              bg="bg-slate-200"
            />
          ) : order.paymentStatus === "paid" ? (
            <ProductStatus
              label="paid"
              icon={MdDone}
              color="text-slate-700"
              bg="bg-teal-200"
            />
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="flex gap-3 items-center ">
        <div>Delivery Status: </div>

        <div>
          {order.deliveryStatus === "pending" ? (
            <ProductStatus
              label="pending"
              icon={MdAccessTimeFilled}
              color="text-slate-700"
              bg="bg-slate-200"
            />
          ) : order.deliveryStatus === "dispatched" ? (
            <ProductStatus
              label="dispatched"
              icon={MdDeliveryDining}
              color="text-slate-700"
              bg="bg-purple-200"
            />
          ) : order.deliveryStatus === "delivered" ? (
            <ProductStatus
              label="delivered"
              icon={MdDone}
              color="text-slate-700"
              bg="bg-green-200"
            />
          ) : (
            <></>
          )}
        </div>
      </div>
      <div>Date: {moment(order.createdDate).fromNow()}</div>
      <div>
        <h2 className="font-semibold mt-4 mb-2">Products Ordered</h2>
        <div className="grid grid-cols-5 text-xs gap-4 pb-2 items-center">
          <div className="col-span-2 justify-self-start">Product</div>
          <div className=" justify-self-center">Price</div>
          <div className=" justify-self-center">Quantity</div>
          <div className=" justify-self-end">Total</div>
        </div>
        {order.products &&
          order.products.map((item: cartProductsType) => {
            return <OrderItem key={item.id} item={item} />;
          })}
      </div>
    </div>
  );
};

export default OrderDetailsPage;
