"use client"
import React, { useState, useEffect } from "react";

import { X } from "lucide-react";
import ClientBookingInstructions from "./ClientBookingInstructions";

const BookingInstructionsModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenInstructions = localStorage.getItem(
      "hasSeenBookingInstructions"
    );
    if (!hasSeenInstructions) {
      setIsOpen(true);
      localStorage.setItem("hasSeenBookingInstructions", "true");
    }
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
        <ClientBookingInstructions />
      </div>
    </div>
  );
};

export default BookingInstructionsModal;
