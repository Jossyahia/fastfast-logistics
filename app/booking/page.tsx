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
import BankTransferDetails from "@/components/BankTransferDetails";
import { getLocations } from "@/price";
import { getPrice } from "@/price";
import AddressAutocomplete from "@/components/AddressAutocomplete";

interface PriceBreakdown {
  basePrice: number;
  urgentFee: number;
  sizeFee: number;
  subtotal: number;
  discount: number;
  final: number;
}

interface FormState {
  pickupAddress: string;
  deliveryAddress: string;
  pickupDate: string;
  deliveryDate: string;
  pickupTime: string;
  deliveryTime: string;
  packageSize: "SMALL" | "MEDIUM" | "LARGE" | "EXTRA_LARGE";
  packageDescription: string;
  isUrgent: boolean;
  paymentMethod: "CASH" | "BANK_TRANSFER";
  pickupPhoneNumber: string;
  deliveryPhoneNumber: string;
  couponCode: string;
  discountAmount: number;
  discountType: "PERCENTAGE" | "FIXED" | null;
  route: string;
  priceBreakdown: PriceBreakdown;
  transactionCode: string;
}

const INITIAL_FORM_STATE: FormState = {
  pickupAddress: "",
  deliveryAddress: "",
  pickupDate: "",
  deliveryDate: "",
  pickupTime: "",
  deliveryTime: "",
  packageSize: "SMALL",
  packageDescription: "",
  isUrgent: false,
  paymentMethod: "CASH",
  pickupPhoneNumber: "",
  deliveryPhoneNumber: "",
  couponCode: "",
  discountAmount: 0,
  discountType: null,
  route: "",
  priceBreakdown: {
    basePrice: 0,
    urgentFee: 0,
    sizeFee: 0,
    subtotal: 0,
    discount: 0,
    final: 0,
  },
  transactionCode: "",
};

const SIZE_FEES = {
  SMALL: 0,
  MEDIUM: 500,
  LARGE: 1000,
  EXTRA_LARGE: 1500,
};

const URGENT_FEE = 500;

