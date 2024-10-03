"use client"

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
    },
  });

  const router = useRouter();
  const search = watch("search");
  const category = watch("category");
  const debouncedSearch = useDebounce(search, 500);

  // Update the URL when debounced search or category changes
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

    // Update the URL without reloading the page
    router.push(`?${queryParams.toString()}`, { scroll: false });
  }, [debouncedSearch, category, router]);

  return (
    <div className="w-full flex flex-col gap-6">
      <Input
        size="sm"
        type="text"
        label="Search Post"
        {...register("search")}
      />

      {/* Categories Filter */}
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
      </div>
    </div>
  );
};

export default Filters;