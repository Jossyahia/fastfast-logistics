# FastFast Blog Studio

## Access

1. Open https://fastfast.ng/admin/blog while signed in with an existing account whose role is `ADMIN`.
2. Choose **Write an article** to create a new post, or open an existing article to edit it.
3. Add a clear title, URL slug, category, short introduction and article body.
4. Use `## Heading` for section headings, a blank line between paragraphs, and `- item` for bullet points.
5. Add a search title and description, then write a shorter Google Business Profile update.
6. Use **Preview article** before publishing.
7. Save as a draft or publish. Drafts do not appear on the public blog or sitemap.

## FastFast facts to preserve in every article

- Current local delivery areas: Sapele, Warri, Asaba, Oghara and Koko, Delta State.
- Deliveries operate within each individual city; do not promise intercity delivery between the cities.
- Vendor-arranged Pay on Delivery is available across all five main service areas. The vendor includes delivery in the order total shared with the customer, who pays that agreed total on delivery.
- Same-day delivery is only available where operating conditions allow; confirm availability before promising a time.
- WhatsApp: +234 815 606 7874.
- Website: https://fastfast.ng.
- Avoid inventing prices, delivery guarantees, service hours, tracking features or customer testimonials.

## Google Business Profile workflow

The article editor includes a short post for Google Business Profile. Copy it from the editor or from the published article page, where the article link is included. Paste and publish it in the verified FastFast Business Profile. Direct posting from ChatGPT requires a connected publishing integration with permission to manage the correct Business Profile.

## Production deployment

The BlogPost table is created by the additive Prisma migration during a Netlify production build. Deploy previews do not run production database migrations. The migration does not alter existing booking, customer, rider or shipment tables.
