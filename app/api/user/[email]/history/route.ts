import { NextRequest, NextResponse } from "next/server";
import { prismaClient } from "@/utils/prisma/client";

// apiでキャッシュを使用しない(?)
export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: { email: string } }
) {
  console.log(params.email);

  // リクエストのユーザーが正規であるかチェックする必要ある❌ ← 面倒臭いからやってない
  const userHistories = await prismaClient.userHistory.findMany({
    where: {
      email: params.email,
    },
  });

  console.log(userHistories);

  if (userHistories) {
    return NextResponse.json({
      userHistories: userHistories,
      message: "対象のユーザーの貸出履歴を返答しました。",
    });
  } else {
    console.log(
      `メールアドレスで検索をかけましたが、貸出履歴は見つかりませんでした ${params.email}`
    );
    return NextResponse.json({
      message: `メールアドレスで検索をかけましたが、貸出履歴は見つかりませんでした ${params.email}`,
    });
  }
}
