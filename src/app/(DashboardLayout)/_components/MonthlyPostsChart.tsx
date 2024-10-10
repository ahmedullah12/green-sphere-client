import { IPost } from "@/src/types";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const MonthlyPostsChart = ({ posts }: { posts: IPost[] }) => {
  const monthlyData = useMemo(() => {
    const data = Array(12)
      .fill(null)
      .map((_, i) => ({
        month: new Date(2024, i).toLocaleString("default", { month: "short" }),
        count: 0,
      }));

    posts.forEach((post) => {
      const date = new Date(post.createdAt);
      const monthIndex = date.getMonth();
      data[monthIndex].count += 1;
    });

    return data;
  }, [posts]);

  return (
    <Card className="w-full h-[400px]">
      <CardHeader>
        <h3 className="text-xl font-semibold">Monthly Posts</h3>
      </CardHeader>
      <CardBody>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" name="Posts" />
          </BarChart>
        </ResponsiveContainer>
      </CardBody>
    </Card>
  );
};

export default MonthlyPostsChart;
