"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";

const schema = z.object({
  trackingNumber: z.string().min(1, { message: "Tracking number is required" }),
  shipmentStatus: z.string().min(1, { message: "Shipment status is required" }),
  bookingStatus: z.string().min(1, { message: "Booking status is required" }),
  currentLocation: z.string().optional(),
  estimatedDelivery: z.string().optional(),
  paymentMethod: z.string().min(1, { message: "Payment method is required" }),
  packageSize: z.string().min(1, { message: "Package size is required" }),
  isUrgent: z.boolean().optional(),
});

type FormData = z.infer<typeof schema>;

export default function BookingForm() {
  const [updateResult, setUpdateResult] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      trackingNumber: "",
      shipmentStatus: "",
      bookingStatus: "",
      currentLocation: "",
      estimatedDelivery: "",
      paymentMethod: "",
      packageSize: "",
      isUrgent: false,
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit booking");
      }

      const result = await response.json();
      setUpdateResult(result.message);
      setIsError(false);
      form.reset();
    } catch (error) {
      setUpdateResult("Error submitting booking. Please try again.");
      setIsError(true);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Booking Form
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="trackingNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tracking Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter tracking number"
                        aria-label="Tracking Number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="shipmentStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Shipment Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger
                          className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
                          aria-label="Shipment Status"
                        >
                          <SelectValue placeholder="Select shipment status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent
                        className="bg-white dark:bg-gray-800 max-h-60 overflow-auto z-50"
                        aria-label="Shipment Status Options"
                      >
                        <SelectItem
                          value="PROCESSING"
                          className="bg-yellow-500 text-black"
                        >
                          Processing
                        </SelectItem>
                        <SelectItem
                          value="SHIPPED"
                          className="bg-blue-500 text-white"
                        >
                          Shipped
                        </SelectItem>
                        <SelectItem
                          value="IN_TRANSIT"
                          className="bg-orange-500 text-white"
                        >
                          In Transit
                        </SelectItem>
                        <SelectItem
                          value="DELIVERED"
                          className="bg-green-500 text-white"
                        >
                          Delivered
                        </SelectItem>
                        <SelectItem
                          value="RETURNED"
                          className="bg-red-500 text-white"
                        >
                          Returned
                        </SelectItem>
                        <SelectItem
                          value="CANCELLED"
                          className="bg-gray-500 text-white"
                        >
                          Cancelled
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bookingStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Booking Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger
                          className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
                          aria-label="Booking Status"
                        >
                          <SelectValue placeholder="Select booking status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent
                        className="bg-white dark:bg-gray-800 max-h-60 overflow-auto z-50"
                        aria-label="Booking Status Options"
                      >
                        <SelectItem
                          value="PROCESSING"
                          className="bg-yellow-500 text-black"
                        >
                          Processing
                        </SelectItem>
                        <SelectItem
                          value="SHIPPED"
                          className="bg-blue-500 text-white"
                        >
                          Shipped
                        </SelectItem>
                        <SelectItem
                          value="IN_TRANSIT"
                          className="bg-orange-500 text-white"
                        >
                          In Transit
                        </SelectItem>
                        <SelectItem
                          value="DELIVERED"
                          className="bg-green-500 text-white"
                        >
                          Delivered
                        </SelectItem>
                        <SelectItem
                          value="RETURNED"
                          className="bg-red-500 text-white"
                        >
                          Returned
                        </SelectItem>
                        <SelectItem
                          value="CANCELLED"
                          className="bg-gray-500 text-white"
                        >
                          Cancelled
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Method</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger
                          className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
                          aria-label="Payment Method"
                        >
                          <SelectValue placeholder="Select payment method" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent
                        className="bg-white dark:bg-gray-800 max-h-60 overflow-auto z-50"
                        aria-label="Payment Method Options"
                      >
                        <SelectItem
                          value="CASH"
                          className="bg-green-500 text-white"
                        >
                          Cash
                        </SelectItem>
                        <SelectItem
                          value="CARD"
                          className="bg-blue-500 text-white"
                        >
                          Card
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="packageSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Package Size</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger
                          className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
                          aria-label="Package Size"
                        >
                          <SelectValue placeholder="Select package size" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent
                        className="bg-white dark:bg-gray-800 max-h-60 overflow-auto z-50"
                        aria-label="Package Size Options"
                      >
                        <SelectItem
                          value="LARGE"
                          className="bg-yellow-500 text-black"
                        >
                          Large
                        </SelectItem>
                        <SelectItem
                          value="MEDIUM"
                          className="bg-orange-500 text-white"
                        >
                          Medium
                        </SelectItem>
                        <SelectItem
                          value="SMALL"
                          className="bg-red-500 text-white"
                        >
                          Small
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isUrgent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Is Urgent?</FormLabel>
                    <FormControl>
                      <input
                        type="checkbox"
                        aria-label="Is Urgent"
                        {...field}
                        className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </form>
          </Form>
          {updateResult && (
            <Alert
              className={`mt-4 ${
                isError ? "bg-red-500 text-white" : "bg-green-500 text-white"
              }`}
              role="alert"
            >
              <AlertDescription>{updateResult}</AlertDescription>
            </Alert>
          )}
          <div className="mt-4 text-center">
            <Link href="/login">
              <a className="text-blue-600 hover:text-blue-800">Login</a>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
