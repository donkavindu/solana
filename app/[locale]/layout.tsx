import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import "aos/dist/aos.css";
import Header from "@/components/shared/global/Header";
import Footer from "@/components/shared/global/Footer";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Solona volume booster",
  description:
    "Boost Your Solana Token's Volume. An essential tool for crypto projects looking to enhance their market presence within the Solana ecosystem, our automated solutions facilitate significant trading volume increases, securing higher visibility and investor interest",
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <meta
          name="google-site-verification"
          content="BjFGsr0H0lbN74kY_ygeVv0U5Qp4gE2kA2oO4jifJRo"
        />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${poppins.className} bg-[#060606]`}>
        <Header />
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <Footer />
      </body>
    </html>
  );
}
