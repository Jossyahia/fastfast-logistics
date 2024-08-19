// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  password      String
  role          Role      @default(USER)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  bookings      Booking[]
}

model Booking {
  id            String    @id @default(cuid())
  userId        String
  user          User      @relation(fields: [userId], references: [id])
  status        Status    @default(PENDING)
  pickupAddress String
  dropoffAddress String
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  rider         Rider?    @relation(fields: [riderId], references: [id])
  riderId       String?
}

model Rider {
  id            String    @id @default(cuid())
  name          String
  email         String    @unique
  password      String
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  bookings      Booking[]
}

enum Role {
  USER
  ADMIN
  RIDER
}

enum Status {
  PENDING
  ACCEPTED
  IN_PROGRESS
  COMPLETED
  CANCELLED
}

"use client";
import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const FastFastLogisticsBooking = () => {
  const [pickupDate, setPickupDate] = useState<Date>(new Date());
  const [deliveryDate, setDeliveryDate] = useState<Date>(new Date());
  const [isUrgent, setIsUrgent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    pickupAddress: "",
    deliveryAddress: "",
    pickupTime: "",
    deliveryTime: "",
    packageSize: "",
    packageDescription: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const bookingData = {
      ...formData,
      pickupDate: pickupDate.toISOString(),
      deliveryDate: deliveryDate.toISOString(),
      isUrgent,
    };

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        throw new Error("Failed to create booking");
      }

      const result = await response.json();
      console.log("Booking created:", result);
      setBookingComplete(true);
    } catch (error) {
      console.error("Error creating booking:", error);
      setError(
        "An error occurred while creating the booking. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (bookingComplete) {
    return (
      <Card className="w-full sm:w-[500px] lg:w-[600px] mx-auto p-4 sm:p-6">
        <CardContent className="text-center">
          <AlertCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
          <p>
            Your dispatch rider has been booked successfully. You will receive a
            confirmation email shortly.
          </p>
          <Button className="mt-4" onClick={() => setBookingComplete(false)}>
            Book Another Delivery
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full sm:w-[500px] lg:w-[600px] mx-auto p-4 sm:p-6">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          FastFast Logistics Services Booking
        </CardTitle>
        <CardDescription>
          Book a dispatch rider for your delivery needs
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="pickupAddress">Pickup Address</Label>
            <Input
              id="pickupAddress"
              name="pickupAddress"
              placeholder="Enter Your Pickup Location"
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="deliveryAddress">Delivery Address</Label>
            <Input
              id="deliveryAddress"
              name="deliveryAddress"
              placeholder="Enter Your delivery Location"
              required
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2 lg:grid lg:grid-cols-2 lg:gap-4">
            <div className="space-y-2">
              <Label>Select Pickup Date</Label>
              <Calendar
                mode="single"
                selected={pickupDate}
                onSelect={(date) => date && setPickupDate(date)}
                disabled={(date) => date < new Date()}
              />
            </div>
            <div className="space-y-2">
              <Label>Delivery Date</Label>
              <Calendar
                mode="single"
                selected={deliveryDate}
                onSelect={(date) => date && setDeliveryDate(date)}
                disabled={(date) => date < pickupDate}
              />
            </div>
          </div>

          <div className="space-y-2 lg:grid lg:grid-cols-2 lg:gap-4">
            <div className="space-y-2">
              <Label htmlFor="pickupTime">Pickup Time</Label>
              <Select
                onValueChange={(value) =>
                  handleSelectChange("pickupTime", value)
                }
              >
                <SelectTrigger id="pickupTime">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">Morning (8AM - 12PM)</SelectItem>
                  <SelectItem value="afternoon">
                    Afternoon (12PM - 4PM)
                  </SelectItem>
                  <SelectItem value="evening">Evening (4PM - 8PM)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="deliveryTime">Delivery Time</Label>
              <Select
                onValueChange={(value) =>
                  handleSelectChange("deliveryTime", value)
                }
              >
                <SelectTrigger id="deliveryTime">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">Morning (8AM - 12PM)</SelectItem>
                  <SelectItem value="afternoon">
                    Afternoon (12PM - 4PM)
                  </SelectItem>
                  <SelectItem value="evening">Evening (4PM - 8PM)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="packageSize">Package Size</Label>
            <Select
              onValueChange={(value) =>
                handleSelectChange("packageSize", value)
              }
            >
              <SelectTrigger id="packageSize">
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Small (Up to 5kg)</SelectItem>
                <SelectItem value="medium">Medium (5-15kg)</SelectItem>
                <SelectItem value="large">Large (15-30kg)</SelectItem>
                <SelectItem value="extralarge">Extra Large (30kg+)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="packageDescription">Package Description</Label>
            <Textarea
              id="packageDescription"
              name="packageDescription"
              placeholder="Briefly describe your package contents"
              onChange={handleInputChange}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="urgent"
              checked={isUrgent}
              onCheckedChange={setIsUrgent}
            />
            <Label htmlFor="urgent">
              Urgent Delivery (Additional fee applies)
            </Label>
          </div>

          {isUrgent && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Urgent Delivery</AlertTitle>
              <AlertDescription>
                An additional fee of $20 will be applied for urgent deliveries.
              </AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing
              </>
            ) : (
              "Book Dispatch Rider"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default FastFastLogisticsBooking;

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
function generateTrackingNumber() {
  return "TN" + Math.random().toString(36).substr(2, 9).toUpperCase();
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

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

    // Simple route calculation (replace with actual logic)
    const route = `${pickupAddress} to ${deliveryAddress}`;

    // Simple price calculation (replace with actual logic)
    const basePrice = 10;
    const urgentFee = isUrgent ? 5 : 0;
    const sizeFee =
      { SMALL: 0, MEDIUM: 5, LARGE: 10, EXTRA_LARGE: 15 }[packageSize] || 0;
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
        },
      });

      const shipment = await prisma.shipment.create({
        data: {
          trackingNumber: generateTrackingNumber(),
          status: "PROCESSING",
          currentLocation: pickupAddress,
          estimatedDelivery: new Date(deliveryDate),
          userId: session.user.id,
        },
      });

      return { booking, shipment };
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const bookings = await prisma.booking.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      include: { rider: true },
    });

    return NextResponse.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}