import { Container, Grid } from "@mui/material";
import Footer from "../../Footer/Footer";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../Firebase/FirebaseConfig";
import HeadersComp from "../../Components/Headers";
import Product from "../Products/Product";
import { MdArrowBack } from "react-icons/md";

const Shop: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const category = params.get("category");
  const searchedItem = params.get("searchedItem");

  useEffect(() => {
    const q = category
      ? query(
          collection(db, "products"),
          where("category", "==", category.toLowerCase())
        )
      : collection(db, "products");

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const productList: any = [];
      querySnapshot.forEach((doc) => {
        productList.push({ ...doc.data(), id: doc.id });
      });
      console.log(productList);
      setProducts(productList);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [category]);

  useEffect(() => {
    const fetchProducts = async () => {
      let products: any[] = [];

      const promises = [];

      if (searchedItem) {
        const brandQuery = query(
          collection(db, "products"),
          where("brand", "==", searchedItem.toLowerCase())
        );
        promises.push(getDocs(brandQuery));

        const categoryQuery = query(
          collection(db, "products"),
          where("category", "==", searchedItem.toLowerCase())
        );
        promises.push(getDocs(categoryQuery));
      }

      try {
        const snapshots = await Promise.all(promises);

        snapshots.forEach((snapshot) => {
          snapshot.forEach((doc) => {
            products.push({ ...doc.data(), id: doc.id });
          });
        });

        // Remove duplicates
        const uniqueProducts = Array.from(
          new Set(products.map((p) => p.id))
        ).map((id) => products.find((p) => p.id === id));

        setProducts(uniqueProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchedItem]);

  return (
    <div className="flex flex-col min-h-screen">
      <Container className="z-[1] flex-grow min-w-full">
        {loading ? (
          <div>Loading...</div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center pt-5">
            <h4>No products under this category for now</h4>

            <div
              onClick={() => navigate("/Popular")}
              className="flex items-center justify-center gap-2 cursor-pointer"
            >
              <MdArrowBack /> <span> Continue Shopping</span>
            </div>
          </div>
        ) : (
          <div>
            <div>
              <HeadersComp label="FEATURED PRODUCTS" />
            </div>
            <Grid container spacing={3}>
              {products.map((product, index) => (
                <Grid item xs={6} sm={6} md={4} lg={2} xl={2} key={index}>
                  <Product product={product} cartItem={product} />
                </Grid>
              ))}
            </Grid>
          </div>
        )}
      </Container>
      <Footer />
    </div>
  );
};

export default Shop;
