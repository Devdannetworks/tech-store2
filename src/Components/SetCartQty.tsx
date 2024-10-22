import React from "react";
import { cartProductsType } from "../Utils/Store";

interface setQty {
  cart: boolean;
  handleDecrease: any;
  handleIncrease: any;
  cartProduct: cartProductsType | null;
}

const SetCartQty: React.FC<setQty> = ({
  cart,
  handleDecrease,
  handleIncrease,
  cartProduct,
}) => {
  const buttonStyles =
    "border-[1.2px] border-slate-300 px-2 py-1 rounded text-md ";
  return (
    <div className="flex gap-2 md:gap-8 items-center  justify-self-center">
      <div>{cart ? null : <div className="font-semibold">QUANTITY: </div>}</div>

      <div className="flex gap-2 md:gap-4 items-center  ">
        <button className={buttonStyles} onClick={() => handleDecrease()}>
          -
        </button>
        <div>{cartProduct && cartProduct.quantity}</div>
        <button className={buttonStyles} onClick={() => handleIncrease()}>
          +
        </button>
      </div>
    </div>
  );
};

export default SetCartQty;
