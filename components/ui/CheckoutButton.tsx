"use client";
import { useState } from "react";
import Image from "next/image";
import { loadStripe } from "@stripe/stripe-js";
import stripButtonLogo from "@/public/assets/strip.png";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

interface CheckoutButtonProps {
  productName: string;
  productPrice: number;
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({
  productName,
  productPrice,
}) => {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (loading) return; // Prevent duplicate clicks

    setLoading(true); // Start loading
    try {
      const stripe = await stripePromise;

      const response = await fetch("/api/checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productName,
          productPrice,
          origin: window.location.origin,
        }),
      });

      const session = await response.json();

      if (session.error) {
        console.error(session.error);
        alert("An error occurred. Please try again.");
        return;
      }

      // Redirect to Stripe checkout
      await stripe?.redirectToCheckout({ sessionId: session.id });
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div
      onClick={handleCheckout}
      className={`rounded-md bg-[#32325d] text-white mt-3 px-16 py-2 gap-3 flex items-center font-semibold ${
        loading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      {loading ? (
        <div className="flex items-center gap-2">
          <div className="animate-spin border-2 border-t-2 border-white border-t-transparent rounded-full w-5 h-5"></div>
          <div>Processing...</div>
        </div>
      ) : (
        <>
          <div>Pay Now</div>
          <Image src={stripButtonLogo} alt="striplogo" width={25} />
        </>
      )}
    </div>
  );
};

export default CheckoutButton;
