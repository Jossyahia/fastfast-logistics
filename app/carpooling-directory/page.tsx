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

type Carpool = {
  id: number;
  driver: string;
  from: string;
  to: string;
  date: string;
  seats: number;
  likes: number;
  reviewCount: number;
};

const carpools: Carpool[] = [
  {
    id: 1,
    driver: "Alice",
    from: "Downtown",
    to: "Airport",
    date: "2023-06-15",
    seats: 3,
    likes: 15,
    reviewCount: 7,
  },
  {
    id: 2,
    driver: "Bob",
    from: "Suburb",
    to: "City Center",
    date: "2023-06-16",
    seats: 2,
    likes: 8,
    reviewCount: 3,
  },
  {
    id: 3,
    driver: "Charlie",
    from: "Beach",
    to: "Mountain",
    date: "2023-06-17",
    seats: 4,
    likes: 22,
    reviewCount: 11,
  },
  {
    id: 4,
    driver: "Diana",
    from: "University",
    to: "Shopping Mall",
    date: "2023-06-18",
    seats: 1,
    likes: 5,
    reviewCount: 2,
  },
  {
    id: 5,
    driver: "Ethan",
    from: "Sports Complex",
    to: "Concert Hall",
    date: "2023-06-19",
    seats: 3,
    likes: 18,
    reviewCount: 9,
  },
];

export default function CarpoolingDirectory() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCarpools = carpools.filter(
    (carpool) =>
      carpool.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      carpool.to.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4 bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-white transition-colors duration-200">
      <h1 className="text-2xl font-bold mb-4">Carpooling Directory</h1>
      <div className="flex mb-4">
        <Input
          type="text"
          placeholder="Search carpools..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mr-2"
        />
        <Button variant="outline">
          <Search className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCarpools.map((carpool) => (
          <Card
            key={carpool.id}
            className="cursor-pointer bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border-2 border-transparent hover:border-indigo-500"
          >
            <CardHeader>
              <CardTitle>
                {carpool.from} to {carpool.to}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                <strong>Driver:</strong> {carpool.driver}
              </p>
              <p>
                <strong>Date:</strong> {carpool.date}
              </p>
              <p>
                <strong>Available Seats:</strong> {carpool.seats}
              </p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex items-center">
                <ThumbsUp className="h-4 w-4 mr-1" />
                <span>{carpool.likes}</span>
              </div>
              <div className="flex items-center">
                <MessageSquare className="h-4 w-4 mr-1" />
                <span>{carpool.reviewCount} reviews</span>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
