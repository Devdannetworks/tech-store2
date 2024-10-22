import Product from "./Product";
import HeadersComp from "../../Components/Headers";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Firebase/FirebaseConfig";

const Products: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsRef = collection(db, "products");

      try {
        setLoading(true);

        const productsSnapshot = await getDocs(productsRef);
        const productsList = productsSnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setProducts(productsList);
      } catch (error) {
        console.error("Error fetching products from the database:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  console.log(products);
  if (loading) return <div>...loading</div>;
  return (
    <div className="z-[1] mb-8">
      <div>
        <HeadersComp label="FEATURED PRODUCTS" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 gap-4">
        {products.map((product, index) => (
          <Product product={product} cartItem={product} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Products;
