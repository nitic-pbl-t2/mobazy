import { prismaClient } from "@/utils/prisma/client";
import { NextRequest, NextResponse } from "next/server";

// apiでキャッシュを使用しない(?)
export const dynamic = "force-dynamic";

// ユーティリティ関数: 使用時間を計算して文字列に変換
function calculateUsageTime(borrowedAt: Date): string {
  const returnedAt = new Date();
  const diffInMs = returnedAt.getTime() - borrowedAt.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const hours = Math.floor(diffInMinutes / 60);
  const minutes = diffInMinutes % 60;
  return `${hours}h ${minutes}m`;
}

export async function POST(request: NextRequest, response: NextResponse) {
  const jsonData = await request.json();
  console.log("return", jsonData);

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
    // バッテリーを返す処理
    // ポート数と availableBatteries を取得
    const stationStatus = await prismaClient.stationStatus.findUnique({
      where: { name: "nitic" },
      select: { availableBatteries: true, Ports: true },
    });

    if (!stationStatus) {
      return NextResponse.json({
        status: 500,
        message: "ステーションの情報が取得できません。",
      });
    }

    // インクリメントした数がポート数を超える場合はエラー
    if (stationStatus.availableBatteries == stationStatus.Ports) {
      return NextResponse.json({
        status: 400,
        message: "ステーションのバッテリーがいっぱいで返却できません。",
      });
    }

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

    // バッテリーのステータスを"borrowing"から"borrowed"に変更, usageTime, returnAtを登録
    if (userHistory.borrowedAt) {
      await prismaClient.userHistory.update({
        where: { id: userHistory.id },
        data: {
          status: "borrowed",
          returnedAt: new Date(),
          usageTime: calculateUsageTime(userHistory.borrowedAt),
        },
      });
    }

    // 貸出しているので、ユーザーがないということはあり得ないはず。
    // 対象のユーザーの isBorrowing を false にする
    await prismaClient.user.update({
      where: { email: jsonData.email },
      data: { isBorrowing: false },
    });

    // 返したので、availableBatteriesをインクリメントする

    // availableBatteriesをインクリメント
    await prismaClient.stationStatus.update({
      where: { name: "nitic" },
      data: { availableBatteries: stationStatus.availableBatteries + 1 },
    });

    return NextResponse.json({
      status: 200,
      message: "正しいワンタイムパスコードが確認され、返却処理が終了しました。",
    });
  }
}
