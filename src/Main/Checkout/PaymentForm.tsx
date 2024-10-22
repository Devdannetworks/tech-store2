// src/components/CheckoutForm.jsx

import React, { useCallback, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { useCart } from "../../Hooks/UseCart";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51PfkY6Rv5VoHxAPjWoXlbWHBMy8dTgAuhDcILCLynh0AZf3TT2sL8ja8vlO6eB75Qg3bIRBf9a2IvNUTlFAeO7iU00M4cBzobS"
);

const PaymentForm = () => {
  const { cartItems } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchClientSecret = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        "https://us-central1-e-commerce-app-c82d8.cloudfunctions.net/createCheckoutSession",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ items: cartItems }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to create checkout session");
      }

      const data = await res.json();
      return data.clientSecret;
    } catch (error: any) {
      console.error("Error fetching client secret:", error);
      setError(error.message || "An error occurred");
      return null;
    } finally {
      setLoading(false);
    }
  }, [cartItems]);

  const options = { fetchClientSecret };

  return (
    <div id="checkout">
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
};

export default PaymentForm;
