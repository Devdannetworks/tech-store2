import { Container, Grid } from "@mui/material";
import Product from "../Products/Product";
import Footer from "../../Footer/Footer";
import Empty from "../../Components/Empty";
import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Item } from "../../Utils/Store";
import { useCart } from "../../Hooks/UseCart";
import HeadersComp from "../../Components/Headers";

const FavProducts: React.FC = () => {
  const { favItems } = useCart();
  console.log(favItems);

  const navigate = useNavigate();
  const handleNavigateBack = () => {
    navigate("/Popular");
  };
  return (
    <div className="flex flex-col  min-h-screen">
      <Container className="flex-grow  min-w-full">
        {!favItems || favItems.length === 0 ? (
          <div>
            <Empty
              heading="Ooops! Your wishlist is empty!"
              details="Go back shopping"
              icon={MdArrowBack}
              onClick={handleNavigateBack}
            />
          </div>
        ) : (
          <div className=" w-full">
            <div className="mb-2">
              <HeadersComp label="Favourite Products" />
            </div>
            <Grid container spacing={3}>
              {favItems &&
                favItems.map((item: Item, index: number) => (
                  <Grid item xs={6} sm={4} md={4} lg={2} xl={2} key={index}>
                    <Product
                      product={item}
                      cartItem={{
                        ...item,
                        quantity: 1,
                        itemTotal: item.price,
                        image: item.images[0].image,
                      }}
                    />
                  </Grid>
                ))}
            </Grid>
          </div>
        )}
      </Container>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default FavProducts;
