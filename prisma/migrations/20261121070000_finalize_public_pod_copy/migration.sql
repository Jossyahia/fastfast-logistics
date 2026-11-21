-- Idempotently align any existing seeded POD article with the confirmed five-area vendor process.
-- No booking, pricing, fee, collection or settlement records are changed.
UPDATE "BlogPost"
SET
  "content" = REPLACE(
    REPLACE(
      REPLACE(
        "content",
        'For vendors, a clear delivery process matters. Confirm the order, the recipient''s phone number, the delivery address and the amount to be collected before dispatch.',
        'For vendors, a clear delivery process matters. Confirm the order, the recipient''s phone number, the delivery address and the agreed order total before dispatch.'
      ),
      'Agree the order amount and any delivery fee in advance.',
      'Confirm the agreed order total with the customer before dispatch.'
    ),
    E'- Sapele\n- Warri\n- Asaba',
    E'- Sapele\n- Warri\n- Asaba\n- Oghara\n- Koko'
  ) || CASE
    WHEN POSITION('## How FastFast Pay on Delivery works' IN "content") = 0
    THEN E'\n\n## How FastFast Pay on Delivery works\n\nFor a vendor-arranged FastFast Pay on Delivery order, the vendor includes delivery in the order total shared with the customer. The recipient pays that agreed total when the order arrives. This arrangement is handled directly with FastFast and is separate from the standard local pickup-and-delivery booking form.\n'
    ELSE ''
  END,
  "updatedAt" = CURRENT_TIMESTAMP
WHERE "slug" = 'pay-on-delivery-in-sapele-warri-and-asaba';
