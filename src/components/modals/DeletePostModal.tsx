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
        queryClient.invalidateQueries({
          queryKey: ["newsFeed"],
        });
        queryClient.invalidateQueries({
          queryKey: ["GET_MY_POSTS"],
        });
        queryClient.invalidateQueries({
          queryKey: ["GET_POSTS"],
        });
        setIsOpen(false);
      },
    });
  };

  return (
    <>
      <button
        className="px-4 py-2 bg-red-500 dark:bg-default text-xs text-white rounded-md hover:opacity-80"
        onClick={() => setIsOpen(true)}
      >
        Delete
      </button>
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
