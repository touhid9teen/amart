import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonProductItem() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      {/* Image Skeleton */}
      <div className="aspect-square bg-gray-50 p-3">
        <Skeleton className="w-full h-full rounded-lg" />
      </div>

      {/* Content Skeleton */}
      <div className="p-3 sm:p-4 space-y-3">
        {/* Title and Rating */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <div className="flex items-center gap-1">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-8" />
          </div>
        </div>

        {/* Description */}
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-2/3" />

        {/* Unit */}
        <Skeleton className="h-5 w-12 rounded-md" />

        {/* Price */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-4 w-12" />
          </div>
          <Skeleton className="h-3 w-20" />
        </div>

        {/* Button */}
        <Skeleton className="h-8 w-full rounded-md" />
      </div>
    </div>
  );
}

// Horizontal Skeleton for the scrolling layout
export function SkeletonProductsHorizontal() {
  return (
    <div className="flex gap-3 sm:gap-4 overflow-hidden pb-2">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="flex-shrink-0 w-[140px] sm:w-[160px] md:w-[180px] lg:w-[200px]"
        >
          <SkeletonProductItem />
        </div>
      ))}
    </div>
  );
}
