"use client";

import Container from "@/src/components/UI/Container";
import { ReactNode, useEffect, useState } from "react";
import ProfileSidebar from "./_components/ProfileSidebar";
import { useParams } from "next/navigation";
import { useUser } from "@/src/context/user.provider";
import { IUser } from "@/src/types";
import { getUserData } from "@/src/services/User";



export default function Layout({ children }: { children: ReactNode }) {
  const { user: currentUser } = useUser();
  const params = useParams();
  const [profileUser, setProfileUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if (params.userId && params.userId !== currentUser?._id) {
        try {
          const userData = await getUserData(params.userId as string);
          setProfileUser(userData.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
          // Handle error (e.g., set an error state, show a message)
        }
      } else {
        setProfileUser(currentUser);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [params.userId, currentUser]);

  return (
    <Container>
      <div className="my-3 flex flex-col md:flex-row w-full md:gap-12">
        <div className="w-full md:w-2/5 mb-6 md:mb-0">
          <ProfileSidebar profileUser={profileUser} isLoading={isLoading} />
        </div>
        <div className="w-full md:w-4/5">{children}</div>
      </div>
    </Container>
  );
}