import { Suspense } from "react";
import OrderConfirmation from "./order-conformation";

export default function OrderConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <OrderConfirmation />
    </Suspense>
  );
}
