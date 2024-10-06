import Post from "@/src/components/UI/Post/Post";
import Filters from "../_components/page/news-feed/Filters";
import { IPost } from "@/src/types";
import axiosInstance from "@/src/lib/AxiosInstance";
import CreatePostButton from "../_components/page/news-feed/CreatePostButton";

const NewsFeed = async ({ searchParams }: { searchParams: any }) => {
  const params = new URLSearchParams(searchParams);

  const res = await axiosInstance.get("/posts", {
    params: {
      sortBy: params.get("sortBy") || "-createdAt",
      searchTerm: params.get("searchTerm"),
      category: params.get("category"),
    },
  });
  const posts = await res.data;

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 mt-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar and Create Post Button (for small devices) */}
          <div className="lg:w-1/4 flex flex-col gap-4">
            <div className="sticky top-4 max-h-[calc(100vh-64px)] overflow-y-auto bg-white dark:bg-default shadow-md rounded-lg p-4">
              <Filters />
            </div>
            <div className="lg:hidden">
              <CreatePostButton />
            </div>
          </div>

          {/* Main Content Area */}
          <main className="lg:w-1/2 space-y-6 order-last lg:order-none">
            {posts?.data.map((post: IPost) => (
              <Post key={post._id} post={post} />
            ))}
          </main>

          {/* Right Sidebar (for large devices) */}
          <aside className="hidden lg:block lg:w-1/4">
            <div className="sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto bg-white dark:bg-default shadow-md rounded-lg p-4">
              <div className="mb-6">
                <CreatePostButton />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default NewsFeed;
