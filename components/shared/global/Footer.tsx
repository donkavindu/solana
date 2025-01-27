import React from "react";
import Image from "next/image";
import FoolterLinks from "./FoolterLinks";

const Footer = () => {
  return (
    <>
      <div className=" mt-32 justify-between max-w-7xl mx-auto flex px-10 flex-wrap">
        <div className="flex flex-1 flex-col gap-5 sm:gap-10 items-start justify-center">
          <div>
            <Image
              src="/assets/Logo.png"
              alt="footer"
              width={183}
              height={56}
            />
          </div>
        </div>
        <FoolterLinks />
      </div>
      <hr className=" border-gray-600 mt-10 mb-10 max-w-7xl mx-auto" />
      <div className="flex flex-col gap-2  justify-between max-w-7xl mx-auto mb-6 px-10">
        <p className="footerLink !text-[#929dab]">© 2024 Ranga Technologies.</p>
        <p className="footerLink max-w-[525px] !text-[#929dab]">
          All rights reserved. Ranga Technologies is a cutting-edge blockchain
          solution company committed to innovative technology and excellence in
          digital advancements.
        </p>
      </div>
    </>
  );
};

export default Footer;
