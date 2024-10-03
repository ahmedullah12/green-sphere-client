
import { FieldValues } from "react-hook-form";
import {  loginUser, registerUser } from "../services/AuthService";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

export const useUserRegistration = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_REGISTRATION"],
    mutationFn: async (userData) => await registerUser(userData),
    onSuccess: () => {
      toast.success("User Registered Successfully!!!")
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUserLogin = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_LOGIN"],
    mutationFn: async (userData) => await loginUser(userData),
    onSuccess: () => {
      toast.success("User Logged in Successfully!!!")
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};