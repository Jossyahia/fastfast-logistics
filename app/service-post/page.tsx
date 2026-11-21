"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { UtensilsCrossed, Car, Users, Building2 } from "lucide-react";

type ServiceType = "food" | "carpool" | "event" | "service";

interface FormData {
  serviceType: ServiceType;
  title: string;
  description: string;
  contact: string;
  [key: string]: string;
}

const initialFormData: FormData = {
  serviceType: "" as ServiceType,
  title: "",
  description: "",
  contact: "",
  cuisine: "",
  price: "",
  departureLocation: "",
  destination: "",
  date: "",
  time: "",
  specialization: "",
  experience: "",
  category: "",
  attendees: "",
  route: "",
  capacity: "",
  departureTime: "",
  returnTime: "",
  address: "",
  phone: "",
  whatsapp: "",
  facebook: "",
  instagram: "",
  website: "",
};

const events = [
  // Your events data here
];

const carPoolServices = [
  // Your carpool services data here
];

const vendors = [
  // Your vendors data here
];

const professionals = [
  // Your professionals data here
];

export default function ServicePostForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    setFormData(initialFormData);
  };

  const serviceTypes = [
    { value: "food", label: "Food Vendor", icon: UtensilsCrossed },
    { value: "carpool", label: "Carpooling", icon: Car },
    { value: "event", label: "Community Event", icon: Users },
    { value: "service", label: "Local Service", icon: Building2 },
  ];

  const dynamicFields: Record<ServiceType, { label: string; type: string }[]> =
    {
      food: [
        { label: "Cuisine Type", type: "text" },
        { label: "Price Range", type: "text" },
        { label: "Phone Number", type: "text" },
        { label: "WhatApp Number", type: "text" },
        { label: "Resturant Name", type: "text" },
        { label: "Restaurant Type", type: "text" },
        { label: "Specialty", type: "text" },
        { label: "Address", type: "text" },
        { label: "Instagram", type: "text" },
      ],

      carpool: [
        { label: "Departure Location", type: "text" },
        { label: "Destination", type: "text" },
        { label: "Route", type: "text" },
        { label: "Capacity", type: "number" },
        { label: "Departure Time", type: "text" },
        { label: "Return Time", type: "text" },
        { label: "Phone", type: "text" },
        { label: "WhatsApp", type: "text" },
        { label: "Facebook", type: "text" },
        { label: "Instagram", type: "text" },
      ],
      event: [
        { label: "Category", type: "text" },
        { label: "Date", type: "date" },
        { label: "Time", type: "time" },
        { label: "Location", type: "text" },
        { label: "Attendees", type: "number" },
      ],
      service: [
        { label: "Specialization", type: "text" },
        { label: "Years of Experience", type: "number" },
        { label: "Phone", type: "text" },
        { label: "WhatsApp", type: "text" },
        { label: "Facebook", type: "text" },
        { label: "Instagram", type: "text" },
        { label: "Website", type: "text" },
      ],
    };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-md mx-auto p-6 bg-white dark:bg-neutral-800 rounded-xl shadow-md"
    >
      <h2 className="text-2xl font-bold text-center mb-6">
        Post a Service or Event
      </h2>

      <div className="space-y-2">
        <Label htmlFor="service-type">Service Type</Label>
        <Select
          value={formData.serviceType}
          onValueChange={(value) => handleChange("serviceType", value)}
        >
          <SelectTrigger id="service-type">
            <SelectValue placeholder="Select service type" />
          </SelectTrigger>
          <SelectContent>
            {serviceTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                <div className="flex items-center">
                  <type.icon className="mr-2 h-4 w-4" />
                  <span>{type.label}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {formData.serviceType &&
        dynamicFields[formData.serviceType].map((field) => (
          <div key={field.label} className="space-y-2">
            <Label htmlFor={field.label.toLowerCase().replace(" ", "-")}>
              {field.label}
            </Label>
            <Input
              id={field.label.toLowerCase().replace(" ", "-")}
              type={field.type}
              placeholder={`Enter ${field.label.toLowerCase()}`}
              value={formData[field.label.toLowerCase().replace(" ", "")] || ""}
              onChange={(e) =>
                handleChange(
                  field.label.toLowerCase().replace(" ", ""),
                  e.target.value
                )
              }
              required
            />
          </div>
        ))}

      <div className="space-y-2">
        <p>Please select the type of service you want to post</p>
      </div>

      <Button type="submit" className="w-full">
        Post Service
      </Button>
    </form>
  );
}
