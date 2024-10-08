import { ReactNode } from "react";

export default function layout({
  children,
  latestPosts,
  popularPosts,
}: {
  children: ReactNode;
  latestPosts: ReactNode;
  popularPosts: ReactNode;
}) {
  return (
    <>
      {children}
      {latestPosts}
      {popularPosts}
    </>
  );
}
