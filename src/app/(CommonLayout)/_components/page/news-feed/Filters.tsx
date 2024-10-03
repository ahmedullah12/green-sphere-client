// components/Filters.tsx
"use client";

import { useState } from "react";

const Filters = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleCategoryChange = (category: string) => {
    setCategory(category);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Search Field */}
      <input
        type="text"
        placeholder="Search posts..."
        value={search}
        onChange={handleSearch}
        className="px-4 py-2 border rounded"
      />

      {/* Categories Filter */}
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">Filter by Category:</h3>
        <button
          className={`py-2 px-4 rounded ${category === "flowers" ? "bg-primary text-white" : "bg-gray-200"}`}
          onClick={() => handleCategoryChange("flowers")}
        >
          Flowers
        </button>
        <button
          className={`py-2 px-4 rounded ${category === "vegetables" ? "bg-primary text-white" : "bg-gray-200"}`}
          onClick={() => handleCategoryChange("vegetables")}
        >
          Vegetables
        </button>
        <button
          className={`py-2 px-4 rounded ${category === "" ? "bg-primary text-white" : "bg-gray-200"}`}
          onClick={() => handleCategoryChange("")}
        >
          All
        </button>
      </div>
    </div>
  );
};

export default Filters;
