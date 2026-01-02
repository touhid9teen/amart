"use client";

import Image from "next/image";
import { useAuth } from "@/contexts/auth-context";

export default function SignupBanner() {
  const { showSignUpModal } = useAuth();

  return (
    <section className="relative w-full h-[300px] md:h-[400px] bg-[#89c74a]">
      {/* Background Pattern */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/signup-bg.png"
          alt="Signup Background Pattern"
          fill
          className="object-cover opacity-100"
          priority
        />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
        <div className="relative w-full max-w-[500px] aspect-[500/150] mb-8">
          <Image
            src="/signup-text.png"
            alt="Get 20% Discount On Your First Purchase"
            fill
            className="object-contain"
          />
        </div>
        
        <button
          onClick={showSignUpModal}
          className="bg-black text-white text-sm md:text-base font-bold uppercase px-8 py-3.5 rounded tracking-wider hover:bg-gray-900 transition-colors shadow-lg"
        >
          Subscribe Now
        </button>
      </div>
    </section>
  );
}
