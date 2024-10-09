"use client"

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import CreatePostButton from "../_components/page/news-feed/CreatePostButton";
import Filters from "../_components/page/news-feed/Filters";
import GardeningQuotes from "@/src/components/UI/GardeningQuotes";
import { useQueryClient } from "@tanstack/react-query";
import { LoadMoreNewsFeed } from "../_components/page/news-feed/LoadMoreNewsFeed";

const NewsFeed = () => {
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const refetchNewsFeed = () => {
    queryClient.invalidateQueries({ queryKey: ["newsFeed"] });
  };

  useEffect(() => {
    refetchNewsFeed();
  }, [searchParams]);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 mt-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar and Filters */}
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
            <LoadMoreNewsFeed />
          </main>

          {/* Right Sidebar */}
          <aside className="hidden lg:block lg:w-1/4">
            <div className="sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto bg-white dark:bg-default shadow-md rounded-lg p-4">
              <div className="mb-6">
                <CreatePostButton />
              </div>
              <div>
                <GardeningQuotes />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default NewsFeed;
