"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Clock, Package, Truck } from "lucide-react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import LoadingSpinner from "@/components/LoadingSpinner";

interface FormData {
  pickupAddress: string;
  deliveryAddress: string;
  pickupDate: string;
  deliveryDate: string;
  pickupTime: string;
  deliveryTime: string;
  packageSize: "SMALL" | "MEDIUM" | "LARGE" | "EXTRA_LARGE";
  packageDescription: string;
  isUrgent: boolean;
  paymentMethod: "CREDIT_CARD" | "DEBIT_CARD" | "CASH" | "BANK_TRANSFER";
  pickupPhoneNumber: string;
  deliveryPhoneNumber: string;
}

const BookingPage: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    pickupAddress: "",
    deliveryAddress: "",
    pickupDate: "",
    deliveryDate: "",
    pickupTime: "",
    deliveryTime: "",
    packageSize: "SMALL",
    packageDescription: "",
    isUrgent: false,
    paymentMethod: "CREDIT_CARD",
    pickupPhoneNumber: "",
    deliveryPhoneNumber: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Load form data if available
    const savedData = sessionStorage.getItem("bookingForm");
    if (savedData) setFormData(JSON.parse(savedData));
  }, []);

  const handleChange = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    sessionStorage.setItem("bookingForm", JSON.stringify(formData));
  };

  const validateForm = (): boolean => {
    const errors: any = {};
    if (!formData.pickupAddress)
      errors.pickupAddress = "Pickup address is required";
    if (!formData.deliveryAddress)
      errors.deliveryAddress = "Delivery address is required";
    // Other validations

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setFormError(null);
    setSuccess(false);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Booking failed, please try again.");
      }

      const result = await response.json();
      setSuccess(true);
      router.push(`/booking/confirmation/${result.id}`);
      sessionStorage.removeItem("bookingForm");
    } catch (err: any) {
      setFormError(err.message || "Failed to create booking.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto mt-8 bg-white dark:bg-gray-900 shadow-md rounded-lg transition-colors duration-200">
      <CardHeader>
        <h1 className="text-3xl font-bold text-center">Create a Booking</h1>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label
              htmlFor="pickupAddress"
              className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              <Truck className="w-4 h-4 mr-2" /> Pickup Address
            </Label>
            <Input
              id="pickupAddress"
              value={formData.pickupAddress}
              onChange={(e) => handleChange("pickupAddress", e.target.value)}
              placeholder="Enter pickup address Eg Akintola juction"
              className={`w-full px-3 py-2 border rounded-md ${
                errors.pickupAddress ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              required
            />
            {errors.pickupAddress && (
              <p className="text-red-500 text-xs mt-1">
                {errors.pickupAddress}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="deliveryAddress"
              className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              <Truck className="w-4 h-4 mr-2" /> Delivery Address
            </Label>
            <Input
              id="deliveryAddress"
              value={formData.deliveryAddress}
              onChange={(e) => handleChange("deliveryAddress", e.target.value)}
              placeholder="Enter delivery address eg Amukpe by the park"
              className={`w-full px-3 py-2 border rounded-md ${
                errors.deliveryAddress ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              required
            />
            {errors.deliveryAddress && (
              <p className="text-red-500 text-xs mt-1">
                {errors.deliveryAddress}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="pickupDate"
              className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              <Calendar className="w-4 h-4 mr-2" /> Pickup Date
            </Label>
            <Input
              type="date"
              id="pickupDate"
              value={formData.pickupDate}
              onChange={(e) => handleChange("pickupDate", e.target.value)}
              placeholder="Select pickup date"
              className={`w-full px-3 py-2 border rounded-md ${
                errors.pickupDate ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              required
            />
            {errors.pickupDate && (
              <p className="text-red-500 text-xs mt-1">{errors.pickupDate}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="deliveryDate"
              className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              <Calendar className="w-4 h-4 mr-2" /> Delivery Date
            </Label>
            <Input
              type="date"
              id="deliveryDate"
              value={formData.deliveryDate}
              onChange={(e) => handleChange("deliveryDate", e.target.value)}
              placeholder="Select delivery date"
              className={`w-full px-3 py-2 border rounded-md ${
                errors.deliveryDate ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              required
            />
            {errors.deliveryDate && (
              <p className="text-red-500 text-xs mt-1">{errors.deliveryDate}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="pickupTime"
              className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              <Clock className="w-4 h-4 mr-2" /> Pickup Time
            </Label>
            <Input
              type="time"
              id="pickupTime"
              value={formData.pickupTime}
              onChange={(e) => handleChange("pickupTime", e.target.value)}
              placeholder="Select pickup time"
              className={`w-full px-3 py-2 border rounded-md ${
                errors.pickupTime ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              required
            />
            {errors.pickupTime && (
              <p className="text-red-500 text-xs mt-1">{errors.pickupTime}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="deliveryTime"
              className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              <Clock className="w-4 h-4 mr-2" /> Delivery Time
            </Label>
            <Input
              type="time"
              id="deliveryTime"
              value={formData.deliveryTime}
              onChange={(e) => handleChange("deliveryTime", e.target.value)}
              placeholder="Select delivery time"
              className={`w-full px-3 py-2 border rounded-md ${
                errors.deliveryTime ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              required
            />
            {errors.deliveryTime && (
              <p className="text-red-500 text-xs mt-1">{errors.deliveryTime}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="packageSize"
              className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              <Package className="w-4 h-4 mr-2" /> Package Size
            </Label>
            <Select
              value={formData.packageSize}
              onValueChange={(value) => handleChange("packageSize", value)}
            >
              <SelectTrigger className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800">
                <SelectValue placeholder="Select package size" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
                <SelectItem value="SMALL">Small (Up to 1kg or less)</SelectItem>
                <SelectItem value="MEDIUM">
                  Medium (5kg - 15kg or less)
                </SelectItem>
                <SelectItem value="LARGE">
                  Large (15kg - 30k or less)
                </SelectItem>
                <SelectItem value="EXTRA_LARGE">
                  Extra Large (30kg+ or mor)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="packageDescription"
              className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              <Package className="w-4 h-4 mr-2" /> Package Description
            </Label>
            <Input
              id="packageDescription"
              value={formData.packageDescription}
              onChange={(e) =>
                handleChange("packageDescription", e.target.value)
              }
              placeholder="Describe the package"
              className={`w-full px-3 py-2 border rounded-md ${
                errors.packageDescription ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              required
            />
            {errors.packageDescription && (
              <p className="text-red-500 text-xs mt-1">
                {errors.packageDescription}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="pickupPhoneNumber"
              className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              <Phone className="w-4 h-4 mr-2" /> Pickup Phone Number
            </Label>
            <Input
              id="pickupPhoneNumber"
              maxLength={11}
              value={formData.pickupPhoneNumber}
              onChange={(e) =>
                handleChange("pickupPhoneNumber", e.target.value)
              }
              placeholder="Enter phone number"
              className={`w-full px-3 py-2 border rounded-md ${
                errors.pickupPhoneNumber ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              required
            />
            {errors.pickupPhoneNumber && (
              <p className="text-red-500 text-xs mt-1">
                {errors.pickupPhoneNumber}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="deliveryPhoneNumber"
              className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              <Phone className="w-4 h-4 mr-2" /> Delivery Phone Number
            </Label>
            <Input
              id="deliveryPhoneNumber"
              maxLength={11}
              value={formData.deliveryPhoneNumber}
              onChange={(e) =>
                handleChange("deliveryPhoneNumber", e.target.value)
              }
              placeholder="Enter phone number"
              className={`w-full px-3 py-2 border rounded-md ${
                errors.deliveryPhoneNumber
                  ? "border-red-500"
                  : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              required
            />
            {errors.deliveryPhoneNumber && (
              <p className="text-red-500 text-xs mt-1">
                {errors.deliveryPhoneNumber}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="paymentMethod"
              className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-100"
            >
              <CreditCard className="w-4 h-4 mr-2" /> Payment Method
            </Label>
            <Select
              onValueChange={(value) =>
                handleChange(
                  "paymentMethod",
                  value as FormData["paymentMethod"]
                )
              }
              value={formData.paymentMethod}
              required
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
                <SelectItem value="CREDIT_CARD">Credit Card</SelectItem>
                <SelectItem value="DEBIT_CARD">Debit Card</SelectItem>
                <SelectItem value="CASH">Cash</SelectItem>
                <SelectItem value="BANK_TRANSFER">Bank Transfer</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {errors.form && (
            <Alert
              variant="destructive"
              className="flex items-center space-x-2 mt-6"
            >
              <AlertDescription>{errors.form}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert className="flex items-center space-x-2 mt-6 bg-green-100 border-green-400 text-green-700">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <AlertDescription>
                Your dispatch rider has been booked successfully. You will
                receive a confirmation shortly.
              </AlertDescription>
            </Alert>
          )}
        </form>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          type="submit"
          onClick={handleSubmit}
          disabled={loading}
          className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none"
        >
          {loading ? "Creating Booking..." : "Create Booking"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BookingPage;



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
