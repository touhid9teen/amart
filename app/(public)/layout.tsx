import Header from "@/components/layout/header";
import NavbarWrapper from "@/components/layout/navbar-wrapper";
import FloatingCartButton from "@/components/cart/floating-cart-button";
import Footer from "@/components/layout/footer";

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <NavbarWrapper />
      {children}
      <FloatingCartButton />
      <Footer />
    </>
  );
}
