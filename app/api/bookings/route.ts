import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { getPrice } from "@/price";

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
    console.log("Received body:", body);

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
      couponCode,
      price,
      discountAmount,
      discountType,
    } = body;

    const route = `${pickupAddress} to ${deliveryAddress}`;

    let finalPrice = price;

    console.log("Coupon code received:", couponCode);

    // Validate coupon if provided
    let appliedCoupon = null;
    if (couponCode) {
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0); // Set to midnight for date comparison

      appliedCoupon = await prisma.coupon.findFirst({
        where: {
          code: couponCode.toUpperCase(),
          isActive: true,
          expiryDate: {
            gte: currentDate,
          },
        },
      });

      console.log("Applied coupon:", appliedCoupon);

      if (!appliedCoupon) {
        return NextResponse.json(
          { error: "Invalid or expired coupon code" },
          { status: 400 }
        );
      }

      const usedCount = await prisma.usedCoupon.count({
        where: { couponId: appliedCoupon.id },
      });

      if (usedCount >= appliedCoupon.usageLimit) {
        return NextResponse.json(
          { error: "Coupon usage limit exceeded" },
          { status: 400 }
        );
      }

      if (
        appliedCoupon.discountType !== discountType ||
        appliedCoupon.discountValue !== discountAmount
      ) {
        return NextResponse.json(
          { error: "Coupon discount mismatch" },
          { status: 400 }
        );
      }
    }

    console.log("Final price:", finalPrice);

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
            price: finalPrice,
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
            usedCoupon: appliedCoupon
              ? {
                  create: {
                    couponId: appliedCoupon.id,
                    userId,
                  },
                }
              : undefined,
          },
          include: {
            shipment: true,
            usedCoupon: true,
          },
        });

        if (appliedCoupon) {
          await prisma.coupon.update({
            where: { id: appliedCoupon.id },
            data: { usedCount: { increment: 1 } },
          });
        }

        return booking;
      } catch (err) {
        console.error("Transaction error details: ", err);
        if (err instanceof Error) {
          throw new Error(`Error in booking transaction: ${err.message}`);
        } else {
          throw new Error(`Error in booking transaction: ${String(err)}`);
        }
      }
    });

    return NextResponse.json({
      success: true,
      booking: {
        ...result,
        price: finalPrice,
        appliedCoupon: appliedCoupon
          ? {
              code: appliedCoupon.code,
              discountType: appliedCoupon.discountType,
              discountValue: appliedCoupon.discountValue,
            }
          : null,
      },
    });
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
