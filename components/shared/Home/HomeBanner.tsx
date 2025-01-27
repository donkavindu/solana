import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import HomeBtn from "./HomeBtn";

const HomeBanner = () => {
  const t = useTranslations("Index");

  return (
    <div className="max-w-7xl mx-auto px-8 flex justify-center mt-32">
      <div className="flex flex-col sm:flex-row justify-center sm:w-[1000px] mx-auto sm:max-h-[380px] gap-8 bg-no-repeat bg-cover items-center bg-center lg:rounded-full p-5 rounded-[100px]  bg-[url('/assets/robotbanner.png')]">
        <div className="mb-8 sm:mt-0 -mt-10">
          <Image
            src="/assets/robotb.png"
            width={400}
            height={400}
            alt="robotb"
            className="sm:max-w-[400px] sm:max-h-[500px] sm:pb-28 bg-cover "
          />
        </div>
        <div className="flex flex-col items-center gap-3 justify-center sm:items-start">
          <h2 className="lg:text-[35px] text-[28px] -mt-16 sm:mt-0 text-white font-[700]">
            {t("heroBanner.title")}
          </h2>
          <p className="text-[16px] text-white font-bold">
            {t("heroBanner.subTitle")}
          </p>

          <p className="text-[16px] text-white max-w-[400px]">
            {t("heroBanner.paragragh")}
          </p>
          <Link href="https://t.me/rangatechnologies">
            <Button className="bg-blue-500 uppercase font-bold rounded-full py-6 px-10">
              {t("heroBanner.button")}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
