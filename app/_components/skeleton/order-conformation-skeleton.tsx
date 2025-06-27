import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";

export default function OrderConfirmationSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header Skeleton */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-10 h-10 bg-gray-200 rounded-md flex items-center justify-center">
            <ArrowLeft className="h-4 w-4 text-gray-400" />
          </div>
          <Skeleton className="h-8 w-48" />
        </div>

        {/* Success Message Skeleton */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-200 rounded-full mb-6">
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
          </div>
          <Skeleton className="h-9 w-80 mx-auto mb-3" />
          <Skeleton className="h-6 w-96 mx-auto" />
        </div>

        {/* Order Summary Skeleton */}
        <div className="bg-white border border-gray-200 rounded-lg mb-6">
          {/* Header Section */}
          <div className="border-b border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <Skeleton className="h-6 w-32 mb-2" />
                <Skeleton className="h-4 w-48" />
              </div>
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
          </div>

          {/* Info Grid Section */}
          <div className="p-6">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Delivery Address Skeleton */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <div className="w-5 h-5 bg-gray-300 rounded"></div>
                </div>
                <div className="flex-1">
                  <Skeleton className="h-5 w-28 mb-2" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>

              {/* Payment Method Skeleton */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <div className="w-5 h-5 bg-gray-300 rounded"></div>
                </div>
                <div className="flex-1">
                  <Skeleton className="h-5 w-28 mb-2" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>

              {/* Total Amount Skeleton */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <div className="w-5 h-5 bg-gray-300 rounded"></div>
                </div>
                <div className="flex-1">
                  <Skeleton className="h-5 w-24 mb-2" />
                  <Skeleton className="h-6 w-20 mb-1" />
                  <Skeleton className="h-3 w-32" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Items Skeleton */}
        <div className="bg-white border border-gray-200 rounded-lg">
          {/* Items Header */}
          <div className="border-b border-gray-200 p-6">
            <Skeleton className="h-6 w-32" />
          </div>

          {/* Items List */}
          <div className="p-6">
            <div className="space-y-4">
              {/* Item Skeleton - Repeat 3 times */}
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100"
                >
                  {/* Product Image Skeleton */}
                  <div className="w-16 h-16 bg-gray-200 rounded-lg border border-gray-200"></div>

                  {/* Product Info Skeleton */}
                  <div className="flex-1">
                    <Skeleton className="h-5 w-48 mb-2" />
                    <div className="flex items-center gap-4">
                      <Skeleton className="h-4 w-16" />
                      <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                      <Skeleton className="h-4 w-20" />
                    </div>
                  </div>

                  {/* Price Skeleton */}
                  <div className="text-right">
                    <Skeleton className="h-5 w-16" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Notes Skeleton (Optional) */}
        <div className="bg-white border border-gray-200 rounded-lg mt-6">
          <div className="p-6">
            <Skeleton className="h-6 w-32 mb-3" />
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
