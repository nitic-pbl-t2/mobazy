import React, { ComponentPropsWithoutRef, FC } from "react";
import { Image } from "@/components/Image/Image";
import { RxGithubLogo } from "react-icons/rx";
import NiticLogoImage from "@/public/logo/nitic-3.png";
import Link from "next/link";

type FooterProps = ComponentPropsWithoutRef<"footer">;

export const Footer: FC<FooterProps> = (props) => {
  return (
    <footer
      className="flex w-full flex-col justify-center items-center bg-slate-900 text-white gap-4"
      {...props}
    >
      <div className="flex flex-row justify-start items-center gap-4 mt-6 max-w-sm">
        <Link
          href={new URL("https://www.ibaraki-ct.ac.jp/").href}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src={NiticLogoImage}
            sizes={{
              tablet: "40vw",
              default: "100vw",
            }}
            placeholder="blur"
            alt="茨城工業高等専門学校のロゴ"
            className="w-[220px] hover:opacity-80"
          />
        </Link>
        <div>
          <ul className="flex flex-col gap-3 py-3 font-bold hover:opacity-80">
            <Link
              href={new URL("https://github.com/Inoueyt113/Mobazy").href}
              target="_blank"
              rel="noopener noreferrer "
            >
              <li className="flex items-center justify-center gap-1">
                <RxGithubLogo />
                Github
              </li>
            </Link>
          </ul>
        </div>
      </div>
      <div>
        <address>
          <p>〒312-8508 茨城県ひたちなか市中根866</p>
        </address>
        <div className="flex text-xs flex-row justify-center leading-none">
          <small className="w-fit rounded-full">
            Copyright © 2023 茨城工業高等専門学校 後期PBL 1班
          </small>
        </div>
      </div>
    </footer>
  );
};
