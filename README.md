"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Coupon {
  id: string;
  code: string;
  discountValue: number;
  discountType: "PERCENTAGE" | "FIXED_AMOUNT";
  expiryDate: string;
  usageLimit: number;
  usedCount: number;
  isActive: boolean;
}

const AllCoupon: React.FC = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const response = await fetch("/api/coupons/available");
      if (!response.ok) {
        throw new Error("Failed to fetch coupons");
      }
      const data = await response.json();
      setCoupons(data);
    } catch (err) {
      setError("Failed to load coupons");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this coupon?")) {
      try {
        const response = await fetch("/api/coupons", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        });
        if (!response.ok) {
          throw new Error("Failed to delete coupon");
        }
        setCoupons(coupons.filter((coupon) => coupon.id !== id));
        router.refresh();
      } catch (err) {
        setError("Failed to delete coupon");
      }
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/admin/edit-coupon/${id}`);
  };

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="mt-8 dark:bg-gray-900 shadow-md rounded-lg transition-colors duration-200">
      <h2 className="text-2xl font-bold mb-4">Existing Coupons</h2>
      {coupons.length === 0 ? (
        <p>No coupons found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Code</th>
                <th className="py-3 px-6 text-left">Discount</th>
                <th className="py-3 px-6 text-left">Type</th>
                <th className="py-3 px-6 text-left">Expiry Date</th>
                <th className="py-3 px-6 text-left">Usage</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 dark:text-gray-300">
              {coupons.map((coupon) => (
                <tr key={coupon.id} className="border-b border-gray-200">
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    {coupon.code}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {coupon.discountType === "PERCENTAGE"
                      ? `${coupon.discountValue}%`
                      : `#${coupon.discountValue.toFixed(2)}`}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {coupon.discountType === "PERCENTAGE"
                      ? "Percentage"
                      : "Fixed Amount"}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {new Date(coupon.expiryDate).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {coupon.usedCount} / {coupon.usageLimit}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {coupon.isActive ? (
                      <span className="bg-green-200 text-green-800 py-1 px-3 rounded-full text-xs">
                        Active
                      </span>
                    ) : (
                      <span className="bg-red-200 text-red-800 py-1 px-3 rounded-full text-xs">
                        Inactive
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-6 text-center">
                    <button
                      onClick={() => handleEdit(coupon.id)}
                      className="text-blue-500 hover:text-blue-700 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(coupon.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllCoupon;





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
    } = body;

    const route = `${pickupAddress} to ${deliveryAddress}`;

    // Calculate the initial price
    let finalPrice = calculatePrice({
      pickupAddress,
      deliveryAddress,
      isUrgent,
      packageSize,
      discountType: null,
      discountAmount: null,
    });

    // Validate coupon if provided
    let appliedCoupon = null;
    if (couponCode) {
      appliedCoupon = await prisma.coupon.findFirst({
        where: {
          code: couponCode.toUpperCase(),
          isActive: true,
          expiryDate: { gt: new Date() },
          usageLimit: {
            gt: await prisma.usedCoupon.count({
              where: { couponId: couponCode },
            }),
          },
        },
      });

      if (appliedCoupon) {
        finalPrice = calculatePrice({
          pickupAddress,
          deliveryAddress,
          isUrgent,
          packageSize,
          discountType: appliedCoupon.discountType,
          discountAmount: appliedCoupon.discountValue,
        });
      } else {
        return NextResponse.json(
          { error: "Invalid or expired coupon code" },
          { status: 400 }
        );
      }
    }

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
        console.error("Transaction error: ", err);
        throw new Error("Error in booking transaction");
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

function calculatePrice(data: {
  pickupAddress: string;
  deliveryAddress: string;
  isUrgent: boolean;
  packageSize: string;
  discountType: "PERCENTAGE" | "FIXED_AMOUNT" | null;
  discountAmount: number | null;
}): number {
  const basePrice = getPrice(data.pickupAddress, data.deliveryAddress);
  const urgentFee = data.isUrgent ? 500 : 0;

  const sizeFees: { [key: string]: number } = {
    SMALL: 0,
    MEDIUM: 500,
    LARGE: 1000,
    EXTRA_LARGE: 1500,
  };
  const sizeFee = sizeFees[data.packageSize] || 0;

  let totalBeforeDiscount = basePrice + urgentFee + sizeFee;

  // Apply discount based on discountType
  let totalAfterDiscount = totalBeforeDiscount;
  if (data.discountType === "PERCENTAGE" && data.discountAmount) {
    totalAfterDiscount =
      totalBeforeDiscount - (totalBeforeDiscount * data.discountAmount) / 100;
  } else if (data.discountType === "FIXED_AMOUNT" && data.discountAmount) {
    totalAfterDiscount = totalBeforeDiscount - data.discountAmount;
  }

  // Ensure the total price is not negative
  return Math.max(Math.round(totalAfterDiscount), 0);
}
