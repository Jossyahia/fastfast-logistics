import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/Footer";
import { SessionProvider } from "next-auth/react";
import LoadingWrapper from "@/components/LoadingWrapper";
import { LoadingProvider } from "@/components/LoadingContext"; // Import the LoadingProvider
import NavBarClient from "@/components/NavBarClient";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FastFast Logistics Services",
  description: "Your reliable logistics partner",
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
              <NavBarClient/>
              <LoadingWrapper>{children}</LoadingWrapper>
            </LoadingProvider>
          </ThemeProvider>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
