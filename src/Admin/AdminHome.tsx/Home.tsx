import { Container } from "@mui/material";
import Summary from "./Summary";
import useFetchAllProducts from "../../Actions/FetchAllProducts/useFetchProducts";
import BarGraph, { GraphData } from "./Graph";
import { useEffect, useState } from "react";
import { usefetchGraphData } from "../../Actions/GraphData/useFetchGraphData";
import useFetchAllOrders from "../../Actions/Orders/AllOrder/AllOrders";

const Home = () => {
  const { allOrders, OrdersLoading } = useFetchAllOrders();
  const { products, loading } = useFetchAllProducts();
  const [graphDataLoading, setGraphDataLoading] = useState(false);
  const [graphData, setGraphData] = useState<GraphData[] | undefined>(
    undefined
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await usefetchGraphData();
        setGraphData(data);
      } catch (error) {
        console.error("Error fetching graph data", error);
      } finally {
        setGraphDataLoading(false);
      }
    };

    fetchData();
  }, []);

  if (OrdersLoading || loading || graphDataLoading)
    return <div>Loading...</div>;

  return (
    <div className="flex flex-col min-h-screen">
      <Container className="flex-grow">
        <Summary products={products} orders={allOrders} />
        <div className="mt-4 mx-auto max-w[1200px]">
          <BarGraph data={graphData} />
        </div>
      </Container>
    </div>
  );
};

export default Home;
