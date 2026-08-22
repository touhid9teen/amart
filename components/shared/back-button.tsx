"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => router.back()}
      className="hover:bg-gray-100 transition-colors duration-200 -ml-2"
    >
      <ArrowLeft className="h-4 w-4 mr-2" />
    </Button>
  );
}
