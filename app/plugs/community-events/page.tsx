"use client";

import { useState } from "react";
import {
  Search,
  Calendar,
  MapPin,
  Clock,
  Users,
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

// Mock data for community events
const events = [
  {
    id: 1,
    name: "Community Garden Planting",
    category: "Environment",
    date: "2023-06-15",
    time: "10:00 AM",
    location: "Central Park",
    attendees: 50,
    description:
      "Join us for a day of planting in our community garden. Bring your gardening gloves!",
  },
  {
    id: 2,
    name: "Local Art Exhibition",
    category: "Arts & Culture",
    date: "2023-06-20",
    time: "2:00 PM",
    location: "City Gallery",
    attendees: 100,
    description:
      "Discover the works of local artists in this exciting exhibition.",
  },
  {
    id: 3,
    name: "Neighborhood Cleanup",
    category: "Environment",
    date: "2023-06-25",
    time: "9:00 AM",
    location: "Main Street",
    attendees: 30,
    description:
      "Help keep our neighborhood clean! We'll provide trash bags and gloves.",
  },
  {
    id: 4,
    name: "Summer Music Festival",
    category: "Music",
    date: "2023-07-01",
    time: "4:00 PM",
    location: "Riverside Park",
    attendees: 500,
    description:
      "Enjoy live performances from local bands and food from local vendors.",
  },
  {
    id: 5,
    name: "Community Book Club",
    category: "Education",
    date: "2023-07-05",
    time: "7:00 PM",
    location: "Public Library",
    attendees: 20,
    description:
      "Join us in discussing this month's book selection: 'To Kill a Mockingbird'",
  },
  {
    id: 6,
    name: "Farmers Market",
    category: "Food & Drink",
    date: "2023-07-10",
    time: "8:00 AM",
    location: "Town Square",
    attendees: 200,
    description:
      "Shop for fresh, local produce and handmade crafts from our community's farmers and artisans.",
  },
];

type EventCategory =
  | "Environment"
  | "Arts & Culture"
  | "Music"
  | "Education"
  | "Food & Drink";

export default function Component() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<EventCategory[]>(
    []
  );

  const filteredEvents = events.filter(
    (event) =>
      (event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategories.length === 0 ||
        selectedCategories.includes(event.category as EventCategory))
  );

  const handleCategoryToggle = (category: EventCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Community Events</h1>
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search events..."
            className="pl-10 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full md:w-auto">
              Categories <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            {[
              "Environment",
              "Arts & Culture",
              "Music",
              "Education",
              "Food & Drink",
            ].map((category) => (
              <DropdownMenuCheckboxItem
                key={category}
                checked={selectedCategories.includes(category as EventCategory)}
                onCheckedChange={() =>
                  handleCategoryToggle(category as EventCategory)
                }
              >
                {category}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{event.name}</h2>
              <Badge className="mb-4">{event.category}</Badge>
              <p className="text-sm text-gray-600 mb-4">{event.description}</p>
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <Calendar className="h-4 w-4 mr-2" />
                {event.date}
              </div>
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <Clock className="h-4 w-4 mr-2" />
                {event.time}
              </div>
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <MapPin className="h-4 w-4 mr-2" />
                {event.location}
              </div>
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <Users className="h-4 w-4 mr-2" />
                {event.attendees} attendees
              </div>
              <Button className="w-full">RSVP</Button>
            </div>
          </div>
        ))}
      </div>
      {filteredEvents.length === 0 && (
        <p className="text-center text-gray-500 mt-8">
          No events found. Try adjusting your search or filters.
        </p>
      )}
    </div>
  );
}
