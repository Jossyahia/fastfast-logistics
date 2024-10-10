import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FoodVendorLayoutProps {
  children: React.ReactNode;
}

export default function FoodVendorLayout({ children }: FoodVendorLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b">
        <nav className="container mx-auto p-4">
          <Link href="/food-vendors" passHref>
            <Button
              variant="ghost"
              className="p-0 hover:bg-transparent focus:ring-2 focus:ring-primary"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              <span>Back to Vendors</span>
            </Button>
          </Link>
        </nav>
      </header>

      <main className="container mx-auto py-6">{children}</main>
    </div>
  );
}
