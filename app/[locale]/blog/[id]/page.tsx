import TrandingSlides from "@/components/shared/blog/TrandingSlides";
import BlogSocial from "@/components/shared/global/BlogSocial";
// import { fetchBlogsById } from "@/lib/backend";
import Image from "next/image";
import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

export async function generateMetadata({ params }: any) {
  const result = await fetch(
    `${process.env.BACKEND}/blogs?filters[slug][$eq]=${params.id}&populate=*`
  );

  const data = await result.json();

  const dataResult = data.data;

  const { attributes } = dataResult[0];

  const { metatitle, metaauthor, metakeyword, metadescription } = attributes;
  const imageData = attributes.desktopView.data.attributes.formats;
  const imageUrl = imageData?.medium?.url;

  const fullImageUrl = `${process.env.FILE}${imageUrl}`;

  return {
    title: metatitle,
    description: metadescription,
    type: "website",
    applicationName: "Ranga Technology",
    authors: [{ name: metaauthor }],
    keywords: [metakeyword],

    images: [
      {
        url: fullImageUrl,
        width: 1200,
        height: 630,
        alt: metatitle,
      },
    ],
    openGraph: {
      title: metatitle,
      description: metadescription,
      type: "website",
      applicationName: "Ranga Technology",
      authors: [{ name: metaauthor }],
      keywords: [metakeyword],
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: metatitle,
        },
      ],
    },
    og: {
      title: metatitle,
      description: metadescription,
      type: "website",
      applicationName: "Ranga Technology",
      authors: [{ name: metaauthor }],
      keywords: [metakeyword],
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: metatitle,
        },
      ],
    },
  };
}

export const revalidate = 0;

const SingleBlog = async ({ params }: any) => {
  const result = await fetch(
    `${process.env.BACKEND}/blogs?filters[slug][$eq]=${params.id}&populate=*`
  );

  const data = await result.json();

  const dataResult = data.data;

  const { attributes } = dataResult[0];

  const { title, description, description2, description3 } = attributes;
  const imageData = attributes.desktopView.data.attributes.formats;
  const imageUrl = imageData?.large?.url;

  const image1Data = attributes.image1.data.attributes.formats;
  const image1Url = image1Data?.large?.url;
  
  const image2Data = attributes.image2.data.attributes.formats;
  const image2Url = image2Data?.large?.url;

  if (!attributes || !imageUrl) {
    return;
  }

  return (
    <div className="w-full mx-auto">
      <div className="relative w-4xl h-full w-full mx-auto">
        <div className="mx-auto max-w-[1150px] gap-10 bg-[#020000] px-5 pb-5">
          <div className="mt-5 rounded-3xl outline outline-1 outline-[#C946FB]">
            <Image
              src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${imageUrl}`}
              alt={`${title}`}
              width={1700}
              height={700}
              draggable="false"
              className="max-h-[420px] rounded-t-3xl bg-center object-cover"
            />
            <div className="p-6">
              <div className="flex w-full pb-8 justify-between items-center">
                <h2 className="h-full font-poppins font-medium  text-[#40E9FD] sm:text-[30px]">
                  {title}
                </h2>
                <BlogSocial />
              </div>
              <div className="prose prose-lg prose-invert max-h-full overflow-auto text-white font-poppins">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]} // Enable HTML parsing
                >
                  {description}
                </ReactMarkdown>
              </div>
              <Image
                src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${image1Url}`}
                alt={`${title}`}
                width={1700}
                height={700}
                draggable="false"
                className="max-h-[420px] bg-center object-cover my-2"
              />
              <div className="prose prose-lg prose-invert max-h-full overflow-auto text-white font-poppins">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]} // Enable HTML parsing
                >
                  {description2}
                </ReactMarkdown>
              </div>
              <Image
                src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${image2Url}`}
                alt={`${title}`}
                width={1700}
                height={700}
                draggable="false"
                className="max-h-[420px] bg-center object-cover my-2"
              />
              <div className="prose prose-lg prose-invert max-h-full overflow-auto text-white font-poppins">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]} // Enable HTML parsing
                >
                  {description3}
                </ReactMarkdown>
              </div>
            </div>
          </div>

          <TrandingSlides />
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
