-- Clarify the public vendor Pay on Delivery process without exposing internal fee or settlement details.
UPDATE "BlogPost"
SET
  "content" = "content" || E'\n\n## How FastFast Pay on Delivery works\n\nFor a vendor-arranged FastFast Pay on Delivery order, the vendor includes delivery in the order total shared with the customer. The recipient pays that agreed total when the order arrives. This arrangement is handled directly with FastFast and is separate from the standard local pickup-and-delivery booking form.\n',
  "updatedAt" = CURRENT_TIMESTAMP
WHERE "slug" = 'pay-on-delivery-in-sapele-warri-and-asaba';
