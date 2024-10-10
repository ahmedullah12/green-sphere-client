"use client"

import { useUser } from "@/src/context/user.provider";
import { useGetMyPosts } from "@/src/hooks/posts.hooks";
import Loading from "@/src/components/UI/Loading";
import EditPostModal from "@/src/components/modals/EditPostModal";
import DeletePostModal from "@/src/components/modals/DeletePostModal";
import { IPost } from "@/src/types";
import GSTable from "@/src/components/UI/Table";
import Link from "next/link";

const UserDashboard = () => {
  const { user } = useUser();
  const { data: myPosts, isLoading } = useGetMyPosts(user?._id as string);

  // Define columns structure
  const columns = [
    { key: "image", label: "" },
    { key: "title", label: "Title" },
    { key: "tag", label: "Tag" },
    { key: "upvotes", label: "Upvotes" },
    { key: "createdAt", label: "CreatedAt" },
    { key: "actions", label: "" },
  ];

  // Define rows by mapping posts data
  const rows = myPosts?.data?.map((post: IPost) => ({
    key: post._id,
    image: <img src={post.image} alt={post.title} className="w-10 h-10 object-cover rounded-md" />, 
    title: (
      <Link href={`/news-feed/post/${post._id}`} className="hover:underline text-blue-600">
        <span title={post.title}>
          {post.title.length > 30 ? post.title.substring(0, 30) + '...' : post.title}
        </span>
      </Link>
    ),
    tag: post.tag,
    upvotes: post.upvotes.length,
    createdAt: new Date(post.createdAt).toLocaleDateString(),
    actions: (
      <>
        <EditPostModal postData={post} />
        <DeletePostModal postId={post._id} />
      </>
    ),
  }));

  if (isLoading) return <Loading />;

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Your Posts</h1>
      <div className="w-full h-[1px] bg-accent my-6"></div>
      <GSTable columns={columns} rows={rows || []} />
    </div>
  );
};

export default UserDashboard;