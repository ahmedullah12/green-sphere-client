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
import { Eye, EyeOff, User, ShieldCheck } from "lucide-react";
import googleIcon from "../../assets/googleIcon.png";
import Image from "next/image";

const Login = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [defaultValues, setDefaultValues] = useState({
    email: "",
    password: ""
  });

  const { setIsLoading } = useUser();

  const redirect = searchParams.get("redirect");

  const { mutate: handleLoginUser, isPending, data } = useUserLogin();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    handleLoginUser(data);
    setIsLoading(true);
  };

  const handleGoogleLogin = () => {
    window.location.href = `https://green-sphere-server.onrender.com/api/auth/google/login`;
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const setDemoCredentials = (type: 'user' | 'admin') => {
    if (type === 'user') {
      setDefaultValues({
        email: "rhyme@gmail.com",
        password: "ahmedullah"
      });
    } else {
      setDefaultValues({
        email: "admin@gmail.com",
        password: "admin"
      });
    }
  };

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
      <div className="flex min-h-screen  w-full flex-col items-center justify-center mt-4">
        <div className="w-full md:w-[50%] lg:w-[35%] px-6 py-8 shadow-md rounded-xl bg-background">
          <h3 className="mb-6 text-2xl font-bold text-center text-primary">
            Welcome to GreenSphere
          </h3>
          
          {/* Demo Credentials Section */}
          <div className="mb-6">
            <p className="text-center text-sm text-gray-600 mb-3">Try our demo accounts</p>
            <div className="flex gap-3 justify-center">
              <Button
                className="flex items-center gap-2"
                color="primary"
                variant="flat"
                onPress={() => setDemoCredentials('user')}
              >
                <User size={18} />
                 User
              </Button>
              <Button
                className="flex items-center gap-2"
                color="secondary"
                variant="flat"
                onPress={() => setDemoCredentials('admin')}
              >
                <ShieldCheck size={18} />
                 Admin
              </Button>
            </div>
          </div>

          <GSForm onSubmit={onSubmit} defaultValues={defaultValues}>
            <div className="space-y-4">
              <GSInput
                name="email"
                label="Email"
                type="email"
                required={true}
              />
              <div className="relative">
                <GSInput
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  required={true}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <div className="flex justify-end">
                <Link
                  className="text-xs text-primary hover:underline"
                  href={"/auth/password-recovery"}
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            <Button
              className="my-4 w-full rounded-md bg-primary text-white font-semibold hover:bg-primary/90"
              size="lg"
              type="submit"
              isDisabled={isPending}
            >
              Login
            </Button>
          </GSForm>

          <div className="relative flex my-6 items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-500">Or continue with</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <Button
            className="w-full group hover:bg-gray-100 transition-all duration-300"
            variant="bordered"
            onClick={handleGoogleLogin}
          >
            <span>Sign in with Google</span>
            <Image src={googleIcon} className="w-6 group-hover:scale-110 transition-transform" alt="" />
          </Button>

          <div className="text-center mt-6 text-gray-600">
            Don&lsquo;t have an account?{" "}
            <Link className="font-semibold text-primary hover:underline" href={"/register"}>
              Register here
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;