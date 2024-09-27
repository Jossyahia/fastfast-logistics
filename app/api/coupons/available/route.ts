import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session || !session.user || session.user.role !== "ADMIN") {
      console.log("Unauthorized access attempt");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const availableCoupons = await prisma.coupon.findMany({
      where: {
        isActive: true,
        expiryDate: { gt: new Date() },
        usageLimit: { gt: prisma.coupon.fields.usedCount },
      },
      select: {
        id: true,
        code: true,
        discountType: true,
        discountValue: true,
        expiryDate: true,
        usageLimit: true,
        usedCount: true,
      },
    });

    console.log(`Found ${availableCoupons.length} available coupons`);

    return NextResponse.json(availableCoupons);
  } catch (error) {
    console.error("Error retrieving available coupons:", error);
    return NextResponse.json(
      { error: "Error retrieving available coupons" },
      { status: 500 }
    );
  }
}
