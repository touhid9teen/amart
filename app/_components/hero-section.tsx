"use client";


import Image from "next/image";

export default function HeroSection() {
  return (
    <div className="relative w-full h-[350px] sm:h-[450px] md:h-[550px] lg:h-[600px] bg-gray-100">
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/hero-bg.png"
          alt="Fresh organic vegetables"
          fill
          className="object-cover object-center"
          priority
          quality={100}
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6 z-10">
        <h2 className="text-white font-medium tracking-wide text-sm sm:text-lg md:text-xl mb-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 drops-shadow-md">
          Fuel Your Body, Feed Your Soul with Organic Goodness
        </h2>
        
        <div className="relative w-full max-w-4xl px-4 sm:px-0 mb-8 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
          <Image
            src="/hero-text.png"
            alt="ALWAYS ORGANIC"
            width={800}
            height={300}
            className="w-full h-auto drop-shadow-xl"
            priority
          />
        </div>

        <button
          onClick={() => {
            document.getElementById("products-section")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="bg-primary hover:bg-primary/90 text-white font-bold text-sm sm:text-base px-8 py-3 sm:px-10 sm:py-4 rounded-md uppercase tracking-wider transition-all duration-300 transform hover:scale-105 shadow-lg animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300"
        >
          START SHOPPING
        </button>
      </div>
    </div>
  );
}
