import { collection, doc } from "firebase/firestore";
import { auth, db } from "../Firebase/FirebaseConfig";
import { cartProductsType } from "../Utils/Store";

export const CreateCheckoutSessionPesapal = async (
  products: cartProductsType[]
) => {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error("User not authenticated");
  }

  // Calculate the total amount
  const totalAmount = products.reduce(
    (acc, product) => acc + product.price * product.quantity * 100,
    0
  );

  try {
    // First, save the order to Firestore and get the orderId
  } catch (err) {
    console.error("error creating a pesapal checkout", err);
  }
};
