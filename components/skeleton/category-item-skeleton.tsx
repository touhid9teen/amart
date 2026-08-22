export function SkeletonCategoryItem() {
  return (
    <>
      {/* Mobile Skeleton */}
      <div className="flex-shrink-0 sm:hidden">
        <div className="w-20 bg-gray-100 rounded-xl border border-gray-200 p-3 animate-pulse">
          <div className="w-14 h-14 mx-auto mb-2 bg-gray-200 rounded-lg"></div>
          <div className="space-y-1">
            <div className="h-2 bg-gray-200 rounded w-full"></div>
            <div className="h-2 bg-gray-200 rounded w-3/4 mx-auto"></div>
          </div>
        </div>
      </div>

      {/* Desktop Skeleton */}
      <div className="hidden sm:block">
        <div className="bg-gray-100 rounded-xl border border-gray-200 p-4 animate-pulse">
          <div className="w-full aspect-square mb-3 bg-gray-200 rounded-lg"></div>
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded w-full"></div>
            <div className="h-3 bg-gray-200 rounded w-2/3 mx-auto"></div>
          </div>
        </div>
      </div>
    </>
  );
}
