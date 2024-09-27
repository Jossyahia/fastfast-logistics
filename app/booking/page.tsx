"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Calendar,
  Clock,
  Package,
  CreditCard,
  Phone,
  Truck,
  CheckCircle,
  AlertTriangle,
  Tag,
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
import { Switch } from "@/components/ui/switch";
import LoadingSpinner from "@/components/LoadingSpinner";
import { getLocations } from "@/price";
import AddressAutocomplete from "@/components/AddressAutocomplete";
import { getPrice } from "@/price";
import BankTransferDetails from "@/components/BankTransferDetails";

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
  couponCode: string; // Keep only one declaration
  discountAmount: number;
  discountType: "PERCENTAGE" | "FIXED" | null;
  route: string;
  price: number;
  transactionCode: string;
}

interface FormErrors {
  [key: string]: string | undefined;
}
const STORAGE_KEY = "bookingFormData";

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
    route: "",
    price: 0,
    transactionCode: "",
    couponCode: "",
    discountAmount: 0,
    discountType: null, // Add this line
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [couponApplied, setCouponApplied] = useState(false);

  useEffect(() => {
    const savedFormData = sessionStorage.getItem(STORAGE_KEY);
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }

    const pickupDateInput = document.getElementById(
      "pickupDate"
    ) as HTMLInputElement;
    const deliveryDateInput = document.getElementById(
      "deliveryDate"
    ) as HTMLInputElement;

    const setMinDeliveryDate = () => {
      if (pickupDateInput && deliveryDateInput) {
        const pickupDate = pickupDateInput.value;
        if (pickupDate) {
          deliveryDateInput.min = new Date(pickupDate)
            .toISOString()
            .split("T")[0];
        } else {
          deliveryDateInput.min = new Date().toISOString().split("T")[0];
        }
      }
    };

    setMinDeliveryDate();
    pickupDateInput?.addEventListener("change", setMinDeliveryDate);

    return () => {
      pickupDateInput?.removeEventListener("change", setMinDeliveryDate);
    };
  }, []);

  const handleChange = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => {
      const updatedData = { ...prev, [field]: value };

      if (field === "pickupDate" && updatedData.deliveryDate) {
        const pickupDate = new Date(updatedData.pickupDate);
        const deliveryDate = new Date(updatedData.deliveryDate);
        if (deliveryDate < pickupDate) {
          updatedData.deliveryDate = "";
        }
      }

      if (
        field === "pickupAddress" ||
        field === "deliveryAddress" ||
        field === "packageSize" ||
        field === "isUrgent"
      ) {
        updatedData.price = calculatePrice(updatedData);
      }

      updatedData.route = `${updatedData.pickupAddress} to ${updatedData.deliveryAddress}`;

      if (field === "paymentMethod" && value === "BANK_TRANSFER") {
        updatedData.transactionCode = generateTransactionCode();
      } else if (field === "paymentMethod" && value !== "BANK_TRANSFER") {
        updatedData.transactionCode = "";
      }

      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));

      return updatedData;
    });
  };

  const calculatePrice = (data: FormData) => {
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

    console.log("Total before discount:", totalBeforeDiscount);

    // Apply discount based on discountType
    let totalAfterDiscount = totalBeforeDiscount;
    if (data.discountType === "PERCENTAGE" && data.discountAmount) {
      totalAfterDiscount =
        totalBeforeDiscount - (totalBeforeDiscount * data.discountAmount) / 100;
    } else if (data.discountType === "FIXED" && data.discountAmount) {
      totalAfterDiscount = totalBeforeDiscount - data.discountAmount;
    }

    console.log("Total after discount:", totalAfterDiscount);

    // Ensure the total price is not negative
    return Math.max(totalAfterDiscount, 0);
  };
  const generateTransactionCode = (): string => {
    return "TXN" + Math.random().toString(36).substr(2, 8).toUpperCase();
  };

  const validateCoupon = async (couponCode: string) => {
    try {
      const response = await fetch("/api/coupons/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: couponCode }),
      });

      if (response.status === 401) {
        throw new Error("Authentication required");
      }

      if (!response.ok) {
        throw new Error("Failed to validate coupon");
      }

      const data = await response.json();
      console.log("Full API response:", data); // Log the entire response

      if (data.valid) {
        return {
          discountAmount: data.discountAmount,
          discountType: data.discountType,
        };
      } else {
        return { discountAmount: 0, discountType: null };
      }
    } catch (error: unknown) {
      console.error("Error validating coupon:", error);
      if (
        error instanceof Error &&
        error.message === "Authentication required"
      ) {
        // Handle authentication error
      }
      return { discountAmount: 0, discountType: null };
    }
  };

  const applyCoupon = async () => {
    if (!formData.couponCode) {
      setErrors({ ...errors, coupon: "Please enter a coupon code" });
      return;
    }

    setLoading(true);
    const result = await validateCoupon(formData.couponCode);
    console.log("Coupon validation result:", result);
    setLoading(false);

    if (result.discountAmount !== undefined && result.discountType) {
      console.log(
        "Applying discount:",
        result.discountAmount,
        result.discountType
      );
      setFormData((prev) => {
        const updatedData = {
          ...prev,
          discountAmount: result.discountAmount,
          discountType: result.discountType,
        };
        const newPrice = calculatePrice(updatedData);
        console.log("New price after discount:", newPrice);
        return { ...updatedData, price: newPrice };
      });
      setCouponApplied(true);
      setErrors((prevErrors) => {
        const { coupon, ...restErrors } = prevErrors;
        return restErrors;
      });
    } else {
      console.log("Invalid coupon result:", result);
      setErrors({ ...errors, coupon: "Invalid coupon code" });
    }
  };
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.pickupAddress.trim()) {
      newErrors.pickupAddress = "Pickup address is required";
    }

    if (!formData.deliveryAddress.trim()) {
      newErrors.deliveryAddress = "Delivery address is required";
    }

    if (!formData.pickupDate) {
      newErrors.pickupDate = "Pickup date is required";
    } else {
      const pickupDate = new Date(formData.pickupDate);
      pickupDate.setHours(0, 0, 0, 0);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (pickupDate < today) {
        newErrors.pickupDate = "Pickup date cannot be in the past";
      }
    }

    if (!formData.deliveryDate) {
      newErrors.deliveryDate = "Delivery date is required";
    } else if (formData.pickupDate) {
      const pickupDate = new Date(formData.pickupDate);
      const deliveryDate = new Date(formData.deliveryDate);
      if (deliveryDate < pickupDate) {
        newErrors.deliveryDate = "Delivery date must be after pickup date";
      }
    }

    if (!formData.pickupTime) {
      newErrors.pickupTime = "Pickup time is required";
    }

    if (!formData.deliveryTime) {
      newErrors.deliveryTime = "Delivery time is required";
    }

    if (!formData.packageDescription.trim()) {
      newErrors.packageDescription = "Package description is required";
    }

    const phoneRegex = /^\d{1,11}$/;
    if (!phoneRegex.test(formData.pickupPhoneNumber)) {
      newErrors.pickupPhoneNumber = "Invalid phone number (max 11 digits)";
    }

    if (!phoneRegex.test(formData.deliveryPhoneNumber)) {
      newErrors.deliveryPhoneNumber = "Invalid phone number (max 11 digits)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setSuccess(false);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price: formData.price,
          couponCode: formData.couponCode,
          discountAmount: formData.discountAmount,
          discountType: formData.discountType,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccess(true);
        sessionStorage.removeItem(STORAGE_KEY);
        setTimeout(() => {
          router.push(`/booking/confirmation/${data.booking.id}`);
        }, 1000);
      } else {
        const errorData = await response.json();
        throw new Error(
          errorData.error || "Failed to create booking. Please login"
        );
      }
    } catch (error: any) {
      console.error("Error creating booking:", error);
      setErrors({
        form: error.message || "An error occurred while creating the booking.",
      });
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
            <AddressAutocomplete
              id="pickupAddress"
              value={formData.pickupAddress}
              onChange={(value) => handleChange("pickupAddress", value)}
              placeholder="Enter pickup address"
              error={errors.pickupAddress}
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="deliveryAddress"
              className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              <Truck className="w-4 h-4 mr-2" /> Delivery Address
            </Label>
            <AddressAutocomplete
              id="deliveryAddress"
              value={formData.deliveryAddress}
              onChange={(value) => handleChange("deliveryAddress", value)}
              placeholder="Enter delivery address"
              error={errors.deliveryAddress}
            />
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
              min={new Date().toISOString().split("T")[0]}
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
              min={
                formData.pickupDate || new Date().toISOString().split("T")[0]
              }
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
              className={`w-full px-3 py-2 border rounded-md ${
                errors.pickupTime ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:blue-500`}
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
              onValueChange={(value) =>
                handleChange("packageSize", value as FormData["packageSize"])
              }
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
                  Extra Large (30kg+ or more)
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
                <SelectItem value="CASH">Cash</SelectItem>
                <SelectItem value="BANK_TRANSFER">Bank Transfer</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {formData.paymentMethod === "BANK_TRANSFER" && (
            <BankTransferDetails transactionCode={formData.transactionCode} />
          )}
          <div className="space-y-2">
            <Label
              htmlFor="isUrgent"
              className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              <CheckCircle className="w-4 h-4 mr-2" /> Urgent Delivery
            </Label>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isUrgent"
                checked={formData.isUrgent}
                onChange={(e) => handleChange("isUrgent", e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Mark as urgent (additional fee applies)
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="couponCode"
              className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              <Tag className="w-4 h-4 mr-2" /> Coupon Code
            </Label>
            <div className="flex">
              <Input
                id="couponCode"
                value={formData.couponCode}
                onChange={(e) => handleChange("couponCode", e.target.value)}
                placeholder="Enter coupon code"
                className={`flex-grow mr-2 ${
                  errors.coupon ? "border-red-500" : "border-gray-300"
                }`}
                disabled={couponApplied}
              />
              <Button
                type="button"
                onClick={applyCoupon}
                disabled={loading || couponApplied}
                className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-green-700 focus:outline-none"
              >
                {loading ? "Applying..." : couponApplied ? "Applied" : "Apply"}
              </Button>
            </div>
            {errors.coupon && (
              <p className="text-red-500 text-xs mt-1">{errors.coupon}</p>
            )}
            {couponApplied && (
              <p className="text-green-500 text-xs mt-1">
                Coupon applied successfully!!!
                
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-200">
              <CreditCard className="w-4 h-4 mr-2" /> Estimated Price
            </Label>
            <p className="text-lg font-semibold">
              ₦{formData.price.toFixed(2)}
            </p>
            {couponApplied && formData.discountAmount > 0 && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Original price: ₦
                {(formData.price + formData.discountAmount).toFixed(2)}
                <br />
                Discount:{" "}
                {formData.discountType === "PERCENTAGE"
                  ? `${formData.discountAmount}%`
                  : `₦${formData.discountAmount}`}
              </p>
            )}
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
          className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-green-700 focus:outline-none"
        >
          {loading ? "Creating Booking..." : "Create Booking"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BookingPage;
