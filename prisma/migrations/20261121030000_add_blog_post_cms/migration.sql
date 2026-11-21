-- Additive CMS table. Existing booking, user and shipment tables are untouched.
CREATE TYPE "BlogPostStatus" AS ENUM ('DRAFT', 'PUBLISHED');

CREATE TABLE "BlogPost" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "seoTitle" TEXT NOT NULL,
    "seoDescription" TEXT NOT NULL,
    "googleBusinessUpdate" TEXT NOT NULL,
    "status" "BlogPostStatus" NOT NULL DEFAULT 'DRAFT',
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "BlogPost_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "BlogPost_slug_key" ON "BlogPost"("slug");
CREATE INDEX "BlogPost_status_publishedAt_idx" ON "BlogPost"("status", "publishedAt");
CREATE INDEX "BlogPost_updatedAt_idx" ON "BlogPost"("updatedAt");

-- Bring the three existing static articles into the CMS so they can be edited
-- and managed from the new phone-friendly dashboard.
INSERT INTO "BlogPost" (
  "id", "slug", "title", "excerpt", "category", "content",
  "seoTitle", "seoDescription", "googleBusinessUpdate",
  "status", "publishedAt", "updatedAt"
) VALUES
(
  'fastfast_blog_pod_20261121',
  'pay-on-delivery-in-sapele-warri-and-asaba',
  'Pay on Delivery in Sapele, Warri and Asaba: What Customers and Vendors Should Know',
  'A practical guide to using Pay on Delivery for local orders in Sapele, Warri and Asaba, Delta State.',
  'Delivery Guides',
  E'## What is Pay on Delivery?\n\nPay on Delivery (POD) allows a customer to pay for an order when it is delivered, rather than paying the seller in advance. It can give customers more confidence when ordering from online and social-commerce vendors.\n\nFor vendors, a clear delivery process matters. Confirm the order, the recipient''s phone number, the delivery address and the amount to be collected before dispatch.\n\n## Where FastFast offers Pay on Delivery\n\nFastFast Logistics offers Pay on Delivery for local deliveries in Sapele, Warri and Asaba, Delta State. Deliveries are handled within each individual city; intercity delivery between these locations is not currently offered.\n\n- Sapele\n- Warri\n- Asaba\n\n## Tips for a smoother delivery\n\nShare accurate pickup and delivery details with your logistics provider. Let the recipient know when to expect the rider, and make sure the amount payable is agreed before the order leaves the seller.\n\n- Confirm the customer''s full delivery address and active phone number.\n- Agree the order amount and any delivery fee in advance.\n- Keep the customer reachable during the delivery process.\n- Contact FastFast if any delivery detail changes.\n\n## Arrange a local delivery\n\nTo ask about a delivery or Pay on Delivery for your order, contact FastFast Logistics through WhatsApp or visit the website. Same-day delivery may be available depending on the location, time and operating capacity.',
  'Pay on Delivery in Sapele, Warri and Asaba | FastFast Logistics',
  'Learn how Pay on Delivery works with FastFast Logistics for local deliveries in Sapele, Warri and Asaba, Delta State.',
  'Do you sell online in Sapele, Warri or Asaba? FastFast Logistics offers Pay on Delivery for local deliveries in all three cities. Learn how it works and how to arrange a delivery.',
  'PUBLISHED', '2026-11-21T12:00:00.000Z', CURRENT_TIMESTAMP
),
(
  'fastfast_blog_failed_deliveries_20261121',
  'reduce-failed-deliveries-for-online-orders',
  'How Online Vendors Can Reduce Failed Deliveries',
  'Simple order-confirmation and customer-communication habits that help Nigerian online sellers avoid preventable delivery problems.',
  'For Online Vendors',
  E'## Confirm the order before dispatch\n\nA quick confirmation can prevent wasted trips. Before arranging pickup, make sure the customer still wants the item, understands the total amount and is available to receive the order.\n\n## Collect complete delivery details\n\nIncomplete directions are a common source of delay. Ask for the city, area, street, house or shop description, a nearby landmark and a working phone number. Do not rely on a social-media profile location alone.\n\n## Set clear payment expectations\n\nIf the order is Pay on Delivery, tell the customer exactly how much is due and what payment methods are accepted. Make sure the vendor and delivery partner agree on the collection and remittance process before dispatch.\n\n## Keep communication open\n\nCustomers should know when an order has been handed to a rider and how to contact the seller if plans change. If a customer becomes unavailable, communicate early rather than allowing the delivery to fail without an update.\n\n## Work with a delivery partner that understands your city\n\nLocal knowledge and clear coordination help online businesses serve customers more consistently. FastFast Logistics supports local deliveries in Sapele, Warri and Asaba, with Pay on Delivery available in all three cities.',
  'How Online Vendors Can Reduce Failed Deliveries | FastFast',
  'Practical ways for Nigerian online vendors to reduce failed deliveries through order confirmation, accurate addresses and clear customer communication.',
  'Online vendors: reduce avoidable failed deliveries by confirming customer details, delivery addresses and payment expectations before dispatch. Read these practical tips from FastFast Logistics.',
  'PUBLISHED', '2026-11-21T12:00:00.000Z', CURRENT_TIMESTAMP
),
(
  'fastfast_blog_local_partner_20261121',
  'choosing-a-local-delivery-partner-in-delta-state',
  'How to Choose a Local Delivery Partner in Delta State',
  'What individuals and online businesses should check before choosing a local courier or delivery service.',
  'Logistics Tips',
  E'## Check the actual service area\n\nDo not assume that a company serves every town in a state or offers intercity delivery. Confirm the exact pickup and delivery locations before booking. FastFast Logistics currently handles local deliveries within Sapele, Warri and Asaba.\n\n## Understand the payment options\n\nIf you need Pay on Delivery, confirm that the provider supports it in the destination city and agree how the amount will be collected and reconciled.\n\n## Ask how delivery updates are shared\n\nA useful delivery partner should explain how you can make a booking, receive updates and get help if the recipient cannot be reached. Make sure you know the correct contact channel before dispatch.\n\n## Compare service details, not just price\n\nCheck what is included in the quoted fee, whether pickup is available, how special handling is arranged and whether same-day service is available for your particular request. Ask for confirmation instead of assuming every service is available for every order.\n\n## Talk to FastFast Logistics\n\nFastFast Logistics serves individuals and online vendors in Sapele, Warri and Asaba. Visit fastfast.ng or send a WhatsApp message to discuss a local delivery.',
  'Choosing a Local Delivery Partner in Delta State | FastFast',
  'Use these practical checks to choose a local delivery partner for packages and online orders in Delta State.',
  'Choosing a delivery partner for your business? Check service coverage, communication, payment handling and delivery updates before you dispatch. Here is a helpful guide from FastFast Logistics.',
  'PUBLISHED', '2026-11-21T12:00:00.000Z', CURRENT_TIMESTAMP
);
