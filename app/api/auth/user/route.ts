// src/app/api/auth/user/route.ts
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const authRequest = auth.handleRequest({
    request,
    response: NextResponse.next(),
  });
  const session = await authRequest.validate();
  if (!session) {
    return NextResponse.json({ user: null });
  }
  return NextResponse.json({ user: session.user });
}
