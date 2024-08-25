import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, ShipmentStatus, Status } from "@prisma/client";
import { auth } from "@/auth";

const prisma = new PrismaClient();

interface StatusUpdateData {
  trackingNumber: string;
  shipmentStatus: ShipmentStatus;
  bookingStatus: Status;
  currentLocation?: string;
  estimatedDelivery?: string;
}

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in." },
        { status: 401 }
      );
    }

    const url = new URL(request.url);
    const trackingNumber = url.searchParams.get("trackingNumber");

    if (!trackingNumber) {
      return NextResponse.json(
        { error: "Tracking number is required" },
        { status: 400 }
      );
    }

    const shipment = await prisma.shipment.findUnique({
      where: { trackingNumber },
      include: { booking: true },
    });

    if (!shipment) {
      return NextResponse.json(
        { error: "Shipment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ shipment });
  } catch (error) {
    console.error("Error fetching shipment:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in." },
        { status: 401 }
      );
    }

    const data: StatusUpdateData = await request.json();
    if (!data.trackingNumber || !data.shipmentStatus || !data.bookingStatus) {
      return NextResponse.json(
        {
          error:
            "Tracking number, shipment status, and booking status are required",
        },
        { status: 400 }
      );
    }

    const updatedShipment = await prisma.shipment.update({
      where: { trackingNumber: data.trackingNumber },
      data: {
        status: data.shipmentStatus,
        currentLocation: data.currentLocation,
        estimatedDelivery: data.estimatedDelivery
          ? new Date(data.estimatedDelivery)
          : undefined,
        booking: {
          update: {
            status: data.bookingStatus,
          },
        },
      },
      include: { booking: true },
    });

    console.log(
      "Shipment and booking status updated successfully:",
      updatedShipment.trackingNumber
    );

    return NextResponse.json({
      message: "Shipment and booking status updated successfully",
      shipment: updatedShipment,
    });
  } catch (error) {
    console.error("Error updating status:", error);
    if (error instanceof Error) {
      return NextResponse.json(
        { error: `Error updating status: ${error.message}` },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
