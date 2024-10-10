import ImageGallery from "@/src/components/UI/ImageGallery";
import { galleryImages } from "@/src/constants";
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
  const images = galleryImages.slice(0, 8);
  return (
    <>
      {children}
      {latestPosts}
      {popularPosts}
      <ImageGallery galleryImages={images as string[]} />
    </>
  );
}
