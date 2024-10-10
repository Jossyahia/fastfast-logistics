"use client"
import { useParams } from "next/navigation";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { vendors } from "../../data/vendors";
import { menuItems } from "../../data/vendors";
import type { Vendor, MenuItem } from "../../types/vendor";

function VendorInfo({ vendor }: { vendor: Vendor }) {
  return (
    <div className="mb-6">
      <p>
        <strong>Cuisine:</strong> {vendor.cuisine}
      </p>
      <p>
        <strong>Location:</strong> {vendor.location}
      </p>
      <p>
        <strong>Rating:</strong> {vendor.rating}/5
      </p>
      <p>
        <strong>Likes:</strong> {vendor.likes}
      </p>
      <p>
        <strong>Reviews:</strong> {vendor.reviews}
      </p>
    </div>
  );
}

function MenuItemCard({ item }: { item: MenuItem }) {
  return (
    <Card className="overflow-hidden bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border-2 border-transparent hover:border-indigo-500">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-xl mb-2">{item.name}</CardTitle>
        <p className="text-gray-600 mb-2">{item.description}</p>
        <p className="text-lg font-bold">${item.price.toFixed(2)}</p>
      </CardContent>
    </Card>
  );
}

export default function VendorPage() {
  const params = useParams();
  const vendorId = Number(params.id);
  const vendor = vendors.find((v) => v.id === vendorId);
  const items: MenuItem[] = menuItems[vendorId] || [];

  if (!vendor) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-red-500">Vendor not found</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{vendor.name}</h1>

      <VendorInfo vendor={vendor} />

      <h2 className="text-2xl font-bold mb-4">Menu Items</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item: MenuItem) => (
          <MenuItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
