import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET() {
  const session = await auth();

  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const usersCount = await prisma.user.count();
    const ridersCount = await prisma.rider.count();
    const bookingsCount = await prisma.booking.count();
    const recentBookings = await prisma.booking.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { user: { select: { name: true } } },
    });

    return NextResponse.json({
      usersCount,
      ridersCount,
      bookingsCount,
      recentBookings,
    });
  } catch (error) {
    console.error("Error fetching admin dashboard data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
