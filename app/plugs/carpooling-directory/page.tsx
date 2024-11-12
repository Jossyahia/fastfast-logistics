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
  Facebook,
  Instagram,
  Phone,
  Mail,
  MapPin,
  Star,
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

interface Car {
  id: number;
  make: string;
  model: string;
  type: CarType;
  fuelType: FuelType;
  seats: number;
  pricePerDay: number;
  availableFrom: string;
  phoneNumber: string;
  whatsappNumber: string;
  location: string;
  rating: number;
  imageUrl: string;
  features: string[];
}

type CarType = "Sedan" | "SUV" | "Electric" | "Hybrid";
type FuelType = "Gasoline" | "Diesel" | "Electric" | "Hybrid";

interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  startDate: string;
  endDate: string;
  message: string;
  pickupLocation: string;
}

const cars: Car[] = [
  {
    id: 1,
    make: "Toyota",
    model: "Prius",
    type: "Hybrid",
    fuelType: "Hybrid",
    seats: 5,
    pricePerDay: 50,
    availableFrom: "2024-03-01",
    phoneNumber: "+1 (555) 123-4567",
    whatsappNumber: "+15551234567",
    location: "Los Angeles, CA",
    rating: 4.8,
    imageUrl: "/cars/toyota-prius.jpg",
    features: ["Bluetooth", "Backup Camera", "USB Ports", "Smart Key"],
  },
  {
    id: 2,
    make: "Tesla",
    model: "Model 3",
    type: "Electric",
    fuelType: "Electric",
    seats: 5,
    pricePerDay: 80,
    availableFrom: "2024-03-01",
    phoneNumber: "+1 (555) 234-5678",
    whatsappNumber: "+15552345678",
    location: "San Francisco, CA",
    rating: 4.9,
    imageUrl: "/cars/tesla-model3.jpg",
    features: ["Autopilot", "Premium Sound", "Glass Roof", "Supercharging"],
  },
  {
    id: 3,
    make: "BMW",
    model: "i3",
    type: "Electric",
    fuelType: "Electric",
    seats: 4,
    pricePerDay: 70,
    availableFrom: "2024-03-01",
    phoneNumber: "+1 (555) 345-6789",
    whatsappNumber: "+15553456789",
    location: "New York, NY",
    rating: 4.7,
    imageUrl: "/cars/bmw-i3.jpg",
    features: ["Parking Assistant", "Navigation", "Heated Seats", "LED Lights"],
  },
  {
    id: 4,
    make: "Chevrolet",
    model: "Bolt",
    type: "Electric",
    fuelType: "Electric",
    seats: 5,
    pricePerDay: 65,
    availableFrom: "2024-03-01",
    phoneNumber: "+1 (555) 456-7890",
    whatsappNumber: "+15554567890",
    location: "Chicago, IL",
    rating: 4.6,
    imageUrl: "/cars/chevy-bolt.jpg",
    features: ["Apple CarPlay", "Android Auto", "Wi-Fi Hotspot", "Teen Driver"],
  },
  {
    id: 5,
    make: "Honda",
    model: "CR-V Hybrid",
    type: "Hybrid",
    fuelType: "Hybrid",
    seats: 5,
    pricePerDay: 60,
    availableFrom: "2024-03-01",
    phoneNumber: "+1 (555) 567-8901",
    whatsappNumber: "+15555678901",
    location: "Seattle, WA",
    rating: 4.7,
    imageUrl: "/cars/honda-crv.jpg",
    features: ["Honda Sensing", "Wireless Charging", "Power Tailgate", "AWD"],
  },
];

const SocialLinks = {
  facebook: "https://facebook.com/sustainablecarrentals",
  instagram: "https://instagram.com/sustainablecarrentals",
  whatsapp: "https://wa.me/15551234567",
};

