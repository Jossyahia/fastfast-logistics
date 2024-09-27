// app/api/coupons/route.ts

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function POST(req: Request) {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { code, discountType, discountValue, expiryDate, usageLimit } =
    await req.json();

  try {
    const coupon = await prisma.coupon.create({
      data: {
        code,
        discountType,
        discountValue,
        expiryDate: new Date(expiryDate),
        usageLimit,
      },
    });
    return NextResponse.json(coupon);
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating coupon" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const {
    id,
    code,
    discountType,
    discountValue,
    expiryDate,
    usageLimit,
    isActive,
  } = await req.json();

  try {
    const coupon = await prisma.coupon.update({
      where: { id },
      data: {
        code,
        discountType,
        discountValue,
        expiryDate: new Date(expiryDate),
        usageLimit,
        isActive,
      },
    });
    return NextResponse.json(coupon);
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating coupon" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await req.json();

  try {
    await prisma.coupon.delete({ where: { id } });
    return NextResponse.json({ message: "Coupon deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting coupon" },
      { status: 500 }
    );
  }
}
