"use client";

import GardeningQuotes from "@/src/components/UI/GardeningQuotes";
import useDebounce from "@/src/hooks/debounce.hook";
import { Input } from "@nextui-org/input";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { BsFillFilterSquareFill } from "react-icons/bs";
import FollowRequests from "../_components/page/home/FollowRequests";
import PopularPosts from "../_components/page/home/PopularPosts";
import CreatePostButton from "../_components/page/news-feed/CreatePostButton";
import Filters from "../_components/page/news-feed/Filters";
import { LoadMoreNewsFeed } from "../_components/page/news-feed/LoadMoreNewsFeed";
import { useSocket } from "@/src/context/socket.provider";
import { useNotifications } from "@/src/context/notification.provider";

const NewsFeed = () => {
  const [showFilters, setShowFilters] = useState(false);
  const filtersRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const router = useRouter();

  const socket = useSocket();
  const { notifications, markAsRead } = useNotifications();

  console.log(notifications);

  const { register, watch } = useForm({
    defaultValues: {
      search: searchParams.get("searchTerm") || "",
    },
  });

  const search = watch("search");
  const debouncedSearch = useDebounce(search, 500);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: globalThis.MouseEvent) => {
      if (
        filtersRef.current &&
        !filtersRef.current.contains(event.target as Node) &&
        !buttonRef.current?.contains(event.target as Node)
      ) {
        setShowFilters(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(searchParams.toString());

    if (debouncedSearch) {
      queryParams.set("searchTerm", debouncedSearch);
    } else {
      queryParams.delete("searchTerm");
    }

    router.push(`?${queryParams.toString()}`, { scroll: false });
  }, [debouncedSearch, searchParams]);

  const refetchNewsFeed = () => {
    queryClient.invalidateQueries({ queryKey: ["newsFeed"] });
  };

  useEffect(() => {
    refetchNewsFeed();
  }, [searchParams]);

  return (
    <div className="min-h-screen w-full ">
      <div className="container px-4 mt-2">
        <div className="flex justify-between flex-col lg:flex-row gap-8">
          {/* Main Content Area */}
          <main className=" lg:w-2/3 space-y-6 order-last lg:order-none">
            <div className="max-w-[600px] mx-auto">
            <div className="hidden md:block mb-6">
              <CreatePostButton />
            </div>
            <div className="flex justify-between gap-x-6 md:gap-x-20 relative mb-6">
              <Input
                size="sm"
                type="text"
                label="Search Post"
                {...register("search")}
              />
              <button
                ref={buttonRef}
                className="bg-primary text-white px-4 rounded-md hover:bg-primary/90 transition-colors"
                onClick={() => setShowFilters(!showFilters)}
              >
                <BsFillFilterSquareFill />
              </button>

              {showFilters && (
                <div
                  ref={filtersRef}
                  className="absolute top-12 right-0 z-50 mt-2 bg-white dark:bg-default shadow-lg rounded-lg p-4 w-full max-w-sm"
                >
                  <Filters />
                </div>
              )}
            </div>

            <LoadMoreNewsFeed />
            </div>
          </main>

          {/* Right Sidebar */}
          <aside className="hidden lg:block lg:w-1/3">
            <div className="sticky top-4 max-h-[100vh] overflow-y-auto bg-white dark:bg-default shadow-md rounded-lg p-4">
              <FollowRequests />
              <div>
                <GardeningQuotes />
              </div>
              <PopularPosts />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default NewsFeed;
