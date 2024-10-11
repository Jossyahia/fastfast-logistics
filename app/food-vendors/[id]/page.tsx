import { getVendor, getMenuItems } from "@/lib/data";
import { notFound } from "next/navigation";
import VendorDisplay from "@/components/VendorDisplay";

interface PageProps {
  params?: {
    id?: string;
  };
}

export default async function VendorPage({ params }: PageProps) {
  try {
    if (!params?.id || isNaN(Number(params.id))) {
      console.error("Invalid vendor ID:", params?.id);
      notFound();
    }

    const vendorId = Number(params.id);

    const [vendor, items] = await Promise.all([
      getVendor(vendorId),
      getMenuItems(vendorId),
    ]);

    if (!vendor) {
      console.error("Vendor not found:", vendorId);
      notFound();
    }

    // Ensure items is always an array
    const safeItems = Array.isArray(items) ? items : [];

    return <VendorDisplay vendor={vendor} items={safeItems} />;
  } catch (error) {
    console.error("Error in VendorPage:", error);
    throw error;
  }
}
