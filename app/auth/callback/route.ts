// import { PrismaClient } from "@prisma/client";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  console.log("ログイン処理中");
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  console.log(code);

  if (code) {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({
      cookies: () => cookieStore,
    });
    await supabase.auth.exchangeCodeForSession(code);

    // ログインしたので、リダイレクトする前にgmailを取得->データベースになかったらUserテーブルにデータを新規作成

    const {
      data: { user },
    } = await supabase.auth.getUser();

    // if (user) {
    //   console.log(user.email);
    //   const prisma = new PrismaClient();
    //   const existingUser = await prisma.user.findUnique({
    //     where: {
    //       gmail: user.email,
    //     },
    //   });

    //   if (!existingUser) {
    //     await prisma.user.create({
    //       data: {
    //         gmail: user.email!,
    //         isBatteryBorrowed: false,
    //       },
    //     });

    //     console.log(`新しいユーザーが作成されました: ${user.email}`);
    //   } else {
    //     console.log(`既存のユーザーです: ${user.email}`);
    //   }
    // }
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(requestUrl.origin);
}
