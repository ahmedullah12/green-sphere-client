import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import { Spinner } from "@nextui-org/spinner";
import Post from "@/src/components/UI/Post/Post";
import { IPost } from "@/src/types";
import { useUser } from "@/src/context/user.provider";
import axios from "axios";

export function LoadMoreNewsFeed() {
  const { user } = useUser();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const refetchNewsFeed = () => {
    queryClient.invalidateQueries({ queryKey: ["newsFeed"] });
  };

  const filterPremiumPosts = (
    posts: IPost[],
    isVerified: boolean | undefined
  ): IPost[] => {
    return posts.filter(
      (post) => !post.tag || post.tag !== "PREMIUM" || isVerified
    );
  };

  const fetchPosts = async ({ pageParam = 1 }) => {
    const res = await axios.get(
      "https://assignment-6-server-six.vercel.app/api/posts",
      {
        params: {
          sortBy: searchParams.get("sortBy") || "-createdAt",
          searchTerm: searchParams.get("searchTerm"),
          category: searchParams.get("category"),
          page: pageParam,
          limit: 2,
        },
      }
    );
    console.log("Fetched data:", res.data);
    return res.data;
  };

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["newsFeed", searchParams.toString()],
    queryFn: fetchPosts,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.data.length === 0) return undefined;
      return allPages.length + 1;
    },
    staleTime: 1000 * 60, // 1 minute
    refetchOnWindowFocus: true,
    refetchInterval: 60000, // refetch every minute
    select: (data) => {
      const allPosts = data.pages.flatMap((page) => page.data);
      const uniquePosts = Array.from(
        new Map(allPosts.map((post) => [post._id, post])).values()
      );
      return {
        pages: data.pages,
        pageParams: data.pageParams,
        uniquePosts,
      };
    },
    initialPageParam: 1,
  });

  const posts = data?.uniquePosts || [];
  const sortedPosts = React.useMemo(() => {
    return [...posts].sort((a, b) => {
      if (searchParams.get("sortBy") === "-upvotes") {
        return b.upvotes - a.upvotes;
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [posts, searchParams]);

  const filteredPosts = React.useMemo(() => {
    return filterPremiumPosts(sortedPosts, user?.isVerified);
  }, [sortedPosts, user?.isVerified]);

  console.log("Rendered posts:", filteredPosts);

  return (
    <InfiniteScroll
      dataLength={filteredPosts.length}
      next={fetchNextPage}
      hasMore={!!hasNextPage}
      loader={
        <div className="flex justify-center my-2">
          <Spinner />
        </div>
      }
      endMessage={<p className="text-center my-4">No more posts to load</p>}
      style={{ overflow: "visible" }}
    >
      <div className="space-y-4">
        {filteredPosts.map((post: IPost) => (
          <Post
            key={post._id}
            post={post}
            //  refetchNewsFeed={refetchNewsFeed}
          />
        ))}
      </div>
    </InfiniteScroll>
  );
}
