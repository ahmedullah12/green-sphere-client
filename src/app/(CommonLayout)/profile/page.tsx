"use client";

import Loading from "@/src/components/UI/Loading";
import Post from "@/src/components/UI/Post/Post";
import { useUser } from "@/src/context/user.provider";
import { useGetMyPosts } from "@/src/hooks/posts.hooks";
import { IPost } from "@/src/types";

const Profile = () => {
  const { user } = useUser();
  const { data: posts, isLoading } = useGetMyPosts(user?._id as string);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Posts</h1>
      {
        isLoading && <Loading/>
      }
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

export default Profile;