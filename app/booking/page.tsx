"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";

const BookingPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    pickupAddress: "",
    deliveryAddress: "",
    pickupDate: "",
    deliveryDate: "",
    pickupTime: "",
    deliveryTime: "",
    packageSize: "SMALL",
    packageDescription: "",
    isUrgent: false,
    paymentMethod: "CREDIT_CARD",
    pickupPhoneNumber: "",
    deliveryPhoneNumber: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        router.push(`/booking/confirmation/${data.booking.id}`);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create booking");
      }
    } catch (error) {
      console.error("Error creating booking:", error);
      setError(
        error.message || "An error occurred while creating the booking."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Create a Booking</h1>

      {/* Pickup Address */}
      <div className="mb-4">
        <label htmlFor="pickupAddress" className="block mb-1">
          Pickup Address
        </label>
        <input
          type="text"
          id="pickupAddress"
          name="pickupAddress"
          value={formData.pickupAddress}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      {/* Delivery Address */}
      <div className="mb-4">
        <label htmlFor="deliveryAddress" className="block mb-1">
          Delivery Address
        </label>
        <input
          type="text"
          id="deliveryAddress"
          name="deliveryAddress"
          value={formData.deliveryAddress}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      {/* Pickup Date */}
      <div className="mb-4">
        <label htmlFor="pickupDate" className="block mb-1">
          Pickup Date
        </label>
        <input
          type="date"
          id="pickupDate"
          name="pickupDate"
          value={formData.pickupDate}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      {/* Delivery Date */}
      <div className="mb-4">
        <label htmlFor="deliveryDate" className="block mb-1">
          Delivery Date
        </label>
        <input
          type="date"
          id="deliveryDate"
          name="deliveryDate"
          value={formData.deliveryDate}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      {/* Pickup Time */}
      <div className="mb-4">
        <label htmlFor="pickupTime" className="block mb-1">
          Pickup Time
        </label>
        <input
          type="time"
          id="pickupTime"
          name="pickupTime"
          value={formData.pickupTime}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      {/* Delivery Time */}
      <div className="mb-4">
        <label htmlFor="deliveryTime" className="block mb-1">
          Delivery Time
        </label>
        <input
          type="time"
          id="deliveryTime"
          name="deliveryTime"
          value={formData.deliveryTime}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      {/* Package Size */}
      <div className="mb-4">
        <label htmlFor="packageSize" className="block mb-1">
          Package Size
        </label>
        <select
          id="packageSize"
          name="packageSize"
          value={formData.packageSize}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        >
          <option value="SMALL">Small</option>
          <option value="MEDIUM">Medium</option>
          <option value="LARGE">Large</option>
          <option value="EXTRA_LARGE">Extra Large</option>
        </select>
      </div>

      {/* Package Description */}
      <div className="mb-4">
        <label htmlFor="packageDescription" className="block mb-1">
          Package Description
        </label>
        <textarea
          id="packageDescription"
          name="packageDescription"
          value={formData.packageDescription}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          rows={3}
        />
      </div>

      {/* Is Urgent */}
      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            name="isUrgent"
            checked={formData.isUrgent}
            onChange={handleChange}
            className="mr-2"
          />
          Urgent Delivery
        </label>
      </div>

      {/* Payment Method */}
      <div className="mb-4">
        <label htmlFor="paymentMethod" className="block mb-1">
          Payment Method
        </label>
        <select
          id="paymentMethod"
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        >
          <option value="CREDIT_CARD">Credit Card</option>
          <option value="DEBIT_CARD">Debit Card</option>
          <option value="CASH">Cash</option>
          <option value="BANK_TRANSFER">Bank Transfer</option>
        </select>
      </div>

      {/* Pickup Phone Number */}
      <div className="mb-4">
        <label htmlFor="pickupPhoneNumber" className="block mb-1">
          Pickup Phone Number
        </label>
        <input
          type="tel"
          id="pickupPhoneNumber"
          name="pickupPhoneNumber"
          value={formData.pickupPhoneNumber}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      {/* Delivery Phone Number */}
      <div className="mb-4">
        <label htmlFor="deliveryPhoneNumber" className="block mb-1">
          Delivery Phone Number
        </label>
        <input
          type="tel"
          id="deliveryPhoneNumber"
          name="deliveryPhoneNumber"
          value={formData.deliveryPhoneNumber}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-blue-300"
        disabled={loading}
      >
        {loading ? "Creating Booking..." : "Create Booking"}
      </button>
    </form>
  );
};

export default BookingPage;
