// app/bookings/create/page.tsx

import { CreateBookingForm } from "@/components/create-booking";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function AdminCreateBookingPage() {
  const session = await auth();

  if (!session || session.user.role !== "ADMIN") {
    redirect("/restricted");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Create New Booking</h1>
      <CreateBookingForm />
    </div>
  );
}