"use server";

import axiosInstance from "@/src/lib/AxiosInstance";

export const getFavourites = async (userId: string) => {
  try {
    const { data } = await axiosInstance.get(`/favourite/${userId}`);

    return data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export const addFavourite = async (payload: {
  postId: string;
  userId: string;
}) => {
  try {
    const { data } = await axiosInstance.post("/favourite", payload);

    return data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export const removeFavourite = async (
    favouriteId: string
  ) => {
    try {
      const { data } = await axiosInstance.delete(`/favourite/${favouriteId}`);
  
      return data;
    } catch (err: any) {
      throw new Error(err.message);
    }
  };