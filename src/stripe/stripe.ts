import {
  collection,
  doc,
  addDoc,
  onSnapshot,
  Timestamp,
} from "firebase/firestore";
import { cartProductsType } from "../Utils/Store";
import { auth, db } from "../Firebase/FirebaseConfig";
import toast from "react-hot-toast";

export const CreateCheckoutSession = async (products: cartProductsType[]) => {
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
    const orderId = await saveOrderToDB(currentUser.uid, products, totalAmount);

    const customerRef = doc(collection(db, "customers"), currentUser.uid);
    const checkoutSessionsRef = collection(customerRef, "checkout_sessions");

    const lineItems = products.map((product) => ({
      quantity: product.quantity,
      price_data: {
        currency: "kes",
        product_data: {
          name: product.name,
          description: product.description,
        },
        unit_amount: product.price * 100,
      },
    }));

    const docRef = await addDoc(checkoutSessionsRef, {
      mode: "payment",
      line_items: lineItems,
      success_url: `${window.location.origin}/success-checkout?order_id=${orderId}`,
      cancel_url: window.location.origin + "/cancel-checkout",
      metadata: { userId: currentUser.uid, orderId: orderId }, // Pass orderId in metadata
    });

    onSnapshot(docRef, async (snap) => {
      const data = snap.data();
      console.log(data);
      if (data) {
        const { error, url } = data;
        if (error) {
          console.error("An error occurred:", error.message);
        }
        if (url) {
          window.location.assign(url);
        }
      }
    });
  } catch (error) {
    toast.error("Error creating a checkoot session");
    console.error("Error creating checkout session", error);
  }
};

const saveOrderToDB = async (
  userId: string,
  products: cartProductsType[],
  totalAmount: number
) => {
  try {
    const ordersRef = collection(db, "orders");

    // Add the order to Firestore
    console.log(ordersRef);
    const orderDoc = await addDoc(ordersRef, {
      userId: userId,
      products: products,
      totalAmount: totalAmount,
      createdAt: Timestamp.now(),
      deliveryStatus: "pending",
      paymentStatus: "pending",
    });

    console.log("Order saved to the database");
    return orderDoc.id;
  } catch (error) {
    console.error("Error saving order to the database", error);
    throw error;
  }
};
