import React from "react";
import {
  Chart as ChartJs,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJs.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface BarGraphProps {
  data: GraphData[] | undefined;
}

export type GraphData = {
  day: string;
  date: string;
  totalAmount: number;
};

const BarGraph: React.FC<BarGraphProps> = ({ data }) => {
  const labels = data?.map((item) => item.day);
  const amount = data?.map((item) => item.totalAmount);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Amount of sales",
        data: amount,
        backgroundColor: "rgba(115, 197, 197, 1)",
        borderColor: "rgba(75, 192, 192, 1) ",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  return <Bar data={chartData} options={options}></Bar>;
};

export default BarGraph;
