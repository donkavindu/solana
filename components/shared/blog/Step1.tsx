import { Button } from "@/components/ui/button";
import { fetchProducts } from "@/lib/backend";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios for API calls
import WalletConnect from "./WalletConnect";
import CheckoutButton from "@/components/ui/CheckoutButton";
import linkLogo from "@/public/assets/link logo.png";

interface Step1Props {
  selectedProduct: {
    title: string;
    price: number;
    discount: number;
    total: number;
  };
  goBack: () => void;
  goToNextStep: (walletAddress: string, transactionHash: string) => void;
}

const Step1: React.FC<Step1Props> = ({
  selectedProduct,
  goBack,
  goToNextStep,
}) => {
  const [walletAddress, setWalletAddress] = useState("null2");
  const [transactionHash, setTransactionHash] = useState("null2");
  const [cryptoPrices, setCryptoPrices] = useState({
    ETH: 0,
    MATIC: 0,
    SOL: 0,
    BNB: 0,
  });
  const [selectedCrypto, setSelectedCrypto] = useState(""); // Track selected cryptocurrency
  const [convertedPrice, setConvertedPrice] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("crypto"); // Default payment method is crypto

  // Calculate discounted price
  const discountPak =
    selectedProduct.price -
    (selectedProduct.price * selectedProduct.discount) / 100;

  // Initialize convertedPrice with discountPak in USD
  useEffect(() => {
    setConvertedPrice(discountPak); // Default USD price
  }, [discountPak]);

  // Fetching the live crypto prices
  useEffect(() => {
    const fetchCryptoPrices = async () => {
      try {
        const coinGeckoUrl =
          "https://api.coingecko.com/api/v3/simple/price?ids=ethereum,binancecoin,solana&vs_currencies=usd";
        const coinGeckoResponse = await axios.get(coinGeckoUrl);
        const pricesFromCoinGecko = coinGeckoResponse.data;

        const binanceUrl =
          "https://api.binance.com/api/v3/ticker/price?symbol=MATICUSDT";
        const binanceResponse = await axios.get(binanceUrl);
        const maticPriceFromBinance = binanceResponse.data;

        setCryptoPrices({
          ETH: pricesFromCoinGecko.ethereum?.usd || 0,
          MATIC: maticPriceFromBinance?.price || 0,
          SOL: pricesFromCoinGecko.solana?.usd || 0,
          BNB: pricesFromCoinGecko.binancecoin?.usd || 0,
        });
      } catch (error) {
        console.error("Error fetching crypto prices:", error);
      }
    };

    fetchCryptoPrices();
  }, []);

  const handleProceed = () => {
    goToNextStep(walletAddress, transactionHash);
  };

  // Handle change in selected cryptocurrency
  const handleCryptoChange = (value: string) => {
    let newConvertedPrice = discountPak; // Default to USD

    switch (value) {
      case "ethereum":
        setSelectedCrypto("ETH");
        newConvertedPrice = discountPak / cryptoPrices.ETH;
        break;
      case "polygon":
        setSelectedCrypto("MATIC");
        newConvertedPrice = discountPak / cryptoPrices.MATIC;
        break;
      case "solana":
        setSelectedCrypto("SOL");
        newConvertedPrice = discountPak / cryptoPrices.SOL;
        break;
      case "bnb":
        setSelectedCrypto("BNB");
        newConvertedPrice = discountPak / cryptoPrices.BNB;
        break;
      case "base":
        setSelectedCrypto("ETH");
        newConvertedPrice = discountPak / cryptoPrices.ETH;
        break;
      default:
        newConvertedPrice = discountPak; // Default to USD
    }

    setConvertedPrice(newConvertedPrice);
  };

  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method);
  };

  return (
    <div
      data-aos="fade-up"
      data-aos-duration="2500"
      data-aos-delay="100"
      className="p-5"
    >
      <div className="flex items-center justify-center flex-col p-10">
        <div>
          <h2 className="sm:text-[50px] text-[28px] text-white font-[400] text-center mb-6">
            <span className="bg-gradient-to-r from-pink-500 to-violet-500 text-transparent bg-clip-text">
              Process
            </span>{" "}
            the Payment
          </h2>
        </div>

        <div className="w-full max-w-7xl mx-auto px-8">
          <div className="p-10 rounded-[20px] border border-[#FD60F3] bg-[#0B4F99]/30 min-h-[500px] text-white flex flex-col items-center">
            <div className="lg:flex w-full h-full gap-5 items-center justify-center -md:flex-col">
              <div className="flex-1 h-full flex flex-col gap-10 justify-center">
                <div className="w-full flex">
                  <div className="flex-[3] text-lg">Product</div>
                  <div className="flex-[5] text-lg">
                    : <span className="pl-10">{selectedProduct.title}</span>
                  </div>
                </div>
                <div className="w-full flex">
                  <div className="flex-[3] text-lg">Quantity</div>
                  <div className="flex-[5] text-lg">
                    : <span className="pl-10">1</span>
                  </div>
                </div>
                <hr className="border-[#ffffff31]" />
                <div className="w-full flex">
                  <div className="flex-[3] text-lg">Sub Total</div>
                  <div className="flex-[5] text-lg">
                    : <span className="pl-10">${selectedProduct.price}</span>
                  </div>
                </div>
                <div className="w-full flex">
                  <div className="flex-[3] text-lg">Discount</div>
                  <div className="flex-[5] text-lg">
                    : <span className="pl-10">{selectedProduct.discount}%</span>
                  </div>
                </div>
                <hr className="border-[#ffffff31]" />
                <div className="w-full flex">
                  <div className="flex-[3] text-lg">Total</div>
                  <div className="flex-[5] text-lg">
                    :{" "}
                    <span className="pl-10">
                      {selectedCrypto === ""
                        ? `$${convertedPrice.toFixed(2)}` // Default case (USD)
                        : `${convertedPrice.toFixed(4)} ${selectedCrypto}`}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex-1 flex items-center justify-center h-full flex-col">
                <div className="lg:flex items-center gap-5 mt-6 -md:flex-col">
                  <button
                    className={`-md:flex-col w-40 h-12 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center justify-center gap-2 ${
                      paymentMethod === "crypto" ? "bg-[#f9921c]" : "bg-gray-800"
                    }`}
                    onClick={() => handlePaymentMethodChange("crypto")}
                  >
                    <span className="font-light text-sm">Pay with</span>
                    <span className="font-semibold text-xl">Crypto</span>
                  </button>
                  <button
                    className={`w-40 h-12 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center justify-center gap-2 ${
                      paymentMethod === "card" ? "bg-[#00d66f]" : "bg-gray-800"
                    }`}
                    onClick={() => handlePaymentMethodChange("card")}
                  >
                
                    <span className="font-bold text-md">Card Payment</span>
                  </button>
                </div>
                {paymentMethod === "crypto" ? (
                  <WalletConnect
                    goBack={goBack}
                    goToNextStep={goToNextStep}
                    handleCryptoChange={handleCryptoChange}
                    convertedPrice={convertedPrice}
                    productName={selectedProduct.title}
                  />
                ) : (
                  <>
                    <CheckoutButton
                      productName={selectedProduct.title}
                      productPrice={convertedPrice * 100}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step1;
