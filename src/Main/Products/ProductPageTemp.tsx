import React, { useCallback, useEffect, useState } from "react";
import { Container, Rating } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { cartProductsType, selectedImg } from "../../Utils/Store";
import ButtonComp from "../../Components/Button";
import Footer from "../../Footer/Footer";
import AvatarComp from "../../Components/AvatarComp";
import SetCartQty from "../../Components/SetCartQty";
import moment from "moment";
import { MdCheckCircle } from "react-icons/md";
import { useCart } from "../../Hooks/UseCart";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../Firebase/FirebaseConfig";
import AddRating, { Review } from "./AddRating";
import useFetchReviewsByProductId from "../../Actions/FetchReviews/FetchReviews";

const Horizontal = () => {
  return <hr className="w-[30%] my-2" />;
};

const ProductPageTemp: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<any>();
  const navigate = useNavigate();
  const { cartItems, addToCart } = useCart();
  const [isInCart, setIsInCart] = useState(false);
  const { id } = useParams();
  const { reviews } = useFetchReviewsByProductId(id);

  useEffect(() => {
    const fetchProducts = async () => {
      if (id) {
        setLoading(true);
        const productsDocRef = doc(db, "products", id);

        try {
          const orderDoc = await getDoc(productsDocRef);

          if (orderDoc.exists()) {
            setProduct({ ...orderDoc.data(), id: id });
          }
        } catch (error) {
          console.error("Error trying to fetch this product", id);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProducts();
  }, [id]);

  const [cartProduct, setCartProduct] = useState<cartProductsType | null>(null);

  useEffect(() => {
    if (product) {
      setCartProduct({
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
      });
    }
  }, [product]);

  useEffect(() => {
    if (cartItems) {
      const existingIndex = cartItems?.findIndex(
        (cartItem) => cartItem.id === product?.id
      );
      if (existingIndex > -1) {
        setIsInCart(true);
      }
    }
  }, [cartItems, product?.id]);

  const handleImageSelect = useCallback(
    (value: selectedImg) => {
      if (cartProduct === null) return;
      setCartProduct((prev) => {
        let updatedCart = { ...cartProduct };

        if (prev) {
          updatedCart = { ...prev, image: value };
        }

        console.log("select", updatedCart);
        return updatedCart;
      });
    },
    [cartProduct]
  );
  const handleIncreaseFunc = useCallback(() => {
    if (cartProduct) {
      if (cartProduct.quantity === 99) return;
      setCartProduct((prev) => {
        let updatedProducts = { ...cartProduct };

        if (prev) {
          return {
            ...cartProduct,
            quantity: ++updatedProducts.quantity,
            itemTotal: updatedProducts.quantity * updatedProducts.price,
          };
        }

        return updatedProducts;
      });
    }
  }, [cartProduct]);

  const handleDecreaseFunc = useCallback(() => {
    if (cartProduct) {
      console.log("decrease", cartProduct);
      if (cartProduct.quantity === 1) return;
      setCartProduct((prev) => {
        let updatedProducts = { ...cartProduct };

        if (prev) {
          return {
            ...updatedProducts,
            quantity: --updatedProducts.quantity,
            itemTotal: updatedProducts.quantity * updatedProducts.price,
          };
        }
        return updatedProducts;
      });
    }
  }, [cartProduct]);

  if (loading) return <div>Loading...</div>;

  if (!id) {
    return <div> ID is missing or invalid</div>;
  }

  if (!product) {
    return <div>No products found</div>;
  }

  const handleAddToCart = () => {
    if (!isInCart) {
      addToCart(cartProduct);
    } else navigate("/ShoppingCartComponent");
  };

  const productRating = reviews
    ? reviews.reduce((acc: number, review: Review) => review.rating + acc, 0) /
      reviews.length
    : 0;

  return (
    <div className="flex flex-col justify-between min-h-[100vh] ">
      <Container maxWidth={"xl"}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-4">
          <div>
            <div className="grid grid-cols-6 gap-2 h-full max-h-[500px] min-h-[300px] sm:min-h-[400px]">
              <div className="flex flex-col gap-2 items-center justify-center h-full max-h-[500px] min-h-[400px] sm:min-h-[400px] border rounded">
                {product.images.map((image: any) => {
                  return (
                    <div
                      className={` w-[80%] aspect-square rounded border-teal-300`}
                      onClick={() => handleImageSelect(image)}
                      key={image.color}
                    >
                      <img
                        src={image.image}
                        alt={image.color}
                        className="object-contain aspect-square"
                      />
                    </div>
                  );
                })}
              </div>

              <div className="col-span-5 flex items-center justify-center h-full max-h-[500px] min-h-[400px] sm:min-h-[400px]">
                <img
                  src={cartProduct && cartProduct.image.image}
                  alt={"men trouser"}
                  className="object-contain aspect-square  h-full max-h-[500px] min-h-[400px] sm:min-h-[400px]"
                />
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-medium text-slate-700">
              {product.name.toLocaleUpperCase()}
            </h2>

            <Horizontal />
            <div className="flex items-center gap-1">
              <Rating
                name="hover-feedback"
                value={productRating}
                precision={1}
                style={{ zIndex: "1" }}
                readOnly
              />
              <div>{reviews.length} reviews</div>
            </div>
            <Horizontal />
            <div className="text-justify">{product.description}</div>
            <Horizontal />
            <div>
              <span className="font-semibold">CATEGORY:</span>
              <span className="font-semibold px-2">{product.category}</span>
            </div>
            <div>
              <span className="font-semibold ">BRAND:</span>
              <span className="font-semibold px-2">{product.brand}</span>
            </div>
            <div
              className={product.checkbox ? "text-teal-400" : "text-rose-400"}
            >
              {product.checkbox ? "in-Stock" : "out-stock"}
            </div>
            <Horizontal />
            <div>
              {isInCart ? (
                <div className="mb-2 text-teal-500 flex items-center gap-1">
                  <MdCheckCircle size={20} className="text-teal-400" />
                  <span>Product addded to cart</span>
                </div>
              ) : (
                <SetCartQty
                  cartProduct={cartProduct}
                  handleDecrease={handleDecreaseFunc}
                  handleIncrease={handleIncreaseFunc}
                  cart={false}
                />
              )}
            </div>
            <Horizontal />
            <div className="max-w-[200px]">
              <ButtonComp
                onClick={handleAddToCart}
                label={isInCart ? "View Cart" : "Add To Cart"}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-20 gap-4">
          <AddRating product={product} />
          <div>
            <h3 className="font-semibold text-2xl mb-3">Product reviews</h3>
            {reviews &&
              reviews.map((review: Review, index) => (
                <div key={index} className="mb-4">
                  <div className="flex gap-4">
                    <AvatarComp src={review.image} />
                    <p>{review.name}</p>
                    <div>
                      {moment(
                        review.dateCreated
                          ? review.dateCreated.toDate()
                          : new Date()
                      ).fromNow()}
                    </div>
                  </div>
                  <div>
                    <Rating value={review.rating} readOnly />
                    <div>{review.comment}</div>
                  </div>
                  <hr className="mt-4 mb-4 max-w-[300px]" />
                </div>
              ))}
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default ProductPageTemp;
