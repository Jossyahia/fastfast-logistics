import BookingForm from '@/components/BookingForm';

export default function BookingPage() {
  return (
    <div className="container mx-auto p-4 sm:p-6 min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
        Book a Shipment
      </h1>
      <BookingForm />
    </div>
  );
}
