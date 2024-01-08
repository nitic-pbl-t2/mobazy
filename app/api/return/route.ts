import { prismaClient } from "@/utils/prisma/client";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest, response: NextResponse) {
  const jsonData = await request.json();
  console.log("return", jsonData);

  const correctPasscode = 99;

  // emailが不正であるか、または、パスコードが違う
  if (jsonData.email == "" || !(jsonData.passcode == correctPasscode)) {
    return NextResponse.json({
      status: 400,
      message: "パスコードが間違っているか、または、メールアドレスが不正です。",
    });
  } else {
    // バッテリーを返す処理
    const userHistory = await prismaClient.userHistory.findFirst({
      where: {
        email: jsonData.email,
        status: "borrowing",
      },
    });

    if (!userHistory) {
      return NextResponse.json({
        status: 400,
        message: "該当する貸出履歴が見つかりません。",
      });
    }

    // バッテリーのステータスを"borrowing"から"borrowed"に変更
    await prismaClient.userHistory.update({
      where: { id: userHistory.id },
      data: { status: "borrowed", returnedAt: new Date() },
    });

    // 貸出しているので、ユーザーがないということはあり得ないはず。
    // 対象のユーザーの isBorrowing を false にする
    await prismaClient.user.update({
      where: { email: jsonData.email },
      data: { isBorrowing: false },
    });

    return NextResponse.json({
      status: 200,
      message: "正しいワンタイムパスコードが確認され、返却処理が終了しました。",
    });
  }
}
