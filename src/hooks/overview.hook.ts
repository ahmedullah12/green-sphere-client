import { useQuery } from "@tanstack/react-query";
import { getAdminOverviewData } from "../services/Overview";

export const useGetAdminOverviewData = () => {
  return useQuery({
    queryKey: ["GET_OVERVIEW_DATA"],
    queryFn: async () => await getAdminOverviewData(),
  });
};
