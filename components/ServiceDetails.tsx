import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Truck, Package, Wallet, Clock, MapPin, Warehouse } from "lucide-react";

const serviceDetails = [
  { title: "Local Package Delivery", icon: Truck, highlight: "Five local service areas", content: "FastFast handles local package deliveries within Sapele, Warri, Asaba, Oghara and Koko in Delta State. Confirm that both pickup and delivery addresses are within the same service area before booking. Intercity delivery between these locations is not currently advertised." },
  { title: "Rider Pickup", icon: Package, highlight: "Collection from your pickup point", content: "Request a rider to collect a package from your home, shop or business. Share a clear pickup address, recipient details and package information so availability and arrangements can be confirmed before dispatch." },
  { title: "Pay on Delivery", icon: Wallet, highlight: "Available across all five main service areas", content: "Pay on Delivery is available for local deliveries within Sapele, Warri, Asaba, Oghara and Koko." },
  { title: "Same-Day Delivery Options", icon: Clock, highlight: "Subject to availability", content: "Same-day delivery may be available depending on the pickup location, destination, time of booking and operating capacity. Ask FastFast to confirm availability before promising a delivery time to a customer." },
  { title: "Local Service Coverage", icon: MapPin, highlight: "Sapele · Warri · Asaba · Oghara · Koko", content: "FastFast's local service areas are Sapele, Warri, Asaba, Oghara and Koko, Delta State. Delivery is local within each listed area; do not assume a parcel can be sent from one of these towns to another as an intercity delivery." },
  { title: "Order Fulfilment Support", icon: Warehouse, highlight: "For online and social-commerce vendors", content: "FastFast supports individuals and online vendors with delivery coordination and package handover. Discuss your order volume, pickup needs and fulfilment requirements with the team to confirm the arrangements available for your business." },
];

export default function ServiceDetails() {
  return (
    <div className="container mx-auto px-4 py-8 sm:py-12">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {serviceDetails.map((service) => (
          <Card key={service.title} className="overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-shadow hover:shadow-lg dark:border-neutral-700 dark:bg-neutral-800">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value={service.title} className="border-none">
                <AccordionTrigger className="px-5 py-5 text-left hover:bg-neutral-50 hover:no-underline dark:hover:bg-neutral-700">
                  <div className="flex items-center gap-3">
                    <span className="rounded-xl bg-indigo-50 p-3 dark:bg-indigo-950/50"><service.icon className="h-5 w-5 text-indigo-600 dark:text-indigo-300" /></span>
                    <span className="min-w-0 text-left">
                      <span className="block font-semibold text-neutral-900 dark:text-neutral-100">{service.title}</span>
                      <span className="mt-1 block text-xs font-medium text-indigo-600 dark:text-indigo-300">{service.highlight}</span>
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-5 pb-5">
                  <p className="leading-7 text-neutral-600 dark:text-neutral-300">{service.content}</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Card>
        ))}
      </div>
    </div>
  );
}
