"use client";
import Image from "next/image";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

const LanguageSelect = () => {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="ring-offset-background  focus-visible:outline-none">
        <Image
          src="/assets/languages.png"
          alt="languages"
          width={25}
          height={25}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-wrap items-center justify-center max-w-[230px] text-white bg-[#292929]  gap-6 mt-4 text-left">
        <DropdownMenuLabel>Choose Language :</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push("/en")}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/hi")}>
          Mandarin
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/fr")}>
          French
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/ru")}>
          Russian
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/de")}>
          Spanish
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/hi")}>
          Hindi
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/bn")}>
          Bengali
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelect;
