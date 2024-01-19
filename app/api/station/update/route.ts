import { prismaClient } from "@/utils/prisma/client";
import { NextRequest, NextResponse } from "next/server";
// apiでキャッシュを使用しない(?)
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest, response: NextResponse) {
  const requestData = await request.json();

  //  この形式のデータを受け取れる
  //   {
  //     "availableBatteries":0 or 1
  //   }

  // ステーション名が "nitric" である行を更新
  const updatedStationStatus = await prismaClient.stationStatus.update({
    where: { name: "nitic" },
    data: {
      availableBatteries: requestData.availableBatteries,
    },
  });

  if (updatedStationStatus) {
    console.log("利用可能な数を変更 -> ", requestData.availableBatteries);

    return NextResponse.json({
      message: "茨城高専ステーションのバッテリー状況を更新しました",
    });
  } else {
    return NextResponse.json({
      message: "茨城高専ステーションのバッテリー状況を更新できませんでした",
    });
  }
}
