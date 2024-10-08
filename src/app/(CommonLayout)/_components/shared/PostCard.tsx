"use client";

import { IPost } from "@/src/types";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import LightGallery from "lightgallery/react";

// import styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import { Link } from "@nextui-org/link";

interface IProps {
  post: IPost;
}
const PostCard = ({ post }: IProps) => {
  const { _id, title, image, userId, description } = post || {};

  const truncateText = (text: string, length: number) => {
    if (text.length > length) {
      return text.substring(0, length) + "...";
    }
    return text;
  };

  return (
    <Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <div className="flex gap-5">
          <Avatar
            isBordered
            radius="full"
            size="md"
            src={userId?.profilePhoto}
          />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">
              {userId?.name}
            </h4>
            {/* <h5 className="text-small tracking-tight text-default-400">{userId?.email}</h5> */}
          </div>
        </div>
        <h4 className="font-bold text-large mt-3">{title}</h4>
      </CardHeader>

      {/* if has images showing image otherwise showing some text from description */}
      {image ? (
        <CardBody className="overflow-visible py-2">
          <LightGallery speed={500} plugins={[lgThumbnail, lgZoom]}>
            <Link href={image}>
              <Image
                alt="Card background"
                className="object-cover rounded-xl"
                src={image}
                width={270}
                height={180}
              />
            </Link>
          </LightGallery>
        </CardBody>
      ) : (
        <CardBody className="py-2">
          <p className="text-gray-700 text-sm">
            {truncateText(description, 100)}
          </p>
        </CardBody>
      )}

      <CardFooter className="flex justify-end">
        <Link href={`/news-feed/post/${_id}`}>
          <Button
            className="text-tiny bg-primary dark:bg-default text-white"
            radius="lg"
            size="sm"
          >
            See Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
