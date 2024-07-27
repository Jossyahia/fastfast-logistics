import Image from "next/image";

export default function AboutUsContent() {
  return (
    <div className="container mx-auto px-4 py-16 grid gap-8 md:grid-cols-2 items-start">
      <div>
        <h2 className="text-3xl font-bold mb-6">Our Story</h2>
        <p className="text-lg mb-6">
          Founded in 2020, FastFast Logistics has quickly become a leading name
          in the logistics industry. Our mission is to provide swift, reliable,
          and efficient delivery services to businesses and individuals alike.
        </p>
        <p className="text-lg mb-6">
          With a team of dedicated professionals and a state-of-the-art tracking
          system, we ensure that your packages are always in safe hands and
          delivered on time.
        </p>
      </div>
      <div>
        <h2 className="text-3xl font-bold mb-6">Our Values</h2>
        <ul className="list-disc list-inside space-y-4 text-lg">
          <li>Speed and Efficiency</li>
          <li>Customer Satisfaction</li>
          <li>Reliability and Transparency</li>
          <li>Innovation in Logistics</li>
        </ul>
      </div>
    </div>
  );
}
