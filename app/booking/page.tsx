"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Calendar,
  Clock,
  Package,
  CreditCard,
  Phone,
  Truck,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

// Define types for form data
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
  const [error, setError] = useState("");

  // Explicitly type 'name' and 'value' parameters
  const handleChange = (name: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        router.push(`/booking/confirmation/${data.booking.id}`);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create booking");
      }
    } catch (error: any) {
      console.error("Error creating booking:", error);
      setError(
        error.message || "An error occurred while creating the booking."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto mt-8 bg-white dark:bg-gray-900 shadow-md rounded-lg transition-colors duration-200">
      <CardHeader>
        <h1 className="text-3xl font-bold">Create a Booking</h1>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="pickupAddress" className="flex items-center">
                <Truck className="w-4 h-4 mr-2" /> Pickup Address
              </Label>
              <Input
                id="pickupAddress"
                value={formData.pickupAddress}
                onChange={(e) => handleChange("pickupAddress", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="deliveryAddress" className="flex items-center">
                <Truck className="w-4 h-4 mr-2" /> Delivery Address
              </Label>
              <Input
                id="deliveryAddress"
                value={formData.deliveryAddress}
                onChange={(e) =>
                  handleChange("deliveryAddress", e.target.value)
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pickupDate" className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" /> Pickup Date
              </Label>
              <Input
                type="date"
                id="pickupDate"
                value={formData.pickupDate}
                onChange={(e) => handleChange("pickupDate", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="deliveryDate" className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" /> Delivery Date
              </Label>
              <Input
                type="date"
                id="deliveryDate"
                value={formData.deliveryDate}
                onChange={(e) => handleChange("deliveryDate", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pickupTime" className="flex items-center">
                <Clock className="w-4 h-4 mr-2" /> Pickup Time
              </Label>
              <Input
                type="time"
                id="pickupTime"
                value={formData.pickupTime}
                onChange={(e) => handleChange("pickupTime", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="deliveryTime" className="flex items-center">
                <Clock className="w-4 h-4 mr-2" /> Delivery Time
              </Label>
              <Input
                type="time"
                id="deliveryTime"
                value={formData.deliveryTime}
                onChange={(e) => handleChange("deliveryTime", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="packageSize" className="flex items-center">
                <Package className="w-4 h-4 mr-2" /> Package Size
              </Label>
              <Select
                value={formData.packageSize}
                onValueChange={(value) => handleChange("packageSize", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select package size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SMALL">Small</SelectItem>
                  <SelectItem value="MEDIUM">Medium</SelectItem>
                  <SelectItem value="LARGE">Large</SelectItem>
                  <SelectItem value="EXTRA_LARGE">Extra Large</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="paymentMethod" className="flex items-center">
                <CreditCard className="w-4 h-4 mr-2" /> Payment Method
              </Label>
              <Select
                value={formData.paymentMethod}
                onValueChange={(value) => handleChange("paymentMethod", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CREDIT_CARD">Credit Card</SelectItem>
                  <SelectItem value="DEBIT_CARD">Debit Card</SelectItem>
                  <SelectItem value="CASH">Cash</SelectItem>
                  <SelectItem value="BANK_TRANSFER">Bank Transfer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="packageDescription" className="flex items-center">
              <Package className="w-4 h-4 mr-2" /> Package Description
            </Label>
            <Textarea
              id="packageDescription"
              value={formData.packageDescription}
              onChange={(e) =>
                handleChange("packageDescription", e.target.value)
              }
              rows={3}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="isUrgent"
              checked={formData.isUrgent}
              onCheckedChange={(checked) => handleChange("isUrgent", checked)}
            />
            <Label htmlFor="isUrgent">Urgent Delivery</Label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="pickupPhoneNumber" className="flex items-center">
                <Phone className="w-4 h-4 mr-2" /> Pickup Phone Number
              </Label>
              <Input
                type="tel"
                id="pickupPhoneNumber"
                value={formData.pickupPhoneNumber}
                onChange={(e) =>
                  handleChange("pickupPhoneNumber", e.target.value)
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="deliveryPhoneNumber"
                className="flex items-center"
              >
                <Phone className="w-4 h-4 mr-2" /> Delivery Phone Number
              </Label>
              <Input
                type="tel"
                id="deliveryPhoneNumber"
                value={formData.deliveryPhoneNumber}
                onChange={(e) =>
                  handleChange("deliveryPhoneNumber", e.target.value)
                }
                required
              />
            </div>
          </div>
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </form>
      </CardContent>
      <CardFooter>
        <Button
          type="submit"
          className="w-full"
          disabled={loading}
          onClick={handleSubmit}
        >
          {loading ? "Creating Booking..." : "Create Booking"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BookingPage;
