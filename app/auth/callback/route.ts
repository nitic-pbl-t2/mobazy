// import { prismaClient } from "@/utils/prisma/client";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

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

    console.log("ログイン処理終了");

    // const {
    //   data: { user },
    // } = await supabase.auth.getUser();

    // if (user) {
    //   console.log(user.email);
    //   const existingUser = await prismaClient.userHistory.findUnique({
    //     where: {
    //       email: user.email, // ログインしたユーザ
    //     },
    //   });

    //   // userHistoryテーブルにユーザが存在しない -> ログインしたことない
    //   if (!existingUser && user.email) {
    //     await prismaClient.userHistory.create({
    //       data: {
    //         email: user.email,
    //       },
    //     });

    //     console.log(
    //       `初回ログインなので、userHistoryテーブルに追加: ${user.email}`
    //     );
    //   } else {
    //     console.log(`既存のユーザーです: ${user.email}`);
    //   }
    // }
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(requestUrl.origin);
}
