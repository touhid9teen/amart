import { AuthProvider } from "@/contexts/auth-context";
import { CartProvider } from "@/contexts/cart-context";
import { AuthModalsProvider } from "@/providers/auth-modal-provider";
import ReactQueryProvider from "@/providers/react-query-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import type React from "react";
import { Toaster } from "sonner";
import { HideOnAdmin } from "@/components/hide-on-admin";
import FloatingCartButton from "@/components/cart/floating-cart-button";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import NavbarWrapper from "@/components/layout/navbar-wrapper";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Amart",
  description: "Your one-stop shop for premium organic products",
  icons: {
    icon: "/amart.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`} suppressHydrationWarning>
        <NextTopLoader height={3} showSpinner={false} />
        <ReactQueryProvider>
          <AuthProvider>
            <CartProvider>
              <Toaster position="top-center" />
              <AuthModalsProvider />
              <HideOnAdmin>
                <Header />
              </HideOnAdmin>
              <HideOnAdmin>
                <NavbarWrapper />
              </HideOnAdmin>
              {children}
              <HideOnAdmin>
                <FloatingCartButton />
              </HideOnAdmin>
              <HideOnAdmin>
                <Footer />
              </HideOnAdmin>
            </CartProvider>
          </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
