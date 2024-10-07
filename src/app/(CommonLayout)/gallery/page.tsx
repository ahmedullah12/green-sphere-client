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
import { galleryImages } from "@/src/constants";




const ImageGallery = () => {
  return (
    <Container>
      <div className="mb-8">
      <div>
        <h1 className="text-center text-2xl md:text-3xl lg:text-4xl text-primary my-4">Gallery</h1>
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