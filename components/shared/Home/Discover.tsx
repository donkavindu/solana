"use client";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import React, { useEffect } from "react";
import AOS from "aos";
import { useTranslations } from "next-intl";
import Link from "next/link";

const Discover = () => {
  const t = useTranslations("Index");
  useEffect(() => {
    AOS.init();
  });
  return (
    <div className="mt-36 flex flex-wrap gap-10 sm:justify-between flex-col sm:flex-row max-w-5xl mx-auto justify-center items-center px-10">
      <div>
        <Image
          src="/assets/descover.png"
          unoptimized={true}
          alt=""
          width={448}
          height={365}
          className="sm:w-[355px] h-[385px] bg-cover scale-110"
        />{" "}
      </div>
      <div
        data-aos="fade-up"
        data-aos-duration="2500"
        className="flex flex-col justify-center gap-8 pt-10 sm:pt-0 items-center sm:items-start"
      >
        <h2 className="text-white text-left text-[36px] font-normal leading-[40px] max-w-[380px]">
          <span className="bg-gradient-to-r from-pink-500 to-violet-500 text-transparent bg-clip-text">
            {t("unlock.titleB")}
          </span>{" "}
          {t("unlock.title")}
        </h2>
        <p className="sm:w-[560px] max-w-[380px] text-[16px] font-light text-[#929dab] leading-[22px]">
          {t("unlock.paragraph")}
        </p>
        <Link href="https://t.me/rangatechnologies">
          <Button className="group hover:before:bg-redborder-red-500 relative h-[50px] w-50 overflow-hidden rounded-full bg-[#7487d2] shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-[#c546fe] text-black before:transition-all before:duration-500 hover:text-white hover:shadow-[#c546fe] hover:before:left-0 hover:before:w-full px-10 uppercase font-bold outline outline-[gradient-to-r from-custom-green via-custom-yellow to-custom-green] outline-1 outline-offset-2">
            <span className="relative z-10">{t("unlock.button")}</span>
            <ArrowUpRight className="ml-4 group-hover:rotate-45 transition-all duration-500 ease-in-out" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Discover;
