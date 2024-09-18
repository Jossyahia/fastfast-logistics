import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
export async function GET() {
  const session = await auth();

  if (!session || session.user.role !== "RIDER") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const rider = await prisma.rider.findUnique({
      where: { userId: session.user.id },
    });

    if (!rider) {
      return NextResponse.json({ error: "Rider not found" }, { status: 404 });
    }

    const assignedBookings = await prisma.booking.findMany({
      where: { riderId: rider.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      rider,
      assignedBookings,
    });
  } catch (error) {
    console.error("Error fetching rider dashboard data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
