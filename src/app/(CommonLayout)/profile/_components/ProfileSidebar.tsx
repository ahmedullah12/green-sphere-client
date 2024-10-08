"use client";

import { useUser } from "@/src/context/user.provider";
import { Image } from "@nextui-org/image";

const ProfileSidebar = () => {
  const { user } = useUser();

  return (
    <div>
      <div className="rounded-xl bg-default-100 p-2">
        <div className="h-[330px] w-full rounded-md">
          <Image
            height={100}
            width={100}
            src={user?.profilePhoto!}
            alt="profile"
          />
        </div>
        <div className="my-3">
          <h1 className="text-2xl font-semibold">{user?.name}</h1>
          <p className="break-words text-sm">{user?.email}</p>
        </div>
       
      </div>
      <div className="mt-3 space-y-2 rounded-xl bg-default-100 p-2">
       
      </div>
    </div>
  );
};

export default ProfileSidebar;
