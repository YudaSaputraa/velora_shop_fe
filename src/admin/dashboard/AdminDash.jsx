import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import { useGetOrderSummaryQuery } from "../../api/req/ApiOrder";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

import MetaData from "../../components/meta/MetaData";

const AdminDash = () => {
  const [chartData, setChartData] = useState([]);
  const { data: rawData, isLoading } = useGetOrderSummaryQuery();

  useEffect(() => {
    if (rawData?.data && rawData?.data.length > 0) {
      const formatted = rawData?.data.map((item) => ({
        order_date: new Date(item.order_date).toLocaleDateString("id-ID"),
        total_price: parseFloat(item.total_price),
      }));
      setChartData(formatted.reverse());
    }
  }, [rawData]);
  return (
    <Layout pageName={"Dashboard"}>
      <MetaData title={"Admin Dashboard"} desc={"Ecommerce easy shopping"} />
      <div className="bg-white p-4 border shadow rounded orverflow-auto">
        <p className="mb-b h6 text-center">7-day financial report</p>
        {isLoading ? (
          "Loading..."
        ) : chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={500}>
            <LineChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 70, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="order_date" />
              <YAxis tickFormatter={(value) => value.toLocaleString("id-ID")} />
              <Tooltip
                formatter={(value) => `Rp ${value.toLocaleString("id-ID")}`}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="total_price"
                stroke="#2bb3c0"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p>Empty data</p>
        )}
      </div>
    </Layout>
  );
};

export default AdminDash;
