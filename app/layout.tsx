import { AuthProvider } from "@/contexts/auth-context";
import { CartProvider } from "@/contexts/cart-context";
import { AuthModalsProvider } from "@/providers/auth-modal-provider";
import ReactQueryProvider from "@/providers/react-query-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import type React from "react";
import { Toaster } from "sonner";
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
              {children}
            </CartProvider>
          </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
