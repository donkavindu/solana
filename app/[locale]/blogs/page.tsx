import BlogsItem from "@/components/shared/blog/BlogsItem";
import TrandingSlides from "@/components/shared/blog/TrandingSlides";
import { fetchBlogs, getHotBlogs, fetchNewBlogs } from "@/lib/backend";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Blogs",
  description:
    "Premier Blockchain Solutions. Cutting-Edge Blockchain Technology. Secure. Scalable. Revolutionary.",
};

export const revalidate = 0;

const Blogs = async () => {
  const blogData = await fetchBlogs();
  const hotBlogs = await getHotBlogs();
  const newBlogData= await fetchNewBlogs()

  return (
    <div className="w-full mx-auto">
      <div className="relative w-4xl w-full mx-auto">
        <div className="mx-auto max-w-[1150px] h-full bg-[#020000] px-5">
          <div>
            <BlogsItem blogs={blogData} hotBlogs={hotBlogs}/>
          </div>
          <TrandingSlides />
        </div>
      </div>
    </div>
  );
};

export default Blogs;
