"use client";

export default function ProcessIndicator() {
  return (
    <div className="flex items-center justify-center gap-2">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium">
          ✓
        </div>
        <span className="text-sm font-medium text-primary">Cart</span>
      </div>
      <div className="w-12 h-0.5 bg-primary"></div>
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium">
          2
        </div>
        <span className="text-sm font-medium text-primary">Checkout</span>
      </div>
      <div className="w-12 h-0.5 bg-gray-300"></div>
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center text-sm font-medium">
          3
        </div>
        <span className="text-sm text-gray-500">Payment</span>
      </div>
    </div>
  );
}
