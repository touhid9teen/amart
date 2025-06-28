import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function CartItemsSkeleton() {
  return (
    <div className="space-y-4">
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-6 w-16" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-3 rounded-lg border">
            <div className="flex items-center gap-3">
              <Skeleton className="w-10 h-10 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-32" />
              </div>
            </div>
          </div>

          {/* Cart Items Skeleton */}
          <div className="space-y-3">
            <Skeleton className="h-4 w-28" />
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-3 rounded-lg border"
              >
                <Skeleton className="w-16 h-16 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-3 w-20" />
                </div>
                <Skeleton className="h-5 w-12" />
              </div>
            ))}
          </div>

          {/* Bill Details Skeleton */}
          <div className="space-y-3 pt-4 border-t">
            <Skeleton className="h-4 w-24" />
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex justify-between">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-12" />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function CheckoutFormSkeleton() {
  return (
    <div className="space-y-4">
      {/* Address Card Skeleton */}
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-8 w-32" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-20 w-full rounded-lg" />
        </CardContent>
      </Card>

      {/* Order Notes Skeleton */}
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <Skeleton className="h-6 w-36" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-20 w-full rounded-lg" />
        </CardContent>
      </Card>

      {/* Payment Method Skeleton */}
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <Skeleton className="h-6 w-32" />
        </CardHeader>
        <CardContent className="space-y-3">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="flex items-center space-x-3 p-4 border rounded-lg"
            >
              <Skeleton className="w-4 h-4 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-48" />
              </div>
              <Skeleton className="h-4 w-20" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Submit Button Skeleton */}
      <Skeleton className="h-12 w-full rounded-lg" />
    </div>
  );
}
