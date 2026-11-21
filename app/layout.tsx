import { Inter } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/Footer";
import { SessionProvider } from "next-auth/react";
import LoadingWrapper from "@/components/LoadingWrapper";
import { LoadingProvider } from "@/components/LoadingContext";
import NavBarClient from "@/components/NavBarClient";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://fastfast.ng"),
  title: {
    default: "FastFast Logistics Services | Local Delivery in Delta State",
    template: "%s | FastFast Logistics",
  },
  description: "Local package delivery for individuals and online vendors in Sapele, Warri, Asaba, Oghara and Koko, Delta State.",
  applicationName: "FastFast Logistics Services",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://fastfast.ng",
    siteName: "FastFast Logistics Services",
    title: "FastFast Logistics Services | Your Express Lane to Seamless Shipping",
    description: "Local delivery for individuals and online vendors in Sapele, Warri, Asaba, Oghara and Koko.",
  },
  twitter: {
    card: "summary",
    title: "FastFast Logistics Services",
    description: "Local delivery in Sapele, Warri, Asaba, Oghara and Koko, Delta State.",
  },
  icons: {
    icon: [
      { rel: "icon", type: "image/png", sizes: "32x32", url: "/favicon-32x32.png" },
      { rel: "icon", type: "image/png", sizes: "16x16", url: "/favicon-16x16.png" },
      { rel: "apple-touch-icon", sizes: "180x180", url: "/apple-touch-icon.png" },
    ],
  },
  manifest: "/site.webmanifest",
};

const businessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "FastFast Logistics Services",
  url: "https://fastfast.ng",
  telephone: "+2348156067874",
  email: "fastfastlogisticsservices@gmail.com",
  description: "Local package delivery and logistics support for individuals and online vendors in Sapele, Warri, Asaba, Oghara and Koko, Delta State.",
  areaServed: [
    { "@type": "City", name: "Sapele" },
    { "@type": "City", name: "Warri" },
    { "@type": "City", name: "Asaba" },
    { "@type": "Place", name: "Oghara", containedInPlace: { "@type": "AdministrativeArea", name: "Delta State" } },
    { "@type": "Place", name: "Koko", containedInPlace: { "@type": "AdministrativeArea", name: "Delta State" } },
  ],
  serviceType: ["Local package delivery", "Pay on Delivery", "Order fulfilment support"],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema).replace(/</g, "\\u003c") }} />
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <LoadingProvider>
              <NavBarClient />
              <LoadingWrapper>{children}</LoadingWrapper>
            </LoadingProvider>
          </ThemeProvider>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
