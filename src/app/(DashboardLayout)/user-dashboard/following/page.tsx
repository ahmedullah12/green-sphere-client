"use client";

import Loading from "@/src/components/UI/Loading";
import GSTable from "@/src/components/UI/Table";
import { useUser } from "@/src/context/user.provider";
import { useGetUserData, useUnfollowUser } from "@/src/hooks/user.hooks";
import { IUser } from "@/src/types";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import Link from "next/link";
import toast from "react-hot-toast";

const FollowingPage = () => {
  const { user } = useUser();

  const {
    data: userData,
    isLoading,
    refetch,
  } = useGetUserData(user?._id as string);

  const { mutate: handleUnfollow } = useUnfollowUser();

  const handleUnfollowUser = (followedUserId: string) => {
    handleUnfollow(
      {
        userId: user?._id as string,
        followedUserId,
      },
      {
        onSuccess: () => {
          toast.success("User Unfollowed");
          refetch();
        },
      }
    );
  };

  const columns = [
    { key: "image", label: "" },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "actions", label: "Actions" },
  ];

  // Define rows by mapping following data
  const rows = userData?.data?.following.map((user: IUser) => ({
    key: user._id,
    image: (
      <Image
        src={user.profilePhoto}
        alt={user.name}
        width={40}
        height={40}
        className="rounded-full"
      />
    ),
    name: (
      <Link
        href={`/profile/${user._id}`}
        className="text-blue-400 hover:underline"
      >
        {user.name}
      </Link>
    ),
    email: user.email,
    actions: (
      <Button
        color="danger"
        size="sm"
        onClick={() => handleUnfollowUser(user._id)}
      >
        Unfollow
      </Button>
    ),
  }));

  if (isLoading) return <Loading />;
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Following Users</h1>
      <div className="w-full h-[1px] bg-accent my-6"></div>

      <GSTable columns={columns} rows={rows || []} />
    </div>
  );
};

export default FollowingPage;
