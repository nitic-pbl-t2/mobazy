import { NextRequest, NextResponse } from "next/server";
import { prismaClient } from "@/utils/prisma/client";

// ランダムな五桁の数を生成する
function generateRandomNumber(): number {
  const randomNumber = Math.floor(10000 + Math.random() * 90000);
  return randomNumber;
}

export async function GET(request: Request) {
  const newPasscode = generateRandomNumber();

  // newPasscodeをsecretKeyが1の行のpasscodeに挿入
  await prismaClient.passcode.update({
    where: { secretKey: "1" },
    data: { passcode: newPasscode },
  });

  console.log("新しいパスコード ", newPasscode);

  return NextResponse.json({
    message: "ワンタイムパスワードの更新終了",
    passcode: newPasscode,
  });
}
