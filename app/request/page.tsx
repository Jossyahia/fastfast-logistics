"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { FaWhatsapp } from "react-icons/fa";

const formSchema = z.object({
  pickupNumber: z
    .string()
    .min(1, "Pickup number is required")
    .regex(/^\d+$/, "Please enter only numbers"),
  deliveryNumber: z
    .string()
    .min(1, "Delivery number is required")
    .regex(/^\d+$/, "Please enter only numbers"),
  fromLocation: z.string().min(1, "From location is required"),
  toLocation: z.string().min(1, "To location is required"),
  comments: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function Component() {
  const { theme, setTheme } = useTheme();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormData) => {
    const message = `
      Pickup Number: ${data.pickupNumber}
      Delivery Number: ${data.deliveryNumber}
      From Location: ${data.fromLocation}
      To Location: ${data.toLocation}
      Comments: ${data.comments || "None"}
    `;
    const url = `https://api.whatsapp.com/send?phone=2348097034355&text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen flex items-center justify-center  bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-white transition-colors duration-200">
      <div className="w-full max-w-md p-8 rounded-xl shadow-2xl bg-card">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-foreground">Rider Request</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="pickupNumber" className="text-foreground">
              Pickup Number
            </Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                id="pickupNumber"
                {...register("pickupNumber")}
                placeholder="Enter Number to Pickup From"
                className="pl-10"
                type="tel"
              />
            </div>
            {errors.pickupNumber && (
              <p className="text-destructive text-sm mt-1">
                {errors.pickupNumber.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="deliveryNumber" className="text-foreground">
              Delivery Number
            </Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                id="deliveryNumber"
                {...register("deliveryNumber")}
                placeholder="Enter Number to deliver to"
                className="pl-10"
                type="tel"
              />
            </div>
            {errors.deliveryNumber && (
              <p className="text-destructive text-sm mt-1">
                {errors.deliveryNumber.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="fromLocation" className="text-foreground">
              Pickup Location
            </Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                id="fromLocation"
                {...register("fromLocation")}
                placeholder="Enter location To Pickup From"
                className="pl-10"
              />
            </div>
            {errors.fromLocation && (
              <p className="text-destructive text-sm mt-1">
                {errors.fromLocation.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="toLocation" className="text-foreground">
              Delivery Location
            </Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                id="toLocation"
                {...register("toLocation")}
                placeholder="Enter location To Deliver To"
                className="pl-10"
              />
            </div>
            {errors.toLocation && (
              <p className="text-destructive text-sm mt-1">
                {errors.toLocation.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="comments" className="text-foreground">
              Comments (optional)
            </Label>
            <Input
              id="comments"
              {...register("comments")}
              placeholder="Enter any additional comments"
            />
          </div>
          <Button type="submit" className="w-full">
            Submit Request
          </Button>
        </form>
      </div>
    </div>
  );
}
