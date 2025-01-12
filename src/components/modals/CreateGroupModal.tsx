import { useCreateGroup } from "@/src/hooks/group.hooks";
import { Button } from "@nextui-org/button";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import GSForm from "../form/GSForm";
import GSInput from "../form/GSInput";
import GSTextarea from "../form/GSTextarea";
import GSModal from "./GSModal";

const CreateGroupModal = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: handleCreateGroup, isPending } = useCreateGroup();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    if (!selectedImage) return toast.error("Please upload an image");

    const formData = new FormData();

    formData.append("data", JSON.stringify(data));
    formData.append("avatar", selectedImage);

    handleCreateGroup(formData, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["GET_GROUPS"] });
        setIsOpen(false);
      },
    });
  };

  return (
    <>
      <Button
        className="bg-primary dark:bg-gray-500 text-white w-full"
        onPress={() => setIsOpen(true)}
      >
        Create a Group
      </Button>
      <GSModal
        isOpen={isOpen}
        onOpenChange={(open) => setIsOpen(open)}
        title="Create a Group"
      >
        <GSForm onSubmit={handleSubmit}>
          <div className="py-3">
            <GSInput label="Name" name="name" size="sm" required={true} />
          </div>

          <div className="min-w-fit flex-1">
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

          <div className="py-3">
            <GSTextarea
              name="description"
              label="Add Description"
              required={true}
            />
          </div>

          <Button
            className="my-3 w-full bg-primary dark:bg-default text-white rounded-md"
            size="lg"
            type="submit"
            isDisabled={isPending}
          >
            {isPending ? "Creating..." : "Create"}
          </Button>
        </GSForm>
      </GSModal>
    </>
  );
};

export default CreateGroupModal;
