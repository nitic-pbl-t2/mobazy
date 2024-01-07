"use client";

import type { FC } from "react";
import { useMemo } from "react";
import { Link } from "@/components/Link/Link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const NavLinks: FC = () => {
  //   const user = useUser();
  //   const hasUserLoggedIn = useMemo(() => user?.isSignedIn, [user]);
  const hasUserLoggedIn = true;
  return (
    <ul className="flex shrink grow flex-row items-center justify-between truncate">
      <li className="inline-flex shrink truncate">
        <Link
          title="マップ"
          href="/map"
          className="truncate rounded-full px-1.5 py-2 no-underline hover:bg-opacity-80 hover:text-primary-11 tablet:px-4"
        >
          Map
        </Link>
      </li>
      {hasUserLoggedIn ? (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  className="mr-2"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>inoueyt113@gmail.com</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>ご利用履歴</DropdownMenuItem>
              <DropdownMenuItem>ログアウト</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      ) : (
        <>
          <Button asChild>
            <Link href="/login">Login</Link>
          </Button>
        </>
      )}
    </ul>
  );
};
