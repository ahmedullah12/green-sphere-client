"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useInView } from "react-intersection-observer";
import { IPost } from "@/src/types";
import Post from "@/src/components/UI/Post/Post";
import { Spinner } from "@nextui-org/spinner";
import axios from "axios";
import { useUser } from "@/src/context/user.provider";

export function LoadMoreNewsFeed({ initialPosts }: { initialPosts: IPost[] }) {
  const { user } = useUser();
  const [posts, setPosts] = useState<IPost[]>(filterPremiumPosts(initialPosts, user?.isVerified));
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const searchParams = useSearchParams();

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  function filterPremiumPosts(posts: IPost[], isVerified: boolean | undefined): IPost[] {
    return posts.filter(post => !post.tag || post.tag !== "PREMIUM" || isVerified);
  }

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
          limit: 10,
        },
      });

      const newPosts = filterPremiumPosts(res.data.data, user?.isVerified);

      if (newPosts.length === 0) {
        setHasMore(false);
      } else {
        setPosts((prevPosts) => [...prevPosts, ...newPosts]);
        setPage((prevPage) => prevPage + 1);
      }

      // If we filtered out all posts, try to load more
      if (res.data.data.length > 0 && newPosts.length === 0) {
        loadMorePosts();
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

  useEffect(() => {
    // Reset posts and page when filters change
    const fetchInitialPosts = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:5000/api/posts", {
          params: {
            sortBy: searchParams.get("sortBy") || "-createdAt",
            searchTerm: searchParams.get("searchTerm"),
            category: searchParams.get("category"),
            page: 1,
            limit: 10,
          },
        });
        const filteredPosts = filterPremiumPosts(res.data.data, user?.isVerified);
        setPosts(filteredPosts);
        setPage(2);
        setHasMore(filteredPosts.length > 0);
      } catch (error) {
        console.error("Failed to fetch initial posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialPosts();
  }, [searchParams, user?.isVerified]);

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