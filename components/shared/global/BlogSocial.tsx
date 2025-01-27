import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogSocial = () => {
  return (
    <div className="flex items-center gap-5">
      <ul className="flex gap-5">
        <li>
          <Link href="https://t.me/rangatechnologies">
            <Image
              src={"/assets/TG.png"}
              alt="Telegram"
              width={40}
              height={40}
            />
          </Link>
        </li>

        <li>
          <Link href="https://wa.me/message/XEABYADPSDL2D1">
            <Image
              src={"/assets/WhatsApp.png"}
              alt="whats app"
              width={40}
              height={40}
            />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default BlogSocial;
