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
,
(
  'fastfast_blog_sapele_vendor_20261121',
  'sapele-online-vendors-local-delivery-checklist',
  'Sapele Online Vendors: A Practical Checklist Before Sending Out Customer Orders',
  'A Sapele-focused dispatch checklist for Instagram sellers, WhatsApp vendors and small shops using local delivery and Pay on Delivery.',
  'For Online Vendors',
  E'## Start with a confirmed order\n\nBefore arranging a pickup in Sapele, confirm that the customer still wants the item, the product or size is correct, and the recipient will be available. This small check helps avoid preventable return trips.\n\n## Prepare the delivery details\n\nGive your delivery partner the pickup point, the customer''s complete Sapele delivery address, a nearby landmark and a working phone number. If the address is inside a compound, shop or estate, include the directions the rider needs to find the correct entrance.\n\n## Agree the Pay on Delivery amount\n\nFastFast Logistics offers Pay on Delivery for local deliveries in Sapele. Before dispatch, make sure the customer knows the amount due and that you and your delivery partner have agreed how collection and remittance will be handled. Do not leave payment expectations until the rider arrives.\n\n## Package the order for handover\n\nUse packaging that protects the item and makes it easy to identify the customer order. Add the recipient name or order reference where appropriate, and keep fragile or special-handling instructions clear.\n\n## Keep the customer reachable\n\nTell the customer when the order is being sent out and ask them to keep their phone nearby. If the address or availability changes, communicate it early.\n\n## Book a Sapele delivery with FastFast\n\nFastFast serves local deliveries within Sapele. Same-day delivery may be available depending on the request, time and operating capacity; confirm availability when booking. For help arranging a pickup or Pay on Delivery order, contact FastFast Logistics on WhatsApp at 08156067874.',
  'Sapele Online Vendor Delivery Checklist | FastFast Logistics',
  'A practical dispatch checklist for Sapele online vendors using FastFast local delivery and Pay on Delivery. Confirm orders, addresses and payment before pickup.',
  'Selling online in Sapele? Confirm the order, full delivery address and Pay on Delivery amount before dispatch. Read FastFast Logistics'' local vendor checklist.',
  'PUBLISHED', '2026-11-21T12:00:00.000Z', CURRENT_TIMESTAMP
),
(
  'fastfast_blog_warri_pod_20261121',
  'warri-pay-on-delivery-guide-for-online-sellers',
  'Warri Pay on Delivery: What Online Sellers Should Confirm Before Dispatch',
  'A practical guide for Warri vendors on customer confirmation, delivery details and Pay on Delivery expectations.',
  'Pay on Delivery',
  E'## Make the customer confirmation specific\n\nFor a Pay on Delivery order in Warri, confirm the item, quantity, agreed order amount and delivery address with the customer before requesting pickup. Ask the customer to confirm that someone will be available to receive the order.\n\n## Share an address a rider can actually use\n\nA social media location pin alone may not be enough. Include the area, street or building description, a nearby landmark and the recipient''s active phone number. If there are multiple entrances or a business is inside a complex, explain where the rider should go.\n\n## Be clear about the amount to collect\n\nFastFast Logistics offers Pay on Delivery for local deliveries in Warri. The seller should tell the recipient the exact amount expected and confirm the collection and remittance arrangement with the delivery provider before dispatch. Make sure the order amount and delivery fee are not confused.\n\n## Prepare your order for pickup\n\nPackage the item securely, label it with the order reference and make sure the rider can identify which customer it belongs to. Keep the customer''s phone number and any delivery instructions available.\n\n## Plan for customer availability\n\nSend the customer a short message before dispatch and remind them to keep their phone close. If they need to change the delivery time or address, contact the delivery provider before the rider is already on the way.\n\n## Local delivery in Warri\n\nFastFast Logistics handles deliveries within Warri. Delivery between Warri and Sapele or Asaba is not part of the current service coverage. Same-day delivery may be available for some requests, so confirm before promising a delivery time to your customer. Contact FastFast on WhatsApp at 08156067874 to discuss a Warri order.',
  'Warri Pay on Delivery Guide for Online Sellers | FastFast',
  'Warri vendors: learn what to confirm before dispatching a Pay on Delivery order, including the customer, address, amount to collect and pickup details.',
  'Warri online sellers: confirm the customer, delivery address and amount to collect before dispatch. FastFast offers Pay on Delivery for local Warri deliveries.',
  'PUBLISHED', '2026-11-21T12:00:00.000Z', CURRENT_TIMESTAMP
),
(
  'fastfast_blog_asaba_small_business_20261121',
  'asaba-local-delivery-guide-for-small-businesses',
  'Asaba Local Delivery: A Simple Order-Preparation Guide for Small Businesses',
  'How Asaba shops and online sellers can prepare packages, confirm customer details and arrange local delivery with fewer avoidable delays.',
  'Logistics Tips',
  E'## Separate local orders from out-of-city requests\n\nWhen a customer places an order, confirm the delivery city before accepting a delivery booking. FastFast Logistics currently handles local deliveries within Asaba, Warri and Sapele individually. A delivery from Asaba to another one of these cities is not covered by the current local service.\n\n## Collect complete delivery information\n\nFor an Asaba order, record the customer''s name, active phone number, area, street or building description and a nearby landmark. Ask for any gate, shop or access instructions the rider may need. Check the details with the customer before the parcel leaves your business.\n\n## Prepare the parcel and order reference\n\nPackage the item so it is protected during handling. Add an order reference or customer name to help avoid mix-ups, and tell the delivery provider about any fragile or unusual package requirements before pickup.\n\n## Explain Pay on Delivery clearly\n\nFastFast Logistics offers Pay on Delivery for local deliveries in Asaba. Confirm the exact amount the customer is expected to pay and agree the collection process before dispatch. Clear communication protects the customer experience and helps the seller avoid disputes at the door.\n\n## Give customers realistic updates\n\nLet the recipient know when the order is being prepared and when it has been handed over for delivery. Do not promise a precise arrival time unless it has been confirmed with the delivery provider. Same-day delivery may be available depending on the request and operating capacity.\n\n## Arrange an Asaba delivery\n\nFastFast supports local package delivery for individuals and small businesses in Asaba. To ask about pickup, Pay on Delivery or a specific order, message FastFast Logistics on WhatsApp at 08156067874.',
  'Asaba Local Delivery Guide for Small Businesses | FastFast',
  'An Asaba-focused guide to preparing local deliveries, confirming addresses, explaining Pay on Delivery and avoiding unsupported delivery-time promises.',
  'Asaba small businesses: prepare local orders with a complete address, reachable customer and agreed Pay on Delivery amount. See FastFast''s practical guide.',
  'PUBLISHED', '2026-11-21T12:00:00.000Z', CURRENT_TIMESTAMP
);

