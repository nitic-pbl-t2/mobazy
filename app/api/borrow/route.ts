import { NextRequest, NextResponse } from "next/server";
import { prismaClient } from "@/utils/prisma/client";

// apiでキャッシュを使用しない(?)
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest, response: NextResponse) {
  const jsonData = await request.json();
  // console.log("borrow", jsonData);

  //passcode をデータベースから取得
  const passcodeData = await prismaClient.passcode.findUnique({
    where: { secretKey: "1" },
    select: { passcode: true },
  });

  // passcode の取得に失敗した場合のエラーレスポンス
  if (!passcodeData) {
    return NextResponse.json({
      status: 400,
      message: "パスコードが見つかりません。",
    });
  }

  // emailが不正であるか、または、パスコードが違う
  if (jsonData.email == "" || !(jsonData.passcode == passcodeData.passcode)) {
    return NextResponse.json({
      status: 400,
      message: "パスコードが間違っているか、または、メールアドレスが不正です。",
    });
  } else {
    // バッテリーを借りる処理
    // availableBatteriesをデクリメントする前に、値が0未満になるかどうか確認
    const stationStatus = await prismaClient.stationStatus.findUnique({
      where: { name: "nitic" },
      select: { availableBatteries: true },
    });

    if (stationStatus && stationStatus.availableBatteries == 0) {
      // デクリメント後に0未満になる場合、エラーレスポンスを返す
      return NextResponse.json({
        status: 400,
        message: "バッテリーが0なので借りれません。",
      });
    }

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

    // 借りたので、availableBatteriesをひとつデクリメントする
    const updatedStationStatus = await prismaClient.stationStatus.update({
      where: { name: "nitic" },
      data: {
        availableBatteries: {
          decrement: 1,
        },
      },
    });

    console.log(`userHistoryテーブルに追加: ${jsonData.email}`);

    return NextResponse.json({
      status: 200,
      message: "正しいワンタイムパスコードが確認され、貸出処理が終了しました。",
    });
  }
}
