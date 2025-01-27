"use client";
import * as React from "react";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import NavigationLink from "../Home/NavigationLink";
interface NavItemsProps {
  home: string;
  blog: string;
}

export default function NavItems({ home, blog }: NavItemsProps) {
  return (
    <NavigationMenu className="w-full">
      <NavigationMenuList className="font-poppins !font-[300] gap-8 md:gap-5 flex lg:flex-row justify-center items-center flex-col sm:pr-20 ">
        <NavigationMenuItem>
          <NavigationLink href="/">{home}</NavigationLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationLink href="/blogs">{blog}</NavigationLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
