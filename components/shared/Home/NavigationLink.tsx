"use client";

import { useSelectedLayoutSegment } from "next/navigation";
import { ComponentProps } from "react";
import { Link } from "@/navigation";

export default function NavigationLink({
  href,
  ...rest
}: ComponentProps<typeof Link>) {
  const selectedLayoutSegment: any = useSelectedLayoutSegment();
  const pathname: any = selectedLayoutSegment
    ? `/${selectedLayoutSegment}`
    : "/";
  const isActive = pathname === href;

  return (
    <Link
      aria-current={isActive ? "page" : undefined}
      href={href}
      className={`${
        isActive ? "font-bold text-blue-500 " : "font-normal text-white"
      } hover:text-blue-500 link link-underline link-underline-black`}
      {...rest}
    />
  );
}