const BookingPage: React.FC = () => {
  const router = useRouter();
  const [formState, setFormState] = useState<FormState>(INITIAL_FORM_STATE);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [couponApplied, setCouponApplied] = useState(false);

  useEffect(() => {
    const savedData = sessionStorage.getItem("bookingFormData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);

      // Recalculate price breakdown with the loaded data
      const updatedPriceBreakdown = calculatePrice(parsedData);

      setFormState((prevState) => ({
        ...parsedData,
        priceBreakdown: updatedPriceBreakdown,
      }));

      if (parsedData.couponCode && parsedData.discountAmount > 0) {
        setCouponApplied(true);
      }
    }
  }, []);

  const calculatePrice = (data: FormState): PriceBreakdown => {
    if (!data.pickupAddress || !data.deliveryAddress) {
      return {
        basePrice: 0,
        urgentFee: 0,
        sizeFee: 0,
        subtotal: 0,
        discount: 0,
        final: 0,
      };
    }

    const basePrice = getPrice(data.pickupAddress, data.deliveryAddress);
    const urgentFee = data.isUrgent ? URGENT_FEE : 0;
    const sizeFee = SIZE_FEES[data.packageSize];
    const subtotal = basePrice + urgentFee + sizeFee;

    let discount = 0;
    if (data.discountType === "PERCENTAGE") {
      discount = subtotal * (data.discountAmount / 100);
    } else if (data.discountType === "FIXED") {
      discount = data.discountAmount;
    }

    const final = Math.max(subtotal - discount, 0);

    return {
      basePrice,
      urgentFee,
      sizeFee,
      subtotal,
      discount,
      final,
    };
  };
  const isValidDate = (dateStr: string): boolean => {
    const date = new Date(dateStr);
    const day = date.getDay();
    return day >= 1 && day <= 6; // Monday to Saturday
  };

  const isValidTime = (time: string): boolean => {
    const [hours, minutes] = time.split(":").map(Number);
    return (hours >= 7 && hours < 18) || (hours === 18 && minutes === 0);
  };

  const handleChange = (
    field: keyof FormState,
    value:
      | string
      | boolean
      | FormState["packageSize"]
      | FormState["paymentMethod"]
  ) => {
    setFormState((prev) => {
      const updatedData = { ...prev, [field]: value };

      if (
        field === "pickupAddress" ||
        field === "deliveryAddress" ||
        field === "packageSize" ||
        field === "isUrgent"
      ) {
        if (field === "pickupAddress" || field === "deliveryAddress") {
          updatedData.route = `${updatedData.pickupAddress} to ${updatedData.deliveryAddress}`;
        }

        updatedData.priceBreakdown = calculatePrice(updatedData);
      }

      if (field === "paymentMethod" && value === "BANK_TRANSFER") {
        updatedData.transactionCode = `TXN${Math.random()
          .toString(36)
          .substr(2, 8)
          .toUpperCase()}`;
      } else if (field === "paymentMethod" && value !== "BANK_TRANSFER") {
        updatedData.transactionCode = "";
      }

      sessionStorage.setItem("bookingFormData", JSON.stringify(updatedData));
      return updatedData;
    });
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formState.pickupDate) newErrors.pickupDate = "Pickup date is required";
    else if (!isValidDate(formState.pickupDate))
      newErrors.pickupDate = "Pickup date must be between Monday and Saturday";

    if (!formState.deliveryDate)
      newErrors.deliveryDate = "Delivery date is required";
    else if (!isValidDate(formState.deliveryDate))
      newErrors.deliveryDate =
        "Delivery date must be between Monday and Saturday";

    if (!formState.pickupTime) newErrors.pickupTime = "Pickup time is required";
    else if (!isValidTime(formState.pickupTime))
      newErrors.pickupTime = "Pickup time must be between 7:00 AM and 6:00 PM";

    if (!formState.deliveryTime)
      newErrors.deliveryTime = "Delivery time is required";
    else if (!isValidTime(formState.deliveryTime))
      newErrors.deliveryTime =
        "Delivery time must be between 7:00 AM and 6:00 PM";

    if (!formState.packageDescription.trim())
      newErrors.packageDescription = "Package description is required";

    const phoneRegex = /^\d{1,11}$/;
    if (!phoneRegex.test(formState.pickupPhoneNumber))
      newErrors.pickupPhoneNumber = "Invalid phone number (max 11 digits)";
    if (!phoneRegex.test(formState.deliveryPhoneNumber))
      newErrors.deliveryPhoneNumber = "Invalid phone number (max 11 digits)";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const applyCoupon = async () => {
    if (!formState.couponCode) {
      setErrors({ ...errors, coupon: "Please enter a coupon code" });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/coupons/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: formState.couponCode }),
      });

      if (!response.ok) {
        throw new Error("Invalid coupon code");
      }

      const data = await response.json();
      if (data.valid) {
        setFormState((prev) => {
          const updatedData = {
            ...prev,
            discountAmount: data.discountAmount,
            discountType: data.discountType,
          };
          updatedData.priceBreakdown = calculatePrice(updatedData);
          return updatedData;
        });
        setCouponApplied(true);
        // Remove the coupon error by creating a new object without the coupon property
        setErrors((prev) => {
          const { coupon, ...rest } = prev;
          return rest;
        });
      } else {
        setErrors((prev) => ({ ...prev, coupon: "Invalid coupon code" }));
      }
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        coupon:
          error instanceof Error ? error.message : "Failed to apply coupon",
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formState,
          price: formState.priceBreakdown.final,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create booking");
      }

      const data = await response.json();
      setSuccess(true);
      sessionStorage.removeItem("bookingFormData");
      setTimeout(() => {
        router.push(`/booking/confirmation/${data.booking.id}`);
      }, 1000);
    } catch (error) {
      setErrors({
        form: error instanceof Error ? error.message : "An error occurred",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <Card className="max-w-2xl mx-auto mt-8 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-lg shadow-lg ">
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
              value={formState.pickupAddress}
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
              value={formState.deliveryAddress}
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
              <Calendar className="w-4 h-4 mr-2" /> Pickup Date (Mon-Sat)
            </Label>
            <Input
              type="date"
              id="pickupDate"
              value={formState.pickupDate}
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
              <Calendar className="w-4 h-4 mr-2" /> Delivery Date (Mon-Sat)
            </Label>
            <Input
              type="date"
              id="deliveryDate"
              value={formState.deliveryDate}
              onChange={(e) => handleChange("deliveryDate", e.target.value)}
              min={
                formState.pickupDate || new Date().toISOString().split("T")[0]
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
              <Clock className="w-4 h-4 mr-2" /> Pickup Time (7:00 AM - 6:00 PM)
            </Label>
            <Input
              type="time"
              id="pickupTime"
              value={formState.pickupTime}
              onChange={(e) => handleChange("pickupTime", e.target.value)}
              min="07:00"
              max="18:00"
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
              <Clock className="w-4 h-4 mr-2" /> Delivery Time (7:00 AM - 6:00
              PM)
            </Label>
            <Input
              type="time"
              id="deliveryTime"
              value={formState.deliveryTime}
              onChange={(e) => handleChange("deliveryTime", e.target.value)}
              min="07:00"
              max="18:00"
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
              value={formState.packageSize}
              onValueChange={(value) =>
                handleChange("packageSize", value as FormState["packageSize"])
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select package size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SMALL">Small (Up to 1kg)</SelectItem>
                <SelectItem value="MEDIUM">Medium (5kg - 15kg)</SelectItem>
                <SelectItem value="LARGE">Large (15kg - 30kg)</SelectItem>
                <SelectItem value="EXTRA_LARGE">Extra Large (30kg+)</SelectItem>
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
              value={formState.packageDescription}
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
              value={formState.pickupPhoneNumber}
              onChange={(e) =>
                handleChange("pickupPhoneNumber", e.target.value)
              }
              placeholder="Enter phone number"
              maxLength={11}
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
              value={formState.deliveryPhoneNumber}
              onChange={(e) =>
                handleChange("deliveryPhoneNumber", e.target.value)
              }
              placeholder="Enter phone number"
              maxLength={11}
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
              className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              <CreditCard className="w-4 h-4 mr-2" /> Payment Method
            </Label>
            <Select
              value={formState.paymentMethod}
              onValueChange={(value) =>
                handleChange(
                  "paymentMethod",
                  value as FormState["paymentMethod"]
                )
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CASH">Cash</SelectItem>
                <SelectItem value="BANK_TRANSFER">Bank Transfer</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {formState.paymentMethod === "BANK_TRANSFER" && (
            <BankTransferDetails transactionCode={formState.transactionCode} />
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
                checked={formState.isUrgent}
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
                value={formState.couponCode}
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
                className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none"
              >
                {loading ? "Applying..." : couponApplied ? "Applied" : "Apply"}
              </Button>
            </div>
            {errors.coupon && (
              <p className="text-red-500 text-xs mt-1">{errors.coupon}</p>
            )}
            {couponApplied && (
              <p className="text-green-500 text-xs mt-1">
                Coupon applied successfully!
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label className="flex items-center text-sm font-medium">
              <CreditCard className="w-4 h-4 mr-2" /> Price Breakdown
            </Label>
            <div className="space-y-1 text-sm">
              <p>
                Base Price: ₦{formState.priceBreakdown.basePrice.toFixed(2)}
              </p>
              {formState.priceBreakdown.urgentFee > 0 && (
                <p>
                  Urgent Fee: ₦{formState.priceBreakdown.urgentFee.toFixed(2)}
                </p>
              )}
              {formState.priceBreakdown.sizeFee > 0 && (
                <p>Size Fee: ₦{formState.priceBreakdown.sizeFee.toFixed(2)}</p>
              )}
              <p className="font-semibold">
                Subtotal: ₦{formState.priceBreakdown.subtotal.toFixed(2)}
              </p>
              {formState.priceBreakdown.discount > 0 && (
                <p className="text-green-600">
                  Discount: ₦{formState.priceBreakdown.discount.toFixed(2)}
                  {formState.discountType === "PERCENTAGE" &&
                    ` (${formState.discountAmount}%)`}
                </p>
              )}
              <p className="text-lg font-bold mt-2">
                Final Price: ₦{formState.priceBreakdown.final.toFixed(2)}
              </p>
            </div>
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
      <p className="text-sm sm:text-base md:text-lg p-4 mt-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-md shadow-md transition-colors duration-200 ease-in-out">
        <strong className="font-bold">NOTICE!!!:</strong> Your Booking is only
        valid after Payment. Send proof of payment to our WhatsApp Number!
        08097034355 or call 08156067874
      </p>
    </Card>
  );
};

export default BookingPage;
