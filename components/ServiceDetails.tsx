import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const serviceDetails = [
  {
    title: "Express Delivery",
    content:
      "Our Express Delivery service ensures your packages reach their destination in record time. Choose from same-day delivery for local shipments or next-day delivery for longer distances. Perfect for urgent documents, time-sensitive materials, or last-minute gifts.",
  },
  {
    title: "Afordable Delivery",
    content:
      "Our Express Delivery service ensures your packages reach their destination in record time. Choose from same-day delivery for local shipments or next-day delivery for longer distances. Perfect for urgent documents, time-sensitive materials, or last-minute gifts.",
  },
  {
    title: "International Shipping",
    content:
      "With our International Shipping service, we handle all aspects of global logistics. From customs documentation to tracking, we ensure your shipments cross borders smoothly. We offer air freight for speed and sea freight for cost-effective bulk shipping.",
  },
  {
    title: "Time-Critical Logistics",
    content:
      "When every minute counts, our Time-Critical Logistics service delivers. We offer tailored solutions for industries like healthcare, manufacturing, and event management. Our dedicated team works around the clock to meet your most demanding deadlines.",
  },
  {
    title: "Secure Transport",
    content:
      "For high-value or sensitive items, our Secure Transport service provides peace of mind. We use advanced tracking technology, secure vehicles, and trained personnel to ensure your valuable shipments are protected throughout their journey.",
  },
  {
    title: "Warehousing and Distribution",
    content:
      "Our Warehousing and Distribution service offers flexible storage solutions and efficient distribution networks. We help optimize your supply chain with strategic inventory management, pick and pack services, and timely order fulfillment.",
  },
];

export default function ServiceDetails() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {serviceDetails.map((service, index) => (
        <Accordion type="single" collapsible className="w-full" key={index}>
          <AccordionItem value={`item-${index}`}>
            <AccordionTrigger className="font-semibold text-lg">
              {service.title}
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-gray-600">{service.content}</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
}
