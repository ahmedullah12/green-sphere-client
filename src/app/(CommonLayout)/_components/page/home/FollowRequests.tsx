"use client";

import { useUser } from "@/src/context/user.provider";
import { useFollowUser } from "@/src/hooks/user.hooks";
import { IUser } from "@/src/types";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import Link from "next/link";
import toast from "react-hot-toast";

const FollowRequests = () => {
  const { user: currentUser, setUser } = useUser();
  const { mutate: handleFollow } = useFollowUser();

  const getPendingFollowers = () => {
    if (!currentUser) return [];
    return currentUser.followers
      .filter(
        (follower: IUser) =>
          !currentUser.following.some(
            (following: IUser) => following._id === follower._id
          )
      )
      .reverse()
      .slice(0, 3);
  };

  const handleFollowBack = (follower: IUser) => {
    if (!currentUser) return;

    handleFollow(
      {
        userId: currentUser._id,
        followedUserId: follower._id,
      },
      {
        onSuccess: () => {
          toast.success("Started following " + follower.name);
          if (setUser) {
            setUser({
              ...currentUser,
              following: [...currentUser.following, follower],
            });
          }
        },
      }
    );
  };

  const pendingFollowers = getPendingFollowers();

  return (
    <div className="bg-white dark:bg-default p-4 rounded-lg mb-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Follow Requests</h2>
        {pendingFollowers.length > 3 && (
          <Link href="/follow-requests" className={`text-sm text-primary`}>
            See all
          </Link>
        )}
      </div>

      {pendingFollowers.length > 0 ? (
        <div className="space-y-4">
          {pendingFollowers.map((follower: IUser) => (
            <div className="mb-3" key={follower._id}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Image
                    src={follower.profilePhoto}
                    className="w-10 h-10 rounded-full"
                    alt={follower.name}
                  />
                  <div>
                    <Link
                      href={`/profile/${follower._id}`}
                      className="font-medium hover:underline"
                    >
                      {follower.name}
                    </Link>
                    {follower.followers.length > 0 && (
                      <p className="text-xs text-gray-500">
                        {follower.followers.length} followers
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <Button
                size="sm"
                className="bg-primary text-white"
                onPress={() => handleFollowBack(follower)}
              >
                Follow Back
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-4">
          No follow requests pending
        </p>
      )}
    </div>
  );
};

export default FollowRequests;
