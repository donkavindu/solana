import { Menu } from "lucide-react";
import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import NavItems from "../global/NavItems";
import Social from "../global/Social";
import LanguageSelect from "../global/LanguageSelect";
import { useTranslations } from "next-intl";

const MobileNavLink = () => {
  const t = useTranslations("Index");

  return (
    <Sheet>
      <SheetTrigger className="lg:hidden">
        <Menu className="text-white h-10 w-10" />
      </SheetTrigger>
      <SheetContent className="bg-black flex items-start mt-20 justify-center lg:hidden border-none">
        <div className="flex flex-col items-center justify-center gap-10">
          <NavItems home={t("navLink.home")} blog={t("navLink.blog")} />
          <Social />
          <LanguageSelect />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavLink;
