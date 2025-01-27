"use client";

import { useRouter } from "next/navigation";

interface BuyNowBtn {
  title: string;
  description: string;
  price: number;
  discount: number;
  total: number;
  slug: string;
  phoneView?: {
    data?: {
      attributes?: {
        formats?: {
          medium?: {
            url: string;
          };
        };
      };
    };
  };
}

interface BuyNowBtnProps {
  products: BuyNowBtn;
}

const BuyNowBtn: React.FC<BuyNowBtnProps> = ({ products }) => {
  const router = useRouter();

  const handleBuyNow = () => {
    if (!products || Object.keys(products).length === 0) {
      console.log("No products available");
      alert("No products available");
      return;
    }

    // Store the product details in localStorage
    const { title, price, discount, total } = products;
    const productData = { title, price, discount, total };

    localStorage.setItem("productData", JSON.stringify(productData));

    // Redirect to the homepage with a query parameter
    router.push("/?scrollTo=products&payment=true");
  };

  return (
    <button
      onClick={handleBuyNow}
      className="h-10 w-[100px] rounded-full bg-gradient-to-r from-[#4a66fe] via-[#9852fe] to-[#ce45ff] text-white hover:bg-gradient-to-l active:bg-[#B529DC] hover:scale-105 duration-300"
    >
      Buy Now
    </button>
  );
};

export default BuyNowBtn;
