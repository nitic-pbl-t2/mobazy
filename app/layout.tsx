import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { FC, ReactNode } from "react";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/Provider/AuthProvider";

type RootLayoutProps = {
  children: ReactNode;
};
const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="jp">
      <head />
      <AuthProvider>
        <body className={`flex min-h-screen flex-col`}>
          <Header />
          {/* header, footer を残して100パーセント画面を占有する */}
          <main className="min-h-full grow">{children}</main>
          <Footer />
          <Toaster />
        </body>
      </AuthProvider>
    </html>
  );
};

export default RootLayout;

const domain = new URL(
  process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : `http://localhost:${process.env.PORT || 3000}`
);

export const metadata: Metadata = {
  metadataBase: domain,

  title: {
    default: "Mobazy",
    template: "%s | Mobazy",
  },
  description: "バッテリーの貸し出しサービス",
  openGraph: {
    // Open graph image will be provided via file-based configuration.
    // Refer: https://beta.nextjs.org/docs/api-reference/metadata#static-images
    type: "website",
    locale: "ja_JP",
    url: domain,
  },
  // themeColor: [
  //   { media: '(prefers-color-scheme: light)', color: colorTokens.keyplate.light['2'] }, // keyplate-light-2
  //   { media: '(prefers-color-scheme: dark)', color: colorTokens.keyplate.dark['2'] }, // keyplate-dark-2
  // ],
};
