import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

function generateTrackingNumber() {
  return "Fls-Sap" + Math.random().toString(36).substr(2, 9).toUpperCase();
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    //console.log("Session:", session); // Log the entire session object

    if (!session) {
     // console.log("No session found");
      return NextResponse.json(
        { error: "Unauthorized - No session" },
        { status: 401 }
      );
    }

    if (!session.user) {
    //console.log("No user in session");
      return NextResponse.json(
        { error: "Unauthorized - No user in session" },
        { status: 401 }
      );
    }

    if (!session.user.id) {
      //console.log("No user ID in session");
      return NextResponse.json(
        { error: "Unauthorized - No user ID" },
        { status: 401 }
      );
    }

    const body = await request.json();
    //console.log("Request body:", body); // Log the request body
    const {
      pickupAddress,
      deliveryAddress,
      pickupDate,
      deliveryDate,
      pickupTime,
      deliveryTime,
      packageSize,
      packageDescription,
      isUrgent,
      paymentMethod,
      pickupPhoneNumber,
      deliveryPhoneNumber,
    } = body;

    // Simple route calculation (replace with actual logic)
    const route = `${pickupAddress} to ${deliveryAddress}`;

    // Simple price calculation (replace with actual logic)
    const basePrice = 800;
    const urgentFee = isUrgent ? 500 : 0;
    const sizeFee =
      { SMALL: 200, MEDIUM: 500, LARGE: 1000, EXTRA_LARGE: 1500 }[
        packageSize
      ] || 0;
    const price = basePrice + urgentFee + sizeFee;

    // Create booking and shipment in a transaction
    const result = await prisma.$transaction(async (prisma) => {
      const booking = await prisma.booking.create({
        data: {
          userId: session.user.id,
          pickupAddress,
          deliveryAddress,
          pickupDate: new Date(pickupDate),
          deliveryDate: new Date(deliveryDate),
          pickupTime,
          deliveryTime,
          packageSize,
          packageDescription,
          isUrgent,
          paymentMethod,
          route,
          price,
          pickupPhoneNumber,
          deliveryPhoneNumber,
          status: "PROCESSING",
          shipment: {
            create: {
              trackingNumber: generateTrackingNumber(),
              status: "PROCESSING",
              currentLocation: pickupAddress,
              estimatedDelivery: new Date(deliveryDate),
              userId: session.user.id,
            },
          },
        },
        include: {
          shipment: true,
        },
      });

      console.log("Created booking:", booking); // Log the created booking
      return booking;
    });

    return NextResponse.json({ success: true, booking: result });
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { error: "Failed to create booking", details: error.message },
      { status: 500 }
    );
  }
}
