import { Container } from "@mui/material";
import Products from "./Products/Products";
import Blogs from "./Blog/Blogs";
import Services from "./services/Services";

const Main: React.FC = () => {
  return (
    <Container maxWidth={"xl"}>
      <Products />
      <Services />
      <Blogs />
    </Container>
  );
};

export default Main;
