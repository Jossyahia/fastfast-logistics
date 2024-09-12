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
import LoadingSpinner from "@/components/LoadingSpinner"; // Import the spinner

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

interface FormErrors {
  [key: string]: string;
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
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    const pickupDateInput = document.getElementById("pickupDate") as HTMLInputElement;
    const deliveryDateInput = document.getElementById("deliveryDate") as HTMLInputElement;

    const setMinDeliveryDate = () => {
      if (pickupDateInput && deliveryDateInput) {
        const pickupDate = pickupDateInput.value;
        if (pickupDate) {
          deliveryDateInput.min = new Date(pickupDate).toISOString().split("T")[0];
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

      return updatedData;
    });
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
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccess(true);
        setTimeout(() => {
          router.push(`/booking/confirmation/${data.booking.id}`);
        }, 1000);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create booking. Please login");
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
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Card className="max-w-2xl mx-auto mt-8 bg-white dark:bg-gray-900 shadow-md rounded-lg transition-colors duration-200">
          <CardHeader>
            <h1 className="text-3xl font-bold text-center">Create a Booking</h1>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Form fields here */}
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
      )}
    </>
  );
};

export default BookingPage;



FastFast Logistics Service: Your Express Lane to Seamless Shipping
We're not just fast we're FastFast. Specializing in rapid, reliable logistics solutions for businesses of all sizes. From local deliveries to global shipments, 









