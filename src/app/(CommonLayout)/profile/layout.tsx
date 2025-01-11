"use client";

import Container from "@/src/components/UI/Container";
import { useUser } from "@/src/context/user.provider";
import { useGetUserData } from "@/src/hooks/user.hooks";
import { IUser } from "@/src/types";
import { useParams } from "next/navigation";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  const { user: currentUser } = useUser();
  const params = useParams();

  const userId = params.userId as string;


  

  return (
    <Container>
      <div className=" flex flex-col md:flex-row w-full md:gap-12">
        
        <div className="w-full md:w-4/5 my-3">{children}</div>
      </div>
    </Container>
  );
}
