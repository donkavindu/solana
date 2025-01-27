"use client";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { pakageDetails } from "@/constants";
import Image from "next/image";
import Form from "../global/Form";
import { useState } from "react";
import succesimg from "@/public/assets/success.svg";

interface Step2Props {
  selectedProduct: {
    title: string;
    price: number;
    discount: number;
    total: number;
  };
  walletAddress: string | null;
  transactionHash: string | null;
  goBack: () => void;
  goToStep1: () => void;
}

const Step2: React.FC<Step2Props> = ({
  selectedProduct,
  goBack,
  goToStep1,
  walletAddress,
  transactionHash,
}) => {
  const t = useTranslations("Index");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  if (!walletAddress || !transactionHash) {
    console.error("Missing walletAddress or transactionHash");
    return <div>Error: Missing required wallet information</div>;
  }

  const handleFormSubmit = async (formData: any) => {
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create user");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const closeSuccess = () => {
    setPaymentSuccess(true);
  
    // Clear query parameters in the address bar
    const url = window.location.origin + window.location.pathname;
    window.history.replaceState({}, document.title, url);
  };
  

  return (
    <div
      data-aos="fade-up"
      data-aos-duration="2500"
      data-aos-delay="100"
      className="p-5"
    >
      <div className="flex items-center justify-center flex-col p-10">
        <h2 className="sm:text-[50px] text-[28px] text-white font-[400] text-center mb-6">
          <span className="bg-gradient-to-r from-pink-500 to-violet-500 text-transparent bg-clip-text">
            Process
          </span>{" "}
          the Payment
        </h2>
        <div className="w-full max-w-7xl mx-auto px-8">
          <div className="p-10 rounded-[20px] border border-[#FD60F3] bg-[#0B4F99]/30 min-h-[500px] text-white flex flex-col items-center">
            {paymentSuccess ? (
              <div className="lg:flex -md:flex-col w-full h-full gap-5 items-center justify-center">
                <div className="flex-1 h-full flex flex-col gap-10 justify-center">
                  <div className="w-full flex">
                    <div className="flex-[3] text-lg">Product</div>
                    <div className="flex-[5] text-lg">
                      : <span className="pl-10">{selectedProduct.title}</span>
                    </div>
                  </div>
                  <div className="w-full flex">
                    <div className="flex-[3] text-lg">Total</div>
                    <div className="flex-[5] text-lg">
                      :{" "}
                      <span className="pl-10">
                        ${selectedProduct.total}
                      </span>
                    </div>
                  </div>
                  <div className="w-full flex">
                    <div className="flex-[3] text-lg">Wallet Address</div>
                    <div className="flex-[5] text-lg">
                      :{" "}
                      <span className="pl-10">
                        {`${walletAddress.slice(0, 5)}.....${walletAddress.slice(-5)}`}
                      </span>
                    </div>
                  </div>
                  <div className="w-full flex">
                    <div className="flex-[3] text-lg">Transaction Hash</div>
                    <div className="flex-[5] text-lg">
                      :{" "}
                      <span className="pl-10">
                        {`${transactionHash.slice(0, 5)}.....${transactionHash.slice(-5)}`}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex-1 flex items-center justify-center h-full flex-col">
                  <Form
                    onSubmit={handleFormSubmit}
                    walletAddress={walletAddress}
                    transactionHash={transactionHash}
                    productName={selectedProduct.title}
                  />
                  <div className="flex gap-5 mt-10">
                    <Button
                      onClick={goToStep1}
                      className=" rounded-full bg-gradient-to-r from-[#4a66fe] via-[#9852fe] to-[#ce45ff] text-white hover:bg-gradient-to-l active:bg-[#B529DC] hover:scale-105 duration-300 flex items-end justify-center px-5"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={goBack}
                      className=" rounded-full bg-gradient-to-r from-[#4a66fe] via-[#9852fe] to-[#ce45ff] text-white hover:bg-gradient-to-l active:bg-[#B529DC] hover:scale-105 duration-300 flex items-end justify-center px-5"
                    >
                      Done
                    </Button>

                  </div>
                </div>
              </div>
            ) : (
              <div className="text-white flex justify-center items-center w-full h-full flex-col gap-3">
                <Image src={succesimg} alt="successimage" width={100} />
                <div className="text-2xl">Payment Successful!</div>
                <Button
                  onClick={closeSuccess}
                  className="rounded-full bg-gradient-to-r from-[#4a66fe] via-[#9852fe] to-[#ce45ff] text-white hover:bg-gradient-to-l active:bg-[#B529DC] hover:scale-105 duration-300 flex items-end justify-center px-12 mt-5"
                >
                  Done
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step2;
