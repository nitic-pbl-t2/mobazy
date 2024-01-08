"use client";

import type { FC } from "react";
import { useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
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
import { useAuth } from "@/Provider/AuthProvider";
import Link from "next/link";

export const NavLinks: FC = () => {
  //   const user = useUser();
  const { user, login, logout, fetchUser } = useAuth();
  // const user = useMemo(() => user, [user]);

  useEffect(() => {
    fetchUser();
  }, []);

  const pathname = usePathname();
  const hasUserBorrowing = true;
  return (
    <ul className="flex shrink grow flex-row items-center justify-between truncate">
      <li className="inline-flex shrink truncate gap-4">
        {pathname == "/map" ? (
          <>
            <Link
              title="マップ"
              href="/map"
              className="truncate rounded-full px-1.5 py-2 no-underline text-green-400 hover:font-bold"
            >
              Map
            </Link>
          </>
        ) : (
          <>
            <Link
              title="マップ"
              href="/map"
              className="truncate rounded-full px-1.5 py-2 no-underline hover:font-bold"
            >
              Map
            </Link>
          </>
        )}

        {user && hasUserBorrowing && pathname == "/status" && (
          <>
            <Link
              title="ステータス"
              href="/status"
              className="truncate rounded-full px-1.5 py-2 no-underline text-green-400 hover:font-bold"
            >
              Status
            </Link>
          </>
        )}
        {user && hasUserBorrowing && !(pathname == "/status") && (
          <>
            <Link
              title="ステータス"
              href="/status"
              className="truncate rounded-full px-1.5 py-2 no-underline hover:font-bold"
            >
              Status
            </Link>
          </>
        )}
      </li>
      {user ? (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src={user?.user_metadata["picture"]} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>ログアウト</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      ) : (
        <>
          <Button onClick={login}>ログイン</Button>
        </>
      )}
    </ul>
  );
};
