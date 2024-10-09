

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

  const filterPremiumPosts = (posts: IPost[], isVerified: boolean | undefined): IPost[] => {
    return posts.filter((post) => !post.tag || post.tag !== "PREMIUM" || isVerified);
  };

  const fetchPosts = async ({ pageParam = 1 }) => {
    const res = await axios.get("http://localhost:5000/api/posts", {
      params: {
        sortBy: searchParams.get("sortBy") || "-createdAt",
        searchTerm: searchParams.get("searchTerm"),
        category: searchParams.get("category"),
        page: pageParam,
        limit: 2,
      },
    });
    return res.data;
  };

  const { data, fetchNextPage, hasNextPage,  } = useInfiniteQuery({
    queryKey: ["newsFeed", searchParams],
    queryFn: fetchPosts,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.data.length === 0) return undefined;
      return allPages.length + 1;
    },
    staleTime: 1000 * 60 * 10,
    initialPageParam: 1,
  });
  

  const posts = data?.pages.flatMap((page) => filterPremiumPosts(page.data, user?.isVerified)) || [];

  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={fetchNextPage}
      hasMore={!!hasNextPage}
      loader={<div className="flex justify-center my-2"><Spinner /></div>}
      endMessage={<p className="text-center my-4">No more posts to load</p>}
      style={{overflow: ""}}
    >
      <div className="space-y-4">
      {posts.map((post: IPost) => (
        <Post key={post._id} post={post} />
      ))}
      </div>
    </InfiniteScroll>
  );
}
