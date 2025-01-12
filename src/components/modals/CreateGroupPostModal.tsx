import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@nextui-org/button";
import GSForm from "../form/GSForm";
import GSInput from "../form/GSInput";
import GSModal from "./GSModal";
import GSSelect from "../form/GSSelect";
import GSRichTextEditor from "../form/GSRichTextEditor";
import { POST_CATEGORY } from "@/src/constants";
import { useUser } from "@/src/context/user.provider";
import { useCreateGroupPost } from "@/src/hooks/posts.hooks";

const CreateGroupPostModal = ({groupId}: {groupId: string}) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();
  const queryClient = useQueryClient();

  const { mutate: handleCreateGroupPost, isPending } = useCreateGroupPost();

  const categoryOptions = Object.entries(POST_CATEGORY).map((category) => ({
    key: category[1],
    label: category[0],
  }));

  const tagsOptions = [
    { key: "BASIC", label: "Basic" },
    { key: "PREMIUM", label: "Premium" },
  ];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    const formData = new FormData();

    const postData = {
      title: data.title,
      category: data?.categories.split(","),
      tag: data.tag,
      userId: user?._id,
      description: data.description,
    };

    formData.append("data", JSON.stringify(postData));

    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    handleCreateGroupPost({postData: formData, groupId}, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["GET_GROUP_POSTS", "GET_SINGLE_GROUP"] });
        setIsOpen(false);
      }
    });
  };

  return (
    <>
      <Button
        className="bg-primary dark:bg-gray-500 text-white w-full"
        onPress={() => setIsOpen(true)}
      >
        Create a Post
      </Button>
      <GSModal
        isOpen={isOpen}
        onOpenChange={(open) => setIsOpen(open)}
        title="Create a Post"
      >
        <GSForm onSubmit={handleSubmit}>
          <div className="py-3">
            <GSInput label="Title" name="title" size="sm" required={true} />
          </div>
          <div className="py-3">
            <GSSelect
              name="categories"
              label="Select Categories"
              selectionMode="multiple"
              options={categoryOptions}
              required={true}
            />
          </div>
          <div className="py-3">
            <GSSelect
              name="tag"
              label="Select Tag"
              selectionMode="single"
              options={tagsOptions}
              required={true}
            />
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
            <GSRichTextEditor
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

export default CreateGroupPostModal;