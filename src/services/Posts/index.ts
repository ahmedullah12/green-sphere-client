"use server";

import envConfig from "@/src/config/envConfig";
import axiosInstance from "@/src/lib/AxiosInstance";
import { IPost } from "@/src/types";
import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";

export const getPost = async (postId: string) => {
  let fetchOptions = {};

  fetchOptions = {
    cache: "no-store",
  };

  const res = await fetch(`${envConfig.baseApi}/posts/${postId}`, fetchOptions);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};


export const createPost = async (formData: FormData) => {
  try {
    const { data } = await axiosInstance.post("/posts/create-post", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    revalidateTag("posts");

    return data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export const updatePost = async (postId: string, postData: FieldValues) => {
  try {
    const { data } = await axiosInstance.put(`/posts/${postId}`, postData);

    revalidateTag("posts");

    return data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
