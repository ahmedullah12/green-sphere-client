"use client"

import { useUser } from "@/src/context/user.provider";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { UserCheck } from "lucide-react";
import { Button } from "@nextui-org/button";
import { useUnfollowUser } from "@/src/hooks/user.hooks";
import toast from "react-hot-toast";
import Link from "next/link";

const Friends = () => {
  const { user, setUser } = useUser();
  const { mutate: handleUnfollow } = useUnfollowUser();
  
  // Find mutual friends (users who follow each other)
  const mutualFriends = user?.followers?.filter(follower => 
    user.following.some(following => following._id === follower._id)
  ) || [];

  const handleUnfollowUser = (friendToUnfollow: any) => {
    if (!user) return;

    handleUnfollow(
      {
        userId: user._id,
        followedUserId: friendToUnfollow._id,
      },
      {
        onSuccess: () => {
          toast.success("User Unfollowed");
          if (user && setUser) {
            const updatedUser = {
              ...user,
              following: user.following.filter(
                (following: any) => following._id !== friendToUnfollow._id
              ),
            };
            setUser(updatedUser);
          }
        },
      }
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex items-center gap-3 mb-8">
        <UserCheck className="w-8 h-8 text-primary" />
        <h1 className="text-2xl md:text-3xl font-bold">Friends</h1>
        <span className="text-muted-foreground">({mutualFriends.length})</span>
      </div>

      {mutualFriends.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">No mutual friends yet. Start connecting with people!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mutualFriends.map((friend) => (
            <Card key={friend._id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="h-16 w-16 rounded-full overflow-hidden">
                  <img
                    src={friend.profilePhoto}
                    alt={friend.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <Link href={`/user/${friend._id}`} className="font-semibold text-lg hover:underline">{friend.name}</Link>
                  <p className="text-sm text-muted-foreground">{friend.email}</p>
                </div>
              </CardHeader>
              <CardBody>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <span>{friend.followers?.length || 0} followers</span>
                  <span>•</span>
                  <span>{friend.following?.length || 0} following</span>
                </div>
                <div className="flex justify-between items-center">
                  {friend.isVerified && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      Verified
                    </span>
                  )}
                  <Button
                    className="bg-gray-200 ml-auto"
                    onPress={() => handleUnfollowUser(friend)}
                    size="sm"
                  >
                    Unfollow
                  </Button>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Friends;