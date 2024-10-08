"use client"

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
  const [posts, setPosts] = useState<IPost[]>([]);
  const [page, setPage] = useState(1);
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

  const fetchPosts = async (currentPage: number, limit: number) => {
    const res = await axios.get("https://assignment-6-server-six.vercel.app/api/posts", {
      params: {
        sortBy: searchParams.get("sortBy") || "-createdAt",
        searchTerm: searchParams.get("searchTerm"),
        category: searchParams.get("category"),
        page: currentPage,
        limit,
      },
    });
    return res.data.data;
  };

  const loadMorePosts = async (initialLoad = false) => {
    if (loading || (!hasMore && !initialLoad)) return;

    setLoading(true);
    try {
      let newPosts: IPost[] = [];
      let currentPage = initialLoad ? 1 : page;
      const postsPerPage = 2; // Adjust this value as needed

      while (newPosts.length < postsPerPage && hasMore) {
        const fetchedPosts = await fetchPosts(currentPage, postsPerPage);
        if (fetchedPosts.length === 0) {
          setHasMore(false);
          break;
        }

        const filteredPosts = filterPremiumPosts(fetchedPosts, user?.isVerified);
        newPosts = [...newPosts, ...filteredPosts];
        currentPage++;
      }

      if (newPosts.length > 0) {
        setPosts((prevPosts) => [...(initialLoad ? [] : prevPosts), ...newPosts]);
        setPage(currentPage);
      } else if (!hasMore) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Failed to load posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial load
    const filteredInitialPosts = filterPremiumPosts(initialPosts, user?.isVerified);
    if (filteredInitialPosts.length > 0) {
      setPosts(filteredInitialPosts);
      setPage(2);
    } else {
      // If no initial posts pass the filter, fetch more
      loadMorePosts(true);
    }
  }, []);

  useEffect(() => {
    if (inView && !loading && hasMore) {
      loadMorePosts();
    }
  }, [inView]);

  useEffect(() => {
    // Reset posts and page when filters change
    loadMorePosts(true);
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
        {!hasMore && posts.length === 0 && <p>No posts available</p>}
        {!hasMore && posts.length > 0 && <p>No more posts to load</p>}
      </div>
    </>
  );
}