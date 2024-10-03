"use client";


import { Button } from "@nextui-org/button";
import Link from "next/link";
import { FieldValues, SubmitHandler } from "react-hook-form";
import Loading from "@/src/components/UI/Loading";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useUserLogin } from "@/src/hooks/auth.hooks";
import GSForm from "@/src/components/form/GSForm";
import GSInput from "@/src/components/form/GSInput";

const Login = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const redirect = searchParams.get("redirect");

  const { mutate: handleLoginUser, isPending, isSuccess } = useUserLogin();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    handleLoginUser(data);
  };

  useEffect(() => {
    if (!isPending && isSuccess) {
      if (redirect) {
        router.push(redirect);
      } else {
        router.push("/");
      }
    }
  }, [isPending, isSuccess]);
  return (
    <>
      <div className="flex h-[calc(100vh-200px)] w-full flex-col items-center justify-center">
        <div className="w-full md:w-[50%] lg:w-[35%] px-4 py-4 shadow-md">
        <h3 className="my-2 text-xl font-bold text-center">Login with GreenSphere</h3>
          <GSForm
            onSubmit={onSubmit}
          >
            <div className="py-3">
              <GSInput name="email" label="Email" type="email" />
            </div>
            <div className="py-3">
              <GSInput name="password" label="Password" type="password" />
            </div>

            <Button
              className="my-3 w-full rounded-md bg-primary dark:bg-default text-white  font-semibold "
              size="lg"
              type="submit"
              isDisabled={isPending}
            >
             Login
            </Button>
          </GSForm>
          <div className="text-center">
            Don&lsquo;t have account ? <Link className="hover:underline" href={"/register"}>Register</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
