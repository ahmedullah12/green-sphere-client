"use client";

import { Button } from "@nextui-org/button";
import GSModal from "./GSModal";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useDeleteUser } from "@/src/hooks/user.hooks";
import toast from "react-hot-toast";

const DeleteUserModal = ({ userId, disabled }: { userId: string, disabled: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const { mutate: handleDeleteUser, isPending } = useDeleteUser();

  const onDelete = () => {
    handleDeleteUser(userId, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["GET_ALL_USER"],
        });
        setIsOpen(false);
        toast.success("User Deleted Successfully")
      },
    });
  };

  return (
    <>
      <button
        className="px-4 py-2 bg-red-500 dark:bg-default text-xs text-white rounded-md hover:opacity-80 disabled:bg-gray-200 disabled:dark:bg-gray-200"
        onClick={() => setIsOpen(true)}
        disabled={disabled}
      >
        Delete
      </button>
      <GSModal
        isOpen={isOpen}
        onOpenChange={(open) => setIsOpen(open)}
        title="Are you sure you want to delete this user?"
      >
        <div>
          <div className="flex justify-end">
            <Button
              size="sm"
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

export default DeleteUserModal;
