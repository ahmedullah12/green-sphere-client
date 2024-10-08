"use client";

import Loading from "@/src/components/UI/Loading";
import Post from "@/src/components/UI/Post/Post";
import { useGetMyPosts } from "@/src/hooks/posts.hooks";
import { IPost } from "@/src/types";
import { useParams } from "next/navigation";

const VisitedProfile = () => {
  const params = useParams();
  const userId = params.userId as string;
  const { data: posts, isLoading } = useGetMyPosts(userId);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Posts</h1>
      <div className="space-y-6">
        {posts?.data.length > 0 ? (
          posts?.data?.map((post: IPost) => (
            <Post key={post._id} post={post}></Post>
          ))
        ) : (
          <p>No posts to show</p>
        )}
      </div>
    </div>
  );
};

export default VisitedProfile;