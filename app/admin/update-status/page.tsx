import protectAdminRoute  from "@/lib/authHelpers";
import AdminUpdateStatusComponent from "@/components/AdminUpdateStatus";

export default async function BookingPage() {
  await protectAdminRoute();

  return (
    <div className="container mx-auto p-6 min-h-screen bg-neutral-100 dark:bg-neutral-900 transition-colors duration-200">
      <h1 className="text-3xl font-bold mb-6">Shipment Update</h1>
      <AdminUpdateStatusComponent />
    </div>
  );
}
