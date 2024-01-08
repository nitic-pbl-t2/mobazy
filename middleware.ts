import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  await supabase.auth.getSession();
  return res;
}

// 範囲指定->"/reserve/success/[port]"に来た時にアクセスしていいページなのか判定する
// ログインしてなかったら、reserveボタン押したときに、loginを促すmodalをつける。
