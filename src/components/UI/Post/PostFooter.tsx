import { useState } from "react";
import { CommentItem } from "./CommentItem";
import { useDownvotePost, useUpvotePost } from "@/src/hooks/posts.hooks";
import { useCreateComment, useGetComments } from "@/src/hooks/comments.hook";
import { IComment, IPost, IUser } from "@/src/types";
import toast from "react-hot-toast";
import { BiSolidDownvote, BiSolidUpvote } from "react-icons/bi";
import { BiUpvote, BiDownvote, BiComment, BiShare } from "react-icons/bi";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";

const PostFooter = ({ post, user }: { post: IPost; user: IUser }) => {
  const { _id, userId, upvotes, downvotes } = post || {};

  const [showCommentInput, setShowCommentInput] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false);
  const [newComment, setNewComment] = useState("");

  const { mutate: handleUpvotePost } = useUpvotePost();
  const { mutate: handleDownvotePost } = useDownvotePost();
  const { data: comments, refetch: refetchComments, isFetching } = useGetComments(_id);
  const { mutate: handleAddComments } = useCreateComment();

  const handleUpvote = () => {
    if (user?._id === userId._id) {
      return;
    }

    const isDownvoted = downvotes.includes(user?._id as string);

    if (isDownvoted) {
      post.downvotes = downvotes.filter((id) => id !== user?._id);
    }

    const isUpvoted = upvotes.includes(user?._id as string);

    if (isUpvoted) {
      post.upvotes = upvotes.filter((id) => id !== user?._id);
    } else if (!isDownvoted) {
      post.upvotes.push(user?._id as string);
    }

    handleUpvotePost({ postId: post._id, userId: user?._id as string });

    setTimeout(() => {
      post = { ...post };
    }, 0);
  };

  const handleDownvote = () => {
    if (user?._id === userId._id) {
      return;
    }

    const isUpvoted = upvotes.includes(user?._id as string);
    const isDownvoted = downvotes.includes(user?._id as string);

    if (isUpvoted) {
      post.upvotes = upvotes.filter((id) => id !== user?._id);
    }

    if (isDownvoted) {
      post.downvotes = downvotes.filter((id) => id !== user?._id);
    } else if (!isUpvoted) {
      post.downvotes.push(user?._id as string);
    }

    handleDownvotePost({ postId: post._id, userId: user?._id as string });

    setTimeout(() => {
      post = { ...post };
    }, 0);
  };

  const handleCommentSubmit = async () => {
    if (!newComment) {
      return toast.error("Please add a comment");
    }
    const commentData = {
      postId: _id,
      userId: user?._id as string,
      comment: newComment,
    };

    handleAddComments(commentData, {
      onSuccess: () => {
        setNewComment("");
        refetchComments();
        toast.success("Comment added successfully");
      },
      onError: () => {
        toast.error("Failed to add comment");
      },
    });
  };

  const handleShare = () => {
    const link = `https://greensphere.netlify.app/news-feed/post/${_id}`;
    navigator.clipboard.writeText(link).then(
      () => {
        toast.success("Link copied to clipboard!");
      },
      () => {
        toast.error("Failed to copy link");
      }
    );
  };
  return (
    <>
      <div className="flex justify-between items-center w-full mb-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleUpvote}
            className="flex items-center space-x-1 text-gray-500 transition-colors"
          >
            {upvotes.includes(user?._id as string) ? (
              <BiSolidUpvote className="text-xl" />
            ) : (
              <BiUpvote className="text-xl" />
            )}
            <span className="text-sm">{upvotes.length}</span>
          </button>
          <button
            onClick={handleDownvote}
            className="flex items-center space-x-1 text-gray-500 transition-colors"
          >
            {downvotes.includes(user?._id as string) ? (
              <BiSolidDownvote className="text-xl" />
            ) : (
              <BiDownvote className="text-xl" />
            )}
            <span className="text-sm">{downvotes.length}</span>
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <button
            className="flex items-center space-x-1 text-gray-500 hover:text-green-500 transition-colors"
            onClick={() => {
              setShowCommentInput(!showCommentInput);
              if (!showCommentInput) {
                refetchComments(); // Fetch comments when opening the comment section
              }
            }}
          >
            <BiComment className="text-xl" />
            <span className="text-sm">
              <span className="hidden md:block">Comment</span>
              ({comments?.data?.length})
            </span>
          </button>
          <button
            onClick={handleShare}
            className="flex items-center space-x-1 text-gray-500 hover:text-purple-500 transition-colors"
          >
            <BiShare className="text-xl" />
            <span className="text-sm hidden md:block">Share</span>
          </button>
        </div>
      </div>

      {showCommentInput && (
        <div className="w-full mb-4">
          <Input
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            endContent={
              <Button color="primary" size="sm" onClick={handleCommentSubmit}>
                Post
              </Button>
            }
          />
        </div>
      )}

      {showCommentInput &&
        comments &&
        !isFetching &&
        comments.data &&
        comments.data.length > 0 && (
          <div className="w-full">
            <CommentItem
              comment={comments.data[comments.data.length - 1]}
              refetchComments={refetchComments}
              user={user as IUser}
            />
            {comments.data.length > 1 && (
              <Button
                color="primary"
                variant="light"
                size="sm"
                onClick={() => setShowAllComments(!showAllComments)}
              >
                {showAllComments
                  ? "Hide comments"
                  : `See all ${comments.data.length} comments`}
              </Button>
            )}
            {showAllComments && (
              <div className="mt-4">
                {comments.data
                  .slice(0, -1)
                  .reverse()
                  .map((comment: IComment) => (
                    <CommentItem
                      key={comment._id}
                      comment={comment}
                      refetchComments={refetchComments}
                      user={user as IUser}
                    />
                  ))}
              </div>
            )}
          </div>
        )}
    </>
  );
};

export default PostFooter;
