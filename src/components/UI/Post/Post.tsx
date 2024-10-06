"use client";

import { IPost } from "@/src/types";
import { Avatar } from "@nextui-org/avatar";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Image } from "@nextui-org/image";
import LightGallery from "lightgallery/react";
import Link from "next/link";
import { BiUpvote, BiDownvote, BiComment, BiShare } from "react-icons/bi";

// import styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

interface IProps {
  post: IPost;
}

const Post = ({ post }: IProps) => {
  const { _id, title, image, userId, description, upvotes, downvotes } =
    post || {};

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
          </div>
        </div>
      </CardHeader>

      <CardBody className="overflow-visible py-2 px-0">
        <div>
          <LightGallery speed={500} plugins={[lgThumbnail, lgZoom]}>
            <Link href={image}>
              <Image
                alt="Card background"
                className="object-cover rounded-none"
                src={image}
                width="100%"
              />
            </Link>
          </LightGallery>
        </div>

        <div className="px-2">
          <p className="text-xl font-medium my-1 hover:underline">
            <Link href={`/news-feed/${_id}`}>{title}</Link>
          </p>
          <p className="text-gray-700 text-sm">{description}</p>
        </div>
      </CardBody>

      <Divider className=" my-2" />

      <CardFooter className="flex justify-between items-center px-4">
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors">
            <BiUpvote className="text-xl" />
            <span className="text-sm">{upvotes.length}</span>
          </button>
          <button className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors">
            <BiDownvote className="text-xl" />
            <span className="text-sm">{downvotes.length}</span>
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-1 text-gray-500 hover:text-green-500 transition-colors">
            <BiComment className="text-xl" />
            <span className="text-sm">Comment</span>
          </button>
          <button className="flex items-center space-x-1 text-gray-500 hover:text-purple-500 transition-colors">
            <BiShare className="text-xl" />
            <span className="text-sm">Share</span>
          </button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Post;
