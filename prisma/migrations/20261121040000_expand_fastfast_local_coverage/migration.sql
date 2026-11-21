-- Expand the published local coverage guide without changing existing customer or delivery data.
UPDATE "BlogPost"
SET "content" = REPLACE(
  "content",
  'FastFast Logistics supports local deliveries in Sapele, Warri and Asaba, with Pay on Delivery available in all three cities.',
  'FastFast Logistics supports local deliveries within Sapele, Warri, Asaba, Oghara and Koko. Pay on Delivery is available across all five main service areas.'
),
"updatedAt" = CURRENT_TIMESTAMP
WHERE "slug" = 'reduce-failed-deliveries-for-online-orders';

UPDATE "BlogPost"
SET "content" = REPLACE(
  "content",
  'FastFast Logistics currently handles local deliveries within Sapele, Warri and Asaba.',
  'FastFast Logistics handles local deliveries within Sapele, Warri, Asaba, Oghara and Koko. Deliveries are local within each location; intercity delivery is not currently offered.'
),
"updatedAt" = CURRENT_TIMESTAMP
WHERE "slug" = 'choosing-a-local-delivery-partner-in-delta-state';

UPDATE "BlogPost"
SET "content" = REPLACE(
  "content",
  'FastFast Logistics currently handles local deliveries within Asaba, Warri and Sapele individually.',
  'FastFast Logistics handles local deliveries within Sapele, Warri, Asaba, Oghara and Koko individually.'
),
"updatedAt" = CURRENT_TIMESTAMP
WHERE "slug" = 'asaba-local-delivery-guide-for-small-businesses';

INSERT INTO "BlogPost" (
  "id", "slug", "title", "excerpt", "category", "content",
  "seoTitle", "seoDescription", "googleBusinessUpdate",
  "status", "publishedAt", "updatedAt"
) VALUES (
  'fastfast_blog_coverage_20261121',
  'fastfast-local-delivery-coverage-delta-state',
  'Where FastFast Delivers: Local Coverage in Sapele, Warri, Asaba, Oghara and Koko',
  'Find out where FastFast Logistics accepts local delivery requests in Delta State and what to confirm before booking.',
  'Delivery Guides',
  E'## Five local delivery areas in Delta State\n\nFastFast Logistics accepts local delivery requests within Sapele, Warri, Asaba, Oghara and Koko. Whether you are sending a personal package or fulfilling an online order, share the pickup and drop-off details so the team can confirm the request.\n\nThe service is local within each listed area. A delivery from one of these towns to another is an intercity request and is not part of the current advertised coverage.\n\n- Sapele\n- Warri\n- Asaba\n- Oghara\n- Koko\n\n## Pay on Delivery availability\n\nPay on Delivery is available for local orders in all five main service areas: Sapele, Warri, Asaba, Oghara and Koko.\n\n## What to share when booking\n\nProvide the pickup address, recipient''s full delivery address, a nearby landmark, an active phone number and a clear description of the package. Confirm the delivery fee and any amount to be collected before the rider is dispatched.\n\n- Pickup town and address\n- Recipient name and phone number\n- Drop-off address and landmark\n- Whether you need Pay on Delivery\n- Any timing or package-handling requirements\n\n## Arrange a local delivery\n\nVisit fastfast.ng or contact FastFast Logistics on WhatsApp at 08156067874 to discuss your delivery. Same-day delivery may be available depending on the request and operating capacity; confirm before promising a delivery time.',
  'FastFast Delivery Coverage in Sapele, Warri, Asaba, Oghara and Koko',
  'FastFast provides local delivery and Pay on Delivery within Sapele, Warri, Asaba, Oghara and Koko.',
  'FastFast Logistics now serves local delivery requests within Sapele, Warri, Asaba, Oghara and Koko, Delta State. Pay on Delivery is available across all five main service areas. Contact us to confirm pickup and drop-off details for surrounding communities.',
  'PUBLISHED', '2026-11-21T12:00:00.000Z', CURRENT_TIMESTAMP
)
ON CONFLICT ("slug") DO NOTHING;

-- Bring the original Pay on Delivery article in line with the confirmed five-area service coverage.
UPDATE "BlogPost"
SET
  "title" = 'Pay on Delivery in FastFast Service Areas: What Customers and Vendors Should Know',
  "excerpt" = 'A practical guide to using Pay on Delivery for local orders across FastFast''s five main service areas in Delta State.',
  "content" = REPLACE(
    REPLACE(
      "content",
      'FastFast Logistics offers Pay on Delivery for local deliveries in Sapele, Warri and Asaba, Delta State.',
      'FastFast Logistics offers Pay on Delivery across its five main local service areas: Sapele, Warri, Asaba, Oghara and Koko, Delta State. Surrounding communities may also be served when pickup and drop-off can be confirmed.'
    ),
    E'- Sapele\\n- Warri\\n- Asaba',
    E'- Sapele\\n- Warri\\n- Asaba\\n- Oghara\\n- Koko'
  ),
  "seoTitle" = 'Pay on Delivery Across FastFast Service Areas | FastFast Logistics',
  "seoDescription" = 'Learn how Pay on Delivery works for local deliveries in Sapele, Warri, Asaba, Oghara and Koko, Delta State.',
  "googleBusinessUpdate" = 'Do you sell online in Sapele, Warri, Asaba, Oghara or Koko? FastFast Logistics offers Pay on Delivery across our five main service areas. Contact us to confirm your exact pickup and drop-off community.',
  "updatedAt" = CURRENT_TIMESTAMP
WHERE "slug" = 'pay-on-delivery-in-sapele-warri-and-asaba';
