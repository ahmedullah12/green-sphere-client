"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { POST_CATEGORY } from "@/src/constants";
import useDebounce from "@/src/hooks/debounce.hook";
import { useEffect } from "react";

const Filters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { register, watch, control, setValue } = useForm({
    defaultValues: {
      search: searchParams.get("searchTerm") || "",
      category: searchParams.get("category") || "",
      sortBy: searchParams.get("sortBy") || "-createdAt",
    },
  });

  const search = watch("search");
  const category = watch("category");
  const sortBy = watch("sortBy");
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    const queryParams = new URLSearchParams(searchParams.toString());

    if (debouncedSearch) {
      queryParams.set("searchTerm", debouncedSearch);
    } else {
      queryParams.delete("searchTerm");
    }

    if (category) {
      queryParams.set("category", category);
    } else {
      queryParams.delete("category");
    }

    queryParams.set("sortBy", sortBy);

    router.push(`?${queryParams.toString()}`, { scroll: false });
  }, [debouncedSearch, category, sortBy, router, searchParams]);

  return (
    <div className="w-full flex flex-col gap-6">
      <Input size="sm" type="text" label="Search Post" {...register("search")} />

      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">Filters</h3>

        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <Select
              size="sm"
              label="Select a category"
              className="max-w-xs"
              selectedKeys={field.value ? [field.value] : []}
              onSelectionChange={(keys) => {
                const selectedValue = Array.from(keys).join("");
                field.onChange(selectedValue);
              }}
            >
              {Object.entries(POST_CATEGORY).map(([key, value]) => (
                <SelectItem key={value} value={value}>
                  {key.replace("_", " ")}
                </SelectItem>
              ))}
            </Select>
          )}
        />

        <Controller
          name="sortBy"
          control={control}
          render={({ field }) => (
            <Select
              size="sm"
              label="Sort by"
              className="max-w-xs"
              selectedKeys={field.value ? [field.value] : []}
              onSelectionChange={(keys) => {
                const selectedValue = Array.from(keys).join("");
                field.onChange(selectedValue);
              }}
            >
              <SelectItem key="-createdAt" value="-createdAt">
                Newest First
              </SelectItem>
              <SelectItem key="createdAt" value="createdAt">
                Oldest First
              </SelectItem>
              <SelectItem key="-upvotes" value="-upvotes">
                Most Upvotes
              </SelectItem>
            </Select>
          )}
        />
      </div>
    </div>
  );
};

export default Filters;
