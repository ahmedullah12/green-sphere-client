import Container from "@/src/components/UI/Container";
import { ReactNode } from "react";
import ProfileSidebar from "./_components/ProfileSidebar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Container>
      <div className="my-3 flex flex-col md:flex-row w-full md:gap-12">
        <div className="w-full md:w-2/5 mb-6 md:mb-0">
          <ProfileSidebar />
        </div>
        <div className="w-full md:w-4/5">{children}</div>
      </div>
    </Container>
  );
}