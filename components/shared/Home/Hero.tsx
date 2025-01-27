"use client";
import React, { useEffect } from "react";
import AOS from "aos";
import HomeBtn from "./HomeBtn";
import Image from "next/image";
import { useTranslations } from "next-intl";

const Hero = () => {
  const t = useTranslations("Index");

  useEffect(() => {
    AOS.init();
  });
  return (
    <>
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col-reverse gap-10  items-center lg:flex-row md:justify-center justify-center px-4 mt-12">
          <div className="max-w-3xl flex flex-col items-center sm:items-start">
            <div data-aos="fade-up" data-aos-duration="2000">
              <h1 className="md:text-[90px] sm:text-[80px] leading-[32px] text-[26px] md:leading-[98px] mb-6 font-[400]  text-white">
                <span className="animate-letter">{t("hero.title")}</span>
              </h1>
            </div>
            <div data-aos="fade-up" data-aos-duration="2500">
              <p className="text-gray-400 text-base max-w-[580px] leading-[23px] font-[300]">
                {t("hero.description")}
              </p>
            </div>
            <div className="mt-10">
              <div data-aos="fade-up" data-aos-duration="3000">
                <HomeBtn title={t("hero.contectUs")} />
              </div>
            </div>
          </div>
          <div
            data-aos="fade-left"
            data-aos-anchor="#example-anchor"
            data-aos-offset="500"
            data-aos-duration="2000"
          >
            <Image
              src="/assets/homeImage.png"
              alt="hero"
              width={600}
              height={400}
              className="sm:max-w-[580px] sm:max-h-[550px]"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
