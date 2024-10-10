"use client";

import React from "react";
import Loading from "@/src/components/UI/Loading";
import Post from "@/src/components/UI/Post/Post";
import { useUser } from "@/src/context/user.provider";
import { useGetFavourites } from "@/src/hooks/favourites.hook";
import { Button } from "@nextui-org/button";
import Link from "next/link";

const FavouritePosts = () => {
  const { user } = useUser();
  const { data: favourites, isLoading } = useGetFavourites(user?._id as string);

  const filteredPosts = favourites?.data.filter((favourite: any) => {
    if (user?.isVerified) return true;
    return favourite.postId.tag !== "PREMIUM";
  });
  console.log(filteredPosts);

  {isLoading && <Loading />}
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-6">Favourite Posts</h1>
        <Link href="/profile">
          <Button size="sm" className="bg-primary dark:bg-default text-white">
            My Posts
          </Button>
        </Link>
      </div>
      
      <div className="space-y-6">
        {filteredPosts && filteredPosts.length > 0 ? (
          filteredPosts?.map((favourite: any) => (
            <Post key={favourite?.postId?._id} post={favourite?.postId} />
          ))
        ) : (
          <p>No posts to show</p>
        )}
      </div>
    </div>
  );
};

export default FavouritePosts;
