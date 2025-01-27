"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import Step1 from "./Step1";
import Step2 from "./Step2";

interface Product {
  id: number;
  attributes: {
    title: string;
    description: string;
    price: number;
    discount: number;
    total: number;
    slug: string;
    phoneView: {
      data: {
        attributes: {
          formats?: {
            medium?: {
              url: string;
            };
          };
        };
      };
    };
  };
}

interface ProductsProps {
  products: Product[];
}

const Products: React.FC<ProductsProps> = ({ products }) => {
  const t = useTranslations("Index");
  const [selectedProduct, setSelectedProduct] = useState<Product["attributes"] | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [transactionHash, setTransactionHash] = useState<string | null>(null);
  const [productData, setProductData] = useState<any>(null); // To store product data from localStorage
  const router = useRouter();
  const searchParams = useSearchParams();

  // Check if window is defined to avoid issues during SSR
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedProductData = localStorage.getItem("productData");
      if (storedProductData) {
        setProductData(JSON.parse(storedProductData));
      }
    }
  }, []);

  useEffect(() => {
    if (searchParams) {
      const success = searchParams.get("success") === "true";
      const product = searchParams.get("product");
      const price = searchParams.get("price");
      const sessionId = searchParams.get("session_id");
      const customerId = searchParams.get("customer_id");
      const goToPay=searchParams.get("payment")
      const storedProductData = localStorage.getItem('productData');
  const productData = storedProductData ? JSON.parse(storedProductData) : {};

  if (productData&&goToPay==="true") {
    setSelectedProduct({
      title: productData.title,
      description: productData.description || "No description available",
      price: productData.price || 0,
      discount: productData.discount || 0,
      total: productData.total || 0,
      slug: productData.slug || "default-slug",
      phoneView: {
        data: {
          attributes: {
            formats: {
              medium: {
                url: productData.phoneView?.data?.attributes?.formats?.medium?.url || "",
              },
            },
          },
        },
      },
    });
  }

      if (success && product && price && sessionId && customerId) {
        setSelectedProduct({
          title: decodeURIComponent(product),
          description: "Payment Successful",
          price: parseFloat(price) / 100,
          discount: 0,
          total: parseFloat(price) / 100,
          slug: "payment-success",
          phoneView: { data: { attributes: {} } },
        });
        setWalletAddress(customerId); // Set walletAddress to customerId
        setTransactionHash(sessionId); // Set transactionHash to sessionId
        setCurrentStep(2);
      }
    }
  }, [searchParams]);



  const handleBuyNow = (product: Product["attributes"]) => {
    setSelectedProduct(product);
    setCurrentStep(1);
  };

  const goBack = () => {
    setSelectedProduct(null);
    setCurrentStep(1);
    router.push('/');
  };

  const goToStep1 = () => {
    setCurrentStep(1);
  };

  const goToNextStep = (walletAddress: string, transactionHash: string) => {
    setWalletAddress(walletAddress);
    setTransactionHash(transactionHash);
    setCurrentStep(2);
  };

  return (
    <>
      {currentStep === 2 && selectedProduct ? (
        <Step2
          selectedProduct={selectedProduct}
          goBack={goBack}
          goToStep1={goToStep1}
          walletAddress={walletAddress}
          transactionHash={transactionHash}
        />
      ) : selectedProduct ? (
        <Step1
          selectedProduct={selectedProduct}
          goBack={goBack}
          goToNextStep={goToNextStep}
        />
      ) : (
        <div
          data-aos="fade-up"
          data-aos-duration="2500"
          data-aos-delay="100"
          className="p-5"
        >
          <div>
            <h2 className="sm:text-[50px] text-[28px] text-white font-[400] text-center mb-6">
              <span className="bg-gradient-to-r from-pink-500 to-violet-500 text-transparent bg-clip-text">
                {t("solanaProducts.titleA")}
              </span>{" "}
              {t("solanaProducts.titleB")}
            </h2>
          </div>

          <div className="w-full mx-auto relative">
            <div className="relative mx-auto max-w-[1150px] px-5">
              <div className="mt-5 max-w-[1150px] mx-auto grid gap-x-7 sm:grid-cols-2 md:grid-cols-3">
                {products.map((item: Product) => (
                  <div
                    key={item.id}
                    className="z-10 mx-auto my-4 max-w-[357px] rounded-xl bg-gradient-to-r hover:bg-gradient-to-l from-[#C946FB] via-[#C946FB] to-[#6161FB] p-[1px] hover:scale-105 duration-300"
                  >
                    <div>
                      <Link href={`/en/product/${item.attributes.slug}`}>
                        <Image
                          src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${item.attributes.phoneView.data.attributes.formats?.medium?.url}`}
                          alt={item.attributes.title}
                          width={400}
                          height={230}
                          draggable="false"
                          className="h-[230px] overflow-hidden rounded-t-xl object-cover"
                        />
                      </Link>
                    </div>
                    <div className="rounded-b-xl bg-[#020000] p-5 px-12 flex flex-col items-center">
                      <div className="line-clamp-1 font-poppins text-[18px] font-bold text-[#40E9FD]">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          rehypePlugins={[rehypeRaw]} // Enable HTML parsing
                        >
                          {item.attributes.title}
                        </ReactMarkdown>
                      </div>
                      <div className="line-clamp-2 font-poppins pt-3 text-[12px] font-normal text-white text-center">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          rehypePlugins={[rehypeRaw]} // Enable HTML parsing
                        >
                          {item.attributes.description}
                        </ReactMarkdown>
                      </div>
                      <Button
                        onClick={() => handleBuyNow(item.attributes)}
                        className="h-10 w-[100px] rounded-full bg-gradient-to-r from-[#4a66fe] via-[#9852fe] to-[#ce45ff] text-white hover:bg-gradient-to-l active:bg-[#B529DC] hover:scale-105 duration-300 mt-3"
                      >
                        Buy Now
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Products;
