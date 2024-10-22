import React, { useEffect, useState } from "react";
import HeadersComp from "../../Components/Headers";
import ButtonComp from "../../Components/Button";
import { MdArrowBack } from "react-icons/md";
import ProductContent from "./ProductContent";
import { cartProductsType } from "../../Utils/Store";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../Hooks/UseCart";
import { auth, db } from "../../Firebase/FirebaseConfig"; // Import Firestore
import axios from "axios";
import toast from "react-hot-toast";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore"; // Firestore functions

type Data = {
  total: number;
  firstName: string;
  email: string;
  phoneNumber: string;
  products: cartProductsType[];
  userId: string;
};

const CartClient: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<Data | null>(null); // State for user data
  const navigate = useNavigate();

  const { cartItems, clearCart, totalAmount } = useCart();

  const API_URL = "http://localhost:5173";

  // Function to retrieve user data from Firestore by ID
  const fetchUserData = async (userId: string) => {
    try {
      const userDocRef = doc(db, "users", userId); // Reference to the user document
      const userDoc = await getDoc(userDocRef); // Fetch the document

      if (userDoc.exists()) {
        const userData = userDoc.data() as Data; // Cast the data to the Data type
        setUserData({ ...userData, userId: userDoc.id });
      } else {
        console.error("User document not found");
        toast.error("User data not found");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Failed to retrieve user data");
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserData(user.uid); // Fetch user data if logged in
      } else {
        setUserData(null); // Reset user data if not logged in
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  const handleCheckout = async () => {
    if (!userData) {
      navigate("/LogIn");
      return toast.error("Log in to make a checkout");
    }

    setLoading(true);

    if (cartItems) {
      const total = cartItems.reduce(
        (acc, product) => acc + product.price * product.quantity,
        0
      );

      const data: Data = {
        total: total,
        firstName: userData.firstName,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
        products: cartItems,
        userId: userData.userId,
      };

      try {
        toast("Please wait, redirecting to checkout!");
        const response = await axios.post(`${API_URL}/api/payment`, data);

        // Redirect user to Pesapal payment page
        window.location.href = response.data.redirect_url;
      } catch (error) {
        console.error("Error creating checkout session:", error);
        toast.error("Couldn't redirect to checkout");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <div className="mb-2">
        <HeadersComp label="Shopping cart" />
      </div>
      <div className="grid grid-cols-5 text-xs">
        <div className="col-span-2 justify-self-start">PRODUCT</div>
        <div className="justify-self-center">QUANTITY</div>
        <div className="justify-self-center">PRICE</div>
        <div className="justify-self-end">TOTAL</div>
      </div>
      <div>
        {cartItems &&
          cartItems.map((product: cartProductsType) => (
            <ProductContent key={product.id} product={product} />
          ))}
      </div>

      <div className="flex justify-between mt-4">
        <div>
          <ButtonComp
            onClick={() => clearCart()}
            label="Clear cart"
            outline
            small
          />
        </div>
        <div className="text-[13px] flex flex-col gap-1">
          <div className=" font-semibold text-base flex justify-between w-full ">
            <span>Subtotal</span>
            <span>Ksh: {totalAmount && totalAmount.toFixed(2)}</span>
          </div>
          <p className="text-slate-500">
            Taxes and shipping calculated at check-out
          </p>
          <div>
            <ButtonComp
              onClick={handleCheckout}
              label={loading ? "loading..." : "Checkout"}
            />
          </div>
          <div
            className="flex align-middle justify-start items-center cursor-pointer"
            onClick={() => navigate("/Popular")}
          >
            <div className="justify-self-start">
              <MdArrowBack />
            </div>
            <span>Continue shopping</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartClient;
