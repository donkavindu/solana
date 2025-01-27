"use client";
import Link from "next/link";
import React, { useState } from "react";

const FoolterLinks = () => {
  const languageBaseURLs: Record<string, string> = {
    en: "/en#packages",
    bn: "/bn#packages",
    fr: "/fr#packages",
    ru: "/ru#packages",
    de: "/de#packages",
  };
  const [languageCode, setLanguageCode] = useState("en");

  const packagesURL = languageBaseURLs[languageCode];
  return (
    <div className="flex flex-wrap justify-between max-w-4xl gap-24 mx-auto mt-10 sm:mt-0 ">
      <div className="">
        <ul className="flex flex-col justify-center items-start gap-4">
          <li className="footerLink">
            <Link href="https://www.rangatechnologies.com/">
              Ranga Technologies
            </Link>
          </li>
          <li className="footerLink">
            <Link href="https://t.me/DexVolumeBots">
              Dex Volume bots TG Channel
            </Link>
          </li>
          <li className="footerLink">
            <Link href="https://www.youtube.com/@DEXVolumeBots">
              Dex Volume bots Youtube
            </Link>
          </li>
        </ul>
      </div>
      <div className="">
        <ul className="flex flex-col justify-center items-start gap-4">
          <li className="footerLink">
            <Link href="https://web.facebook.com/people/Ranga-Technologies/100093439967609/">
              Facebook
            </Link>
          </li>
          <li className="footerLink">
            <Link href="https://www.instagram.com/rangatechnologies/">
              Instagram
            </Link>
          </li>
          <li className="footerLink">
            <Link href="https://www.linkedin.com/company/rangatechnologies/">
              Linkedin
            </Link>
          </li>
        </ul>
      </div>

      <div>
        <ul className="flex flex-col justify-center items-start gap-4">
          <li className="footerLink">
            <a href={packagesURL} className="scroll-smooth">
              Packages
            </a>
          </li>
          <li className="footerLink">Policy Privacy </li>
          <li className="footerLink">Terms and Conditions</li>
        </ul>
      </div>
    </div>
  );
};

export default FoolterLinks;
