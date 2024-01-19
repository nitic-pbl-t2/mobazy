import { prismaClient } from "@/utils/prisma/client";
import { NextRequest, NextResponse } from "next/server";

// apiでキャッシュを使用しない(?)
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest, response: NextResponse) {
  // ステーション名がniticである１行を取得する
  const stationStatus = await prismaClient.stationStatus.findFirst({
    where: { name: "nitic" },
  });

  if (stationStatus) {
    console.log(stationStatus);
    return NextResponse.json({
      stationStatus: stationStatus,
      message: "茨城高専ステーションのバッテリー状況を返答しました",
    });
  } else {
    return NextResponse.json({
      message: "茨城高専ステーションのバッテリー状況が取得できませんでした",
    });
  }
}
