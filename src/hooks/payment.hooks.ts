import { useMutation, useQuery } from "@tanstack/react-query";
import { IPaymentPayload } from "../types";
import { createPayment, getAllPayments } from "../services/Payment";

export const useCreatePayment = () => {
  return useMutation<any, Error, IPaymentPayload>({
    mutationKey: ["CREATE_POST"],
    mutationFn: async (payload) => await createPayment(payload),
  });
};

export const useGetAllPayments = () => {
  return useQuery({
    queryKey: ["GET_ALL_PAYMENTS"],
    queryFn: async () => await getAllPayments(),
  });
};