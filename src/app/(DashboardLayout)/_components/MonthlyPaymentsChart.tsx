
import { IPayment } from "@/src/types";
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

interface MonthlyPayment {
  month: string;
  amount: number;
  count: number;
}

const MonthlyPaymentsChart = ({ payments }: { payments: IPayment[] }) => {
  const monthlyData: MonthlyPayment[] = useMemo(() => {
    const data = Array(12).fill(null).map((_, i) => ({
      month: new Date(2024, i).toLocaleString("default", { month: "short" }),
      amount: 0,
      count: 0,
    }));

    payments.forEach((payment) => {
      const date = new Date(payment.createdAt);
      const monthIndex = date.getMonth();
      data[monthIndex].amount += payment.totalAmount;
      data[monthIndex].count += 1;
    });

    return data;
  }, [payments]);

  return (
    <Card className="w-full h-[400px]">
      <CardHeader>
        <h3 className="text-xl font-semibold">Monthly Payments</h3>
      </CardHeader>
      <CardBody>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
            <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="amount" fill="#8884d8" name="Total Amount" />
            <Bar yAxisId="right" dataKey="count" fill="#82ca9d" name="Number of Payments" />
          </BarChart>
        </ResponsiveContainer>
      </CardBody>
    </Card>
  );
};

export default MonthlyPaymentsChart;