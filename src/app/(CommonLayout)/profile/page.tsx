"use client";

import CreatePaymentModal from "@/src/components/modals/CreatePaymentModal";
import EditProfileModal from "@/src/components/modals/EditProfileModal";
import Loading from "@/src/components/UI/Loading";
import Post from "@/src/components/UI/Post/Post";
import { useUser } from "@/src/context/user.provider";
import { useGetMyPosts } from "@/src/hooks/posts.hooks";
import { IPost } from "@/src/types";
import { Image } from "@nextui-org/image";
import { Tab, Tabs } from "@nextui-org/tabs";
import { useEffect, useState } from "react";
import { MdVerified } from "react-icons/md";

const Profile = () => {
  const { user: currentUser } = useUser();
  const [selectedTab, setSelectedTab] = useState("posts");
  const [canVerify, setCanVerify] = useState(false);
  
  const { data: posts, isLoading } = useGetMyPosts(currentUser?._id as string);

  const filteredPosts = posts?.data.filter((post: IPost) => {
    if (currentUser?.isVerified) return true;
    return post.tag !== "PREMIUM";
  });

  useEffect(() => {
    if (posts?.data) {
      const hasUpvotes = posts.data.some(
        (post: IPost) => post.upvotes && post.upvotes.length > 0
      );
      setCanVerify(hasUpvotes);
    }
  }, [posts]);

  if (isLoading || !currentUser) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Cover Image */}
      <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded-b-lg relative">
        <div className="absolute -bottom-16 left-8">
          <Image
            src={currentUser.profilePhoto}
            className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-900"
            alt="Profile"
          />
        </div>
      </div>

      {/* Profile Header */}
      <div className="mt-20 px-8">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">{currentUser.name}</h1>
              {currentUser.isVerified && (
                <MdVerified className="text-blue-500" size={24} />
              )}
            </div>
            <p className="text-gray-600 dark:text-gray-400">{currentUser.email}</p>
            <div className="flex gap-4 mt-2">
              <span className="text-sm">
                <strong>{filteredPosts?.length || 0}</strong> posts
              </span>
              <span className="text-sm">
                <strong>{currentUser.followers?.length || 0}</strong> followers
              </span>
              <span className="text-sm">
                <strong>{currentUser.following?.length || 0}</strong> following
              </span>
            </div>
          </div>
          
          <div className="flex gap-2">
            <EditProfileModal />
            {!currentUser.isVerified && (
              <CreatePaymentModal disable={!canVerify} />
            )}
          </div>
        </div>

        {/* Tabs */}
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
          <Tab key="favorites" title="Favorites">
            <div className="grid gap-6 mt-4">
              {/* Add favorite posts here */}
              <p className="text-center py-8">No favorite posts yet</p>
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;