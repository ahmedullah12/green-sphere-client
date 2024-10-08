import Container from "@/src/components/UI/Container";
import { ReactNode } from "react";
import ProfileSidebar from "./_components/ProfileSidebar";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <Container>
      <div className="my-3 flex w-full gap-12">
        <div className="w-2/5">
          <ProfileSidebar />
        </div>
        <div className="w-4/5">{children}</div>
      </div>
    </Container>
  );
}