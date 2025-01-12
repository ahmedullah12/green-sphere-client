"use client";

import Loading from "@/src/components/UI/Loading";
import { useUser } from "@/src/context/user.provider";
import { useGetFavourites } from "@/src/hooks/favourites.hook";
import { MdFavorite } from "react-icons/md";
import PostCard from "../_components/shared/PostCard";

const FavouritePosts = () => {
  const { user } = useUser();
  const { data: favourites, isLoading } = useGetFavourites(user?._id as string);

  const filteredPosts = favourites?.data.filter((favourite: any) => {
    if (user?.isVerified) return true;
    return favourite.postId.tag !== "PREMIUM";
  });

  {
    isLoading && <Loading />;
  }
  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <MdFavorite className="w-8 h-8 text-primary" />
        <h1 className="text-3xl font-bold">Favorites</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredPosts && filteredPosts.length > 0 ? (
          filteredPosts?.map((favourite: any) => (
            <PostCard key={favourite?.postId?._id} post={favourite?.postId} />
          ))
        ) : (
          <p>No posts to show</p>
        )}
      </div>
    </div>
  );
};

export default FavouritePosts;
