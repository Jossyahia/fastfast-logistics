import AboutUsContent from "@/components/AboutUs";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white flex items-center justify-center">
      <div className="container mx-auto px-4 py-12 lg:py-16 text-center">
        <h1 className="text-3xl lg:text-4xl font-bold mb-8">
          About FastFast Logistics
        </h1>
        <AboutUsContent />
      </div>
    </div>
  );
}
