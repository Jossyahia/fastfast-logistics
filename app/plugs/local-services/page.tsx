"use client";

import { useState } from "react";
import {
  Search,
  MapPin,
  Star,
  Plus,
  Phone,
  Instagram,
  Facebook,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Dummy data for services
const initialServices = [
  {
    id: 1,
    title: "Plumbing Services",
    provider: "John Doe",
    rating: 4.5,
    location: "Downtown",
    phone: "+1 234-567-8901",
    instagram: "@johndoeplumbing",
    facebook: "johndoeplumbing",
  },
  {
    id: 2,
    title: "Electrical Repair",
    provider: "Jane Smith",
    rating: 4.8,
    location: "Suburb",
    phone: "+1 234-567-8902",
    instagram: "@janeelectrical",
    facebook: "janeelectrical",
  },
  {
    id: 3,
    title: "House Cleaning",
    provider: "Clean Co.",
    rating: 4.2,
    location: "City Center",
    phone: "+1 234-567-8903",
    instagram: "@cleancoservices",
    facebook: "cleancoservices",
  },
  {
    id: 4,
    title: "Gardening & Landscaping",
    provider: "Green Thumbs",
    rating: 4.6,
    location: "Outskirts",
    phone: "+1 234-567-8904",
    instagram: "@greenthumbslandscaping",
    facebook: "greenthumbslandscaping",
  },
];

export default function Component() {
  const [services, setServices] = useState(initialServices);
  const [searchTerm, setSearchTerm] = useState("");
  const [newService, setNewService] = useState({
    title: "",
    provider: "",
    location: "",
    phone: "",
    instagram: "",
    facebook: "",
  });
  const [selectedService, setSelectedService] = useState(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredServices = services.filter(
    (service) =>
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNewServiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewService({ ...newService, [e.target.name]: e.target.value });
  };

  const handleNewServiceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = services.length + 1;
    setServices([...services, { ...newService, id: newId, rating: 0 }]);
    setNewService({
      title: "",
      provider: "",
      location: "",
      phone: "",
      instagram: "",
      facebook: "",
    });
  };

  const handleCardClick = (service) => {
    setSelectedService(service);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Local Services</h1>
      <div className="flex justify-between items-center mb-8">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search services..."
            className="pl-10 w-full"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Post a Service
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Post a New Service</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleNewServiceSubmit} className="space-y-4">
              <Input
                name="title"
                placeholder="Service Title"
                value={newService.title}
                onChange={handleNewServiceChange}
                required
              />
              <Input
                name="provider"
                placeholder="Service Provider"
                value={newService.provider}
                onChange={handleNewServiceChange}
                required
              />
              <Input
                name="location"
                placeholder="Location"
                value={newService.location}
                onChange={handleNewServiceChange}
                required
              />
              <Input
                name="phone"
                placeholder="Phone Number"
                value={newService.phone}
                onChange={handleNewServiceChange}
                required
              />
              <Input
                name="instagram"
                placeholder="Instagram Handle"
                value={newService.instagram}
                onChange={handleNewServiceChange}
              />
              <Input
                name="facebook"
                placeholder="Facebook Page"
                value={newService.facebook}
                onChange={handleNewServiceChange}
              />
              <Button type="submit" className="w-full">
                Post Service
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <Card
            key={service.id}
            className="cursor-pointer hover:shadow-lg transition-shadow duration-200"
            onClick={() => handleCardClick(service)}
          >
            <CardHeader>
              <CardTitle>{service.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-2">{service.provider}</p>
              <div className="flex items-center mb-2">
                <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                <span className="text-sm">{service.location}</span>
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 mr-1 text-yellow-400" />
                <span className="text-sm">{service.rating.toFixed(1)}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {selectedService && (
        <Dialog
          open={!!selectedService}
          onOpenChange={() => setSelectedService(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedService.title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-lg font-semibold">
                {selectedService.provider}
              </p>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-gray-400" />
                <span>{selectedService.location}</span>
              </div>
              <div className="flex items-center">
                <Star className="h-5 w-5 mr-2 text-yellow-400" />
                <span>{selectedService.rating.toFixed(1)}</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-gray-400" />
                <span>{selectedService.phone}</span>
              </div>
              {selectedService.instagram && (
                <div className="flex items-center">
                  <Instagram className="h-5 w-5 mr-2 text-gray-400" />
                  <a
                    href={`https://www.instagram.com/${selectedService.instagram.replace(
                      "@",
                      ""
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {selectedService.instagram}
                  </a>
                </div>
              )}
              {selectedService.facebook && (
                <div className="flex items-center">
                  <Facebook className="h-5 w-5 mr-2 text-gray-400" />
                  <a
                    href={`https://www.facebook.com/${selectedService.facebook}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {selectedService.facebook}
                  </a>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
