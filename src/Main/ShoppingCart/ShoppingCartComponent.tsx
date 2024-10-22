import { Box, Container } from "@mui/material";
import Footer from "../../Footer/Footer";
import Empty from "../../Components/Empty";
import { MdArrowBack } from "react-icons/md";
import CartClient from "./CartClient";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../Hooks/UseCart";

const ShoppingCartComponent: React.FC = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const handleNavigateBack = () => {
    navigate(`/Popular`);
  };

  return (
    <Box className="flex flex-col min-h-screen">
      <Container maxWidth={"xl"} className="flex-grow">
        {!cartItems || cartItems.length === 0 ? (
          <div>
            <Empty
              heading="Ooops Your cart is empty!"
              details="Go back shopping"
              icon={MdArrowBack}
              onClick={handleNavigateBack}
            />
          </div>
        ) : (
          <div>
            <CartClient />
          </div>
        )}
      </Container>
      <div>
        <Footer />
      </div>
    </Box>
  );
};

export default ShoppingCartComponent;
