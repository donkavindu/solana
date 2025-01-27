"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

const AutoScrollHandler = () => {
  const searchParams = useSearchParams();

  useEffect(() => {
    // Ensure searchParams is not null
    if (!searchParams) return;

    const scrollTo = searchParams.get("scrollTo");
    if (scrollTo === "products") {
      const productsSection = document.getElementById("products");
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [searchParams]);

  return null; // This component does not render anything
};

export default AutoScrollHandler;
