import { FieldValues } from "react-hook-form";
import {
  changePassword,
  getCurrentUser,
  loginUser,
  passwordRecovery,
  registerUser,
  resetPassword,
} from "../services/AuthService";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useUserRegistration = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_REGISTRATION"],
    mutationFn: async (userData) => await registerUser(userData),
  });
};

export const useUserLogin = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_LOGIN"],
    mutationFn: async (userData) => await loginUser(userData),
  });
};

export const useChangePassword = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["CHANGE_PASSWORD"],
    mutationFn: async ({ userId, userData }) =>
      await changePassword(userId, userData),
  });
};

export const usePasswordRecovery = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["CHANGE_PASSWORD"],
    mutationFn: async (userData) => await passwordRecovery(userData),
  });
};
export const useResetPassword = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["CHANGE_PASSWORD"],
    mutationFn: async ({ token, userData }) =>
      await resetPassword(token, userData),
  });
};

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: ["GET_CURRENT_USER"],
    queryFn: async () => await getCurrentUser(),
    enabled: true,
  });
};
