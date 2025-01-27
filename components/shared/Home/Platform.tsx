"use client";
import React, { useEffect } from "react";
import AOS from "aos";
import { useTranslations } from "next-intl";

const Platform = () => {
  const t = useTranslations("Index");

  useEffect(() => {
    AOS.init();
  });
  return (
    <div
      data-aos="fade-up"
      data-aos-duration="2500"
      className="mt-24 max-w-[870px] mx-auto px-10"
      id="packages"
    >
      <div>
        <h2 className="sm:text-[50px] text-[28px] text-white font-[400] text-center mb-6">
          <span className="bg-gradient-to-r from-pink-500 to-violet-500 text-transparent bg-clip-text">
            {t("discoverBanner.titleB")}
          </span>{" "}
          {t("discoverBanner.title")}
        </h2>
        <p className="text-white text-center text-[16px] leading-[22px] text-[##929dab]">
          {t("discoverBanner.subTitle")}
        </p>
      </div>
    </div>
  );
};

export default Platform;
