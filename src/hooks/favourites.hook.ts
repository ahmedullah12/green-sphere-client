import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addFavourite,
  getFavourites,
  removeFavourite,
} from "../services/Favourites";
import toast from "react-hot-toast";

export const useGetFavourites = (userId: string) => {
  return useQuery({
    queryKey: ["GET_FAVOURITES", userId],
    queryFn: async () => await getFavourites(userId),
    enabled: !!userId,
  });
};

export const useAddFavourite = () => {
  return useMutation<any, Error, { postId: string; userId: string }>({
    mutationKey: ["ADD_FAVOURITE"],
    mutationFn: async (payload) => await addFavourite(payload),
    onSuccess: () => {
      toast.success("Post Added to Favourites Successfully!!!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useRemoveFavourite = () => {
  return useMutation<any, Error, string>({
    mutationKey: ["REMOVE_FAVOURITE"],
    mutationFn: async (favouriteId) => await removeFavourite(favouriteId),
    onSuccess: () => {
      toast.success("Post Removed from Favourites Successfully!!!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
