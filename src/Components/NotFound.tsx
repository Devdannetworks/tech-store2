import { Container } from "@mui/material";
import Footer from "../Footer/Footer";
import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/Shop");
  };
  return (
    <div className="flex flex-col min-h-screen">
      <Container maxWidth={"xl"} className="flex-grow">
        <div className="text-sm md:text-base mt-10 flex flex-col justify-center  w-full  items-center gap-1">
          <h3 className="font-bold text-xl">404 PAGE NOT FOUND!</h3>
          <div
            className="flex align-middle justify-center cursor-pointer"
            style={{ alignItems: "center" }}
            onClick={onClick}
          >
            <MdArrowBack />

            <p>Go back shopping</p>
          </div>
        </div>
      </Container>

      <Footer />
    </div>
  );
};

export default NotFound;
