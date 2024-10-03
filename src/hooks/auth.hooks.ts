
import { FieldValues } from "react-hook-form";
import {  registerUser } from "../services/AuthService";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

export const useUserRegistration = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_REGISTRATION"],
    mutationFn: async (userData) => await registerUser(userData),
    onSuccess: () => {
      toast.success("User registered successfully!!!")
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

