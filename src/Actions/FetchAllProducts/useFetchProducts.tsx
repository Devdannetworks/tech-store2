import { useCallback, useEffect, useState } from "react";
import { Item } from "../../Utils/Store";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../Firebase/FirebaseConfig";

interface useFetchAllProductsResult {
  loading: boolean;
  products: Item[];
}

const useFetchAllProducts = (): useFetchAllProductsResult => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Item[]>([]);

  const fetchProducts = useCallback(() => {
    const unSubscribe = onSnapshot(
      collection(db, "products"),
      (querySnapshot) => {
        try {
          const productsList: any = [];

          querySnapshot.forEach((doc) => {
            const data = doc.data();
            productsList.push({ ...data, id: doc.id });
          });

          setProducts(productsList);
        } catch (error) {
          console.error("Error tring to fetch products from db", error);
        } finally {
          setLoading(false);
        }
      }
    );

    return () => unSubscribe();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { loading, products };
};

export default useFetchAllProducts;
