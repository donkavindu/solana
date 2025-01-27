import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Communitybanner = () => {
  const t = useTranslations("Index");
  return (
    <div className="sm:mt-32 mt-52 max-w-7xl mx-auto relative px-10">
      <Image
        src="/assets/robotr.png"
        alt="robot right"
        width={100}
        height={100}
        className="absolute sm:w-[270px] -left-0 -top-12 sm:h-[270px] sm:left-5  sm:-top-10 z-10"
      />
      <div className="flex justify-center relative">
        <Image
          src="/assets/bgcom.png"
          alt="banner desktop"
          width={1000}
          height={368}
          className="hidden sm:block rounded-full lg:max-h-[450px] sm:h-[460px]"
        />

        <Image
          src="/assets/BG.png"
          alt="banner mobile"
          width={1000}
          height={600}
          className="sm:hidden h-[500px] w-full"
        />

        <Image
          src="/assets/robot1.png"
          alt="robot1"
          width={200}
          height={325}
          className="absolute sm:w-[320px] sm:h-[325px] hidden sm:block -right-5  -top-3 sm:top-28 "
        />

        <div className="flex flex-col justify-center items-center gap-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <h2 className="text-center text-[50px] leading-[55px] font-extralight text-white">
            <span className="font-[600]">
              {t("community.titleB")}
              <span className="text-[#14e9ac]"> {t("community.title")}</span>
            </span>{" "}
            {t("community.TitleBB")}
          </h2>
          <p className="max-w-[640px] text-center text-white text-[16px] font-light leading-[24px]">
            {t("community.paragraph")}
          </p>
          <Link href="https://t.me/DexVolumeBots">
            <Button className="group hover:before:bg-redborder-red-500 relative h-[50px] w-50 overflow-hidden rounded-full bg-[#14e9ac] text-black shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-[#dc23f9] before:transition-all before:duration-500 hover:text-white hover:shadow-[#dc23f9] hover:before:left-0 hover:before:w-full px-10 uppercase font-bold">
              <span className="relative z-10">{t("community.button")}</span>
              <ArrowUpRight className="ml-8 group-hover:rotate-45 transition-all duration-500 ease-in-out" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Communitybanner;
