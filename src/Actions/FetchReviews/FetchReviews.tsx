import { useState, useEffect, useCallback } from "react";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../../Firebase/FirebaseConfig";
import { Review } from "../../Main/Products/AddRating";

interface UseFetchReviewsResult {
  reviews: Review[];
  loading: boolean;
}

const useFetchReviewsByProductId = (
  productId: string | undefined
): UseFetchReviewsResult => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const FetchReviewsByProductId = useCallback(() => {
    if (!productId || undefined)
      return console.error("id is undefined or null");

    setLoading(true);

    try {
      const reviewsDocRef = collection(db, "products", productId, "reviews");
      const q = query(reviewsDocRef);

      const unSubscribe = onSnapshot(q, (querySnapshot) => {
        const reviewsList = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setReviews(reviewsList);
        setLoading(false);
      });

      // Return unsubscribe function to clean up the listener when the component unmounts
      return () => unSubscribe();
    } catch (error) {
      console.error("Error fetching reviews for product", productId, error);
      setLoading(false);
    }
  }, [productId]); // Memoize based on the productId

  useEffect(() => {
    FetchReviewsByProductId();
  }, [FetchReviewsByProductId]); // Re-run the fetch when the productId changes

  return { reviews, loading };
};

export default useFetchReviewsByProductId;
