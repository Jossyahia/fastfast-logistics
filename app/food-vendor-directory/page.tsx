"use client";

import { useState } from "react";
import { Search, ThumbsUp, MessageSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

type Vendor = {
  id: number;
  name: string;
  cuisine: string;
  location: string;
  rating: number;
  likes: number;
  reviewCount: number;
};

const vendors: Vendor[] = [
  {
    id: 1,
    name: "Joe's Tacos",
    cuisine: "Mexican",
    location: "123 Main St",
    rating: 4.5,
    likes: 120,
    reviewCount: 45,
  },
  {
    id: 2,
    name: "Sushi Express",
    cuisine: "Japanese",
    location: "456 Elm St",
    rating: 4.2,
    likes: 98,
    reviewCount: 32,
  },
  {
    id: 3,
    name: "Pizza Palace",
    cuisine: "Italian",
    location: "789 Oak St",
    rating: 4.7,
    likes: 156,
    reviewCount: 67,
  },
  {
    id: 4,
    name: "Burger Barn",
    cuisine: "American",
    location: "321 Pine St",
    rating: 4.0,
    likes: 87,
    reviewCount: 28,
  },
  {
    id: 5,
    name: "Curry House",
    cuisine: "Indian",
    location: "654 Maple St",
    rating: 4.8,
    likes: 203,
    reviewCount: 89,
  },
];

export default function FoodVendorDirectory() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredVendors = vendors.filter(
    (vendor) =>
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.cuisine.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4 bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-white transition-colors duration-200">
      <h1 className="text-2xl font-bold mb-4">Food Vendor Directory</h1>
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
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredVendors.map((vendor) => (
          <Card
            key={vendor.id}
            className="cursor-pointer bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border-2 border-transparent hover:border-indigo-500"
          >
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
                <ThumbsUp className="h-4 w-4 mr-1" />
                <span>{vendor.likes}</span>
              </div>
              <div className="flex items-center">
                <MessageSquare className="h-4 w-4 mr-1" />
                <span>{vendor.reviewCount} reviews</span>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
