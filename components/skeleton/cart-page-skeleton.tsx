import { Skeleton } from "@/components/ui/skeleton";

export default function CartPageSkeleton() {
  return (
    <main className="min-h-screen" style={{ background: "#f5f4f0" }}>
      {/* Top Bar Skeleton */}
      <div
        className="sticky top-0 z-40 border-b"
        style={{
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(16px)",
          borderColor: "#e8e5de",
        }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-4">
          <div className="flex items-center gap-3">
            <Skeleton className="w-10 h-10 rounded-lg" />
            <Skeleton className="h-4 w-36 sm:w-44" />
          </div>
          <div className="flex-1" />
          <div className="flex items-center gap-2">
            <Skeleton className="w-4 h-4 rounded" />
            <Skeleton className="h-4 w-12" />
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 pb-36">
        <div className="lg:grid lg:grid-cols-5 lg:gap-8 items-start">
          {/* ── LEFT: Cart Items ── */}
          <div className="lg:col-span-3 space-y-4">
            {/* Section header */}
            <div className="flex items-center justify-between pb-1">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-12" />
            </div>

            {/* Items card */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: "#fff",
                border: "1px solid #e8e4dc",
              }}
            >
              {/* Card header */}
              <div
                className="flex items-center gap-2.5 px-5 py-3.5 border-b"
                style={{ borderColor: "#f0ece4" }}
              >
                <Skeleton className="w-4 h-4 rounded" />
                <Skeleton className="h-4 w-36" />
              </div>

              {/* Item rows */}
              <div>
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 px-5 py-4"
                    style={{
                      borderTop: i === 1 ? "none" : "1px solid #f0ece4",
                    }}
                  >
                    {/* Image */}
                    <Skeleton className="w-[72px] h-[72px] rounded-xl flex-shrink-0" />

                    {/* Info */}
                    <div className="flex-1 min-w-0 space-y-2.5">
                      <Skeleton className="h-4 w-full max-w-[200px]" />
                      <Skeleton className="h-3 w-20" />
                      <Skeleton className="h-4 w-16" />
                    </div>

                    {/* Quantity stepper */}
                    <Skeleton className="w-[100px] h-[34px] rounded-xl flex-shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT: Summary ── */}
          <div className="mt-6 lg:mt-0 lg:col-span-2 space-y-4 lg:sticky lg:top-20">
            {/* Bill details */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: "#fff",
                border: "1px solid #e8e4dc",
              }}
            >
              <div
                className="px-5 py-4 border-b"
                style={{ borderColor: "#f0ece4" }}
              >
                <Skeleton className="h-4 w-24" />
              </div>

              <div className="px-5 py-4 space-y-3.5">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex justify-between items-center">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-12" />
                  </div>
                ))}

                {/* Divider */}
                <div
                  style={{
                    height: "1px",
                    background: "#f0ece4",
                    margin: "4px 0",
                  }}
                />

                {/* Grand total */}
                <div className="flex justify-between items-end pt-1">
                  <div className="space-y-1.5">
                    <Skeleton className="h-5 w-28" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                  <div className="text-right space-y-1.5">
                    <Skeleton className="h-8 w-20" />
                    <Skeleton className="h-3 w-8 ml-auto" />
                  </div>
                </div>
              </div>
            </div>

            {/* CTA button skeleton (desktop) */}
            <Skeleton className="w-full hidden lg:block h-14 rounded-2xl" />

            {/* Cancellation policy */}
            <div
              className="rounded-xl px-4 py-3.5 flex gap-3"
              style={{
                background: "#faf9f6",
                border: "1px solid #e8e4dc",
              }}
            >
              <Skeleton className="w-4 h-4 rounded flex-shrink-0 mt-0.5" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-3.5 w-32" />
                <Skeleton className="h-3 w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom CTA skeleton (mobile) */}
      <div className="fixed left-0 right-0 bottom-0 z-50 lg:hidden px-4 pb-5 pt-6"
        style={{
          background: "linear-gradient(to top, #f5f4f0 70%, rgba(245,244,240,0))",
        }}
      >
        <Skeleton className="w-full h-[58px] rounded-2xl" />
      </div>
    </main>
  );
}
