// src/app/contact/page.tsx
import  ContactForm  from "@/components/ContactForm";
import  ContactInfo  from "@/components/ContactInfo";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8 min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <ContactForm />
        <ContactInfo />
      </div>
    </div>
  );
}
