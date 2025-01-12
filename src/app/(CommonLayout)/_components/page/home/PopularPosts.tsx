"use client";

import { IPost } from "@/src/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ArrowUp, Loader2 } from "lucide-react";
import Link from "next/link";

const fetchPopularPosts = async () => {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API}/posts`, {
    params: {
      sortBy: "-upvotes",
      limit: 5,
    },
  });
  return data;
};

const PopularPosts = () => {
  const {
    data: postsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["popularPosts"],
    queryFn: fetchPopularPosts,
  });

  const posts = postsData?.data?.filter(
    (post: IPost) => post.tag !== "PREMIUM"
  );

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <ArrowUp className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold">Popular Posts</h2>
        </div>
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <ArrowUp className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold">Popular Posts</h2>
        </div>
        <div className="text-red-500 text-sm text-center py-4">
          Unable to load popular posts
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <ArrowUp className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold">Popular Posts</h2>
      </div>
      <div className="space-y-4">
        {posts?.map((post: IPost, index: number) => (
          <Link 
            href={`/posts/${post._id}`} 
            key={post._id}
            className="block group"
          >
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-sm font-medium text-gray-600 dark:text-gray-300">
                {index + 1}
              </span>
              <div className="flex-1">
                <h3 className="text-sm font-medium group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>
                
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularPosts;