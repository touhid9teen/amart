"use client";

import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 py-8">
      <div className="max-w-md mx-auto text-center space-y-8">
        {/* 404 Number */}
        <div className="space-y-4">
          <h1 className="text-6xl sm:text-7xl font-light text-gray-900 tracking-tight">
            404
          </h1>
          <div className="w-16 h-px bg-gray-300 mx-auto"></div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-medium text-gray-900">
            Page Not Found
          </h2>
          <p className="text-gray-600 leading-relaxed">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <Link href="/">
            <Button className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2.5 rounded-md font-medium transition-colors duration-200">
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          </Link>

          <div className="pt-2">
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Go back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
