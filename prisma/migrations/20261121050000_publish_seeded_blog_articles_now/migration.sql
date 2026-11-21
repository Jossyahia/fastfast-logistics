-- The initial CMS seed used 12:00 UTC as a publication timestamp.
-- That is 13:00 in Nigeria (WAT), so seeded articles appeared scheduled
-- until that time even though they were intended to be live immediately.
-- Publish only the known built-in seed articles; leave user-scheduled posts untouched.
UPDATE "BlogPost"
SET
  "publishedAt" = CURRENT_TIMESTAMP,
  "updatedAt" = CURRENT_TIMESTAMP
WHERE "slug" IN (
  'pay-on-delivery-in-sapele-warri-and-asaba',
  'reduce-failed-deliveries-for-online-orders',
  'choosing-a-local-delivery-partner-in-delta-state',
  'sapele-online-vendors-local-delivery-checklist',
  'warri-pay-on-delivery-guide-for-online-sellers',
  'asaba-local-delivery-guide-for-small-businesses',
  'fastfast-local-delivery-coverage-delta-state'
)
AND "status" = 'PUBLISHED'
AND ("publishedAt" IS NULL OR "publishedAt" > CURRENT_TIMESTAMP);
