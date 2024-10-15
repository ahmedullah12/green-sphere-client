"use server";

import axiosInstance from "@/src/lib/AxiosInstance";
import { IUser } from "@/src/types";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const registerUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/register", userData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (data.success) {
      cookies().set("accessToken", data?.data?.accessToken);
      cookies().set("refreshToken", data?.data?.refreshToken);
    }

    return data;
  } catch (err: any) {
    throw new Error(err);
  }
};

export const loginUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/login", userData);

    if (data.success) {
      cookies().set("accessToken", data?.data?.accessToken);
      cookies().set("refreshToken", data?.data?.refreshToken);
    }

    return data;
  } catch (err: any) {
    // throw new Error(err);
    return err.response?.data;
  }
};

export const getNewAccessToken = async () => {
  try {
    const refreshToken = cookies().get("refreshToken")?.value;
    const res = await axiosInstance({
      url: "/auth/refreshToken",
      method: "POST",
      withCredentials: true,
      headers: {
        cookies: `refreshToken=${refreshToken}`,
      },
    });

    return res.data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export const changePassword = async (userId: string, userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.put(
      `/auth/change-password/${userId}`,
      userData
    );

    return data;
  } catch (err: any) {
    throw new Error(err);
  }
};

export const passwordRecovery = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post(
      `/auth/forget-password`,
      userData
    );

    return data;
  } catch (err: any) {
    throw new Error(err);
  }
};

export const resetPassword = async (token: string, userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post(
      `/auth/forget-password`,
      userData,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    return data;
  } catch (err: any) {
    throw new Error(err);
  }
};

export const logout = () => {
  cookies().delete("accessToken");
  cookies().delete("refreshToken");
};

export const getCurrentUser = async () => {
  const accessToken = cookies().get("accessToken")?.value;

  let decodedToken = null;

  if (accessToken) {
    decodedToken = await jwtDecode(accessToken);

    const res = await axiosInstance.get(`/user/${decodedToken._id}`);

    const userData: IUser = await res.data.data;

    return userData;
  }

  return decodedToken;
};
