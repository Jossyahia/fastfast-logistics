import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        FastFast Logistics Services - Privacy Policy
      </h1>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">1. Introduction</h2>
        <p>
          FastFast Logistics Services ("we", "our", or "us") is committed to
          protecting your privacy. This Privacy Policy explains how we collect,
          use, disclose, and safeguard your information when you use our
          logistics services.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">
          2. Information We Collect
        </h2>
        <p>
          We collect information that you provide directly to us, including:
        </p>
        <ul className="list-disc pl-6">
          <li>
            Personal information (e.g., name, address, email address, phone
            number)
          </li>
          <li>Shipping details (e.g., recipient's name and address)</li>
          <li>Payment information</li>
          <li>Communication data (e.g., customer service inquiries)</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">
          3. How We Use Your Information
        </h2>
        <p>We use your information to:</p>
        <ul className="list-disc pl-6">
          <li>Provide, maintain, and improve our services</li>
          <li>Process and complete transactions</li>
          <li>Send you technical notices, updates, and support messages</li>
          <li>Respond to your comments and questions</li>
          <li>Comply with legal obligations</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">
          4. Information Sharing and Disclosure
        </h2>
        <p>We may share your information with:</p>
        <ul className="list-disc pl-6">
          <li>Service providers who perform services on our behalf</li>
          <li>Partners for marketing purposes (with your consent)</li>
          <li>
            Law enforcement or other parties when required by law or to protect
            our rights
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">5. Data Security</h2>
        <p>
          We implement appropriate technical and organizational measures to
          protect your personal information. However, no method of transmission
          over the Internet or electronic storage is 100% secure.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">
          6. Your Rights and Choices
        </h2>
        <p>You have the right to:</p>
        <ul className="list-disc pl-6">
          <li>Access, correct, or delete your personal information</li>
          <li>Object to or restrict certain processing of your data</li>
          <li>Receive a copy of your data in a portable format</li>
          <li>Withdraw consent where applicable</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">
          7. Changes to This Privacy Policy
        </h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify
          you of any changes by posting the new Privacy Policy on this page and
          updating the "Last Updated" date.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">8. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us
          at:
        </p>
        <p>Email: [privacy@fastfastlogistics.com]</p>
        <p>Address: [Your Company's Physical Address]</p>
      </section>

      <p className="mt-8 text-sm text-gray-600">Last Updated: [Current Date]</p>
    </div>
  );
};

export default PrivacyPolicy;
