"use client";

import { FieldValues, SubmitHandler } from "react-hook-form";
import GSForm from "../form/GSForm";
import GSInput from "../form/GSInput";
import GSModal from "./GSModal";
import GSSelect from "../form/GSSelect";
import { POST_CATEGORY } from "@/src/constants";
import { Button } from "@nextui-org/button";
import GSRichTextEditor from "../form/GSRichTextEditor";
import { IPost } from "@/src/types";
import { useUpdatePost } from "@/src/hooks/posts.hooks";

interface IProps {
  postData: IPost;
}

const EditPostModal = ({ postData }: IProps) => {

    const {mutate: handleUpdatePost, isPending} = useUpdatePost();

  const categoryOptions = Object.entries(POST_CATEGORY).map((category) => ({
    key: category[1],
    label: category[0],
  }));

  const tagsOptions = [
    { key: "BASIC", label: "Basic" },
    { key: "PREMIUM", label: "Premium" },
  ];

  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
      
    const newData = {
        title: data.title,
        description: data.description,
        category: data.categories.split(","),
        tag: data.tag,
        userId: postData.userId._id,
    }
    
    handleUpdatePost({postData: newData, postId: postData._id})
  };
  return (
    <GSModal
      buttonText="Edit"
      title="Edit"
      buttonClassName="bg-primary dark:bg-default text-xs text-white"
    >
      <GSForm
        defaultValues={{
            title: postData.title,
            tag: postData.tag,
            description: postData.description,
          }}
        onSubmit={handleSubmit}
      >
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
            value={postData.category}
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
        >
          {
            isPending ? "Updating..." : "Update"
          }
        </Button>
      </GSForm>
    </GSModal>
  );
};

export default EditPostModal;
