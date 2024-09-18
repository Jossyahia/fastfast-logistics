import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Adjust the import path as needed
import { auth } from "@/auth";
export async function GET() {
  const session = await auth();

  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ message: "Not authorized" }, { status: 403 });
  }

  try {
    const [totalUsers, totalRiders, totalBookings, totalShipments] =
      await Promise.all([
        prisma.user.count(),
        prisma.rider.count(),
        prisma.booking.count(),
        prisma.shipment.count(),
      ]);

    return NextResponse.json({
      totalUsers,
      totalRiders,
      totalBookings,
      totalShipments,
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return NextResponse.json(
      { message: "Error fetching admin stats" },
      { status: 500 }
    );
  }
}
