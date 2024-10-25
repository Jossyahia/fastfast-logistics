"use client";
import { useState } from "react";

// Define the shape of the shipment data
interface Shipment {
  trackingNumber: string;
  status: string;
  currentLocation?: string;
  estimatedDelivery?: string;
}

const TrackingPage = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setShipment(null);

    try {
      const response = await fetch(`/api/shipments/${trackingNumber}`);
      if (response.ok) {
        const data: Shipment = await response.json();
        setShipment(data);
      } else {
        throw new Error("Shipment not found");
      }
    } catch (error) {
      console.error("Error fetching shipment:", error);
      setError(
        "Shipment with this tracking number not found. Please check the tracking number and try again."
      );
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 ">
      <h1 className="text-2xl font-bold mb-4">Track Your Shipment</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex">
          <input
            type="text"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            placeholder="Enter tracking number"
            className="flex-grow px-3 py-2 border rounded-l"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-r hover:bg-blue-600"
          >
            Track
          </button>
        </div>
      </form>

      {error && <p className="text-red-500">{error}</p>}

      {shipment && (
        <div className="border p-4 rounded">
          <h2 className="text-xl font-semibold mb-2">Shipment Details</h2>
          <p>
            <strong>Tracking Number:</strong> {shipment.trackingNumber}
          </p>
          <p>
            <strong>Status:</strong> {shipment.status}
          </p>
          <p>
            <strong>Current Location:</strong>{" "}
            {shipment.currentLocation || "N/A"}
          </p>
          <p>
            <strong>Estimated Delivery:</strong>{" "}
            {shipment.estimatedDelivery
              ? new Date(shipment.estimatedDelivery).toLocaleString()
              : "N/A"}
          </p>
        </div>
      )}
    </div>
  );
};

export default TrackingPage;
