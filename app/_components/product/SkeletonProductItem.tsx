import { Skeleton } from "../../../components/ui/skeleton";

export function SkeletonProductItem() {
  return (
    <div className="border rounded-lg p-4 flex flex-col gap-2">
      <Skeleton className="w-full h-32 rounded-md mb-2" />
      <Skeleton className="h-4 w-3/4 mb-1" />
      <Skeleton className="h-3 w-1/2" />
    </div>
  );
}