const CompanyInfo = {
  name: "Sustainable Car Rentals",
  email: "info@sustainablecarrentals.com",
  phone: "+1 (555) 123-4567",
  address: "123 Green Street, Eco City, EC 12345",
};
export default function Component() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<CarType[]>([]);
  const [selectedFuelTypes, setSelectedFuelTypes] = useState<FuelType[]>([]);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingData, setBookingData] = useState<BookingFormData>({
    name: "",
    email: "",
    phone: "",
    startDate: "",
    endDate: "",
    message: "",
    pickupLocation: "",
  });
  const [bookingStatus, setBookingStatus] = useState<{
    status: "idle" | "loading" | "success" | "error";
    message: string;
  }>({
    status: "idle",
    message: "",
  });

  const filteredCars = cars.filter(
    (car) =>
      (car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.model.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedTypes.length === 0 || selectedTypes.includes(car.type)) &&
      (selectedFuelTypes.length === 0 || selectedFuelTypes.includes(car.fuelType))
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

  const handleBookNow = (car: Car) => {
    setSelectedCar(car);
    setShowBookingForm(true);
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBookingStatus({ status: "loading", message: "Processing your booking..." });
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Booking success
      setBookingStatus({
        status: "success",
        message: "Booking successful! We'll contact you shortly.",
      });
      
      setTimeout(() => {
        setShowBookingForm(false);
        setSelectedCar(null);
        setBookingData({
          name: "",
          email: "",
          phone: "",
          startDate: "",
          endDate: "",
          message: "",
          pickupLocation: "",
        });
        setBookingStatus({ status: "idle", message: "" });
      }, 2000);
      
    } catch (error) {
      setBookingStatus({
        status: "error",
        message: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {CompanyInfo.name}
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Eco-friendly vehicles for a sustainable future
          </p>
          
          {/* Social Media Links */}
          <div className="flex justify-center gap-6 mb-8">
            {Object.entries(SocialLinks).map(([platform, url]) => (
              
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                {platform === "facebook" && <Facebook className="h-6 w-6" />}
                {platform === "instagram" && <Instagram className="h-6 w-6" />}
                {platform === "whatsapp" && (
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.787 23.379l4.345-1.497A11.913 11.913 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.072 0-4.013-.595-5.654-1.621l-3.178 1.097 1.098-3.179A9.936 9.936 0 012 12c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10z" />
                  </svg>
                )}
              </a>
            ))}
          </div>
        </div>{/* Search and Filters */}
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
                  onCheckedChange={() => handleFuelTypeToggle(fuelType as FuelType)}
                >
                  {fuelType}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Car Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <div
              key={car.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={car.imageUrl}
                  alt={`${car.make} ${car.model}`}
                  className="object-cover w-full h-48"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-semibold">
                    {car.make} {car.model}
                  </h2>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm">{car.rating}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">{car.type}</Badge>
                  <Badge variant="secondary">{car.fuelType}</Badge>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-2" />
                    {car.seats} seats
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <DollarSign className="h-4 w-4 mr-2" />
                    ${car.pricePerDay}/day
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    {car.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    Available from {car.availableFrom}
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="text-sm font-semibold mb-2">Features:</h3>
                  <div className="flex flex-wrap gap-2">
                    {car.features.map((feature, index) => (
                      <Badge key={index} variant="outline">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={() => handleBookNow(car)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition-colors"
                >
                  Book Now
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredCars.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No cars found. Try adjusting your search or filters.
            </p>
          </div>
        )}

        {/* Booking Modal */}
        {showBookingForm && selectedCar && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Book {selectedCar.make} {selectedCar.model}
                </h2>
                <button
                  onClick={() => setShowBookingForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {bookingStatus.status !== "success" ? (
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <Input
                      type="text"
                      required
                      value={bookingData.name}
                      onChange={(e) =>
                        setBookingData({ ...bookingData, name: e.target.value })
                      }
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      required
                      value={bookingData.email}
                      onChange={(e) =>
                        setBookingData({ ...bookingData, email: e.target.value })
                      }
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <Input
                      type="tel"
                      required
                      value={bookingData.phone}
                      onChange={(e) =>
                        setBookingData({ ...bookingData, phone: e.target.value })
                      }
                      className="w-full"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Start Date *
                      </label>
                      <Input
                        type="date"
                        required
                        min={new Date().toISOString().split("T")[0]}
                        value={bookingData.startDate}
                        onChange={(e) =>
                          setBookingData({
                            ...bookingData,
                            startDate: e.target.value,
                          })
                        }
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        End Date *
                      </label>
                      <Input
                        type="date"
                        required
                        min={bookingData.startDate}
                        value={bookingData.endDate}
                        onChange={(e) =>
                          setBookingData({
                            ...bookingData,
                            endDate: e.target.value,
                          })
                        }
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Pickup Location *
                    </label>
                    <Input
                      type="text"
                      required
                      value={bookingData.pickupLocation}
                      onChange={(e) =>
                        setBookingData({
                          ...bookingData,
                          pickupLocation: e.target.value,
                        })
                      }
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Additional Message
                    </label>
                    <textarea
                      value={bookingData.message}
                      onChange={(e) =>
                        setBookingData({
                          ...bookingData,
                          message: e.target.value,
                        })
                      }
                      rows={3}
                      className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="border-t pt-4 mt-6">
                    <h3 className="text-lg font-semibold mb-2">Contact Details</h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>
                        <Phone className="inline-block h-4 w-4 mr-2" />
                        {selectedCar.phoneNumber}
                      </p>
                      <p>
                        <svg
                          className="inline-block h-4 w-4 mr-2"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.787 23.379l4.345-1.497A11.913 11.913 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.072 0-4.013-.595-5.654-1.621l-3.178 1.097 1.098-3.179A9.936 9.936 0 012 12c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10z" />
                        </svg>
                        {selectedCar.whatsappNumber}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-6">
                    <Button
                      type="submit"
                      disabled={bookingStatus.status === "loading"}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      {bookingStatus.status === "loading" ? "Processing..." : "Confirm Booking"}
                    </Button>
                    <Button
                      type="button"
                      onClick={() => setShowBookingForm(false)}
                      className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800"
                    >
                      Cancel
                    </Button>
                  </div>

                  {bookingStatus.status === "error" && (
                    <p className="text-red-500 text-sm mt-2">
                      {bookingStatus.message}
                    </p>
                  )}
                </form>
              ) : (
                <div className="text-center py-8">
                  <svg
                    className="mx-auto h-12 w-12 text-green-500"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">
                    Booking Successful!
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    {bookingStatus.message}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About Us</h3>
              <p className="text-gray-400">
                {CompanyInfo.name} is committed to providing sustainable
                transportation solutions for a greener future.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <div className="space-y-2 text-gray-400">
                <p>
                  <Mail className="inline-block h-4 w-4 mr-2" />
                  {CompanyInfo.email}
                </p>
                <p>
                  <Phone className="inline-block h-4 w-4 mr-2" />
                  {CompanyInfo.phone}
                </p>
                <p>
                  <MapPin className="inline-block h-4 w-4 mr-2" />
                  {CompanyInfo.address}
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space<h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                {Object.entries(SocialLinks).map(([platform, url]) => (
                  
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {platform === "facebook" && <Facebook className="h-6 w-6" />}
                    {platform === "instagram" && <Instagram className="h-6 w-6" />}
                    {platform === "whatsapp" && (
                      <svg
                        className="h-6 w-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.787 23.379l4.345-1.497A11.913 11.913 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.072 0-4.013-.595-5.654-1.621l-3.178 1.097 1.098-3.179A9.936 9.936 0 012 12c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10z" />
                      </svg>
                    )}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>
              © {new Date().getFullYear()} {CompanyInfo.name}. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}