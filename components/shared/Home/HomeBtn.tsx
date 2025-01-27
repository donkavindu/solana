import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

interface Props {
  title: string;
}

const HomeBtn = ({ title }: Props) => {
  return (
    <Link href="https://t.me/rangatechnologies">
      <Button className="group hover:before:bg-redborder-red-500 relative h-[50px] w-50 overflow-hidden rounded-full bg-[#14e9ac] shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-[#c546fe] text-black before:transition-all before:duration-500 hover:text-white hover:shadow-[#c546fe] hover:before:left-0 hover:before:w-full px-20 uppercase font-bold outline outline-[gradient-to-r from-custom-green via-custom-yellow to-custom-green] outline-1 outline-offset-2">
        <span className="relative z-10">{title}</span>
      </Button>
    </Link>
  );
};

export default HomeBtn;
