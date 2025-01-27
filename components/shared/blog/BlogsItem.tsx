"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import TrendBlogCards from "./BlogCard";
import HotBlogs from "./HotBlogs";

const BlogsItem = ({ blogs, hotBlogs }: any) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    // Fetch categories from the backend
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://92.205.233.9:1338/api/blogscategories?populate=*");
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();
        const categoryNames = data.data.map((category: any) => category.attributes.category);
        setCategories(["All", ...categoryNames]); // Add "All" as the default category
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const filteredArticles =
    selectedCategory === "All"
      ? blogs
      : blogs.filter(
          (article: any) => article.attributes.category === selectedCategory
        );

  // Sort the filtered articles by the 'updatedAt' date first, then by time in descending order
  const sortedArticles = filteredArticles.sort((a: any, b: any) => {
    const dateA = new Date(a.attributes.updatedAt);
    const dateB = new Date(b.attributes.updatedAt);

    // First, compare by date (year, month, day)
    if (dateA.getFullYear() !== dateB.getFullYear()) {
      return dateB.getFullYear() - dateA.getFullYear(); // Sort by year, latest first
    }
    if (dateA.getMonth() !== dateB.getMonth()) {
      return dateB.getMonth() - dateA.getMonth(); // Sort by month
    }
    if (dateA.getDate() !== dateB.getDate()) {
      return dateB.getDate() - dateA.getDate(); // Sort by day
    }

    // If dates are equal, compare by time (hours, minutes, seconds)
    return dateB.getTime() - dateA.getTime(); // Sort by time, latest first
  });

  return (
    <div className="mx-auto max-w-[1150px]">
      <div className="flex flex-wrap justify-center gap-4 space-x-4 py-4 sm:justify-between">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`cursor-pointer rounded-full border bg-transparent px-8 py-2  text-white ${
              selectedCategory === category
                ? "bg-white  !text-black"
                : "hover:bg-white/20"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      <div>
        <HotBlogs hotBlogs={hotBlogs} />
      </div>
      <div className="grid flex-1 gap-x-4 sm:grid-cols-2 md:grid-cols-3 ">
        {sortedArticles.length > 0 ? (
          sortedArticles.map((item: any) => (
            <TrendBlogCards key={item.id} item={item} />
          ))
        ) : (
          <div className="col-span-4 flex h-[40vh] flex-col items-center justify-center">
            <h4 className="text-center text-3xl text-white">No data found</h4>
            <p className="text-center text-white">
              Please select another category
            </p>
            <Link
              href="/"
              className="mt-6 rounded-full bg-blue-500 hover:bg-blue-600 p-1 px-4 text-center text-white"
            >
              Back Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogsItem;
