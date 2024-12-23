"use client";

import { Button } from "@nextui-org/button";
import Link from "next/link";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useUserLogin } from "@/src/hooks/auth.hooks";
import GSForm from "@/src/components/form/GSForm";
import GSInput from "@/src/components/form/GSInput";
import { useUser } from "@/src/context/user.provider";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import googleIcon from "../../../assets/googleIcon.png";
import Image from "next/image";

const Login = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const { setIsLoading } = useUser();

  const redirect = searchParams.get("redirect");

  const { mutate: handleLoginUser, isPending, data } = useUserLogin();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    handleLoginUser(data);
    setIsLoading(true);
  };

  const handleGoogleLogin = () => {
    window.location.href = `https://assignment-6-server-six.vercel.app/api/auth/google/login`;
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  useEffect(() => {
    if (!isPending && data) {
      if (data.success) {
        if (redirect) {
          toast.success(data.message);
          router.push(redirect);
        } else {
          toast.success(data.message);
          router.push("/");
        }
        setIsLoading(false);
      } else {
        toast.error(data.message);
        setIsLoading(false);
      }
    }
  }, [isPending, data]);
  return (
    <>
      <div className="flex h-[calc(100vh-200px)] w-full flex-col items-center justify-center mt-4">
        <div className="w-full md:w-[50%] lg:w-[35%] px-4 py-4 shadow-md">
          <h3 className="my-2 text-xl font-bold text-center">
            Login with GreenSphere
          </h3>
          <GSForm onSubmit={onSubmit}>
            <div className="py-3">
              <GSInput
                name="email"
                label="Email"
                type="email"
                required={true}
              />
            </div>
            <div className="py-3">
              <div className="py-3 relative">
                <GSInput
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  required={true}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <Link
                className="text-xs hover:underline"
                href={"/auth/password-recovery"}
              >
                Forgot Password?
              </Link>
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

          <div className="relative flex my-3 items-center">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="flex-shrink mx-4 text-gray-400">Or</span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>

          <div className="mt-4">
            <Button
              className="w-full"
              variant="ghost"
              color="primary"
              onClick={handleGoogleLogin}
            >
              <span>Sign in with Google</span>
              <Image src={googleIcon} className="w-6" alt="" />
            </Button>
          </div>

          <div className="text-center mt-4 font-medium">
            Don&lsquo;t have account?{" "}
            <Link className="hover:underline text-primary" href={"/register"}>
              Register.
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
