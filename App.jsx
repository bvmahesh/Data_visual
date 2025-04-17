import React, { useState } from "react";
import {
  Line, Bar
} from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
  TimeScale
} from "chart.js";
import "chartjs-adapter-date-fns";
import salesData from "./data.json"; // Local JSON file or fetched data

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  TimeScale,
  Tooltip,
  Legend
);

function App() {
  const [startDate, setStartDate] = useState("2023-01-01");
  const [endDate, setEndDate] = useState("2023-12-31");

  const filteredData = salesData.filter(
    (item) => item.date >= startDate && item.date <= endDate
  );

  const dailySales = {
    labels: filteredData.map((item) => item.date),
    datasets: [
      {
        label: "Daily Sales",
        data: filteredData.map((item) => item.sales),
        fill: false,
        backgroundColor: "blue",
        borderColor: "blue",
      },
    ],
  };

  const revenue = {
    labels: filteredData.map((item) => item.date),
    datasets: [
      {
        label: "Revenue",
        data: filteredData.map((item) => item.revenue),
        backgroundColor: "green",
      },
    ],
  };

  const transactions = {
    labels: filteredData.map((item) => item.date),
    datasets: [
      {
        label: "Transactions",
        data: filteredData.map((item) => item.transactions),
        backgroundColor: "orange",
      },
    ],
  };

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">E-commerce Dashboard</h1>
      <div className="flex gap-4">
        <label>
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="ml-2"
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="ml-2"
          />
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-xl shadow-md">
          <Line data={dailySales} options={{ responsive: true }} />
        </div>
        <div className="bg-white p-4 rounded-xl shadow-md">
          <Bar data={revenue} options={{ responsive: true }} />
        </div>
        <div className="bg-white p-4 rounded-xl shadow-md">
          <Bar data={transactions} options={{ responsive: true }} />
        </div>
      </div>
    </div>
  );
}

export default App;
