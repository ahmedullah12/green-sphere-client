"use server";

import axiosInstance from "@/src/lib/AxiosInstance";

export const getNotifications = async () => {
  const res = await axiosInstance.get("/notifications");

  return res.data;
};

export const markAllNotificationsAsRead = async () => {
  const res = await axiosInstance.patch("/notifications/mark-all-read");

  return res.data;
};
