import { useQuery } from "@tanstack/react-query";
import { getNotifications } from "../services/Notification";

export const useGetNotifications = () => {
  return useQuery({
    queryKey: ["GET_NOTIFICATION"],
    queryFn: async () => await getNotifications(),
  });
};
