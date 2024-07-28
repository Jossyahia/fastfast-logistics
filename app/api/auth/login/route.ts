import { auth } from "@/lib/auth";
import { LuciaError } from "lucia";
import { NextResponse } from "next/server";
import { z } from "zod";

const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export async function POST(request: Request) {
  const body = await request.json();
  const result = loginSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const { username, password } = result.data;

  try {
    const key = await auth.useKey("username", username, password);
    const session = await auth.createSession({
      userId: key.userId,
      attributes: {},
    });
    const authRequest = auth.handleRequest({
      request,
      response: NextResponse.next(),
    });
    authRequest.setSession(session);
    return NextResponse.json({ success: true });
  } catch (e) {
    if (
      e instanceof LuciaError &&
      (e.message === "AUTH_INVALID_KEY_ID" ||
        e.message === "AUTH_INVALID_PASSWORD")
    ) {
      return NextResponse.json(
        { error: "Incorrect username or password" },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
