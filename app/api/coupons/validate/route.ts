import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function POST(request: NextRequest) {
  // Check if the user is authenticated
  const session = await auth();
  if (!session) {
    return new NextResponse(
      JSON.stringify({ error: "Authentication required" }),
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  // Get coupon code from request body
  const { code } = await request.json();

  // Return an error if no coupon code is provided
  if (!code) {
    return new NextResponse(
      JSON.stringify({ error: "Coupon code is required" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    const coupon = await prisma.coupon.findUnique({
      where: { code: code.toUpperCase() },
    });

    console.log("Coupon data:", coupon); // Keep this for debugging

    if (coupon && coupon.isActive) {
      return new NextResponse(
        JSON.stringify({
          valid: true,
          discountAmount: coupon.discountValue,
          discountType: coupon.discountType,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } else {
      return new NextResponse(JSON.stringify({ valid: false }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    console.error("Error validating coupon:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
