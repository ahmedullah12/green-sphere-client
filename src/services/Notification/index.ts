"use server";

import axiosInstance from "@/src/lib/AxiosInstance";

export const getNotifications = async () => {
  const res = await axiosInstance.get("/notifications");

  return res.data;
};
