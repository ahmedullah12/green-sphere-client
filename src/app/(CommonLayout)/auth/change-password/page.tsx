"use client";

import { Button } from "@nextui-org/button";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useChangePassword } from "@/src/hooks/auth.hooks";
import GSForm from "@/src/components/form/GSForm";
import GSInput from "@/src/components/form/GSInput";
import { useUser } from "@/src/context/user.provider";

const ChangePassword = () => {
  const router = useRouter();

  const { user, isLoading } = useUser();

  useEffect(() => {
    if (!user && !isLoading) {
      router.push("/login");
    }
  }, [user]);

  const {
    mutate: handleChangePassword,
    isPending,
    isSuccess,
  } = useChangePassword();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    handleChangePassword({ userId: user?._id, userData: data });
  };

  useEffect(() => {
    if (!isPending && isSuccess) {
      router.push("/profile");
    }
  }, [isPending, isSuccess]);
  return (
    <>
      <div className="flex h-[calc(100vh-200px)] w-full flex-col items-center justify-center">
        <div className="w-full md:w-[50%] lg:w-[35%] px-4 py-4 shadow-md">
          <h3 className="my-2 text-xl font-bold text-center">
            Change Password
          </h3>
          <GSForm onSubmit={onSubmit}>
            <div className="py-3">
              <GSInput
                name="oldPassword"
                label="Old Password"
                type="password"
                required={true}
              />
            </div>
            <div className="py-3">
              <GSInput
                name="newPassword"
                label="New Password"
                type="password"
                required={true}
              />
            </div>

            <Button
              className="my-3 w-full rounded-md bg-primary dark:bg-default text-white  font-semibold "
              size="lg"
              type="submit"
              isDisabled={isPending}
            >
              Change Password
            </Button>
          </GSForm>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
