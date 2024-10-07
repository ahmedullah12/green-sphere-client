"use client";

import { useEffect, useState } from "react";
import GSForm from "@/src/components/form/GSForm";
import GSInput from "@/src/components/form/GSInput";
import { useUserRegistration } from "@/src/hooks/auth.hooks";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const {
    mutate: handleUserRegistration,
    isPending,
    isSuccess,
  } = useUserRegistration();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const router = useRouter();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if(!selectedImage){
      return toast.error("Please upload a picture")
    }


    const formData = new FormData();
    const userData = {
      ...data,
      role: "USER",
    };

    formData.append("data", JSON.stringify(userData));

    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    handleUserRegistration(formData);
  };

  useEffect(() => {
    if (!isPending && isSuccess) {
      router.push("/");
    }
  }, [isPending, isSuccess]);

  return (
    <div className="flex h-[calc(100vh-100px)] flex-col items-center justify-center ">
      <div className="w-full md:w-[50%] lg:w-[35%] px-4 py-4 shadow-md">
      <h3 className="my-2 text-xl font-bold text-center">Register with GreenSphere</h3>
        <GSForm onSubmit={onSubmit}>
          <div className="py-3">
            <GSInput label="Name" name="name" size="sm" required={true}/>
          </div>
          <div className="py-3">
            <GSInput label="Email" name="email" size="sm" required={true}/>
          </div>
          <div className="min-w-fit flex-1">
            <label
              className="flex h-12 w-full ps-3 cursor-pointer items-center justify-start rounded-lg border-2 border-default-200 text-sm text-default-500 shadow-sm transition-all duration-100 hover:border-default-400"
              htmlFor="image"
            >
              {selectedImage ? selectedImage.name : "Profile Image"}
            </label>
            <input
              className="hidden"
              id="image"
              type="file"
              onChange={handleImageChange}
              accept="image/*"
            />
          </div>
          <div className="py-3">
            <GSInput
              label="Password"
              name="password"
              size="sm"
              type="password"
              required={true}
            />
          </div>

          <Button
            className="my-3 w-full bg-primary dark:bg-default text-white rounded-md"
            size="lg"
            type="submit"
            isDisabled={isPending}
          >
            {isPending ? "Registering" : "Register"}
          </Button>
        </GSForm>
        <div className="text-center">
          Already have an account ? <Link className="hover:underline" href={"/login"}>Login</Link>
        </div>
      </div>
    </div>
  );
}
