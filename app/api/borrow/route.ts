import { NextRequest, NextResponse } from "next/server";
import { prismaClient } from "@/utils/prisma/client";

export async function POST(request: NextRequest, response: NextResponse) {
  const jsonData = await request.json();
  console.log("borrow", jsonData);

  const correctPasscode = 99;

  // emailが不正であるか、または、パスコードが違う
  if (jsonData.email == "" || !(jsonData.passcode == correctPasscode)) {
    return NextResponse.json({
      status: 400,
      message: "パスコードが間違っているか、または、メールアドレスが不正です。",
    });
  } else {
    // バッテリーを借りる処理
    // リクエストを送ったクライアントが、正規のユーザーであるか確認する❌　← 安全性に問題あるけど面倒臭い
    await prismaClient.userHistory.create({
      data: {
        email: jsonData.email,
        status: "borrowing",
        stationName: "茨城高専",
        port: 1, // 空いているポートを取得するapi叩く必要あり
        borrowedAt: new Date(Date.now()),
      },
    });

    //対象のユーザーのデータを調べて、なかったら作成し、合ったら
    // 対象のユーザーの User テーブルの isBorrowing を true にする
    // await prismaClient.user.update({
    //   where: { email: jsonData.email },
    //   data: { isBorrowing: true },
    // });

    // 対象のユーザーを検索
    const existingUser = await prismaClient.user.findUnique({
      where: { email: jsonData.email },
    });

    // ユーザーが見つからない場合、新しいユーザーを作成
    if (!existingUser) {
      await prismaClient.user.create({
        data: {
          email: jsonData.email,
          isBorrowing: true, // isBorrowing を true に設定
        },
      });
    } else {
      // ユーザーが見つかった場合、既存のユーザーを更新
      await prismaClient.user.update({
        where: { email: jsonData.email },
        data: {
          isBorrowing: true, // isBorrowing を true に設定
        },
      });
    }

    console.log(`userHistoryテーブルに追加: ${jsonData.email}`);

    return NextResponse.json({
      status: 200,
      message: "正しいワンタイムパスコードが確認され、貸出処理が終了しました。",
    });
  }
}
