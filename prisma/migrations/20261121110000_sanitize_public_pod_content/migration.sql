-- Keep public vendor Pay on Delivery guidance clear while excluding internal fee,
-- collection, deduction and remittance arrangements. Only public BlogPost copy is changed.
UPDATE "BlogPost"
SET
  "content" = REPLACE(
    REPLACE(
      REPLACE(
        REPLACE(
          REPLACE(
            REPLACE(
              REPLACE(
                "content",
                'For vendors, a clear delivery process matters. Confirm the order, the recipient''s phone number, the delivery address and the amount to be collected before dispatch.',
                'For vendors, a clear delivery process matters. Confirm the order, the recipient''s phone number, the delivery address and the agreed order total before dispatch.'
              ),
              'Agree the order amount and any delivery fee in advance.',
              'Confirm the agreed order total with the customer before dispatch.'
            ),
            'If the order is Pay on Delivery, tell the customer exactly how much is due and what payment methods are accepted. Make sure the vendor and delivery partner agree on the collection and remittance process before dispatch.',
            'For vendor-arranged Pay on Delivery, the vendor includes delivery in the order total shared with the customer. The recipient pays that agreed total when the order arrives.'
          ),
          'If you need Pay on Delivery, confirm that the provider supports it in the destination city and agree how the amount will be collected and reconciled.',
          'If you need Pay on Delivery, confirm that the service is available for the destination and share the agreed order total with the customer before dispatch.'
        ),
        'Check what is included in the quoted fee, whether pickup is available, how special handling is arranged and whether same-day service is available for your particular request.',
        'Check whether pickup is available, how special handling is arranged and whether same-day service is available for your particular request.'
      ),
      'Confirm the delivery fee and any amount to be collected before the rider is dispatched.',
      'Confirm the agreed order total with the customer before dispatch.'
    ),
    'FastFast Logistics offers Pay on Delivery for local deliveries in Sapele, Warri and Asaba, Delta State.',
    'FastFast Logistics offers Pay on Delivery across its five main local service areas: Sapele, Warri, Asaba, Oghara and Koko, Delta State.'
  ),
  "updatedAt" = CURRENT_TIMESTAMP
WHERE "status" = 'PUBLISHED';

UPDATE "BlogPost"
SET
  "content" = REPLACE(
    REPLACE(
      REPLACE(
        "content",
        'The seller should tell the recipient the exact amount expected and confirm the collection and remittance arrangement with the delivery provider before dispatch. Make sure the order amount and delivery fee are not confused.',
        'The vendor should share the agreed order total with the recipient before dispatch. FastFast handles the service arrangements directly with the vendor.'
      ),
      'Confirm the exact amount the customer is expected to pay and agree the collection process before dispatch.',
      'The vendor should share the agreed order total with the recipient before dispatch.'
    ),
    'Before dispatch, make sure the customer knows the amount due and that you and your delivery partner have agreed how collection and remittance will be handled. Do not leave payment expectations until the rider arrives.',
    'Before dispatch, make sure the customer knows the agreed order total and is available to receive the order.'
  ),
  "updatedAt" = CURRENT_TIMESTAMP
WHERE "status" = 'PUBLISHED';

UPDATE "BlogPost"
SET
  "content" = "content" || CASE
    WHEN POSITION('## How FastFast Pay on Delivery works' IN "content") = 0
    THEN E'\n\n## How FastFast Pay on Delivery works\n\nFor a vendor-arranged FastFast Pay on Delivery order, the vendor includes delivery in the order total shared with the customer. The recipient pays that agreed total when the order arrives. This arrangement is separate from the standard local pickup-and-delivery booking form.\n'
    ELSE ''
  END,
  "updatedAt" = CURRENT_TIMESTAMP
WHERE "slug" = 'pay-on-delivery-in-sapele-warri-and-asaba';

