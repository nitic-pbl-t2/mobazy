import { NextRequest, NextResponse } from "next/server";
import { prismaClient } from "@/utils/prisma/client";

// apiでキャッシュを使用しない(?)
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  // リクエストのユーザーが正規であるかチェックする必要ある❌ ← 面倒臭いからやってない
  const userHistories = await prismaClient.userHistory.findMany({
    where: {
      status: "borrowing",
    },
  });

  if (userHistories.length == 0) {
    return NextResponse.json({
      message: "借りているユーザーはいませんので、蓋は閉じたままにしてください",
      isOpen: false,
    });
  } else {
    return NextResponse.json({
      message: "借りているユーザーが存在するので、蓋を開けてください",
      isOpen: true,
    });
  }
}
