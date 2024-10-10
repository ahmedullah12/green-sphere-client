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
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

interface IProps {
  postData: IPost;
}

const EditPostModal = ({ postData }: IProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const { mutate: handleUpdatePost, isPending } = useUpdatePost();

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
      category: data.categories,
      tag: data.tag,
      userId: postData.userId._id,
    };


    handleUpdatePost(
      { postData: newData, postId: postData._id },
      {
        onSuccess: () => {
          // On success, invalidate and refetch to ensure data consistency
          queryClient.invalidateQueries({
            queryKey: ["newsFeed"],
          });
          queryClient.invalidateQueries({
            queryKey: ["GET_MY_POSTS"],
          });
          setIsOpen(false);
        },
        onError: () => {
          // If there's an error, rollback the optimistic update
          queryClient.invalidateQueries({
            queryKey: ["newsFeed", "GET_MY_POSTS"],
          });
        },
      }
    );
  };

  return (
    <>
      <button
        className="px-4 py-2 bg-primary dark:bg-default text-xs text-white rounded-md me-2 hover:opacity-80"
        onClick={() => setIsOpen(true)}
      >
        Edit
      </button>
      <GSModal
        isOpen={isOpen}
        onOpenChange={(open) => setIsOpen(open)}
        title="Edit Post"
      >
        <GSForm
          defaultValues={{
            title: postData.title,
            tag: postData.tag,
            description: postData.description,
            categories: postData.category,
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
            {isPending ? "Updating..." : "Update"}
          </Button>
        </GSForm>
      </GSModal>
    </>
  );
};

export default EditPostModal;
