import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";

const prisma = new PrismaClient();

interface ShipmentUpsertData {
  trackingNumber: string;
  status: string;
  currentLocation?: string;
  estimatedDelivery?: string;
  userEmail: string; // Assuming you use email to identify the user
}

export async function PUT(request: NextRequest) {
  try {
    const session = await auth();

    if (!session || session.user.role !== "ADMIN") {
      console.log("Unauthorized access attempt:", session?.user);
      return NextResponse.json(
        { error: "Unauthorized. Admin access required." },
        { status: 403 }
      );
    }

    const data: ShipmentUpsertData = await request.json();

    if (!data.trackingNumber || !data.status || !data.userEmail) {
      return NextResponse.json(
        { error: "Tracking number, status, and user email are required" },
        { status: 400 }
      );
    }

    const upsertedShipment = await prisma.shipment.upsert({
      where: { trackingNumber: data.trackingNumber },
      update: {
        status: data.status,
        currentLocation: data.currentLocation,
        estimatedDelivery: data.estimatedDelivery
          ? new Date(data.estimatedDelivery)
          : undefined,
      },
      create: {
        trackingNumber: data.trackingNumber,
        status: data.status,
        currentLocation: data.currentLocation,
        estimatedDelivery: data.estimatedDelivery
          ? new Date(data.estimatedDelivery)
          : undefined,
        user: {
          connectOrCreate: {
            where: { email: data.userEmail }, // Adjust this to your unique user identifier
            create: { email: data.userEmail }, // Add other required user fields if needed
          },
        },
      },
    });

    console.log(
      "Shipment upserted successfully:",
      upsertedShipment.trackingNumber
    );
    return NextResponse.json({
      message: "Shipment upserted successfully",
      shipment: upsertedShipment,
    });
  } catch (error) {
    console.error("Error upserting shipment:", error);
    if (error instanceof Error) {
      return NextResponse.json(
        { error: `Error upserting shipment: ${error.message}` },
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
