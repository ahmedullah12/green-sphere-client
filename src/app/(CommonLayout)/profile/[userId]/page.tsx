"use client";

import Loading from "@/src/components/UI/Loading";
import Post from "@/src/components/UI/Post/Post";
import { useUser } from "@/src/context/user.provider";
import { useGetMyPosts } from "@/src/hooks/posts.hooks";
import {
  useFollowUser,
  useGetUserData,
  useUnfollowUser,
} from "@/src/hooks/user.hooks";
import { IPost, IUser } from "@/src/types";
import { Image } from "@nextui-org/image";
import { Tab, Tabs } from "@nextui-org/tabs";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdVerified } from "react-icons/md";

const VisitedProfile = () => {
  const params = useParams();
  const userId = params.userId as string;
  const [selectedTab, setSelectedTab] = useState("posts");
  const [isFollowing, setIsFollowing] = useState(false);

  const { data: posts, isLoading } = useGetMyPosts(userId);
  const {
    data: userData,
    isLoading: userDataLoading,
    refetch: userRefetch,
  } = useGetUserData(userId);
  const { user: currentUser, setUser: setCurrentUser } = useUser();

  const { mutate: handleFollow } = useFollowUser();
  const { mutate: handleUnfollow } = useUnfollowUser();

  const router = useRouter();

  const visitedUser = userData?.data;

  useEffect(() => {
    if(currentUser?._id === userId){
      return router.push("/profile")
    }
  }, [currentUser, userId])

  useEffect(() => {
    if (currentUser && visitedUser) {
      setIsFollowing(
        currentUser.following.some((f: IUser) => f._id === visitedUser._id)
      );
    }
  }, [currentUser, visitedUser]);

  const handleFollowUser = () => {
    if (!currentUser || !visitedUser) return;

    handleFollow(
      {
        userId: currentUser._id,
        followedUserId: visitedUser._id,
      },
      {
        onSuccess: () => {
          toast.success("User Followed");
          setIsFollowing(true);
          if (currentUser && setCurrentUser && visitedUser) {
            const updatedUser: IUser = {
              ...currentUser,
              following: [...currentUser.following, visitedUser],
            };
            setCurrentUser(updatedUser);
          }
          userRefetch();
        },
      }
    );
  };

  const handleUnfollowUser = () => {
    if (!currentUser || !visitedUser) return;

    handleUnfollow(
      {
        userId: currentUser._id,
        followedUserId: visitedUser._id,
      },
      {
        onSuccess: () => {
          toast.success("User Unfollowed");
          setIsFollowing(false);
          if (currentUser && setCurrentUser) {
            const updatedUser: IUser = {
              ...currentUser,
              following: currentUser.following.filter(
                (user: IUser) => user._id !== visitedUser._id
              ),
            };
            setCurrentUser(updatedUser);
          }
          userRefetch();
        },
      }
    );
  };

  if (isLoading || userDataLoading || !visitedUser || !currentUser)
    return <Loading />;

  const filteredPosts = posts?.data.filter((post: IPost) => {
    if (currentUser?.isVerified) return true;
    return post.tag !== "PREMIUM";
  });

  return (
    <div className="max-w-7xl mx-auto md:px-4">
      <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded-b-lg relative">
        <div className="absolute -bottom-16 left-8">
          <Image
            src={visitedUser.profilePhoto}
            className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-900"
            alt="Profile"
          />
        </div>
      </div>

      <div className="mt-20 px-1 md:px-8">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">{visitedUser.name}</h1>
              {visitedUser.isVerified && (
                <MdVerified className="text-blue-500" size={24} />
              )}
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              {visitedUser.email}
            </p>
            <div className="flex gap-4 mt-2">
              <span className="text-sm">
                <strong>{filteredPosts?.length || 0}</strong> posts
              </span>
              <span className="text-sm">
                <strong>{visitedUser.followers?.length || 0}</strong> followers
              </span>
              <span className="text-sm">
                <strong>{visitedUser.following?.length || 0}</strong> following
              </span>
            </div>
          </div>

          <button
            className={`px-1 py-2 rounded-md text-xs ${isFollowing ? "bg-gray-200" : "bg-blue-500 text-white"}`}
            onClick={isFollowing ? handleUnfollowUser : handleFollowUser}
          >
            {isFollowing ? "Following" : "Follow"}
          </button>
        </div>

        <Tabs
          selectedKey={selectedTab}
          onSelectionChange={(key) => setSelectedTab(key.toString())}
          className="mt-8"
        >
          <Tab key="posts" title="Posts">
            <div className="grid gap-6 mt-4">
              {filteredPosts && filteredPosts.length > 0 ? (
                filteredPosts.map((post: IPost) => (
                  <Post key={post._id} post={post} />
                ))
              ) : (
                <p className="text-center py-8">No posts yet</p>
              )}
            </div>
          </Tab>
          <Tab key="media" title="Media">
            <div className="grid grid-cols-3 gap-4 mt-4">
              {filteredPosts
                ?.filter((post: IPost) => post.image)
                .map((post: IPost) => (
                  <Image
                    key={post._id}
                    src={post.image}
                    className="w-full h-64 object-cover rounded-lg"
                    alt="Post"
                  />
                ))}
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default VisitedProfile;
