import React from "react";
import { cartProductsType } from "../../Utils/Store";
import {
  formatPrice,
  TruncateText,
} from "../../Actions/ExportedFunctions/Functions";

interface OrderItemProps {
  item: cartProductsType;
}

const OrderItem: React.FC<OrderItemProps> = ({ item }) => {
  return (
    <div className="grid grid-cols-5 text-xs md:text-sm gap-4 border-t[1.5px] border-slate-200 py-4 items-center ">
      <div className="col-span-2 justify-self-start flex gap-2">
        <div className="relative w-[70px] aspect-square">
          <img
            src={item.image.image}
            className="object-contain"
            alt={item.name}
          />
        </div>
        <div className="flex flex-col gap-1">
          <div>{TruncateText(item.name)}</div>
          <div>{item.image.color}</div>
        </div>
      </div>

      <div className="justify-self-center">{formatPrice(item.price)}</div>
      <div className="justify-self-center">{item.quantity}</div>
      <div className="justify-self-end font-semibold">
        Ksh: {formatPrice(item.itemTotal)}
      </div>
    </div>
  );
};

export default OrderItem;
