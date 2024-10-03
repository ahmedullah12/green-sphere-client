import Post from "@/src/components/UI/Post";
import Filters from "../_components/page/news-feed/Filters";
import { IPost } from "@/src/types";
import axiosInstance from "@/src/lib/AxiosInstance";
import CreatePostButton from "../_components/page/news-feed/CreatePostButton";

const NewsFeed = async () => {
  const res = await axiosInstance.get("/posts", {
    params: {
      sortBy: "-createdAt",
    },
  });
  const posts = await res.data;

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 mt-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar */}
          <aside className="lg:w-1/4">
            <div className="sticky top-4 max-h-[calc(100vh-64px)] overflow-y-auto bg-white dark:bg-default shadow-md rounded-lg p-4">
              <Filters />
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="lg:w-1/2 space-y-6">
            {posts?.data.map((post: IPost) => (
              <Post key={post._id} post={post} />
            ))}
          </main>

          {/* Right Sidebar */}
          <aside className="lg:w-1/4">
            <div className="sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto bg-white dark:bg-default shadow-md rounded-lg p-4">
              <div className="mb-6">
                <CreatePostButton />
              </div>
              {/* You can uncomment and add TrendingTopics here if needed */}
              {/* <TrendingTopics /> */}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default NewsFeed;