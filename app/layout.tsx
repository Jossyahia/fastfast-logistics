import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/Footer";
import { SessionProvider } from "next-auth/react";
import LoadingWrapper from "@/components/LoadingWrapper";
import { LoadingProvider } from "@/components/LoadingContext";
import NavBarClient from "@/components/NavBarClient";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FastFast Logistics Services",
  description: "Your reliable logistics partner",
  icons: {
    icon: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        url: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        url: "/favicon-16x16.png",
      },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        url: "/apple-touch-icon.png",
      },
    ],
  },
  manifest: "/site.webmanifest",
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
