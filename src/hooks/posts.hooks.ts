import { useMutation } from "@tanstack/react-query";
import { createPost } from "../services/Posts";
import toast from "react-hot-toast";

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
