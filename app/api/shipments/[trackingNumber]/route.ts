import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
import { auth } from "@/auth";

const prisma = new PrismaClient();
// adjust the path to your Prisma instance
export async function GET(
  request: Request,
  { params }: { params: { trackingNumber: string } }
) {
  const { trackingNumber } = params;

  try {
    const session = await auth();
    const shipment = await prisma.shipment.findUnique({
      where: { trackingNumber },
      select: {
        trackingNumber: true,
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

    return NextResponse.json(shipment);
  } catch (error) {
    console.error("Error retrieving shipment:", error);
    return NextResponse.json(
      { error: "Failed to retrieve shipment details" },
      { status: 500 }
    );
  }
}
