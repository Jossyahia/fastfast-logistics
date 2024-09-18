"use client";

import React, { useState, useEffect, useCallback } from "react";
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
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const schema = z.object({
  trackingNumber: z.string().min(1, { message: "Tracking number is required" }),
  shipmentStatus: z.string().min(1, { message: "Shipment status is required" }),
  bookingStatus: z.string().min(1, { message: "Booking status is required" }),
  currentLocation: z.string().optional(),
  estimatedDelivery: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function AdminUpdateStatusComponent() {
  const [updateResult, setUpdateResult] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      trackingNumber: "",
      shipmentStatus: "",
      bookingStatus: "",
      currentLocation: "",
      estimatedDelivery: "",
    },
  });

  useEffect(() => {
    if (status === "loading") return;
    if (!session || session.user.role !== "ADMIN") {
      router.push("/restricted");
    }
  }, [session, status, router]);

  const fetchShipmentData = useCallback(
    async (trackingNumber: string) => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/admin/update-status?trackingNumber=${trackingNumber}`
        );
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch shipment data");
        }
        const data = await response.json();
        form.reset({
          ...data,
          shipmentStatus: data.shipmentStatus,
          bookingStatus: data.bookingStatus,
        });
        setIsError(false);
        setUpdateResult(null);
      } catch (error) {
        setUpdateResult(
          "Error fetching shipment data: " + (error as Error).message
        );
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    },
    [form]
  );

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (
        name === "trackingNumber" &&
        value.trackingNumber &&
        value.trackingNumber.length > 0
      ) {
        fetchShipmentData(value.trackingNumber);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, fetchShipmentData]);

  const onSubmit = async (data: FormData) => {
    setIsUpdating(true);
    try {
      const response = await fetch("/api/admin/update-status", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update status");
      }

      const result = await response.json();
      setUpdateResult(result.message);
      setIsError(false);
    } catch (error) {
      setUpdateResult("Error updating status: " + (error as Error).message);
      setIsError(true);
    } finally {
      setIsUpdating(false);
    }
  };

  const getBackgroundColorClass = (value: string) => {
    switch (value) {
      case "PROCESSING":
        return "bg-yellow-500 text-black";
      case "SHIPPED":
        return "bg-blue-500 text-white";
      case "IN_TRANSIT":
        return "bg-orange-500 text-white";
      case "DELIVERED":
        return "bg-green-500 text-white";
      case "RETURNED":
        return "bg-purple-500 text-white";
      case "CANCELLED":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session || session.user.role !== "ADMIN") {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Update Shipment & Booking Status
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
              {isLoading && <p>Loading shipment data...</p>}
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
                          className={clsx(getBackgroundColorClass(field.value))}
                          aria-label="Shipment Status"
                        >
                          <SelectValue placeholder="Select shipment status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent
                        className="bg-white dark:bg-gray-800 max-h-60 overflow-auto z-50"
                        aria-label="Shipment Status Options"
                      >
                        <SelectItem value="PROCESSING">Processing</SelectItem>
                        <SelectItem value="SHIPPED">Shipped</SelectItem>
                        <SelectItem value="IN_TRANSIT">In Transit</SelectItem>
                        <SelectItem value="DELIVERED">Delivered</SelectItem>
                        <SelectItem value="RETURNED">Returned</SelectItem>
                        <SelectItem value="CANCELLED">Cancelled</SelectItem>
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
                          className={clsx(getBackgroundColorClass(field.value))}
                          aria-label="Booking Status"
                        >
                          <SelectValue placeholder="Select booking status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent
                        className="bg-white dark:bg-gray-800 max-h-60 overflow-auto z-50"
                        aria-label="Booking Status Options"
                      >
                        <SelectItem value="PROCESSING">Processing</SelectItem>
                        <SelectItem value="SHIPPED">Shipped</SelectItem>
                        <SelectItem value="IN_TRANSIT">In Transit</SelectItem>
                        <SelectItem value="DELIVERED">Delivered</SelectItem>
                        <SelectItem value="RETURNED">Returned</SelectItem>
                        <SelectItem value="CANCELLED">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="currentLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Location</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter current location"
                        aria-label="Current Location"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="estimatedDelivery"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estimated Delivery</FormLabel>
                    <FormControl>
                      <Input
                        type="datetime-local"
                        aria-label="Estimated Delivery"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isUpdating}>
                {isUpdating ? "Updating..." : "Update Status"}
              </Button>
            </form>
          </Form>
          {updateResult && (
            <Alert
              className={`mt-4 ${
                isError
                  ? "bg-red-100 border-red-400 text-red-700"
                  : "bg-green-100 border-green-400 text-green-700"
              }`}
            >
              <AlertDescription>{updateResult}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
