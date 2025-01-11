"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { Select, SelectItem } from "@nextui-org/select";
import { POST_CATEGORY } from "@/src/constants";

import { useEffect } from "react";

const Filters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {  watch, control, } = useForm({
    defaultValues: {
      
      category: searchParams.get("category") || "",
      sortBy: searchParams.get("sortBy") || "-createdAt",
    },
  });

  
  const category = watch("category");
  const sortBy = watch("sortBy");
  

  useEffect(() => {
    const queryParams = new URLSearchParams(searchParams.toString());

    

    if (category) {
      queryParams.set("category", category);
    } else {
      queryParams.delete("category");
    }

    queryParams.set("sortBy", sortBy);

    router.push(`?${queryParams.toString()}`, { scroll: false });
  }, [ category, sortBy, router, searchParams]);

  return (
    <div className="w-full flex flex-col gap-6">
     

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
