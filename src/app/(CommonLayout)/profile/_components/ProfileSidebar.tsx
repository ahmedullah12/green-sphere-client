"use client";

import { useUser } from "@/src/context/user.provider";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { IPost, IUser } from "@/src/types";
import { useGetMyPosts } from "@/src/hooks/posts.hooks";
import { MdVerified } from "react-icons/md";
import Loading from "@/src/components/UI/Loading";
import EditProfileModal from "@/src/components/modals/EditProfileModal";
import { useFollowUser, useUnfollowUser } from "@/src/hooks/user.hooks";
import toast from "react-hot-toast";

interface ProfileSidebarProps {
  profileUser: IUser | null;
  isLoading: boolean;
  isError: boolean;
  refetch?: any;
}

const ProfileSidebar = ({
  profileUser,
  isLoading,
  isError,
  refetch,
}: ProfileSidebarProps) => {
  const { user: currentUser, setUser: setCurrentUser } = useUser();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [canVerify, setCanVerify] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const isOwnProfile = profileUser?._id === currentUser?._id;

  const { data: posts } = useGetMyPosts(profileUser?._id as string);

  const { mutate: handleFollow } = useFollowUser();
  const { mutate: handleUnfollow } = useUnfollowUser();

  useEffect(() => {
    if (posts?.data) {
      const hasUpvotes = posts.data.some(
        (post: IPost) => post.upvotes && post.upvotes.length > 0
      );
      setCanVerify(hasUpvotes);
    }
  }, [posts]);

  const updateCurrentUserAfterFollow = (followedUserId: string) => {
    if (currentUser) {
      setCurrentUser({
        ...currentUser,
        following: [...currentUser.following, { _id: followedUserId } as IUser],
      });
    }
  };

  const updateCurrentUserAfterUnfollow = (unfollowedUserId: string) => {
    if (currentUser) {
      setCurrentUser({
        ...currentUser,
        following: currentUser.following.filter((user) => user._id !== unfollowedUserId),
      });
    }
  };

  const handleFollowUser = () => {
    handleFollow(
      {
        userId: currentUser?._id as string,
        followedUserId: profileUser?._id as string,
      },
      {
        onSuccess: () => {
          toast.success("User Followed");
          setIsFollowing(true);
          updateCurrentUserAfterFollow(profileUser?._id as string);
          refetch();
        },
      }
    );
  };

  const handleUnfollowUser = () => {
    handleUnfollow(
      {
        userId: currentUser?._id as string,
        followedUserId: profileUser?._id as string,
      },
      {
        onSuccess: () => {
          toast.success("User Unfollowed");
          setIsFollowing(false);
          updateCurrentUserAfterUnfollow(profileUser?._id as string);
          refetch();
        },
      }
    );
  };


  useEffect(() => {
    if (currentUser && profileUser && !isOwnProfile) {
      setIsFollowing(
        currentUser.following.some((f: IUser) => f._id === profileUser._id)
      );
    }
  }, [currentUser, profileUser, isOwnProfile]);

  const renderUserList = (users: IUser[], type: string) => (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">{type}</h2>
        {users.length > 3 && (
          <Link
            href={`/profile/${profileUser?._id}/${type.toLowerCase()}`}
            className="text-sm text-primary"
          >
            See All
          </Link>
        )}
      </div>
      {users.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.slice(0, 3).map((listUser) => (
            <div key={listUser._id} className="flex flex-col space-y-2">
              <Image
                src={listUser.profilePhoto}
                height={80}
                className="rounded-md max-w-full"
              />
              <Link href={`/profile/${listUser?._id}`}>
                <span className="text-xs md:text-sm">{listUser.name}</span>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500">No {type.toLowerCase()} yet.</p>
      )}
    </div>
  );

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <div className="text-red-500 p-4">
        Error loading profile. Please try again later.
      </div>
    );
  }

  if (!profileUser) {
    return <div className="p-4">User not found</div>;
  }

  return (
    <div className="bg-green-50 dark:bg-default h-screen overflow-y-auto sticky top-0 left-0">
      <div className="rounded-xl p-4">
        <div className="flex justify-center">
          <Image
            src={profileUser.profilePhoto!}
            alt="profile"
            className="max-w-[200px] md:max-w-[400px] h-[150px] md:h-[200px] object-cover"
          />
        </div>
        <div className="my-3">
          <div className="flex justify-between items-center">
            <h1 className="text-xl md:text-2xl font-semibold flex items-center gap-1">
              {profileUser.name}{" "}
              {profileUser.isVerified && (
                <MdVerified className="text-blue-500" size={20} />
              )}
            </h1>
            {isOwnProfile && !profileUser.isVerified && (
              <button
                className="px-3 py-2 text-xs bg-blue-400 dark:bg-default text-white rounded-md disabled:bg-gray-200 disabled:dark:bg-gray-200"
                disabled={!canVerify}
              >
                Verify
              </button>
            )}
          </div>
          <p className="break-words text-sm">{profileUser.email}</p>
        </div>
        {isOwnProfile && (
          <Button
            onClick={() => setIsEditOpen(!isEditOpen)}
            className="w-full mt-2 bg-primary dark:bg-gray-500 text-white"
          >
            Edit Profile
          </Button>
        )}

        {!isOwnProfile &&
          (isFollowing ? (
            <Button onClick={handleUnfollowUser}>Following</Button>
          ) : (
            <Button onClick={handleFollowUser}>Follow</Button>
          ))}
      </div>

      {isOwnProfile && isEditOpen && (
        <div className="absolute left-0 right-0 bg-white dark:bg-gray-400 p-4 rounded-b-xl shadow-lg z-50">
          <h2 className="text-lg font-semibold mb-2">Profile Options</h2>
          <div className="space-y-2">
            <EditProfileModal />
            <Link href={"/auth/change-password"}>
              <Button variant="solid" className="w-full mt-2">
                Change Password
              </Button>
            </Link>
            <Link href="/auth/password-recovery">
              <Button variant="solid" className="w-full mt-2">
                Password Recovery
              </Button>
            </Link>
          </div>
        </div>
      )}

      <div className="p-4 space-y-6">
        {renderUserList(profileUser.following || [], "Following")}
        {renderUserList(profileUser.followers || [], "Followers")}
      </div>
    </div>
  );
};

export default ProfileSidebar;
