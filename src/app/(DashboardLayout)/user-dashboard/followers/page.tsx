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

const FollowersPage = () => {
  const { user } = useUser();

  const { data: userData, isLoading } = useGetUserData(user?._id as string);

  const columns = [
    { key: "image", label: "" },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
  ];

  // Define rows by mapping following data
  const rows = userData?.data?.followers.map((user: IUser) => ({
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
  }));

  if (isLoading) return <Loading />;
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Followers</h1>
      <div className="w-full h-[1px] bg-accent my-6"></div>

      <GSTable columns={columns} rows={rows || []} />
    </div>
  );
};

export default FollowersPage;
