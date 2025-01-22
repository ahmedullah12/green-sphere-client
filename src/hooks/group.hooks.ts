import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createGroup,
  updateGroup,
  deleteGroup,
  getSinglePost,
  getGroups,
  getMyGroups,
  joinGroup,
  leaveGroup,
} from "../services/Groups";
import toast from "react-hot-toast";
import { FieldValues } from "react-hook-form";

export const useGetGroups = () => {
  return useQuery({
    queryKey: ["GET_GROUPS"],
    queryFn: async () => await getGroups(),
  });
};

export const useCreateGroup = () => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["CREATE_GROUP"],
    mutationFn: async (formData) => await createGroup(formData),
    onSuccess: () => {
      toast.success("Group Created Successfully!!!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useGetSingleGroup = (groupId: string) => {
  return useQuery({
    queryKey: ["GET_SINGLE_GROUP", groupId],
    queryFn: async () => await getSinglePost(groupId),
    enabled: !!groupId,
  });
};

export const useUpdateGroup = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["UPDATE_GROUP"],
    mutationFn: async ({ groupData, groupId }) =>
      await updateGroup(groupId, groupData),
    onSuccess: () => {
      toast.success("Group Updated Successfully!!!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useDeleteGroup = () => {
  return useMutation<any, Error, string>({
    mutationKey: ["DELETE_GROUP"],
    mutationFn: async (groupId) => await deleteGroup(groupId),
    onSuccess: () => {
      toast.success("Group Deleted Successfully!!!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useGetMyGroups = (id: string) => {
  return useQuery({
    queryKey: ["GET_MY_GROUPS", id],
    queryFn: async () => await getMyGroups(id),
  });
};

export const useJoinGroup = () => {
  return useMutation<any, Error, string>({
    mutationKey: ["JOIN_GROUP"],
    mutationFn: async (groupId) => await joinGroup(groupId),
    onSuccess: () => {
      toast.success("Joined Group Successfully!!!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useLeaveGroup = () => {
  return useMutation<any, Error, string>({
    mutationKey: ["LEAVE_GROUP"],
    mutationFn: async (groupId) => await leaveGroup(groupId),
    onSuccess: () => {
      toast.success("Left Group Successfully!!!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
