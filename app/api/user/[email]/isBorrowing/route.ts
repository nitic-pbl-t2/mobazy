import { NextRequest, NextResponse } from "next/server";
import { prismaClient } from "@/utils/prisma/client";
// apiでキャッシュを使用しない(?)
export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: { email: string } }
) {
  console.log(params.email, "がバッテリー貸出中か調べます...");

  // emailでUserテーブルを検索して、isBorrowing を出力
  const user = await prismaClient.user.findUnique({
    where: { email: params.email },
  });

  if (!user) {
    // 対象のユーザーが存在しない場合の処理
    console.log(`対象のユーザーが見つかりませんでした。${params.email}`);
    return NextResponse.json({
      message: `対象のユーザーが見つかりませんでした。 ${params.email}`,
    });
  }

  // 検索したユーザーの isBorrowing を出力
  console.log(`対象のユーザーの貸出状況: ${user.isBorrowing}`);

  return NextResponse.json({
    message: "対象のユーザーが現在、貸出中かどうかを返答しました。",
    isBorrowing: user.isBorrowing,
  });
}
