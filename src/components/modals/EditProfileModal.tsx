/* eslint-disable jsx-a11y/label-has-associated-control */
"use client";

import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import GSForm from "../form/GSForm";
import GSInput from "../form/GSInput";
import GSModal from "./GSModal";
import { Button } from "@nextui-org/button";
import { useUpdateUser } from "@/src/hooks/user.hooks";
import { useUser } from "@/src/context/user.provider";

const EditProfileModal = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  
  const { user } = useUser();

  const { mutate: handleUpdateUser, isPending } = useUpdateUser();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    const formData = new FormData();

    formData.append("data", JSON.stringify(data));

    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    handleUpdateUser(
      { userData: formData, userId: user?._id as string },
      {
        onSuccess: () => {
          setIsOpen(false);
        },
      }
    );
  };

  return (
    <>
      <Button
        className="bg-primary dark:bg-default text-xs text-white w-full"
        onPress={() => setIsOpen(true)}
      >
        Edit Profile
      </Button>
      <GSModal
        isOpen={isOpen}
        onOpenChange={(open) => setIsOpen(open)}
        title="Edit Profile"
      >
        <GSForm
          defaultValues={{
            name: user?.name,
          }}
          onSubmit={handleSubmit}
        >
          <div className="py-3">
            <GSInput label="Name" name="name" size="sm" required={true} />
          </div>

          <div className="min-w-fit flex-1">
            <label className="text-xs font-medium mb-1">Change Image</label>
            <label
              className="flex h-12 w-full ps-3 cursor-pointer items-center justify-start rounded-lg border-2 border-default-200 text-sm text-default-500 shadow-sm transition-all duration-100 hover:border-default-400"
              htmlFor="image"
            >
              {selectedImage ? selectedImage.name : "Upload Image"}
            </label>
            <input
              className="hidden"
              id="image"
              type="file"
              onChange={handleImageChange}
              accept="image/*"
            />
          </div>

          <Button
            className="my-3 w-full bg-primary dark:bg-default text-white rounded-md"
            size="lg"
            type="submit"
          >
            {isPending ? "Updating..." : "Update"}
          </Button>
        </GSForm>
      </GSModal>
    </>
  );
};

export default EditProfileModal;