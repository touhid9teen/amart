import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

export function SkeletonCategoryItem() {
  return (
    <Card className="flex h-[230px] animate-pulse items-center justify-center border-2 bg-gray-200 lg:h-[200px]">
      <CardHeader className="w-full gap-2">
        <div className="mx-auto size-10 rounded bg-white"></div>
        <CardTitle className="h-5 w-full rounded bg-white"></CardTitle>
        <CardDescription className="flex w-full flex-col gap-1">
          <div className="h-3 w-full rounded bg-white"></div>
          <div className="h-3 w-full rounded bg-white"></div>
          <div className="h-3 w-full rounded bg-white"></div>
          <div className="h-3 w-full rounded bg-white"></div>
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
