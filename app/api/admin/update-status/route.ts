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

async function getUserRole(userId: string): Promise<string | null> {
  const userRole = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true },
  });
  return userRole?.role ?? null;
}

export async function PUT(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      console.log("Unauthorized access attempt: No user session");
      return NextResponse.json(
        { error: "Unauthorized. Please log in." },
        { status: 401 }
      );
    }

    const userRole = await getUserRole(session.user.id);

    if (userRole !== "ADMIN") {
      console.log("Unauthorized access attempt:", session.user);
      return NextResponse.json(
        { error: "Unauthorized. Admin access required." },
        { status: 403 }
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

    const shipment = await prisma.shipment.findUnique({
      where: { trackingNumber: data.trackingNumber },
      include: { booking: true },
    });

    if (!shipment) {
      return NextResponse.json(
        { error: "Shipment not found" },
        { status: 404 }
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
