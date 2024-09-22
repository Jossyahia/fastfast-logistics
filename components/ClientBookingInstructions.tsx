"use client";

import Image from "next/image";
import * as LucideIcons from "lucide-react";
import { LucideIcon } from "lucide-react";

type Step = {
  text: string;
  icon: keyof typeof LucideIcons;
};

const steps: Step[] = [
  { text: "Click on the booking page", icon: "CheckSquare" },
  { text: "Fill in the pickup address", icon: "MapPin" },
  { text: "Enter the delivery address", icon: "MapPin" },
  { text: "Choose pickup date and time", icon: "Calendar" },
  { text: "Select delivery date and time", icon: "Calendar" },
  { text: "Pick your package size", icon: "Package" },
  { text: "Describe your package contents", icon: "Package" },
  { text: "Enter pickup phone number", icon: "Phone" },
  { text: "Provide delivery phone number", icon: "Phone" },
  { text: "Choose payment method", icon: "CreditCard" },
  { text: "Opt for urgent delivery if needed", icon: "CheckSquare" },
  { text: "Review the estimated price", icon: "CreditCard" },
  { text: "Double-check all information", icon: "CheckSquare" },
  { text: "Click 'Create Booking'", icon: "Send" },
  { text: "Wait for success message or fix errors", icon: "CheckSquare" },
];

export default function ClientBookingInstructions() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        How to Book
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <Image
            src="/booking-illustration.svg"
            alt="Booking Process Illustration"
            width={400}
            height={400}
            className="mb-6"
          />
        </div>

        <ol className="space-y-4">
          {steps.map((step, index) => {
            const IconComponent = LucideIcons[step.icon] as LucideIcon;
            return (
              <li key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <IconComponent className="w-6 h-6" />
                </div>
                <span className="text-gray-700">{step.text}</span>
              </li>
            );
          })}
        </ol>
      </div>
      <div className="mt-8 p-4 bg-white-100 rounded-lg">
        <p className="text-red-800">
          <strong>NOTICE!!!:</strong> Your Booking is only valid after Payment.
          Send proof of payment to our Whatapp Number!
        </p>
      </div>
      <div className="mt-8 p-4 bg-yellow-100 rounded-lg">
        <p className="text-yellow-800">
          <strong>Tip:</strong> You can save your progress and come back later.
          Your information will be there when you return!
        </p>
      </div>
      <div className="mt-4 text-sm text-gray-500">
        <a href="/" className="hover:underline">
          Work illustrations by Storyset
        </a>
      </div>
    </div>
  );
}
