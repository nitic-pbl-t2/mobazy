import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest, response: NextResponse) {
  return NextResponse.json({
    status: 200,
    message: "茨城高専ステーションのバッテリー状況を返答しました",
  });
}
