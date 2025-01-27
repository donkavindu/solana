import Image from "next/image";
import Link from "next/link";
import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

const TrendBlogCards = ({ item }: any) => {
  const { id, attributes } = item;
  const { title, slug, description } = attributes;
  const imageData = attributes.phoneView.data.attributes.formats;
  const imageUrl = imageData?.medium?.url;

  return (
    <>
      <Link
        href={`/en/blog/${slug}`}
        className="z-10 mx-auto my-4 max-w-[357px]  rounded-xl bg-gradient-to-r from-[#C946FB] via-[#C946FB] to-[#6161FB] p-[1px]"
      >
        <div>
          <Image
            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${imageUrl}`}
            alt=""
            width={400}
            height={230}
            draggable="false"
            className="h-[230px] overflow-hidden rounded-t-xl object-cover"
          />
        </div>
        <div className="rounded-b-xl bg-[#020000] p-5 px-12">
          <p className="line-clamp-1 font-poppins text-[18px] font-bold text-[#40E9FD]">
            {title}
          </p>
          <div className="line-clamp-2 font-poppins pt-3 text-[12px] font-normal text-white">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]} // Enable HTML parsing
            >
              {description}
            </ReactMarkdown>
          </div>
        </div>
      </Link>
    </>
  );
};

export default TrendBlogCards;
