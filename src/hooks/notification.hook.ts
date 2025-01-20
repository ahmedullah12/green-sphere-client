import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getNotifications,
  markAllNotificationsAsRead,
} from "../services/Notification";

export const useGetNotifications = () => {
  return useQuery({
    queryKey: ["GET_NOTIFICATION"],
    queryFn: async () => await getNotifications(),
  });
};

export const useMarkAllNotificationsAsRead = () => {
  return useMutation({
    mutationKey: ["MARK_NOTIFICATIONS_AS_READ"],
    mutationFn: async () => await markAllNotificationsAsRead(),
  });
};
