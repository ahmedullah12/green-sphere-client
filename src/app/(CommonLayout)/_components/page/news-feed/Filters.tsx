"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { POST_CATEGORY } from "@/src/constants";
import useDebounce from "@/src/hooks/debounce.hook";

const Filters = () => {
  const { register, watch, setValue, control } = useForm({
    defaultValues: {
      search: "",
      category: "",
      sortBy: "",  // Allow dynamic sortBy
    },
  });

  const router = useRouter();
  const search = watch("search");
  const category = watch("category");
  const sortBy = watch("sortBy");
  const debouncedSearch = useDebounce(search, 500);

  // Determine default sort logic based on search/category
  const derivedSortBy = debouncedSearch || category ? "-upvotes" : sortBy || "-createdAt";

  useEffect(() => {
    const queryParams = new URLSearchParams();

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

    // Set the sorting logic, by default -upvotes when there's search/category
    queryParams.set("sortBy", derivedSortBy);

    router.push(`?${queryParams.toString()}`, { scroll: false });
  }, [debouncedSearch, category, derivedSortBy, router]);

  return (
    <div className="w-full flex flex-col gap-6">
      <Input
        size="sm"
        type="text"
        label="Search Post"
        {...register("search")}
      />

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

        {/* Optional: Sort by Filter */}
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
              <SelectItem key="upvotes" value="upvotes">
                Fewest Upvotes
              </SelectItem>
            </Select>
          )}
        />
      </div>
    </div>
  );
};

export default Filters;
