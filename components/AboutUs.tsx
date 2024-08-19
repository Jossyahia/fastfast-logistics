import Image from "next/image";

export default function AboutUsContent() {
  return (
    <div className="bg-neutral-100 dark:bg-neutral-900 transition-colors duration-200">
      <div className="container mx-auto px-4 py-16 grid gap-8 md:grid-cols-2 items-start">
        <div className="bg-white dark:bg-neutral-800 p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-6 text-primary-900 dark:text-primary-300">
            Our Story
          </h2>
          <p className="text-lg mb-6 text-primary-800 dark:text-primary-300">
            Founded in 2020, FastFast Logistics has quickly become a leading
            name in the logistics industry. Our mission is to provide swift,
            reliable, and efficient delivery services to businesses and
            individuals alike.
          </p>
          <p className="text-lg mb-6 text-primary-800 dark:text-primary-300">
            With a team of dedicated professionals and a state-of-the-art
            tracking system, we ensure that your packages are always in safe
            hands and delivered on time.
          </p>
          <button className="btn-primary mt-4">Learn More</button>
        </div>
        <div className="bg-white dark:bg-neutral-800 p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-6 text-primary-900 dark:text-primary-300">
            Our Values
          </h2>
          <ul className="space-y-4 text-lg text-primary-800 dark:text-primary-300">
            <li className="flex items-center">
              <span className="text-secondary-500 mr-2">★</span> Speed and
              Efficiency
            </li>
            <li className="flex items-center">
              <span className="text-secondary-500 mr-2">★</span> Customer
              Satisfaction
            </li>
            <li className="flex items-center">
              <span className="text-secondary-500 mr-2">★</span> Reliability and
              Transparency
            </li>
            <li className="flex items-center">
              <span className="text-secondary-500 mr-2">★</span> Innovation in
              Logistics
            </li>
          </ul>
          <button className="btn-primary mt-8">Join Our Team</button>
        </div>
      </div>
    </div>
  );
}
