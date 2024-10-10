"use client";

import { useState } from "react";
import { Search, Heart, MessageCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
import { vendors } from "../data/vendors";
import type { Vendor } from "../types/vendor";

function VendorCard({ vendor }: { vendor: Vendor }) {
  return (
    <Link
      href={`/food-vendors/${vendor.id}`}
      className="bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border-2 border-transparent hover:border-indigo-500"
    >
      <Card>
        <CardHeader>
          <CardTitle>{vendor.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            <strong>Cuisine:</strong> {vendor.cuisine}
          </p>
          <p>
            <strong>Location:</strong> {vendor.location}
          </p>
          <p>
            <strong>Rating:</strong> {vendor.rating}/5
          </p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex items-center">
            <Heart className="h-5 w-5 text-red-500 mr-1" />
            <span>{vendor.likes}</span>
          </div>
          <div className="flex items-center">
            <MessageCircle className="h-5 w-5 text-blue-500 mr-1" />
            <span>{vendor.reviews}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}

export default function FoodVendorDirectory() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredVendors = vendors.filter(
    (vendor) =>
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.cuisine.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-lg shadow-lg hover">
      <h1 className="text-2xl font-bold mb-4 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-lg">
        Food Vendor Directory
      </h1>

      <div className="flex mb-4">
        <Input
          type="text"
          placeholder="Search vendors..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mr-2"
        />
        <Button variant="outline">
          <Search className="h-4 w-4" />
          <span className="sr-only">Search</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {filteredVendors.map((vendor) => (
          <VendorCard key={vendor.id} vendor={vendor} />
        ))}
      </div>
    </div>
  );
}
