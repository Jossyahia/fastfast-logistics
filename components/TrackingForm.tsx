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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const schema = z.object({
  trackingNumber: z.string().min(1, { message: "Tracking number is required" }),
});

type FormData = z.infer<typeof schema>;

export default function TrackingComponent() {
  const [trackingResult, setTrackingResult] = useState<string | null>(null);
  const [shipmentDetails, setShipmentDetails] = useState<any | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      trackingNumber: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch("/api/tracking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ trackingNumber: data.trackingNumber }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch tracking information");
      }

      const result = await response.json();
      setTrackingResult(result.message);
      setShipmentDetails(result.details);
    } catch (error) {
      setTrackingResult(
        "Error fetching tracking information. Please try again."
      );
      setShipmentDetails(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Track Your Shipment
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
                        placeholder="Enter your tracking number"
                        {...field}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Track Package
              </Button>
            </form>
          </Form>
          {trackingResult && (
            <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
              {trackingResult}
            </div>
          )}
          {shipmentDetails && (
            <div className="mt-4 p-4 bg-blue-100 border border-blue-400 text-blue-700 rounded">
              <h3 className="font-bold">Shipment Details:</h3>
              <p>Status: {shipmentDetails.status}</p>
              {shipmentDetails.currentLocation && (
                <p>Current Location: {shipmentDetails.currentLocation}</p>
              )}
              {shipmentDetails.estimatedDelivery && (
                <p>
                  Estimated Delivery:{" "}
                  {new Date(shipmentDetails.estimatedDelivery).toLocaleString()}
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
