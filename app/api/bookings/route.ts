import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

function generateTrackingNumber() {
  return "Fls-Sap" + Math.random().toString(36).substr(2, 9).toUpperCase();
}

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json(
        { error: "You are not authorized. Please login." },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    const body = await request.json();
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

    const route = `${pickupAddress} to ${deliveryAddress}`;

    const basePrice = 800;
    const urgentFee = isUrgent ? 500 : 0;

    const sizeFees: { [key: string]: number } = {
      SMALL: 200,
      MEDIUM: 500,
      LARGE: 1000,
      EXTRA_LARGE: 1500,
    };

    const sizeFee = sizeFees[packageSize] || 0;
    const price = basePrice + urgentFee + sizeFee;

   const result = await prisma.$transaction(async (prisma) => {
     try {
       const booking = await prisma.booking.create({
         data: {
           userId,
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
               userId,
             },
           },
         },
         include: {
           shipment: true,
         },
       });

       console.log("Created booking:", booking);
       return booking;
     } catch (err) {
       console.error("Transaction error: ", err);
       throw new Error("Error in booking transaction"); // Rollback the transaction
     }
   });

    return NextResponse.json({ success: true, booking: result });
  } catch (error) {
    console.error("Error creating booking:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    return NextResponse.json(
      { error: "Failed to create booking", details: errorMessage },
      { status: 500 }
    );
  }
}
