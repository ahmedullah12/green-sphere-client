"use client";

import { useUser } from "@/src/context/user.provider";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import { useState } from "react";

const ProfileSidebar = () => {
  const { user } = useUser();
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <div className="bg-green-50 dark:bg-default relative">
      <div className="rounded-xl p-4">
        <div className="flex justify-center">
          <Image
            src={user?.profilePhoto!}
            alt="profile"
            className="max-w-[200px] md:max-w-[400px] h-[150px] md:h-[200px] object-cover"
          />
        </div>
        <div className="my-3">
          <h1 className="text-xl md:text-2xl font-semibold">{user?.name}</h1>
          <p className="break-words text-sm">{user?.email}</p>
        </div>
        <Button
          onClick={() => setIsEditOpen(!isEditOpen)}
          className="w-full mt-2 bg-primary dark:bg-gray-500 text-white"
        >
          Edit Profile
        </Button>
      </div>

      {isEditOpen && (
        <div className="absolute left-0 right-0 bg-white dark:bg-gray-400 p-4 rounded-b-xl shadow-lg z-50">
          <h2 className="text-lg font-semibold mb-2">Profile Options</h2>
          <div className="space-y-2">
            <Button variant="solid" className="w-full">
              Edit Profile
            </Button>
            <Button variant="solid" className="w-full">
              Change Password
            </Button>
            <Button variant="solid" className="w-full">
              Password Recovery
            </Button>
          </div>
        </div>
      )}

      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2">Following</h2>
        <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {user?.following.slice(0, 5).map((followedUser) => (
            <div
              key={followedUser._id}
              className="flex flex-col items-center space-y-2"
            >
              <Image
                src={followedUser.profilePhoto}
                width={50}
                height={50}
                className="rounded-md"
              />
              <span className="text-xs md:text-sm text-center">
                {followedUser.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;
