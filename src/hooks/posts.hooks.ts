import { useMutation } from "@tanstack/react-query";
import { createPost, updatePost } from "../services/Posts";
import toast from "react-hot-toast";
import { FieldValues } from "react-hook-form";

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

export const useUpdatePost = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["CREATE_POST"],
    mutationFn: async ({postData, postId}) => await updatePost(postId, postData),
    onSuccess: () => {
      toast.success("Post Updated Successfully!!!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
