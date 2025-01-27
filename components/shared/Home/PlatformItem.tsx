"use client";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import React, { useEffect } from "react";
import AOS from "aos";
import { useTranslations } from "next-intl";
import Link from "next/link";

const PlatformItem = () => {
  const t = useTranslations("Index");

  useEffect(() => {
    AOS.init();
  });
  return (
    <div className="grid sm:grid-cols-2 place-items-center lg:grid-cols-3 gap-28 sm:gap-4 max-w-7xl mx-auto mt-36 px-20">
      <div>
        <div className="relative flex justify-center items-start">
          <div className="filter blur-3xl w-[200px] h-[200px] bg-[#dc23f9]" />
          <div className="group">
            <Image
              src="/assets/basic.png"
              alt="basic"
              width={335}
              height={380}
              className="absolute group-hover:pb-20 top-1/2 transition-all duration-1000 ease-in-out left-1/2 w-[210px] transform -translate-x-1/2 -translate-y-1/2 
          "
            />
          </div>
        </div>
        <div
          data-aos="fade-up"
          data-aos-duration="2500"
          className="flex flex-col h-[300px] pl-8 gap-2 justify-between items-start mt-16"
        >
          <h2 className="text-white text-[24px] font-[700] leading-[24px]">
            {t("bots.bot1.title")}
          </h2>
          <ul className="flex flex-col justify-start items-start list-disc">
            <li className="text-base  leading-[22px] max-w-[325px] font-normal text-[#929dab] text-center">
              {t("bots.bot1.subLink1")}
            </li>
            <li className="text-base  leading-[22px] max-w-[325px] font-normal text-[#929dab] text-center">
              {t("bots.bot1.subLink2")}
            </li>
            <li className="text-base  leading-[22px] max-w-[325px] font-normal text-[#929dab] text-center">
              {t("bots.bot1.subLink3")}
            </li>
            {/* <li className="text-base mt-2  leading-[22px] max-w-[325px] font-normal text-[#929dab]  w-[280px]  text-left list-none">
              {t("bots.bot2.paragraph")}
            </li> */}
          </ul>{" "}
          <Link href="https://t.me/rangatechnologies">
            <Button className="mt-6 p-6 text-[14px] uppercase font-bold px-8 rounded-full group bg-[#dc23f9]">
              {t("bots.bot1.button")}
              <ArrowUpRight className="ml-2 group-hover:rotate-45 transition-all duration-500 ease-in-out" />
            </Button>
          </Link>
        </div>
      </div>

      <div>
        <div className="relative group flex justify-center items-center">
          <div className="filter blur-3xl w-[200px] h-[200px] bg-blue-400" />
          <div className="group">
            <Image
              src="/assets/botmm.png"
              alt="botmm"
              width={335}
              height={380}
              className="absolute group-hover:pb-20 top-1/2 transition-all duration-1000 ease-in-out left-1/2 w-[210px] transform -translate-x-1/2 -translate-y-1/2
          "
            />
          </div>
        </div>
        <div
          data-aos="fade-up"
          data-aos-duration="2500"
          className="flex flex-col h-[300px] pl-8 justify-between items-start mt-16"
        >
          <h2 className="text-white text-[24px] font-[700] leading-[24px]">
            {t("bots.bot2.title")}
          </h2>
          <ul className="flex flex-col justify-start items-start list-disc">
            <li className="text-base  leading-[22px] max-w-[325px] font-normal text-[#929dab] text-center">
              {t("bots.bot2.subLink1")}
            </li>
            <li className="text-base  leading-[22px] max-w-[325px] font-normal text-[#929dab] text-center">
              {t("bots.bot2.subLink2")}
            </li>
            <li className="text-base  leading-[22px] max-w-[325px] font-normal text-[#929dab] text-center">
              {t("bots.bot2.subLink3")}
            </li>
            {/* <li className="text-base mt-2  leading-[22px] max-w-[325px] font-normal text-[#929dab]  w-[280px]  text-left list-none">
              {t("bots.bot2.paragraph")}
            </li> */}
          </ul>{" "}
          <Link href="https://t.me/rangatechnologies">
            <Button className="mt-6 p-6 text-[14px] uppercase font-bold px-8 rounded-full group bg-[#26b6ff]">
              {t("bots.bot2.button")}
              <ArrowUpRight className="ml-2 group-hover:rotate-45 transition-all duration-500 ease-in-out" />
            </Button>
          </Link>
        </div>
      </div>

      <div>
        <div className="relative group  flex justify-center items-center">
          <div className="filter blur-3xl w-[200px] h-[200px] bg-[#03ffa1]" />{" "}
          <div className="group">
            <Image
              src="/assets/botpad.png"
              alt="botpad"
              width={210}
              height={220}
              className="absolute group-hover:pb-20 top-1/2 transition-all duration-1000 ease-in-out left-1/2 w-[210px] transform -translate-x-1/2 -translate-y-1/2
          "
            />
          </div>
        </div>
        <div
          data-aos="fade-up"
          data-aos-duration="2500"
          className="flex flex-col h-[300px] pl-8 justify-between items-start mt-16"
        >
          <h2 className="text-white text-[24px] mt-2 font-[700] leading-[24px]">
            {t("bots.bot3.title")}
          </h2>

          <ul className="flex flex-col justify-start items-start list-disc">
            <li className="text-base  leading-[22px] max-w-[325px] font-normal text-[#929dab] text-center">
              {t("bots.bot3.subLink1")}
            </li>
            <li className="text-base  leading-[22px] max-w-[325px] font-normal text-[#929dab] text-center">
              {t("bots.bot3.subLink2")}
            </li>
            <li className="text-base  leading-[22px] max-w-[325px] font-normal text-[#929dab] text-center">
              {t("bots.bot3.subLink3")}
            </li>
            {/* <li className="text-base mt-2  leading-[22px] max-w-[325px] font-normal text-[#929dab] w-[280px] text-left list-none line-clamp-4">
              {t("bots.bot3.paragraph")}
            </li> */}
          </ul>
          <Link href="https://t.me/rangatechnologies">
            <Button className="mt-6 p-6 text-[14px] uppercase font-bold px-8 rounded-full group bg-[#4bdfa9]">
              {t("bots.bot3.button")}
              <ArrowUpRight className="ml-2 group-hover:rotate-45 transition-all duration-500 ease-in-out" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PlatformItem;
