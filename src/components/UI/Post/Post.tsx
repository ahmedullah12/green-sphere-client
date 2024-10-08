"use client";

import React, { useState } from "react";
import { Avatar } from "@nextui-org/avatar";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Image } from "@nextui-org/image";
import Link from "next/link";

import { BsThreeDotsVertical } from "react-icons/bs";

import LightGallery from "lightgallery/react";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import { useUser } from "@/src/context/user.provider";
import EditPostModal from "../../modals/EditPostModal";
import DeletePostModal from "../../modals/DeletePostModal";
import { IPost, IUser } from "@/src/types";
import PostFooter from "./PostFooter";

const Post = ({ post }: { post: IPost }) => {
  const { _id, title, image, tag, userId, category } = post || {};
  const [showEditOptions, setShowEditOptions] = useState(false);

  const { user } = useUser();

  return (
    <Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex items-center justify-between">
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
        <div className="flex items-center gap-2">
          {tag === "PREMIUM" && (
            <p className="px-2 py-1 bg-primary dark:bg-gray-500 text-white text-xs rounded-md">
              Premium
            </p>
          )}
          {user?._id === userId._id && (
            <div className="relative">
              <button
                onClick={() => setShowEditOptions(!showEditOptions)}
                className="hover:cursor-pointer"
              >
                <BsThreeDotsVertical />
              </button>
              {showEditOptions && (
                <div className="absolute top-[25px] right-0 flex flex-col gap-2 shadow-lg bg-green-50 dark:bg-gray-500 px-4 py-2 z-50 rounded-md">
                  <EditPostModal postData={post} />
                  <DeletePostModal postId={post._id} />
                </div>
              )}
            </div>
          )}
        </div>
      </CardHeader>

      <CardBody className="overflow-visible py-2 px-0">
        <div>
          {image && (
            <LightGallery speed={500} plugins={[lgThumbnail, lgZoom]}>
              <Link href={image} data-src={image}>
                <Image
                  alt="Card background"
                  className="object-cover rounded-none z-0"
                  src={image}
                  width="100%"
                />
              </Link>
            </LightGallery>
          )}
        </div>

        <div className="px-2">
          <p className="ps-4 text-xl font-medium mt-3 mb-1 hover:underline">
            <Link href={`/news-feed/${_id}`}>{title}</Link>
          </p>
          <div className="ps-4 flex gap-2 my-2">
            {category.map((item, index) => (
              <p
                key={index}
                className="px-1 py-[2px] text-primary dark:text-white border-2 border-primary dark:border-gray-500 text-[10px] rounded-md"
              >
                {item}
              </p>
            ))}
          </div>
        </div>
      </CardBody>

      <Divider className="my-2" />

      <CardFooter className="flex flex-col px-4">
        <PostFooter post={post} user={user as IUser} />
      </CardFooter>
    </Card>
  );
};

export default Post;
