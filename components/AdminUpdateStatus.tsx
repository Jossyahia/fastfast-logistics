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
import { Loader2 } from "lucide-react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";


const schema = z.object({
  trackingNumber: z.string().min(1, { message: "Tracking number is required" }),
  shipmentStatus: z.string().min(1, { message: "Shipment status is required" }),
  bookingStatus: z.string().min(1, { message: "Booking status is required" }),
  currentLocation: z.string().optional(),
  estimatedDelivery: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const statusOptions = [
  { value: "PROCESSING", label: "Processing" },
  { value: "SHIPPED", label: "Shipped" },
  { value: "IN_TRANSIT", label: "In Transit" },
  { value: "DELIVERED", label: "Delivered" },
  { value: "RETURNED", label: "Returned" },
  { value: "CANCELLED", label: "Cancelled" },
];

export default function AdminUpdateStatusComponent() {
  const [updateResult, setUpdateResult] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);
  const [shipmentDetails, setShipmentDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

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

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const session = await auth();
      if (!session || session.user.role !== "ADMIN") {
        redirect("/restricted");
      }
      const response = await fetch("/api/admin/update-status", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to update status");

      const result = await response.json();
      setUpdateResult(result.message);
      setIsError(false);
      form.reset();
      setShipmentDetails(null);
    } catch (error) {
      setUpdateResult("Error updating status. Please try again.");
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchShipmentDetails = async (trackingNumber: string) => {
    setIsLoading(true);
    try {
       const session = await auth();
       if (!session || session.user.role !== "ADMIN") {
         redirect("/restricted");
       }
      const response = await fetch(
        `/api/admin/update-status?trackingNumber=${trackingNumber}`
      );
      if (!response.ok) throw new Error("Failed to fetch shipment details");
      const data = await response.json();
      setShipmentDetails(data.shipment);
      form.setValue("shipmentStatus", data.shipment.status);
      form.setValue("bookingStatus", data.shipment.booking.status);
      form.setValue("currentLocation", data.shipment.currentLocation || "");
      form.setValue(
        "estimatedDelivery",
        data.shipment.estimatedDelivery
          ? new Date(data.shipment.estimatedDelivery).toISOString().slice(0, 16)
          : ""
      );
    } catch (error) {
      setUpdateResult("Error fetching shipment details. Please try again.");
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (value: string) => {
    const colors = {
      PROCESSING: "bg-yellow-500 text-black",
      SHIPPED: "bg-blue-500 text-white",
      IN_TRANSIT: "bg-orange-500 text-white",
      DELIVERED: "bg-green-500 text-white",
      RETURNED: "bg-purple-500 text-white",
      CANCELLED: "bg-red-500 text-white",
    };
    return colors[value as keyof typeof colors] || "bg-gray-500 text-white";
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-lg mx-auto">
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
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          if (e.target.value)
                            fetchShipmentDetails(e.target.value);
                          else setShipmentDetails(null);
                        }}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {["shipmentStatus", "bookingStatus"].map((status) => (
                <FormField
                  key={status}
                  control={form.control}
                  name={status as "shipmentStatus" | "bookingStatus"}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {status === "shipmentStatus"
                          ? "Shipment Status"
                          : "Booking Status"}
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger
                            className={`w-full ${getStatusColor(field.value)}`}
                          >
                            <SelectValue
                              placeholder={`Select ${
                                status === "shipmentStatus"
                                  ? "shipment"
                                  : "booking"
                              } status`}
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-white dark:bg-gray-800 max-h-60 overflow-auto">
                          {statusOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <FormField
                control={form.control}
                name="currentLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Location</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter current location"
                        {...field}
                        className="w-full"
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
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                Update Status
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
          {shipmentDetails && (
            <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-md">
              <h3 className="font-bold mb-2">Current Shipment Details:</h3>
              <p>
                Status:{" "}
                <span
                  className={`px-2 py-1 rounded ${getStatusColor(
                    shipmentDetails.status
                  )}`}
                >
                  {shipmentDetails.status}
                </span>
              </p>
              <p>
                Booking Status:{" "}
                <span
                  className={`px-2 py-1 rounded ${getStatusColor(
                    shipmentDetails.booking.status
                  )}`}
                >
                  {shipmentDetails.booking.status}
                </span>
              </p>
              <p>
                Current Location: {shipmentDetails.currentLocation || "N/A"}
              </p>
              <p>
                Estimated Delivery:{" "}
                {shipmentDetails.estimatedDelivery
                  ? new Date(shipmentDetails.estimatedDelivery).toLocaleString()
                  : "N/A"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
