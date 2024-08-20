// File: app/api/tracking/route.ts

import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
import { auth } from "@/auth";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    const { trackingNumber } = await request.json();

    if (!trackingNumber) {
      return NextResponse.json(
        { error: "Tracking number is required" },
        { status: 400 }
      );
    }

    const shipment = await prisma.shipment.findUnique({
      where: { trackingNumber },
      select: {
        status: true,
        currentLocation: true,
        estimatedDelivery: true,
      },
    });

    if (!shipment) {
      return NextResponse.json(
        { error: "Shipment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: `Your package with tracking number ${trackingNumber} is ${shipment.status}.`,
      details: shipment,
    });
  } catch (error) {
    console.error("Error tracking shipment:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
