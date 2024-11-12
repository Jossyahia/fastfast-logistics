"use client";

import { useState } from "react";
import {
  Search,
  Car,
  Fuel,
  Users,
  DollarSign,
  Calendar,
  ChevronDown,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

// Mock data for available cars
const cars = [
  {
    id: 1,
    make: "Toyota",
    model: "Prius",
    type: "Hybrid",
    fuelType: "Hybrid",
    seats: 5,
    pricePerDay: 50,
    availableFrom: "2023-06-01",
  },
  {
    id: 2,
    make: "Tesla",
    model: "Model 3",
    type: "Electric",
    fuelType: "Electric",
    seats: 5,
    pricePerDay: 80,
    availableFrom: "2023-06-03",
  },
  {
    id: 3,
    make: "Honda",
    model: "Civic",
    type: "Sedan",
    fuelType: "Gasoline",
    seats: 5,
    pricePerDay: 45,
    availableFrom: "2023-06-02",
  },
  {
    id: 4,
    make: "Ford",
    model: "Focus Electric",
    type: "Electric",
    fuelType: "Electric",
    seats: 5,
    pricePerDay: 60,
    availableFrom: "2023-06-05",
  },
  {
    id: 5,
    make: "Nissan",
    model: "Leaf",
    type: "Electric",
    fuelType: "Electric",
    seats: 5,
    pricePerDay: 55,
    availableFrom: "2023-06-04",
  },
  {
    id: 6,
    make: "Chevrolet",
    model: "Bolt",
    type: "Electric",
    fuelType: "Electric",
    seats: 5,
    pricePerDay: 65,
    availableFrom: "2023-06-01",
  },
];

type CarType = "Sedan" | "SUV" | "Electric" | "Hybrid";
type FuelType = "Gasoline" | "Diesel" | "Electric" | "Hybrid";

export default function Component() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<CarType[]>([]);
  const [selectedFuelTypes, setSelectedFuelTypes] = useState<FuelType[]>([]);

  const filteredCars = cars.filter(
    (car) =>
      (car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.model.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedTypes.length === 0 ||
        selectedTypes.includes(car.type as CarType)) &&
      (selectedFuelTypes.length === 0 ||
        selectedFuelTypes.includes(car.fuelType as FuelType))
  );

  const handleTypeToggle = (type: CarType) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleFuelTypeToggle = (fuelType: FuelType) => {
    setSelectedFuelTypes((prev) =>
      prev.includes(fuelType)
        ? prev.filter((t) => t !== fuelType)
        : [...prev, fuelType]
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Sustainable Car Rental Directory
      </h1>
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search by make or model..."
            className="pl-10 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full md:w-auto">
              Car Type <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            {["Sedan", "SUV", "Electric", "Hybrid"].map((type) => (
              <DropdownMenuCheckboxItem
                key={type}
                checked={selectedTypes.includes(type as CarType)}
                onCheckedChange={() => handleTypeToggle(type as CarType)}
              >
                {type}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full md:w-auto">
              Fuel Type <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            {["Gasoline", "Diesel", "Electric", "Hybrid"].map((fuelType) => (
              <DropdownMenuCheckboxItem
                key={fuelType}
                checked={selectedFuelTypes.includes(fuelType as FuelType)}
                onCheckedChange={() =>
                  handleFuelTypeToggle(fuelType as FuelType)
                }
              >
                {fuelType}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCars.map((car) => (
          <div
            key={car.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">
                {car.make} {car.model}
              </h2>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary">{car.type}</Badge>
                <Badge variant="secondary">{car.fuelType}</Badge>
              </div>
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <Car className="h-4 w-4 mr-2" />
                {car.type}
              </div>
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <Fuel className="h-4 w-4 mr-2" />
                {car.fuelType}
              </div>
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <Users className="h-4 w-4 mr-2" />
                {car.seats} seats
              </div>
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <DollarSign className="h-4 w-4 mr-2" />${car.pricePerDay} per
                day
              </div>
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <Calendar className="h-4 w-4 mr-2" />
                Available from {car.availableFrom}
              </div>
              <Button className="w-full">Book Now</Button>
            </div>
          </div>
        ))}
      </div>
      {filteredCars.length === 0 && (
        <p className="text-center text-gray-500 mt-8">
          No cars found. Try adjusting your search or filters.
        </p>
      )}
    </div>
  );
}
