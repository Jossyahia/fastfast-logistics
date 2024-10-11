// FoodVendorDirectory.tsx
import { Suspense } from "react";
import type { Vendor } from "../types/vendor";
import ClientSideVendorList from "./../../components/ClientSideVendorList";

// This function fetches vendors from the API
async function getVendors(): Promise<Vendor[]> {
  const res = await fetch("http://localhost:3000/api/vendors", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch vendors");
  }
  return res.json();
}

export default async function FoodVendorDirectory() {
  const vendors = await getVendors();

  return (
    <div className="container mx-auto p-4 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-lg shadow-lg hover">
      <h1 className="text-2xl font-bold mb-4 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-lg">
        Food Vendor Directory
      </h1>
      <Suspense fallback={<div>Loading...</div>}>
        <ClientSideVendorList initialVendors={vendors} />
      </Suspense>
    </div>
  );
}
