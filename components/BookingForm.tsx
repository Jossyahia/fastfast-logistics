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
import { AlertCircle, Loader2, CheckCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";

const FastFastLogisticsBooking = () => {
  const { data: session, status } = useSession();
  const [pickupDate, setPickupDate] = useState<Date | undefined>(undefined);
  const [deliveryDate, setDeliveryDate] = useState<Date | undefined>(undefined);
  const [isUrgent, setIsUrgent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [error, setError] = useState<React.ReactNode>("");
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
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
    validateField(name, value);
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    validateField(name, value);
  };

  const validateField = (name: string, value: string) => {
    let error = "";
    switch (name) {
      case "pickupAddress":
      case "deliveryAddress":
      case "route":
        if (!value.trim()) error = "This field is required";
        break;
      case "pickupPhoneNumber":
      case "deliveryPhoneNumber":
        if (!/^\d{0,11}$/.test(value)) {
          error = "Phone number must be up to 11 digits";
        }
        break;
      case "price":
        if (isNaN(Number(value)) || Number(value) <= 0) {
          error = "Please enter a valid price";
        }
        break;
      case "pickupTime":
      case "deliveryTime":
      case "packageSize":
      case "paymentMethod":
        if (!value) error = "Please select an option";
        break;
    }
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
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

    if (!pickupDate || !deliveryDate) {
      setError("Please select both pickup and delivery dates.");
      setIsLoading(false);
      return;
    }

    const hasErrors = Object.values(formErrors).some((error) => error !== "");
    if (hasErrors) {
      setError("Please correct the errors in the form before submitting.");
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
          <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
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
              placeholder="Enter your pickup location"
              required
              onChange={handleInputChange}
              className={`bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 ${
                formErrors.pickupAddress ? "border-red-500" : ""
              }`}
            />
            {formErrors.pickupAddress && (
              <p className="text-red-500 text-sm">{formErrors.pickupAddress}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="deliveryAddress">Delivery Address</Label>
            <Input
              id="deliveryAddress"
              name="deliveryAddress"
              placeholder="Enter your delivery location"
              required
              onChange={handleInputChange}
              className={`bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 ${
                formErrors.deliveryAddress ? "border-red-500" : ""
              }`}
            />
            {formErrors.deliveryAddress && (
              <p className="text-red-500 text-sm">
                {formErrors.deliveryAddress}
              </p>
            )}
          </div>

          <div className="space-y-2 lg:grid lg:grid-cols-2 lg:gap-4">
            <div className="space-y-2">
              <Label>Select Pickup Date</Label>
              <Calendar
                mode="single"
                selected={pickupDate}
                onSelect={(date) => date && setPickupDate(date)}
                disabled={(date) =>
                  date < new Date(new Date().setHours(0, 0, 0, 0))
                }
                className={`bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md ${
                  !pickupDate ? "border-red-500" : ""
                }`}
              />
              {!pickupDate && (
                <p className="text-red-500 text-sm">
                  Please select a pickup date
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Delivery Date</Label>
              <Calendar
                mode="single"
                selected={deliveryDate}
                onSelect={(date) => date && setDeliveryDate(date)}
                disabled={(date) => !pickupDate || date < pickupDate}
                className={`bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md ${
                  !deliveryDate ? "border-red-500" : ""
                }`}
              />
              {!deliveryDate && (
                <p className="text-red-500 text-sm">
                  Please select a delivery date
                </p>
              )}
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
                <SelectTrigger
                  className={`bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 ${
                    formErrors.pickupTime ? "border-red-500" : ""
                  }`}
                >
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
                  <SelectItem value="morning">Morning (8AM - 12PM)</SelectItem>
                  <SelectItem value="afternoon">
                    Afternoon (12PM - 4PM)
                  </SelectItem>
                  <SelectItem value="evening">Evening (4PM - 8PM)</SelectItem>
                </SelectContent>
              </Select>
              {formErrors.pickupTime && (
                <p className="text-red-500 text-sm">{formErrors.pickupTime}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="deliveryTime">Delivery Time</Label>
              <Select
                onValueChange={(value) =>
                  handleSelectChange("deliveryTime", value)
                }
              >
                <SelectTrigger
                  className={`bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 ${
                    formErrors.deliveryTime ? "border-red-500" : ""
                  }`}
                >
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
                  <SelectItem value="morning">Morning (8AM - 12PM)</SelectItem>
                  <SelectItem value="afternoon">
                    Afternoon (12PM - 4PM)
                  </SelectItem>
                  <SelectItem value="evening">Evening (4PM - 8PM)</SelectItem>
                </SelectContent>
              </Select>
              {formErrors.deliveryTime && (
                <p className="text-red-500 text-sm">
                  {formErrors.deliveryTime}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2 lg:grid lg:grid-cols-2 lg:gap-4">
            <div className="space-y-2">
              <Label htmlFor="packageSize">Package Size</Label>
              <Select
                onValueChange={(value) =>
                  handleSelectChange("packageSize", value)
                }
              >
                <SelectTrigger
                  className={`bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 ${
                    formErrors.packageSize ? "border-red-500" : ""
                  }`}
                >
                  <SelectValue placeholder="Select package size" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
                  <SelectItem value="small">Small (Up to 1kg or less)</SelectItem>
                  <SelectItem value="medium">Medium (5kg - 15kg or less)</SelectItem>
                  <SelectItem value="large">Large (15kg - 30k or less)</SelectItem>
                  <SelectItem value="extra-large">
                    Extra Large (30kg+ or mor)
                  </SelectItem>
                </SelectContent>
              </Select>
              {formErrors.packageSize && (
                <p className="text-red-500 text-sm">{formErrors.packageSize}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="packageDescription">Package Description</Label>
              <Textarea
                id="packageDescription"
                name="packageDescription"
                placeholder="Describe the package contents"
                required
                onChange={handleInputChange}
                className={`bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 ${
                  formErrors.packageDescription ? "border-red-500" : ""
                }`}
              />
              {formErrors.packageDescription && (
                <p className="text-red-500 text-sm">
                  {formErrors.packageDescription}
                </p>
              )}
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
                maxLength={11}
                className={`bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 ${
                  formErrors.pickupPhoneNumber ? "border-red-500" : ""
                }`}
              />
              {formErrors.pickupPhoneNumber && (
                <p className="text-red-500 text-sm">
                  {formErrors.pickupPhoneNumber}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="deliveryPhoneNumber">Delivery Phone Number</Label>
              <Input
                id="deliveryPhoneNumber"
                name="deliveryPhoneNumber"
                placeholder="Enter delivery phone number"
                required
                onChange={handleInputChange}
                maxLength={11}
                className={`bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 ${
                  formErrors.deliveryPhoneNumber ? "border-red-500" : ""
                }`}
              />
              {formErrors.deliveryPhoneNumber && (
                <p className="text-red-500 text-sm">
                  {formErrors.deliveryPhoneNumber}
                </p>
              )}
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
                <SelectTrigger
                  className={`bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 ${
                    formErrors.paymentMethod ? "border-red-500" : ""
                  }`}
                >
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
                  <SelectItem value="credit-card">Credit Card</SelectItem>
                  <SelectItem value="paypal">PayPal</SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                </SelectContent>
              </Select>
              {formErrors.paymentMethod && (
                <p className="text-red-500 text-sm">
                  {formErrors.paymentMethod}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="route">Route</Label>
              <Input
                id="route"
                name="route"
                placeholder="Enter route information"
                required
                onChange={handleInputChange}
                className={`bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 ${
                  formErrors.route ? "border-red-500" : ""
                }`}
              />
              {formErrors.route && (
                <p className="text-red-500 text-sm">{formErrors.route}</p>
              )}
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
              className={`bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 ${
                formErrors.price ? "border-red-500" : ""
              }`}
            />
            {formErrors.price && (
              <p className="text-red-500 text-sm">{formErrors.price}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="isUrgent">Is this urgent?</Label>
            <div className="flex items-center space-x-2">
              <Switch
                id="isUrgent"
                checked={isUrgent}
                onCheckedChange={setIsUrgent}
                className="bg-blue-500"
              />
              <span>{isUrgent ? "Yes" : "No"}</span>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <Loader2 className="animate-spin mr-2" />
                <span>Processing...</span>
              </div>
            ) : (
              "Submit Booking"
            )}
          </Button>

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
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
