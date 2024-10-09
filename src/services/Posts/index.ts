"use server";

import envConfig from "@/src/config/envConfig";
import axiosInstance from "@/src/lib/AxiosInstance";
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
export const deletePost = async (postId: string) => {
  try {
    const { data } = await axiosInstance.delete(`/posts/${postId}`);

    revalidateTag("posts");

    return data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export const getSinglePost = async (postId: string) => {
  try {
    const { data } = await axiosInstance.get(`/posts/${postId}`);

    return data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export const getPosts = async (params: any) => {
  const res = await axiosInstance.get("/posts", {
    params,
  });
  return res.data.data;
};

export const upvotePost = async (postId: string, userId: string) => {
  try {
    const { data } = await axiosInstance.put(
      `/posts/action/upvote-post?postId=${postId}&userId=${userId}`
    );

    return data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
export const downvotePost = async (postId: string, userId: string) => {
  try {
    const { data } = await axiosInstance.put(
      `/posts/action/downvote-post?postId=${postId}&userId=${userId}`
    );

    return data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export const getLatestPosts = async () => {
  const fetchOptions = {
    next: {
      tags: ["posts"],
    },
  };
  const res = await fetch(
    `${envConfig.baseApi}/posts?sortBy=-createdAt`,
    fetchOptions
  );

  return res.json();
};


export const getMyPosts = async (userId: string) => {
  const fetchOptions = {
    next: {
      tags: ["posts"],
    },
  };
  const res = await fetch(
    `${envConfig.baseApi}/posts/my-posts/${userId}`,
    fetchOptions
  );

  return res.json();
};