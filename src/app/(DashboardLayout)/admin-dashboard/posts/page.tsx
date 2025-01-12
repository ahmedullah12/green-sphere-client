"use client";

import React from "react";
import DeletePostModal from "@/src/components/modals/DeletePostModal";
import Loading from "@/src/components/UI/Loading";
import GSTable from "@/src/components/UI/Table";
import { useGetPosts } from "@/src/hooks/posts.hooks";
import { IPost } from "@/src/types";
import Link from "next/link";

const AdminDashboard = () => {
  const { data: posts, isLoading } = useGetPosts();

  const columns = [
    { key: "image", label: "" },
    { key: "title", label: "Title" },
    { key: "userName", label: "User Name" },
    { key: "tag", label: "Tag" },
    { key: "upvotes", label: "Upvotes" },
    { key: "createdAt", label: "CreatedAt" },
    { key: "actions", label: "" },
  ];

  const rows = posts?.map((post: IPost) => ({
    key: post._id,
    image: (
      <img
        src={post.image}
        alt={"post"}
        className="w-10 h-10 object-cover rounded-md"
      />
    ),
    title: (
      <Link
        href={`/news-feed/post/${post._id}`}
        className="hover:underline text-blue-600"
      >
        <span title={post.title}>
          {post.title.length > 30
            ? post.title.substring(0, 30) + "..."
            : post.title}
        </span>
      </Link>
    ),
    userName: (
      <Link
        href={`/profile/${post.userId._id}`}
        className="hover:underline text-blue-600"
      >
        <span>{post.userId.name}</span>
      </Link>
    ),
    tag: post.tag,
    upvotes: post.upvotes.length,
    createdAt: new Date(post.createdAt).toLocaleDateString(),
    actions: (
      <>
        <DeletePostModal postId={post._id} />
      </>
    ),
  }));

  if (isLoading) return <Loading />;

  return (
    <div className="">
      <h2 className="text-xl font-semibold">All Posts</h2>
      <div className="w-full h-[1px] bg-accent my-6"></div>
      <div className="mb-6 md:mb-10">
        <GSTable columns={columns} rows={rows || []} />
      </div>
     
    </div>
  );
};

export default AdminDashboard;
