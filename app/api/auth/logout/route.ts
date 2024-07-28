import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const authRequest = auth.handleRequest({
    request,
    response: NextResponse.next(),
  });
  const session = await authRequest.validate();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await auth.invalidateSession(session.sessionId);
  authRequest.setSession(null);
  return NextResponse.json({ success: true });
}

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
