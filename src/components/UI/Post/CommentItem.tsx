"use client";

import { useDeleteComment, useEditComment } from "@/src/hooks/comments.hook";
import { IComment, IUser } from "@/src/types";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useState } from "react";
import toast from "react-hot-toast";
import { BiEdit, BiTrash } from "react-icons/bi";

export const CommentItem = ({
  comment,
  refetchComments,
  user,
}: {
  comment: IComment;
  refetchComments: any;
  user: IUser;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.comment);

  const {mutate: handleEditComment} = useEditComment();
  const {mutate: handleDeleteComment} = useDeleteComment()

  const handleEdit = () => {
    handleEditComment(
      { commentId: comment._id, payload: {comment: editedComment} },
      {
        onSuccess: () => {
          setIsEditing(false);
          refetchComments();
          toast.success("Comment updated successfully");
        },
        onError: () => {
          toast.error("Failed to update comment");
        },
      }
    );
  };

  const handleDelete = () => {
    handleDeleteComment(
      comment._id,
      {
        onSuccess: () => {
          refetchComments();
          toast.success("Comment deleted successfully");
        },
        onError: () => {
          toast.error("Failed to delete comment");
        },
      }
    );
  };

  return (
    <div className="flex flex-col items-start space-y-2 mb-4">
      <div className="flex items-start space-x-3 w-full">
        <Avatar src={comment.userId.profilePhoto} size="sm" />
        <div className="flex-1">
          <p className="font-semibold text-sm">{comment.userId.name}</p>
          {isEditing ? (
            <div className="flex items-center space-x-2">
              <Input
                value={editedComment}
                onChange={(e) => setEditedComment(e.target.value)}
                size="sm"
                className="flex-grow"
              />
              <Button size="sm" color="primary" onClick={handleEdit}>
                Save
              </Button>
              <Button
                size="sm"
                color="danger"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </div>
          ) : (
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {comment.comment}
            </p>
          )}
        </div>
      </div>
      {user?._id === comment.userId._id && !isEditing && (
        <div className="flex space-x-2 ml-10">
          <Button
            size="sm"
            color="primary"
            variant="light"
            startContent={<BiEdit />}
            onClick={() => setIsEditing(true)}
          >
            Edit
          </Button>
          <Button
            size="sm"
            color="danger"
            variant="light"
            startContent={<BiTrash />}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      )}
    </div>
  );
};
