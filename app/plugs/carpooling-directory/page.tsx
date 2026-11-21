"use client";

import { useState } from "react";
import {
  Search,
  MapPin,
  Phone,
  Calendar,
  ChevronDown,
  Car,
  Facebook,
  Instagram,
  Send,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Mock data for car pooling services
const carPoolServices = [
  {
    id: 1,
    name: "City Commuters",
    type: "daily",
    route: "Lagos - Ikeja",
    capacity: 4,
    departureTime: "7:00 AM",
    returnTime: "6:00 PM",
    address: "123 Lagos Street, Ikeja",
    phone: "080-1234-5678",
    whatsapp: "080-1234-5678",
    facebook: "citycommuters",
    instagram: "city_commuters",
  },
  {
    id: 2,
    name: "Weekend Getaway",
    type: "weekend",
    route: "Abuja - Kaduna",
    capacity: 6,
    departureTime: "Friday 5:00 PM",
    returnTime: "Sunday 7:00 PM",
    address: "456 Abuja Road, Abuja",
    phone: "070-9876-5432",
    whatsapp: "070-9876-5432",
    facebook: "weekendgetaway",
    instagram: "weekend_getaway",
  },
  {
    id: 3,
    name: "Long Distance Express",
    type: "long-distance",
    route: "Lagos - Abuja",
    capacity: 3,
    departureTime: "6:00 AM",
    returnTime: "N/A (One-way)",
    address: "789 Express Way, Lagos",
    phone: "081-2345-6789",
    whatsapp: "081-2345-6789",
    facebook: "longdistanceexpress",
    instagram: "long_distance_express",
  },
  {
    id: 4,
    name: "Campus Shuttle",
    type: "daily",
    route: "University of Lagos - Yaba",
    capacity: 8,
    departureTime: "7:30 AM, 1:00 PM, 5:00 PM",
    returnTime: "9:00 AM, 2:30 PM, 6:30 PM",
    address: "University of Lagos, Akoka",
    phone: "090-8765-4321",
    whatsapp: "090-8765-4321",
    facebook: "campusshuttle",
    instagram: "campus_shuttle",
  },
  {
    id: 5,
    name: "Corporate Carpool",
    type: "daily",
    route: "Victoria Island - Lekki",
    capacity: 5,
    departureTime: "7:00 AM",
    returnTime: "6:30 PM",
    address: "101 VI Road, Victoria Island",
    phone: "070-1122-3344",
    whatsapp: "070-1122-3344",
    facebook: "corporatecarpool",
    instagram: "corporate_carpool",
  },
  {
    id: 6,
    name: "Airport Shuttle",
    type: "on-demand",
    route: "Lagos City - Murtala Muhammed Airport",
    capacity: 3,
    departureTime: "On Demand",
    returnTime: "On Demand",
    address: "234 Airport Road, Ikeja",
    phone: "080-5544-3322",
    whatsapp: "080-5544-3322",
    facebook: "airportshuttle",
    instagram: "airport_shuttle",
  },
];

type ServiceType = "daily" | "weekend" | "long-distance" | "on-demand";

export default function Component() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<ServiceType[]>([]);
  const [showContactInfo, setShowContactInfo] = useState<number | null>(null);
  const [newService, setNewService] = useState({
    name: "",
    type: "",
    route: "",
    capacity: "",
    departureTime: "",
    returnTime: "",
    address: "",
    phone: "",
    whatsapp: "",
    facebook: "",
    instagram: "",
  });

  const filteredServices = carPoolServices.filter(
    (service) =>
      (service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.route.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedTypes.length === 0 ||
        selectedTypes.includes(service.type as ServiceType))
  );

  const handleTypeToggle = (type: ServiceType) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleBookNow = (id: number) => {
    setShowContactInfo(id);
  };

  const handleNewServiceChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewService((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitNewService = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("New service submitted:", newService);
    // Here you would typically send this data to your backend
    // Reset the form after submission
    setNewService({
      name: "",
      type: "",
      route: "",
      capacity: "",
      departureTime: "",
      returnTime: "",
      address: "",
      phone: "",
      whatsapp: "",
      facebook: "",
      instagram: "",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-white transition-colors duration-200">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Car Pooling Service Directory
      </h1>
      <div className="flex flex-col md:flex-row gap-4 mb-8  bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-white transition-colors duration-200">
        <div className="relative flex-grow ">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search by name or route..."
            className="pl-10 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full md:w-auto">
              Filter by Type <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuCheckboxItem
              checked={selectedTypes.includes("daily")}
              onCheckedChange={() => handleTypeToggle("daily")}
            >
              Daily Commute
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={selectedTypes.includes("weekend")}
              onCheckedChange={() => handleTypeToggle("weekend")}
            >
              Weekend Trips
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={selectedTypes.includes("long-distance")}
              onCheckedChange={() => handleTypeToggle("long-distance")}
            >
              Long Distance
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={selectedTypes.includes("on-demand")}
              onCheckedChange={() => handleTypeToggle("on-demand")}
            >
              On-Demand
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className=" bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-white transition-colors duration-200shadow-md overflow-hidden"
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{service.name}</h2>
              <p className="text-sm text-gray-600 mb-4">
                {service.type} • Capacity: {service.capacity}
              </p>
              <p className="text-sm font-medium text-green-600 mb-4">
                Route: {service.route}
              </p>
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <Calendar className="h-4 w-4 mr-2" />
                Departure: {service.departureTime}
              </div>
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <Calendar className="h-4 w-4 mr-2" />
                Return: {service.returnTime}
              </div>
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <MapPin className="h-4 w-4 mr-2" />
                {service.address}
              </div>
              {showContactInfo === service.id && (
                <>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <Phone className="h-4 w-4 mr-2" />
                    {service.phone}
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <Send className="h-4 w-4 mr-2" />
                    {service.whatsapp}
                  </div>
                </>
              )}
              <div className="flex space-x-4 mb-4">
                <a
                  href={`https://facebook.com/${service.facebook}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href={`https://instagram.com/${service.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-600 hover:text-pink-800"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
              <Button
                className="w-full"
                onClick={() => handleBookNow(service.id)}
              >
                <Car className="mr-2 h-4 w-4" /> Book Now
              </Button>
            </div>
          </div>
        ))}
      </div>
      {filteredServices.length === 0 && (
        <p className="text-center text-gray-500 mt-8">
          No services found. Try adjusting your search or filters.
        </p>
      )}

    </div>
  );
}
