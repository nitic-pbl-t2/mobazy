import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest, response: NextResponse) {
  const jsonData = await request.json();
  console.log(jsonData);

  const correctPasscode = 99;

  // emailが不正であるか、または、パスコードが違う
  if (jsonData.email == "" || !(jsonData.passcode == correctPasscode)) {
    return NextResponse.json({
      status: 400,
      message: "パスコードが間違っているか、または、メールアドレスが不正です。",
    });
  } else {
    // バッテリーを借りる処理
    // return new NextResponse({ status: 200 });
    return NextResponse.json({
      status: 200,
      message: "正しいワンタイムパスコードが確認され、貸出処理が終了しました。",
    });
  }
}
