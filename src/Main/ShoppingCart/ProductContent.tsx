// src/Components/ProductContent.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { cartProductsType } from "../../Utils/Store";
import SetCartQty from "../../Components/SetCartQty";
import { useCart } from "../../Hooks/UseCart";
import {
  formatPrice,
  TruncateText,
} from "../../Actions/ExportedFunctions/Functions";

interface ProductContentProps {
  product: cartProductsType;
}

const ProductContent: React.FC<ProductContentProps> = ({ product }) => {
  const { removeFromCart, handleQtyDecrease, handleQtyIncrease } = useCart();

  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-5 text-xs md:text-sm gap-4 border-t-[1.5px] border-slate-20 py-4 items-center">
      <div className="flex col-span-2 justify-self-start gap-2 md:gap-4">
        <div
          className="w-[60px] h-[60px] cursor-pointer"
          onClick={() => navigate(`/product/${product.id}`)}
        >
          <img src={product.image.image} alt={product.name} />
        </div>
        <div className="flex flex-col justify-between">
          <div
            className="text-sm md:text-2xl cursor-pointer"
            onClick={() => navigate(`/product/${product.id}`)}
          >
            {TruncateText(product.name.toUpperCase())}
          </div>
          <div className="text-slate-700 md:text-sm">
            Color: {product.image.color}
          </div>
          <div className="text-xs md:text-sm">Category: {product.category}</div>
          <div className="w-[70px]">
            <button
              className="underline text-slate-500"
              onClick={() => removeFromCart(product)}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
      <SetCartQty
        cartProduct={product}
        handleDecrease={() => {
          handleQtyDecrease(product);
        }}
        handleIncrease={() => handleQtyIncrease(product)}
        cart={true}
      />
      <div className="col-span-1 justify-self-center">
        Ksh: {formatPrice(product.price)}
      </div>
      <div className="justify-self-end">
        <div className="justify-self-end">
          Ksh: {formatPrice(product.itemTotal)}
        </div>
      </div>
    </div>
  );
};

export default ProductContent;
