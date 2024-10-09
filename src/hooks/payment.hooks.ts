import { useMutation } from "@tanstack/react-query";
import { IPaymentPayload } from "../types";
import { createPayment } from "../services/Payment";
import toast from "react-hot-toast";

export const useCreatePayment = () => {
  return useMutation<any, Error, IPaymentPayload>({
    mutationKey: ["CREATE_POST"],
    mutationFn: async (payload) => await createPayment(payload),
  });
};
