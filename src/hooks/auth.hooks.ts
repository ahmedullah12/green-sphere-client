import { FieldValues } from "react-hook-form";
import {
  changePassword,
  loginUser,
  passwordRecovery,
  registerUser,
  resetPassword,
} from "../services/AuthService";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

export const useUserRegistration = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_REGISTRATION"],
    mutationFn: async (userData) => await registerUser(userData),
    onSuccess: () => {
      toast.success("User Registered Successfully!!!");
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
      toast.success("User Logged in Successfully!!!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export const useChangePassword = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["CHANGE_PASSWORD"],
    mutationFn: async ({ userId, userData }) =>
      await changePassword(userId, userData),
    onSuccess: () => {
      toast.success("Password Changed Successfully!!!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export const usePasswordRecovery = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["CHANGE_PASSWORD"],
    mutationFn: async (userData) => await passwordRecovery(userData),
    onSuccess: () => {
      toast.success("Password Reset Link sent to email");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export const useResetPassword = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["CHANGE_PASSWORD"],
    mutationFn: async ({token, userData}) => await resetPassword(token, userData),
    onSuccess: () => {
      toast.success("New Password Created Successfully!!!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
