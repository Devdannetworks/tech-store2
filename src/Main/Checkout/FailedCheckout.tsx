import { Container } from "@mui/material";
import Empty from "../../Components/Empty";
import { MdArrowBack } from "react-icons/md";
import Footer from "../../Footer/Footer";
import { useNavigate } from "react-router-dom";

const FailedCheckout = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      <Container className="flex-grow">
        <Empty
          heading="Check out failed!"
          icon={MdArrowBack}
          details="Try again"
          onClick={() => navigate("/ShoppingcartComponent")}
        />
      </Container>
      <Footer />
    </div>
  );
};

export default FailedCheckout;
