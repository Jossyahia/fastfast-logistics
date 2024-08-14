import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { SessionProvider } from "next-auth/react";
import NavBarServer from "@/components/NavBarServer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FastFast Logistics Services",
  description: "Your reliable logistics partner",
};

export default async function RootLayout({
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
            <NavBarServer />
            {children}
          </ThemeProvider>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
