import axiosInstance from "@/src/lib/AxiosInstance";
import PostCard from "../../shared/PostCard";
import { IPost } from "@/src/types";
import Container from "@/src/components/UI/Container";

const PopularPosts = async () => {
  const res = await axiosInstance.get("/posts", {
    params: {
      sortBy: "-upvotes",
    },
  });
  const posts = await res.data;
  return (
    <Container>
      <div className="mb-10">
        <h1 className="text-3xl text-center font-bold mb-5">Popular Posts</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {posts?.data.map((post: IPost) => (
            <PostCard post={post} key={post._id}></PostCard>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default PopularPosts;
