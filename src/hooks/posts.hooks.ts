import { useMutation, useQuery, } from "@tanstack/react-query";
import {
  createPost,
  deletePost,
  downvotePost,
  getPosts,
  getSinglePost,
  updatePost,
  upvotePost,
} from "../services/Posts";
import toast from "react-hot-toast";
import { FieldValues } from "react-hook-form";

export const useGetPosts = (params: any) => {
  return useQuery({
    queryKey: ["GET_POSTS", params],
    queryFn: async() => await getPosts(params)
  })
}


export const useCreatePost = () => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["CREATE_POST"],
    mutationFn: async (postData) => await createPost(postData),
    onSuccess: () => {
      toast.success("Post Created Successfully!!!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useGetSinglePost = (postId: string) => {
  return useQuery({
    queryKey: ["GET_SINGLE_POST"],
    queryFn: async () => await getSinglePost(postId),
  });
};

export const useUpdatePost = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["UPDATE_POST"],
    mutationFn: async ({ postData, postId }) =>
      await updatePost(postId, postData),
    onSuccess: () => {
      toast.success("Post Updated Successfully!!!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export const useDeletePost = () => {
  return useMutation<any, Error, string>({
    mutationKey: ["DELETE_POST"],
    mutationFn: async (postId) => await deletePost(postId),
    onSuccess: () => {
      toast.success("Post Deleted Successfully!!!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export const useUpvotePost = () => { 

  return useMutation<any, Error, any>({
    mutationKey: ["UPVOTE_POST"],
    mutationFn: async ({ postId, userId }) => await upvotePost(postId, userId),
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export const useDownvotePost = () => {  

  return useMutation<any, Error, any>({
    mutationKey: ["DOWNVOTE_POST"],
    mutationFn: async ({ postId, userId }) => await downvotePost(postId, userId),
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

