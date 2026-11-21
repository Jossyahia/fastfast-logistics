"use client";

import { useState } from "react";
import {
  Search,
  MapPin,
  Phone,
  Mail,
  ChevronDown,
  Briefcase,
  Facebook,
  Instagram,
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

// Mock data for neighborhood professionals
const professionals = [
  {
    id: 1,
    name: "John Doe",
    profession: "Plumber",
    specialty: "Residential Plumbing",
    rating: 4.8,
    experience: "10 years",
    address: "123 Main St, Neighborhoodville",
    phone: "080-1234-5678",
    email: "john.doe@example.com",
    facebook: "johndoeplumber",
    instagram: "john_the_plumber",
  },
  {
    id: 2,
    name: "Jane Smith",
    profession: "Electrician",
    specialty: "Home Wiring and Repairs",
    rating: 4.9,
    experience: "15 years",
    address: "456 Elm St, Neighborhoodville",
    phone: "070-9876-5432",
    email: "jane.smith@example.com",
    facebook: "janetheelectrician",
    instagram: "jane_sparks",
  },
  {
    id: 3,
    name: "Mike Johnson",
    profession: "Carpenter",
    specialty: "Custom Furniture",
    rating: 4.7,
    experience: "8 years",
    address: "789 Oak St, Neighborhoodville",
    phone: "081-2345-6789",
    email: "mike.johnson@example.com",
    facebook: "mikescarpentry",
    instagram: "mike_woodworks",
  },
  {
    id: 4,
    name: "Sarah Lee",
    profession: "Painter",
    specialty: "Interior and Exterior Painting",
    rating: 4.6,
    experience: "12 years",
    address: "101 Pine St, Neighborhoodville",
    phone: "090-8765-4321",
    email: "sarah.lee@example.com",
    facebook: "sarahspainting",
    instagram: "sarah_paints",
  },
  {
    id: 5,
    name: "David Brown",
    profession: "Landscaper",
    specialty: "Garden Design and Maintenance",
    rating: 4.9,
    experience: "20 years",
    address: "202 Maple St, Neighborhoodville",
    phone: "070-1122-3344",
    email: "david.brown@example.com",
    facebook: "davidslandscaping",
    instagram: "green_thumb_dave",
  },
  {
    id: 6,
    name: "Emily Chen",
    profession: "House Cleaner",
    specialty: "Deep Cleaning and Organization",
    rating: 4.8,
    experience: "5 years",
    address: "303 Birch St, Neighborhoodville",
    phone: "080-5544-3322",
    email: "emily.chen@example.com",
    facebook: "emilyscleaningservice",
    instagram: "spotless_emily",
  },
];

type ProfessionType =
  | "Plumber"
  | "Electrician"
  | "Carpenter"
  | "Painter"
  | "Landscaper"
  | "House Cleaner";

export default function Component() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProfessions, setSelectedProfessions] = useState<
    ProfessionType[]
  >([]);
  const [showContactInfo, setShowContactInfo] = useState<number | null>(null);
  const [newProfessional, setNewProfessional] = useState({
    name: "",
    profession: "",
    specialty: "",
    experience: "",
    address: "",
    phone: "",
    email: "",
    facebook: "",
    instagram: "",
  });

  const filteredProfessionals = professionals.filter(
    (professional) =>
      (professional.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        professional.specialty
          .toLowerCase()
          .includes(searchTerm.toLowerCase())) &&
      (selectedProfessions.length === 0 ||
        selectedProfessions.includes(professional.profession as ProfessionType))
  );

  const handleProfessionToggle = (profession: ProfessionType) => {
    setSelectedProfessions((prev) =>
      prev.includes(profession)
        ? prev.filter((p) => p !== profession)
        : [...prev, profession]
    );
  };

  const handleContactNow = (id: number) => {
    setShowContactInfo(id);
  };

  const handleNewProfessionalChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewProfessional((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitNewProfessional = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("New professional submitted:", newProfessional);
    // Here you would typically send this data to your backend
    // Reset the form after submission
    setNewProfessional({
      name: "",
      profession: "",
      specialty: "",
      experience: "",
      address: "",
      phone: "",
      email: "",
      facebook: "",
      instagram: "",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-white transition-colors duration-200">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Find Trusted Professionals in Your Neighborhood
      </h1>
      <div className="flex flex-col md:flex-row gap-4 mb-8 bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-white transition-colors duration-200">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search by name or specialty..."
            className="pl-10 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full md:w-auto">
              Filter by Profession <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            {[
              "Plumber",
              "Electrician",
              "Carpenter",
              "Painter",
              "Landscaper",
              "House Cleaner",
            ].map((profession) => (
              <DropdownMenuCheckboxItem
                key={profession}
                checked={selectedProfessions.includes(
                  profession as ProfessionType
                )}
                onCheckedChange={() =>
                  handleProfessionToggle(profession as ProfessionType)
                }
              >
                {profession}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProfessionals.map((professional) => (
          <div
            key={professional.id}
            className="bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-white transition-colors duration-200e rounded-lg shadow-md overflow-hidden"
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">
                {professional.name}
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                {professional.profession} • {professional.experience} experience
              </p>
              <p className="text-sm font-medium text-green-600 mb-4">
                Specialty: {professional.specialty}
              </p>
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <Star className="h-4 w-4 mr-2 text-yellow-400" />
                Rating: {professional.rating} / 5
              </div>
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <MapPin className="h-4 w-4 mr-2" />
                {professional.address}
              </div>
              {showContactInfo === professional.id && (
                <>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <Phone className="h-4 w-4 mr-2" />
                    {professional.phone}
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <Mail className="h-4 w-4 mr-2" />
                    {professional.email}
                  </div>
                </>
              )}
              <div className="flex space-x-4 mb-4">
                <a
                  href={`https://facebook.com/${professional.facebook}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href={`https://instagram.com/${professional.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-600 hover:text-pink-800"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
              <Button
                className="w-full"
                onClick={() => handleContactNow(professional.id)}
              >
                <Briefcase className="mr-2 h-4 w-4" /> Contact Now
              </Button>
            </div>
          </div>
        ))}
      </div>
      {filteredProfessionals.length === 0 && (
        <p className="text-center text-gray-500 mt-8">
          No professionals found. Try adjusting your search or filters.
        </p>
      )}
    </div>
  );
}
