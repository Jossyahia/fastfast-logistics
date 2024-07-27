import TrackingForm from '@/components/TrackingForm';

export default function BookingPage() {
  return (
    <div className="container mx-auto p-6 min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <h1 className="text-3xl font-bold mb-6">Track Your Shipment</h1>
      <TrackingForm />
    </div>
  );
}