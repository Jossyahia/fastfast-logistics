"use client"
import React, { useState } from "react";
import {
  Search,
  ThumbsUp,
  MessageSquare,
  Calendar,
  MapPin,
  Users,
  Filter,
  Plus,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

type Carpool = {
  id: number;
  driver: string;
  from: string;
  to: string;
  date: string;
  seats: number;
  likes: number;
  reviewCount: number;
  price: number;
  amenities: string[];
};

const carpools: Carpool[] = [
  {
    id: 1,
    driver: "Alice",
    from: "Downtown",
    to: "Airport",
    date: "2024-10-25",
    seats: 3,
    likes: 15,
    reviewCount: 7,
    price: 25,
    amenities: ["AC", "Music", "Pet Friendly"],
  },
  {
    id: 2,
    driver: "Bob",
    from: "Suburb",
    to: "City Center",
    date: "2024-10-26",
    seats: 2,
    likes: 8,
    reviewCount: 3,
    price: 15,
    amenities: ["AC", "Wheelchair Accessible"],
  },
  // ... (previous carpool data entries)
];

const CarpoolCard = ({
  carpool,
  onLike,
}: {
  carpool: Carpool;
  onLike: (id: number) => void;
}) => (
  <Card className="cursor-pointer bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border-2 border-transparent hover:border-indigo-500">
    <CardHeader>
      <div className="flex justify-between items-center mb-2">
        <CardTitle className="text-lg">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-indigo-500" />
            {carpool.from} → {carpool.to}
          </div>
        </CardTitle>
        <Badge variant="secondary">${carpool.price}</Badge>
      </div>
    </CardHeader>
    <CardContent>
      <div className="space-y-2">
        <p className="flex items-center gap-2">
          <Users className="h-4 w-4 text-gray-500" />
          <span className="font-medium">{carpool.driver}</span>
        </p>
        <p className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-gray-500" />
          {new Date(carpool.date).toLocaleDateString()}
        </p>
        <p className="flex items-center gap-2">
          <Users className="h-4 w-4 text-gray-500" />
          {carpool.seats} seats available
        </p>
        <div className="flex flex-wrap gap-1 mt-2">
          {carpool.amenities.map((amenity) => (
            <Badge key={amenity} variant="outline" className="text-xs">
              {amenity}
            </Badge>
          ))}
        </div>
      </div>
    </CardContent>
    <CardFooter className="flex justify-between border-t dark:border-neutral-700 pt-3">
      <Button
        variant="ghost"
        size="sm"
        className="flex items-center gap-1"
        onClick={() => onLike(carpool.id)}
      >
        <ThumbsUp className="h-4 w-4" />
        <span>{carpool.likes}</span>
      </Button>
      <div className="flex items-center gap-1 text-sm text-gray-500">
        <MessageSquare className="h-4 w-4" />
        <span>{carpool.reviewCount} reviews</span>
      </div>
    </CardFooter>
  </Card>
);

const CreateCarpoolDialog = ({ onClose }: { onClose: () => void }) => (
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Create New Carpool</DialogTitle>
    </DialogHeader>
    <div className="space-y-4 py-4">
      <div className="grid grid-cols-2 gap-4">
        <Input placeholder="From" />
        <Input placeholder="To" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Input type="date" />
        <Input type="number" placeholder="Available seats" min="1" />
      </div>
      <Input type="number" placeholder="Price per seat" min="0" />
      <div className="flex gap-2">
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="default" className="bg-indigo-600 hover:bg-indigo-700">
          Create Carpool
        </Button>
      </div>
    </div>
  </DialogContent>
);

export default function CarpoolingDirectory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [filterSeats, setFilterSeats] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleLike = (id: number) => {
    // In a real app, this would update the backend
    console.log(`Liked carpool ${id}`);
  };

  const filteredAndSortedCarpools = carpools
    .filter((carpool) => {
      const matchesSearch =
        carpool.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
        carpool.to.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSeats =
        filterSeats === "all" || carpool.seats >= parseInt(filterSeats);
      return matchesSearch && matchesSeats;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price":
          return a.price - b.price;
        case "seats":
          return b.seats - a.seats;
        case "popularity":
          return b.likes - a.likes;
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
          Community Carpools
        </h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              <Plus className="h-4 w-4 mr-2" />
              Create Carpool
            </Button>
          </DialogTrigger>
          <CreateCarpoolDialog onClose={() => setIsDialogOpen(false)} />
        </Dialog>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Select value={filterSeats} onValueChange={setFilterSeats}>
            <SelectTrigger className="w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Min seats" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All seats</SelectItem>
              <SelectItem value="1">1+ seats</SelectItem>
              <SelectItem value="2">2+ seats</SelectItem>
              <SelectItem value="3">3+ seats</SelectItem>
              <SelectItem value="4">4+ seats</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Date</SelectItem>
              <SelectItem value="price">Price</SelectItem>
              <SelectItem value="seats">Available Seats</SelectItem>
              <SelectItem value="popularity">Popularity</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedCarpools.map((carpool) => (
          <CarpoolCard key={carpool.id} carpool={carpool} onLike={handleLike} />
        ))}
      </div>
    </div>
  );
}
