"use server";

import axiosInstance from "@/src/lib/AxiosInstance";

export const getUserData = async (postId: string) => {
  try {
    const { data } = await axiosInstance.get(`/user/${postId}`);

    return data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export const updateUser = async (formData: FormData, userId: string) => {
  try {
    const { data } = await axiosInstance.put(
      `/user/update-profile/${userId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export const followUser = async (payload: {
  userId: string;
  followedUserId: string;
}) => {
  try {
    const { data } = await axiosInstance.put(`/user/follow-user`, payload);

    return data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
export const unfollowUser = async (payload: {
  userId: string;
  followedUserId: string;
}) => {
  try {
    const { data } = await axiosInstance.put(`/user/unfollow-user`, payload);

    return data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
