"use client";

import ImageGallery from "@/src/components/UI/ImageGallery";
import { galleryImages } from "@/src/constants";


const GalleryPage = () => {
  return (
    <ImageGallery galleryImages={galleryImages as string[]}/>
  );
};

export default GalleryPage;
