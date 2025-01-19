"use client";

import { Image } from "@nextui-org/image";
import Link from "next/link";

import LightGallery from "lightgallery/react";

// import styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import Container from "@/src/components/UI/Container";
import { GalleryHorizontal } from "lucide-react";

const ImageGallery = ({galleryImages}: {galleryImages: string[]}) => {
  return (
    <Container>
      <div className="mb-8">
        <div>
       <div className="flex items-center gap-3 mb-8">
               <GalleryHorizontal className="w-8 h-8 text-primary" />
               <h1 className="text-xl md:text-3xl font-bold">Gallery</h1>
             </div>
        </div>
        <LightGallery
          elementClassNames="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          speed={500}
          plugins={[lgThumbnail, lgZoom]}
        >
          {galleryImages.map((image, index) => (
            <Link key={index} href={image as string}>
              <Image
                alt="Card background"
                className="object-cover rounded-xl"
                src={image}
                width={"100%"}
                height={300}
              />
            </Link>
          ))}
        </LightGallery>
      </div>
    </Container>
  );
};

export default ImageGallery;
