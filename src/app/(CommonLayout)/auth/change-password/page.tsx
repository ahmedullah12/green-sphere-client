"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@nextui-org/button";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useChangePassword } from "@/src/hooks/auth.hooks";
import GSForm from "@/src/components/form/GSForm";
import GSInput from "@/src/components/form/GSInput";
import { useUser } from "@/src/context/user.provider";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

const ChangePassword = () => {
  const router = useRouter();
  const { user, isLoading } = useUser();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  useEffect(() => {
    if (!user && !isLoading) {
      router.push("/login");
    }
  }, [user, isLoading]);

  const { mutate: handleChangePassword, isPending, data } = useChangePassword();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    handleChangePassword({ userId: user?._id, userData: data });
  };

  useEffect(() => {
    if (!isPending && data) {
      if (data?.success) {
        toast.success(data?.message);
        router.push("/profile");
      } else {
        toast.error(data?.message);
      }
    }
  }, [isPending, data]);

  const toggleOldPasswordVisibility = () =>
    setShowOldPassword(!showOldPassword);
  const toggleNewPasswordVisibility = () =>
    setShowNewPassword(!showNewPassword);

  return (
    <div className="flex h-[calc(100vh-200px)] w-full flex-col items-center justify-center">
      <div className="w-full md:w-[50%] lg:w-[35%] px-4 py-4 shadow-md">
        <h3 className="my-2 text-xl font-bold text-center">Change Password</h3>
        <GSForm onSubmit={onSubmit}>
          <div className="py-3 relative">
            <GSInput
              name="oldPassword"
              label="Old Password"
              type={showOldPassword ? "text" : "password"}
              required={true}
            />
            <button
              type="button"
              onClick={toggleOldPasswordVisibility}
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
            >
              {showOldPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <div className="py-3 relative">
            <GSInput
              name="newPassword"
              label="New Password"
              type={showNewPassword ? "text" : "password"}
              required={true}
            />
            <button
              type="button"
              onClick={toggleNewPasswordVisibility}
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
            >
              {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <Button
            className="my-3 w-full rounded-md bg-primary dark:bg-default text-white font-semibold"
            size="lg"
            type="submit"
            isDisabled={isPending}
          >
            Change Password
          </Button>
        </GSForm>
      </div>
    </div>
  );
};

export default ChangePassword;
