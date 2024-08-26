"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
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
import Link from "next/link";

const FastFastLogisticsBooking = () => {
  const { data: session, status } = useSession();
  const [pickupDate, setPickupDate] = useState<Date>(new Date());
  const [deliveryDate, setDeliveryDate] = useState<Date>(new Date());
  const [isUrgent, setIsUrgent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [error, setError] = useState<React.ReactNode>("");
  const [formData, setFormData] = useState({
    pickupAddress: "",
    deliveryAddress: "",
    pickupTime: "",
    deliveryTime: "",
    packageSize: "",
    packageDescription: "",
    pickupPhoneNumber: "",
    deliveryPhoneNumber: "",
    paymentMethod: "",
    route: "",
    price: "",
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

    if (status !== "authenticated" || !session?.user?.id) {
      setError(
        <>
          You must be logged in to create a booking.{" "}
          <Link href="/auth/signin" className="text-blue-500 underline">
            Log in here
          </Link>
          .
        </>
      );
      setIsLoading(false);
      return;
    }

    const bookingData = {
      ...formData,
      pickupDate: pickupDate.toISOString(),
      deliveryDate: deliveryDate.toISOString(),
      isUrgent,
      userId: session.user.id,
      status: "PENDING",
      price: parseFloat(formData.price),
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
              className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="deliveryAddress">Delivery Address</Label>
            <Input
              id="deliveryAddress"
              name="deliveryAddress"
              placeholder="Enter Your Delivery Location"
              required
              onChange={handleInputChange}
              className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
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
                <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
                  <SelectItem
                    value="morning"
                    className="bg-gray-100 dark:bg-gray-600"
                  >
                    Morning (8AM - 12PM)
                  </SelectItem>
                  <SelectItem
                    value="afternoon"
                    className="bg-gray-100 dark:bg-gray-600"
                  >
                    Afternoon (12PM - 4PM)
                  </SelectItem>
                  <SelectItem
                    value="evening"
                    className="bg-gray-100 dark:bg-gray-600"
                  >
                    Evening (4PM - 8PM)
                  </SelectItem>
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
                <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
                  <SelectItem
                    value="morning"
                    className="bg-gray-100 dark:bg-gray-600"
                  >
                    Morning (8AM - 12PM)
                  </SelectItem>
                  <SelectItem
                    value="afternoon"
                    className="bg-gray-100 dark:bg-gray-600"
                  >
                    Afternoon (12PM - 4PM)
                  </SelectItem>
                  <SelectItem
                    value="evening"
                    className="bg-gray-100 dark:bg-gray-600"
                  >
                    Evening (4PM - 8PM)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2 lg:grid lg:grid-cols-2 lg:gap-4">
            <div className="space-y-2">
              <Label>Package Size</Label>
              <Select
                onValueChange={(value) =>
                  handleSelectChange("packageSize", value)
                }
              >
                <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700">
                  <SelectValue placeholder="Select package size" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
                  <SelectItem
                    value="small"
                    className="bg-gray-100 dark:bg-gray-600"
                  >
                    Small (Up to 5kg)
                  </SelectItem>
                  <SelectItem
                    value="medium"
                    className="bg-gray-100 dark:bg-gray-600"
                  >
                    Medium (5kg - 15kg)
                  </SelectItem>
                  <SelectItem
                    value="large"
                    className="bg-gray-100 dark:bg-gray-600"
                  >
                    Large (15kg - 30kg)
                  </SelectItem>
                  <SelectItem
                    value="extra-large"
                    className="bg-gray-100 dark:bg-gray-600"
                  >
                    Extra Large (30kg+)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="packageDescription">Package Description</Label>
              <Textarea
                id="packageDescription"
                name="packageDescription"
                placeholder="Describe the package"
                required
                onChange={handleInputChange}
                className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
              />
            </div>
          </div>

          <div className="space-y-2 lg:grid lg:grid-cols-2 lg:gap-4">
            <div className="space-y-2">
              <Label htmlFor="pickupPhoneNumber">Pickup Phone Number</Label>
              <Input
                id="pickupPhoneNumber"
                name="pickupPhoneNumber"
                placeholder="Enter pickup phone number"
                required
                onChange={handleInputChange}
                className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="deliveryPhoneNumber">Delivery Phone Number</Label>
              <Input
                id="deliveryPhoneNumber"
                name="deliveryPhoneNumber"
                placeholder="Enter delivery phone number"
                required
                onChange={handleInputChange}
                className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
              />
            </div>
          </div>

          <div className="space-y-2 lg:grid lg:grid-cols-2 lg:gap-4">
            <div className="space-y-2">
              <Label htmlFor="paymentMethod">Payment Method</Label>
              <Select
                onValueChange={(value) =>
                  handleSelectChange("paymentMethod", value)
                }
              >
                <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
                  <SelectItem
                    value="credit-card"
                    className="bg-gray-100 dark:bg-gray-600"
                  >
                    Credit Card
                  </SelectItem>
                  <SelectItem
                    value="paypal"
                    className="bg-gray-100 dark:bg-gray-600"
                  >
                    PayPal
                  </SelectItem>
                  <SelectItem
                    value="cash"
                    className="bg-gray-100 dark:bg-gray-600"
                  >
                    Cash
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="route">Route</Label>
              <Input
                id="route"
                name="route"
                placeholder="Enter route information"
                required
                onChange={handleInputChange}
                className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              name="price"
              placeholder="Enter estimated price"
              required
              onChange={handleInputChange}
              className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
            />
          </div>

          <div className="space-y-2">
            <Label>Is this urgent?</Label>
            <Switch
              checked={isUrgent}
              onCheckedChange={setIsUrgent}
              className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Submit Booking"
            )}
          </Button>

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default FastFastLogisticsBooking;
