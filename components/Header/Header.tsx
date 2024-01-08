import React, { ComponentPropsWithoutRef, FC } from "react";
import { Image } from "@/components/Image/Image";
import Link from "next/link";
import LogoImage from "@/public/logo/mobazy-home.svg";
import { NavLinks } from "@/components/Header/NavLinks";

type HeaderProps = ComponentPropsWithoutRef<"header">;

export const Header: FC<HeaderProps> = (props) => {
  return (
    <header
      className="sticky top-0 z-30 flex w-full justify-start  p-2 items-center gap-6 border-b-2 border-slate-200 bg-opacity-100 bg-white"
      {...props}
    >
      <Link href="/" className="mx-4">
        <Image
          src={LogoImage}
          alt="Mobazyのロゴ"
          sizes={{
            default: "40vw",
            tablet: "25vw",
            desktop: "20vw",
          }}
          // placeholder="blur"
          className="w-full p-3 hover:"
        />
      </Link>
      <NavLinks />
    </header>
  );
};
