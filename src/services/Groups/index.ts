"use server";

import envConfig from "@/src/config/envConfig";
import axiosInstance from "@/src/lib/AxiosInstance";
import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";

export const createGroup = async (formData: FormData) => {
  try {
    const { data } = await axiosInstance.post("/groups", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    revalidateTag("groups");

    return data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export const updateGroup = async (groupId: string, groupData: FieldValues) => {
  try {
    const { data } = await axiosInstance.put(`/groups/${groupId}`, groupData);

    revalidateTag("groups");

    return data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
export const deleteGroup = async (groupId: string) => {
  try {
    const { data } = await axiosInstance.delete(`/groups/${groupId}`);

    revalidateTag("groups");

    return data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export const getSinglePost = async (groupId: string) => {
  try {
    const { data } = await axiosInstance.get(`/groups/${groupId}`);

    return data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export const getGroups = async () => {
  const res = await axiosInstance.get("/groups");
  return res.data.data;
};

export const getMyGroups = async () => {
  const fetchOptions = {
    next: {
      tags: ["groups"],
    },
  };
  const res = await fetch(
    `${envConfig.baseApi}/groups/my-groups`,
    fetchOptions
  );

  return res.json();
};

export const joinGroup = async (groupId: string) => {
  const res = await axiosInstance.post(`/groups/${groupId}/join`);

  return res.data.data;
};

export const leaveGroup = async (groupId: string) => {
  const res = await axiosInstance.post(`/groups/${groupId}/leave`);

  return res.data.data;
};
