"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Vendor, MenuItem } from "./../app/types/vendor";

function VendorInfo({ vendor }: { vendor: Vendor }) {
  return (
    <div className="mb-6">
      <p>
        <strong>Cuisine:</strong> {vendor.cuisine || "Various"}
      </p>
      <p>
        <strong>Location:</strong> {vendor.location || "Unknown Location"}
      </p>
      <p>
        <strong>Rating:</strong> {vendor.rating || 0}/5
      </p>
      <p>
        <strong>Likes:</strong> {vendor.likes || 0}
      </p>
      <p>
        <strong>Reviews:</strong> {vendor.reviews || 0}
      </p>
    </div>
  );
}

function MenuItemCard({ item }: { item: MenuItem }) {
  console.log("Rendering MenuItemCard with item:", item);

  const formatPrice = (price: number | string | undefined): string => {
    if (typeof price === "undefined") return "0.00";
    if (typeof price === "number") return price.toFixed(2);
    const numPrice = parseFloat(price);
    return isNaN(numPrice) ? "0.00" : numPrice.toFixed(2);
  };

  const imageSrc =
    item.image && item.image.trim() !== ""
      ? item.image
      : "/placeholder-image.jpg";

  console.log("Image src:", imageSrc);

  return (
    <Card className="overflow-hidden bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border-2 border-transparent hover:border-indigo-500">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={imageSrc}
            alt={item.name || "Menu Item"}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-xl mb-2">
          {item.name || "Unknown Item"}
        </CardTitle>
        <p className="text-gray-600 mb-2">
          {item.description || "No description available"}
        </p>
        <p className="text-lg font-bold">${formatPrice(item.price)}</p>
      </CardContent>
    </Card>
  );
}

interface VendorDisplayProps {
  vendor: Vendor;
  items: MenuItem[];
}


interface VendorDisplayProps {
  vendor: Vendor;
  items: MenuItem[];
}

export default function VendorDisplay({ vendor, items }: VendorDisplayProps) {
  console.log("Vendor:", vendor);
  console.log("Items:", items);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">
        {vendor?.name || "Unknown Vendor"}
      </h1>
      <VendorInfo vendor={vendor} />
      <h2 className="text-2xl font-bold mb-4">Menu Items</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.isArray(items) && items.length > 0 ? (
          items.map((item) => (
            <MenuItemCard
              key={item.id || `item-${Math.random()}`}
              item={item}
            />
          ))
        ) : (
          <p>No menu items available</p>
        )}
      </div>
    </div>
  );
}