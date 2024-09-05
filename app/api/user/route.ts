import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const session = await auth();
  console.log("Session:", session);

  if (!session || !session.user?.id) {
    console.log("No valid session");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    console.log("Querying for user:", session.user.id);
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        accounts: true,
        bookings: true,
        rider: true,
        sessions: true,
        shipments: true,
      },
    });
    console.log("User found:", user ? "Yes" : "No");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json(
      { error: "Error fetching user data" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  const session = await auth();
  console.log("Session:", session);

  if (!session || !session.user?.id) {
    console.log("No valid session");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { name } = await req.json();
    console.log("Updating user:", session.user.id, "with name:", name);
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: { name },
    });
    console.log("User updated:", updatedUser ? "Yes" : "No");
    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error updating user data:", error);
    return NextResponse.json(
      { error: "Error updating user data" },
      { status: 500 }
    );
  }
}
