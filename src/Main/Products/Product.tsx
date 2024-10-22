import { Rating, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { cartProductsType, Item } from "../../Utils/Store";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../Hooks/UseCart";
import { CiHeart, CiShoppingTag } from "react-icons/ci";
import {
  formatPrice,
  TruncateText,
} from "../../Actions/ExportedFunctions/Functions";
import useFetchReviewsByProductId from "../../Actions/FetchReviews/FetchReviews";
import { Review } from "./AddRating";

interface productProps {
  product: Item;
  cartItem: cartProductsType;
}

const Product: React.FC<productProps> = ({ product, cartItem }) => {
  const [ratingValue, setRatingValue] = useState<number>(0);

  const cartProduct: cartProductsType = {
    id: product.id,
    brand: product.brand,
    description: product.description,
    category: product.category,
    price: product.price,
    quantity: 1,
    itemTotal: product.price * 1,
    total: 0,
    name: product.name,
    image: { ...product.images[0] },
  };
  const navigate = useNavigate();
  const { reviews } = useFetchReviewsByProductId(product.id);

  const {
    addToCart,
    removeFromCart,
    cartItems,
    addToFav,
    removeFromFav,
    favItems,
  } = useCart();

  const existingItemIndex =
    cartItems && cartItems.findIndex((cartItem) => cartItem.id === product.id);

  const existingFavProduct =
    favItems && favItems.findIndex((favItem) => favItem.id === product.id);

  const handleCart = (item: cartProductsType) => {
    existingItemIndex === -1 || cartItems === null
      ? addToCart({
          ...cartProduct,
        })
      : removeFromCart({
          ...cartProduct,
        });
  };
  const handleFav = (item: Item) => {
    existingFavProduct === -1 || favItems === null
      ? addToFav({
          ...item,
        })
      : removeFromFav({
          ...item,
        });
  };

  useEffect(() => {
    const productRating = reviews
      ? reviews.reduce(
          (acc: number, review: Review) => review.rating + acc,
          0
        ) / reviews.length
      : 0;

    setRatingValue(productRating);
  }, [product.id, reviews]);

  return (
    <div className=" z-[1] pointer-events-auto shadow-xl shadow-slate-200 rounded-sm ">
      {/* Image container */}
      <div className="h-[230px] sm:h-[250px] md:h-[280px] relative">
        <img
          src={product.images[0].image}
          alt={product.name}
          className="w-full h-full cursor-pointer object-cover"
          onClick={() => navigate(`/Product/${product.id}`)}
        />
        <h4
          className={`absolute top-2 left-2 px-3 py-1 text-xs rounded ${
            product.checkbox
              ? "bg-transparent text-transparent"
              : "bg-red-600 text-white"
          }`}
        >
          {product.checkbox ? "" : "Sold"}
        </h4>
        {/* Cart and Favorite icons */}
        <div className="absolute top-2 right-2 flex flex-col space-y-2">
          <div
            className="bg-white rounded-full h-8 w-8 flex items-center justify-center"
            onClick={() => handleCart(cartItem)}
          >
            <CiShoppingTag className="text-[25px]" />
          </div>
          <div
            className="bg-white rounded-full h-8 w-8 flex items-center justify-center"
            onClick={() => handleFav(product)}
          >
            <CiHeart className="text-[25px]" />
          </div>
        </div>
      </div>
      {/* Product details */}
      <div className="mt-4 pb-4 text-center px-4">
        <Rating
          name="hover-feedback"
          value={ratingValue}
          precision={0.5}
          readOnly
        />
        <h5
          className="text-lg font-sans cursor-pointer"
          onClick={() => navigate(`/Product/${product.id}`)}
        >
          {TruncateText(product.name.toLocaleUpperCase())}
        </h5>
        <p className="line-through inline mr-2 font-thin">
          Ksh: {formatPrice(product.prevPrice)}
        </p>
        <Typography className="inline">
          Ksh: {formatPrice(product.price)}
        </Typography>
      </div>
    </div>
  );
};

export default Product;
