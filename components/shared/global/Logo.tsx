import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href="/">
      <Image
        src="/assets/Logo.png"
        alt="Orbitt Logo"
        width={112}
        height={40}
        className="cursor-pointer scale-150"
      />
    </Link>
  );
};

export default Logo;
