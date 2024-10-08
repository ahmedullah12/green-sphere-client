import { useMutation, useQuery } from "@tanstack/react-query";
import { createPostComment, deleteComments, editComments, getPostComments } from "../services/Comments";
import toast from "react-hot-toast";

export const useGetComments = (postId: string) => {
  return useQuery({
    queryKey: ["GET_COMMENTS", postId],
    queryFn: async () => await getPostComments(postId),
    enabled: !!postId,
  });
};

export const useCreateComment = () => {
  return useMutation<any, Error, {postId: string; userId: string; comment: string}>({
    mutationKey: ["CREATE_COMMENTS"],
    mutationFn: async (commentData) => await createPostComment(commentData),
  });
};
export const useEditComment = () => {
  return useMutation<any, Error, {commentId: string; payload: {comment: string}}>({
    mutationKey: ["EDIT_COMMENTS"],
    mutationFn: async ({commentId, payload}) => await editComments(commentId, payload),
  });
};
export const useDeleteComment = () => {
  return useMutation<any, Error, string>({
    mutationKey: ["DELETE_COMMENTS"],
    mutationFn: async (commentId) => await deleteComments(commentId),
  });
};
