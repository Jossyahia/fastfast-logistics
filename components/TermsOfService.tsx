import React from "react";

const TermsOfService = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-white transition-colors duration-200">
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">1. Acceptance of Terms</h2>
        <p>
          By using FastFast Logistics Services ("the Service"), you agree to be
          bound by these Terms of Service ("Terms"). If you disagree with any
          part of the terms, you may not use our services.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">
          2. Description of Service
        </h2>
        <p>
          FastFast Logistics Services provides fast, efficient logistics and
          delivery solutions for businesses and individuals.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">
          3. User Responsibilities
        </h2>
        <ul className="list-disc pl-6">
          <li>
            You must provide accurate and complete information when using our
            services.
          </li>
          <li>
            You are responsible for maintaining the confidentiality of your
            account and password.
          </li>
          <li>
            You agree to notify us immediately of any unauthorized use of your
            account.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">4. Service Limitations</h2>
        <ul className="list-disc pl-6">
          <li>
            We do not guarantee delivery times, although we strive to meet
            estimated delivery schedules.
          </li>
          <li>
            We reserve the right to refuse service to anyone for any reason at
            any time.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">5. Prohibited Items</h2>
        <p>
          You agree not to ship any illegal, hazardous, or prohibited items. A
          full list of prohibited items is available on our website.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">6. Liability</h2>
        <ul className="list-disc pl-6">
          <li>
            Our liability is limited to the declared value of the shipment or
            $100, whichever is less.
          </li>
          <li>
            We are not liable for any indirect, incidental, special,
            consequential, or punitive damages.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">7. Indemnification</h2>
        <p>
          You agree to indemnify and hold FastFast Logistics Services harmless
          from any claim or demand made by any third party due to or arising out
          of your use of the Service.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">8. Changes to Terms</h2>
        <p>
          We reserve the right to modify these Terms at any time. We will notify
          users of any significant changes via email or through our website.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">9. Termination</h2>
        <p>
          We may terminate or suspend your account and bar access to the Service
          immediately, without prior notice or liability, under our sole
          discretion, for any reason whatsoever.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">10. Governing Law</h2>
        <p>
          These Terms shall be governed by and construed in accordance with the
          laws of Nigeria, without regard to its conflict of law provisions.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">11. Contact Information</h2>
        <p>
          If you have any questions about these Terms, please contact us at
          [contact@fastfast.ng].
        </p>
      </section>

      <p className="mt-8 text-sm text-gray-600">Last updated: [Current Date]</p>
    </div>
  );
};

export default TermsOfService;
