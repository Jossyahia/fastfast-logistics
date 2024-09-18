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
    if (!session?.user?.id || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized. Admin access required." },
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
        { error: "Shipment not found for tracking number: " + trackingNumber },
        { status: 404 }
      );
    }

    const formattedData = {
      trackingNumber: shipment.trackingNumber,
      shipmentStatus: shipment.status,
      bookingStatus: shipment.booking?.status || "UNKNOWN",
      currentLocation: shipment.currentLocation || "",
      estimatedDelivery: shipment.estimatedDelivery
        ? shipment.estimatedDelivery.toISOString().slice(0, 16)
        : "",
    };

    return NextResponse.json(formattedData);
  } catch (error) {
    console.error("Error fetching shipment:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred: " + (error as Error).message },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized. Admin access required." },
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
          : null,
        booking: {
          update: {
            status: data.bookingStatus,
          },
        },
      },
      include: { booking: true },
    });

    return NextResponse.json({
      message: "Shipment and booking status updated successfully",
      shipment: updatedShipment,
    });
  } catch (error) {
    console.error("Error updating status:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred: " + (error as Error).message },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}