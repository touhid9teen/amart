import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getImageUrl(imagePath: string | undefined | null): string {
  if (!imagePath) {
    return "/placeholder.svg?height=200&width=200";
  }

  // If it's already a full URL, return as is
  if (imagePath.startsWith("http")) {
    return imagePath;
  }

  // Get base URL from environment
  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") || "";

  // Combine base URL with image path
  return `${baseUrl}${imagePath}`;
}
