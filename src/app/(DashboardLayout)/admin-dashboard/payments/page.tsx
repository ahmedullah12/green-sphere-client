"use client";

import Loading from "@/src/components/UI/Loading";
import GSTable from "@/src/components/UI/Table";
import { useGetAllPayments } from "@/src/hooks/payment.hooks";
import { IPayment } from "@/src/types";
import Link from "next/link";
import MonthlyPaymentsChart from "../../_components/MonthlyPaymentsChart";

const Payments = () => {
  const { data: payments, isLoading } = useGetAllPayments();

  const columns = [
    { key: "image", label: "" },
    { key: "userName", label: "User Name" },
    { key: "email", label: "Email" },
    { key: "amount", label: "Amount" },
    {key: "status", label: "Status"},
    {key: "createdAt", label: "Date"}
  ];

  const rows = payments?.data?.map((payment: IPayment) => ({
    key: payment._id,
    image: (
      <img
        src={payment.userId.profilePhoto}
        alt={"post"}
        className="w-10 h-10 object-cover rounded-md"
      />
    ),

    userName: (
      <Link
        href={`/profile/${payment.userId._id}`}
        className="hover:underline text-blue-600"
      >
        <span>{payment.userId.name}</span>
      </Link>
    ),
    email: payment.email,
    amount: payment.totalAmount,
    status: payment.isConfirmed ? "Paid" : "Failed",
    createdAt: new Date(payment.createdAt).toLocaleDateString(),
  }));

  if (isLoading) return <Loading />;
  return (
    <div>
      <h1 className="text-xl font-semibold">Payments</h1>
      <div className="w-full h-[1px] bg-accent my-6"></div>
      <div className="mb-6 md:mb-10">
        <GSTable columns={columns} rows={rows || []} />
      </div>
      {payments && <MonthlyPaymentsChart payments={payments?.data} />}
    </div>
  );
};

export default Payments;
