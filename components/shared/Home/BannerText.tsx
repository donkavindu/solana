"use client";
import React, { useEffect } from "react";
import HomeBtn from "./HomeBtn";
import AOS from "aos";
import { useTranslations } from "next-intl";

const BannerText = () => {
  const t = useTranslations("Index");

  useEffect(() => {
    AOS.init();
  });

  return (
    <div
      data-aos="fade-up"
      data-aos-duration="2000"
      className="mt-36 flex flex-col justify-center max-w-7xl items-center gap-10 mx-auto px-10"
    >
      <h2 className="text-white sm:text-[50px] text-[28px] text-center font-[400] leading-[30px] sm:leading-[46px]">
        <span className="bg-gradient-to-r from-pink-500 to-violet-500 text-transparent bg-clip-text">
          {t("bannerText.titleB")}
        </span>{" "}
        {t("bannerText.title")}
      </h2>
      <p className="text-white leading-[30px]  sm:text-[40px] text-[24px] text-center font-[400] sm:leading-[46px]">
        <span className="bg-gradient-to-r from-pink-500 to-violet-500 text-transparent bg-clip-text">
          {t("bannerText.subTitleB")}
        </span>
        {t("bannerText.subTitle")}
      </p>
      <HomeBtn title={t("bannerText.button")} />
    </div>
  );
};

export default BannerText;
