"use client";

import { Button } from "@nextui-org/button";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { usePasswordRecovery } from "@/src/hooks/auth.hooks";
import GSForm from "@/src/components/form/GSForm";
import GSInput from "@/src/components/form/GSInput";
import { useUser } from "@/src/context/user.provider";
import Loading from "@/src/components/UI/Loading";

const PasswordRecovery = () => {
  const { user, isLoading } = useUser();

  const { mutate: handlePasswordRecovery, isPending } = usePasswordRecovery();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    handlePasswordRecovery(data);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex h-[calc(100vh-200px)] w-full flex-col items-center justify-center">
        <div className="w-full md:w-[50%] lg:w-[35%] px-4 py-4 shadow-md">
          <h3 className="my-2 text-xl font-bold text-center">
            Forget Password
          </h3>
          <GSForm defaultValues={{ email: user?.email }} onSubmit={onSubmit}>
            <div className="py-3">
              <GSInput
                name="email"
                label="Your Email"
                type="text"
                required={true}
              />
            </div>

            <Button
              className="my-3 w-full rounded-md bg-primary dark:bg-default text-white  font-semibold "
              size="lg"
              type="submit"
              isDisabled={isPending}
            >
              Submit
            </Button>
          </GSForm>
        </div>
      </div>
    </>
  );
};

export default PasswordRecovery;
