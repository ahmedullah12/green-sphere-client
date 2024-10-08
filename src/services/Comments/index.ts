"use server";

import axiosInstance from "@/src/lib/AxiosInstance";

export const getPostComments = async (postId: string) => {
  try {
    const { data } = await axiosInstance.get(`/comments/${postId}`);

    return data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export const createPostComment = async (postData: {
  postId: string;
  userId: string;
  comment: string;
}) => {
  try {
    const { data } = await axiosInstance.post("/comments", postData);

    return data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export const editComments = async (
  commentId: string,
  payload: { comment: string }
) => {
  try {
    const { data } = await axiosInstance.put(`/comments/${commentId}`, payload);

    return data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
export const deleteComments = async (
  commentId: string
) => {
  try {
    const { data } = await axiosInstance.delete(`/comments/${commentId}`);

    return data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
