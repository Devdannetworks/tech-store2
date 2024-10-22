import AdminNav from "../AdminNav/AdminNav";
import { Container } from "@mui/material";
import Footer from "../../Footer/Footer";
import ManageOrdersPage from "./ManageOrdersPage";
import useFetchAllOrders from "../../Actions/Orders/AllOrder/AllOrders";

const ManageOrders = () => {
  const { allOrders, OrdersLoading } = useFetchAllOrders();

  if (OrdersLoading) return <div>Loading...</div>;

  return (
    <div className="relative flex flex-col min-h-screen">
      <AdminNav />
      <Container className="flex-grow w-full">
        <ManageOrdersPage orders={allOrders} />
      </Container>
      <Footer />
    </div>
  );
};

export default ManageOrders;
