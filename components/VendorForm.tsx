"use client";

import { useState } from "react";
import { PlusCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type MenuItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
};

type Vendor = {
  id: number;
  name: string;
  cuisine: string;
  location: string;
  rating: number;
  likes: number;
  reviews: number;
};

export default function VendorForm() {
  const [vendor, setVendor] = useState<Vendor>({
    id: 0,
    name: "",
    cuisine: "",
    location: "",
    rating: 0,
    likes: 0,
    reviews: 0,
  });
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const { data: session } = useSession();
  const router = useRouter();

  const handleVendorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVendor({ ...vendor, [e.target.name]: e.target.value });
  };

  const handleMenuItemChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const updatedMenuItems = [...menuItems];
    updatedMenuItems[index] = {
      ...updatedMenuItems[index],
      [e.target.name]: e.target.value,
    };
    setMenuItems(updatedMenuItems);
  };

  const addMenuItem = () => {
    setMenuItems([
      ...menuItems,
      {
        id: menuItems.length + 1,
        name: "",
        description: "",
        price: 0,
        image: "",
      },
    ]);
  };

  const removeMenuItem = (index: number) => {
    setMenuItems(menuItems.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      alert("You must be logged in to submit a vendor");
      return;
    }

    try {
      const response = await fetch("/api/vendors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ vendor, menuItems }),
      });

      if (response.ok) {
        alert("Vendor submitted successfully");
        router.push("/food-vendors"); // Redirect to vendors list page
      } else {
        throw new Error("Failed to submit vendor");
      }
    } catch (error) {
      console.error("Error submitting vendor:", error);
      alert("Failed to submit vendor. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Vendor</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={vendor.name}
                onChange={handleVendorChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cuisine">Cuisine</Label>
              <Input
                id="cuisine"
                name="cuisine"
                value={vendor.cuisine}
                onChange={handleVendorChange}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              value={vendor.location}
              onChange={handleVendorChange}
              required
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="rating">Rating</Label>
              <Input
                id="rating"
                name="rating"
                type="number"
                min="0"
                max="5"
                step="0.1"
                value={vendor.rating}
                onChange={handleVendorChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="likes">Likes</Label>
              <Input
                id="likes"
                name="likes"
                type="number"
                min="0"
                value={vendor.likes}
                onChange={handleVendorChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reviews">Reviews</Label>
              <Input
                id="reviews"
                name="reviews"
                type="number"
                min="0"
                value={vendor.reviews}
                onChange={handleVendorChange}
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Menu Items</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="space-y-4 p-4 border rounded-lg relative"
            >
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2"
                onClick={() => removeMenuItem(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`item-name-${index}`}>Item Name</Label>
                  <Input
                    id={`item-name-${index}`}
                    name="name"
                    value={item.name}
                    onChange={(e) => handleMenuItemChange(index, e)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`item-price-${index}`}>Price</Label>
                  <Input
                    id={`item-price-${index}`}
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.price}
                    onChange={(e) => handleMenuItemChange(index, e)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor={`item-description-${index}`}>Description</Label>
                <Textarea
                  id={`item-description-${index}`}
                  name="description"
                  value={item.description}
                  onChange={(e) => handleMenuItemChange(index, e)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`item-image-${index}`}>Image URL</Label>
                <Input
                  id={`item-image-${index}`}
                  name="image"
                  value={item.image}
                  onChange={(e) => handleMenuItemChange(index, e)}
                  required
                />
              </div>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={addMenuItem}
            className="w-full"
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Add Menu Item
          </Button>
        </CardContent>
      </Card>

      <Button type="submit" className="w-full">
        Submit Vendor
      </Button>
    </form>
  );
}
