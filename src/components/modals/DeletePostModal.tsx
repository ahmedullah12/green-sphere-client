"use client";

import { Button } from "@nextui-org/button";
import GSModal from "./GSModal";
import { useDeletePost } from "@/src/hooks/posts.hooks";


const DeletePostModal = ({postId}: {postId: string}) => {
  const {mutate: handleDeletePost, isPending} = useDeletePost();

  return (
    <GSModal
      buttonText="Delete"
      title="Are you sure you want to delete this?"
      buttonClassName="bg-red-500 dark:bg-default text-xs text-white"
    >
      <div>
        <div className="flex justify-end">
            <Button onClick={() => handleDeletePost(postId)} className="bg-red-500 dark:bg-default text-white">
              {
                isPending ? "Deleting..." : "Delete"
              }
            </Button>
        </div>
      </div>
    </GSModal>
  );
};

export default DeletePostModal;
