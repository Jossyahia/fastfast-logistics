// FoodVendorDirectory.tsx
import { Suspense } from "react";
import type { Vendor } from "../types/vendor";
import ClientSideVendorList from "./../../components/ClientSideVendorList";

import { headers } from "next/headers";

async function getVendors(): Promise<Vendor[]> {
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const host = headers().get("host") || "localhost:3000";
  const apiUrl = `${protocol}://${host}`;

  const res = await fetch(`${apiUrl}/api/vendors`, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
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
