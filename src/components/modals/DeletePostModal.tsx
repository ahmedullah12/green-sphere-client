"use client";

import { Button } from "@nextui-org/button";
import GSModal from "./GSModal";
import { useDeletePost } from "@/src/hooks/posts.hooks";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

const DeletePostModal = ({ postId }: { postId: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const { mutate: handleDeletePost, isPending } = useDeletePost();

  const onDelete = () => {
    handleDeletePost(postId, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["newsFeed", "GET_MY_POSTS"] });
        setIsOpen(false);
      },
    });
  };

  return (
    <>
      <Button
        className="bg-red-500 dark:bg-default text-xs text-white"
        onPress={() => setIsOpen(true)}
      >
        Delete
      </Button>
      <GSModal
        isOpen={isOpen}
        onOpenChange={(open) => setIsOpen(open)}
        title="Are you sure you want to delete this?"
      >
        <div>
          <div className="flex justify-end">
            <Button
              onClick={onDelete}
              className="bg-red-500 dark:bg-default text-white"
            >
              {isPending ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>
      </GSModal>
    </>
  );
};

export default DeletePostModal;
