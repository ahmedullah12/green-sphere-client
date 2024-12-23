"use client";

import Loading from "@/src/components/UI/Loading";
import Post from "@/src/components/UI/Post/Post";
import { useUser } from "@/src/context/user.provider";
import { useGetMyPosts } from "@/src/hooks/posts.hooks";
import { IPost } from "@/src/types";
import { Button } from "@nextui-org/button";
import Link from "next/link";

const Profile = () => {
  const { user } = useUser();
  
  const { data: posts, isLoading } = useGetMyPosts(user?._id as string);

  const filteredPosts = posts?.data.filter((post: IPost) => {
    if (user?.isVerified) return true;
    return post.tag !== "PREMIUM";
  });

  if(isLoading) return <Loading/>
  return (
    <div>
       <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-6">My Posts</h1>
        <Link href="/profile/favourites">
          <Button size="sm" className="bg-primary dark:bg-default text-white">
            Favourite Posts
          </Button>
        </Link>
      </div>
      
      <div className="space-y-6">
        {filteredPosts && filteredPosts?.length > 0 ? (
          filteredPosts?.map((post: IPost) => (
            <Post key={post?._id} post={post}></Post>
          ))
        ) : (
          <p>No posts to show</p>
        )}
      </div>
    </div>
  );
};

export default Profile;