"use client"

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useInView } from "react-intersection-observer";
import { IPost } from "@/src/types";
import Post from "@/src/components/UI/Post/Post";
import { Spinner } from "@nextui-org/spinner";
import axios from "axios";

export function LoadMoreNewsFeed({ initialPosts }: { initialPosts: IPost[] }) {
  const [posts, setPosts] = useState<IPost[]>(initialPosts);
  const [page, setPage] = useState(2); // Start from the next page
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const searchParams = useSearchParams();

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const loadMorePosts = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/posts", {
        params: {
          sortBy: searchParams.get("sortBy") || "-createdAt",
          searchTerm: searchParams.get("searchTerm"),
          category: searchParams.get("category"),
          page,
          limit: 1,
        },
      });

      const newPosts = res.data.data;

      if (newPosts.length === 0) {
        setHasMore(false);
      } else {
        setPosts((prevPosts) => [...prevPosts, ...newPosts]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error("Failed to load more posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (inView && !loading && hasMore) {
      loadMorePosts();
    }
  }, [inView]);

  return (
    <>
      {posts.map((post: IPost) => (
        <Post key={post._id} post={post} />
      ))}

      <div 
        ref={ref} 
        className="flex justify-center items-center h-20 my-4"
      >
        {loading && <Spinner />}
        {!hasMore && <p>No more posts to load</p>}
      </div>
    </>
  );
}