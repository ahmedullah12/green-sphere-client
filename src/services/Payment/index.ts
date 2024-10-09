"use server";

import axiosInstance from "@/src/lib/AxiosInstance";
import { IPaymentPayload } from "@/src/types";


export const createPayment = async (payload: IPaymentPayload) => {
  try {
    const { data } = await axiosInstance.post(
      `/payment-collection/create-payment`,
      payload,
    );

    return data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};


