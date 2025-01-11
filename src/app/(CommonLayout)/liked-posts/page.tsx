"use client";

import Loading from "@/src/components/UI/Loading";
import { useUser } from "@/src/context/user.provider";
import { useGetLikedPosts } from "@/src/hooks/posts.hooks";
import PostCard from "../_components/shared/PostCard";
import { HandHeart } from "lucide-react";

const LikedPosts = () => {
  const { user } = useUser();
  const { data: likedPosts, isLoading } = useGetLikedPosts(user?._id as string);
  console.log(likedPosts);

  const filteredPosts = likedPosts?.data.filter((post: any) => {
    if (user?.isVerified) return true;
    return post.tag !== "PREMIUM";
  });

  console.log(filteredPosts);
  {
    isLoading && <Loading />;
  }
  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <HandHeart className="w-8 h-8 text-primary" />
        <h1 className="text-3xl font-bold">Liked Posts</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredPosts && filteredPosts.length > 0 ? (
          filteredPosts?.map((post: any) => (
            <PostCard key={post?._id} post={post} />
          ))
        ) : (
          <p>No posts to show</p>
        )}
      </div>
    </div>
  );
};

export default LikedPosts;
