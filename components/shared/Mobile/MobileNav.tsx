import Image from "next/image";
import Link from "next/link";
import React from "react";
import MobileNavLink from "./MobileNavLink";

const MobileNav = () => {
  return (
    <header className="lg:hidden block sticky !top-0 !z-20 bg-black">
      <nav className="p-5 flex justify-between">
        <Link href="/">
          <Image
            src="/assets/Logo.png"
            alt="Orbitt Logo"
            width={112}
            height={40}
            className="cursor-pointer scale-125"
          />
        </Link>
        <MobileNavLink />
      </nav>
    </header>
  );
};

export default MobileNav;
