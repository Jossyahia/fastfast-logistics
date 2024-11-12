"use client";

import { useState } from "react";
import {
  Search,
  MapPin,
  Phone,
  Globe,
  ChevronDown,
  ShoppingCart,
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

// Mock data for Nigerian food vendors
const vendors = [
  {
    id: 1,
    name: "Mama's Kitchen",
    type: "restaurant",
    cuisine: "Nigerian",
    speciality: "Jollof Rice",
    address: "123 Lagos Street, Ikeja",
    phone: "080-1234-5678",
    whatsapp: "080-1234-5678",
    website: "www.mamaskitchen.com",
    facebook: "mamaskitchen",
    instagram: "mamas_kitchen",
  },
  {
    id: 2,
    name: "Suya Express",
    type: "food truck",
    cuisine: "Nigerian",
    speciality: "Suya",
    address: "Various Locations in Abuja",
    phone: "070-9876-5432",
    whatsapp: "070-9876-5432",
    website: "www.suyaexpress.com",
    facebook: "suyaexpress",
    instagram: "suya_express",
  },
  {
    id: 3,
    name: "Naija Delights Catering",
    type: "catering",
    cuisine: "Nigerian",
    speciality: "Pounded Yam and Egusi Soup",
    address: "456 Owerri Road, Owerri",
    phone: "081-2345-6789",
    whatsapp: "081-2345-6789",
    website: "www.naijadelights.com",
    facebook: "naijadelights",
    instagram: "naija_delights",
  },
  {
    id: 4,
    name: "Calabar Cuisine",
    type: "restaurant",
    cuisine: "Nigerian",
    speciality: "Afang Soup",
    address: "789 Calabar Street, Calabar",
    phone: "090-8765-4321",
    whatsapp: "090-8765-4321",
    website: "www.calabarcuisine.com",
    facebook: "calabarcuisine",
    instagram: "calabar_cuisine",
  },
  {
    id: 5,
    name: "Akara on Wheels",
    type: "food truck",
    cuisine: "Nigerian",
    speciality: "Akara and Pap",
    address: "Various Locations in Ibadan",
    phone: "070-1122-3344",
    whatsapp: "070-1122-3344",
    website: "www.akaraonwheels.com",
    facebook: "akaraonwheels",
    instagram: "akara_on_wheels",
  },
  {
    id: 6,
    name: "Royal Feast Catering",
    type: "catering",
    cuisine: "Nigerian",
    speciality: "Assorted Nigerian Dishes",
    address: "101 Kano Road, Kano",
    phone: "080-5544-3322",
    whatsapp: "080-5544-3322",
    website: "www.royalfeast.com",
    facebook: "royalfeast",
    instagram: "royal_feast",
  },
];

type VendorType = "restaurant" | "food truck" | "catering";

export default function Component() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<VendorType[]>([]);
  const [showContactInfo, setShowContactInfo] = useState<number | null>(null);
  const [newVendor, setNewVendor] = useState({
    name: "",
    type: "",
    speciality: "",
    address: "",
    phone: "",
    whatsapp: "",
    website: "",
    facebook: "",
    instagram: "",
  });

  const filteredVendors = vendors.filter(
    (vendor) =>
      (vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.speciality.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedTypes.length === 0 ||
        selectedTypes.includes(vendor.type as VendorType))
  );

  const handleTypeToggle = (type: VendorType) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleOrderNow = (id: number) => {
    setShowContactInfo(id);
  };

  const handleNewVendorChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewVendor((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitNewVendor = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("New vendor submitted:", newVendor);
    // Here you would typically send this data to your backend
    // Reset the form after submission
    setNewVendor({
      name: "",
      type: "",
      speciality: "",
      address: "",
      phone: "",
      whatsapp: "",
      website: "",
      facebook: "",
      instagram: "",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Nigerian Food Vendors Directory
      </h1>
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search by name or speciality..."
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
              checked={selectedTypes.includes("restaurant")}
              onCheckedChange={() => handleTypeToggle("restaurant")}
            >
              Restaurants
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={selectedTypes.includes("food truck")}
              onCheckedChange={() => handleTypeToggle("food truck")}
            >
              Food Trucks
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={selectedTypes.includes("catering")}
              onCheckedChange={() => handleTypeToggle("catering")}
            >
              Catering Services
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVendors.map((vendor) => (
          <div
            key={vendor.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{vendor.name}</h2>
              <p className="text-sm text-gray-600 mb-4">
                {vendor.cuisine} • {vendor.type}
              </p>
              <p className="text-sm font-medium text-green-600 mb-4">
                Speciality: {vendor.speciality}
              </p>
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <MapPin className="h-4 w-4 mr-2" />
                {vendor.address}
              </div>
              {showContactInfo === vendor.id && (
                <>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <Phone className="h-4 w-4 mr-2" />
                    {vendor.phone}
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <Send className="h-4 w-4 mr-2" />
                    {vendor.whatsapp}
                  </div>
                </>
              )}
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <Globe className="h-4 w-4 mr-2" />
                <a
                  href={`https://${vendor.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {vendor.website}
                </a>
              </div>
              <div className="flex space-x-4 mb-4">
                <a
                  href={`https://facebook.com/${vendor.facebook}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href={`https://instagram.com/${vendor.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-600 hover:text-pink-800"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
              <Button
                className="w-full"
                onClick={() => handleOrderNow(vendor.id)}
              >
                <ShoppingCart className="mr-2 h-4 w-4" /> Order Now
              </Button>
            </div>
          </div>
        ))}
      </div>
      {filteredVendors.length === 0 && (
        <p className="text-center text-gray-500 mt-8">
          No vendors found. Try adjusting your search or filters.
        </p>
      )}
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mt-8 mx-auto block">Post Your Restaurant</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Post Your Restaurant</DialogTitle>
            <DialogDescription>
              Fill out this form to add your restaurant to our directory.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitNewVendor}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={newVendor.name}
                  onChange={handleNewVendorChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Type
                </Label>
                <Input
                  id="type"
                  name="type"
                  value={newVendor.type}
                  onChange={handleNewVendorChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="speciality" className="text-right">
                  Speciality
                </Label>
                <Input
                  id="speciality"
                  name="speciality"
                  value={newVendor.speciality}
                  onChange={handleNewVendorChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="address" className="text-right">
                  Address
                </Label>
                <Textarea
                  id="address"
                  name="address"
                  value={newVendor.address}
                  onChange={handleNewVendorChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Phone
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  value={newVendor.phone}
                  onChange={handleNewVendorChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="whatsapp" className="text-right">
                  WhatsApp
                </Label>
                <Input
                  id="whatsapp"
                  name="whatsapp"
                  value={newVendor.whatsapp}
                  onChange={handleNewVendorChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="website" className="text-right">
                  Website
                </Label>
                <Input
                  id="website"
                  name="website"
                  value={newVendor.website}
                  onChange={handleNewVendorChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="facebook" className="text-right">
                  Facebook
                </Label>
                <Input
                  id="facebook"
                  name="facebook"
                  value={newVendor.facebook}
                  onChange={handleNewVendorChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="instagram" className="text-right">
                  Instagram
                </Label>
                <Input
                  id="instagram"
                  name="instagram"
                  value={newVendor.instagram}
                  onChange={handleNewVendorChange}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
