import React from "react";
import Logo from "./Logo";
import NavItems from "./NavItems";
import Social from "./Social";
import LanguageSelect from "./LanguageSelect";
import { useTranslations } from "next-intl";

const Header = () => {
  const t = useTranslations("Index");

  return (
    <header className="hidden lg:block sticky top-0 z-20 bg-black">
      <nav className="flex items-center justify-between max-w-7xl mx-auto p-6">
        <Logo />
        <div className="flex items-center gap-5">
        <NavItems home={t("navLink.home")} blog={t("navLink.blog")} />
          <Social />
          <LanguageSelect />
        </div>
      </nav>
      <hr className=" border-gray-600" />
    </header>
  );
};

export default Header;
