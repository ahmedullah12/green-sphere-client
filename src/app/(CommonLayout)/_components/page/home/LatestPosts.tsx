import axiosInstance from "@/src/lib/AxiosInstance";
import PostCard from "../../shared/PostCard";
import { IPost } from "@/src/types";
import Container from "@/src/components/UI/Container";

const LatestPosts = async () => {
  const res = await axiosInstance.get("/posts", {
    params: {
      sortBy: "-createdAt",
    },
  });
  const posts = await res.data;
  console.log(posts);
  return (
    <Container>
      <div>
        <h1>This is the LatestPosts component</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {posts?.data.map((post: IPost) => (
            <PostCard post={post} key={post._id}></PostCard>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default LatestPosts;
