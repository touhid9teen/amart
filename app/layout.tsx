import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import { Toaster } from "sonner";
import { AuthProvider } from "@/contexts/auth-context";
import { AuthModalsProvider } from "@/providers/auth-modal-provider";
import { CartProvider } from "@/contexts/cart-context";
import ReactQueryProvider from "@/providers/react-query-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Amart",
  description: "Your one-stop shop for premium organic products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <ReactQueryProvider>
          <AuthProvider>
            <CartProvider>
              <Toaster position="top-center" />
              <AuthModalsProvider />
              <Header />
              {children}
              <Footer />
            </CartProvider>
          </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
