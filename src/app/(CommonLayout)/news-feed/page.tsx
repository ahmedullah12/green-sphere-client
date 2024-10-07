
import CreatePostButton from "../_components/page/news-feed/CreatePostButton";
import axiosInstance from "@/src/lib/AxiosInstance";
import { LoadMoreNewsFeed } from "../_components/page/news-feed/LoadMoreNewsFeed";
import Filters from "../_components/page/news-feed/Filters";
import GardeningQuotes from "@/src/components/UI/GardeningQuotes";

const NewsFeed = async ({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) => {
  const params = new URLSearchParams();
  Object.entries(searchParams).forEach(([key, value]) => {
    if (typeof value === 'string') {
      params.append(key, value);
    }
  });

  const res = await axiosInstance.get("/posts", {
    params: {
      sortBy: params.get("sortBy") || "-createdAt",
      searchTerm: params.get("searchTerm"),
      category: params.get("category"),
      page: 1,
      limit: 2,
    },
  });
  const initialPosts = await res.data.data;

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
            <LoadMoreNewsFeed initialPosts={initialPosts} />
          </main>

          {/* Right Sidebar (for large devices) */}
          <aside className="hidden lg:block lg:w-1/4">
            <div className="sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto bg-white dark:bg-default shadow-md rounded-lg p-4">
              <div className="mb-6">
                <CreatePostButton />
              </div>
              <div>
                <GardeningQuotes/>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default NewsFeed;