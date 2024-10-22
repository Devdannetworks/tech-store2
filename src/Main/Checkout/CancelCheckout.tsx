import { Container } from "@mui/material";
import Footer from "../../Footer/Footer";
import Empty from "../../Components/Empty";
import { MdCached } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const CancelCheckout = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col min-h-screen">
      <Container className="flex-grow">
        <Empty
          heading="Ooops your payment was unsuccessful !"
          icon={MdCached}
          details="Try again"
          onClick={() => navigate("/ShoppingCartComponent")}
        />
      </Container>
      <Footer />
    </div>
  );
};

export default CancelCheckout;
