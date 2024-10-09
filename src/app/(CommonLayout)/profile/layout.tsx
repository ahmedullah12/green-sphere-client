"use client";

import Container from "@/src/components/UI/Container";
import { ReactNode } from "react";
import ProfileSidebar from "./_components/ProfileSidebar";
import { useParams } from "next/navigation";
import { useUser } from "@/src/context/user.provider";
import { IUser } from "@/src/types";
import { useGetUserData } from "@/src/hooks/user.hooks";

export default function Layout({ children }: { children: ReactNode }) {
  const { user: currentUser } = useUser();
  const params = useParams();
  
  const userId = params.userId as string;
  const shouldFetchUser = userId && userId !== currentUser?._id;
  
  const { data: userData, isLoading, error, refetch: userRefetch } = useGetUserData(shouldFetchUser ? userId : '');

  let profileUser: IUser | null = null;
  let isError = false;
  console.log(userData);

  if (shouldFetchUser) {
    if (error) {
      console.error("Error fetching user data:", error);
      isError = true;
    } else {
      profileUser = userData?.data || null;
    }
  } else {
    profileUser = currentUser;
  }

  return (
    <Container>
      <div className="my-3 flex flex-col md:flex-row w-full md:gap-12">
        <div className="w-full md:w-2/5 mb-6 md:mb-0">
          <ProfileSidebar 
            profileUser={profileUser} 
            isLoading={isLoading} 
            isError={isError}
            refetch={userRefetch}
          />
        </div>
        <div className="w-full md:w-4/5">{children}</div>
      </div>
    </Container>
  );
}