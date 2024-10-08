import axiosInstance from "@/src/lib/AxiosInstance";
import { IPost } from "@/src/types";
import Container from "@/src/components/UI/Container";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import PostCard from "../../_components/shared/PostCard";

const PopularPosts = async () => {
  const res = await axiosInstance.get("/posts", {
    params: {
      sortBy: "-upvotes",
    },
  });

  const allPosts = await res.data;
  const posts = allPosts?.data
    ?.filter((post: IPost) => post.tag !== "PREMIUM")
    .slice(0, 4);

  return (
    <Container>
      <div className="mb-14">
        <h1 className="text-3xl text-center font-bold mb-5">Popular Posts</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {posts?.map((post: IPost) => (
            <PostCard post={post} key={post._id}></PostCard>
          ))}
        </div>
        <div className="flex justify-center mt-6">
          <Link href={"/news-feed?sortBy=-upvotes"}>
            <Button className="bg-primary dark:bg-default text-white">
              See All
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default PopularPosts;
