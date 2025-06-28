"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { sliderList } from "@/lib/variables";

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [textVisible, setTextVisible] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isAutoPlaying) {
      if (autoPlayRef.current) clearTimeout(autoPlayRef.current);

      autoPlayRef.current = setTimeout(() => {
        setTextVisible(false);

        setTimeout(() => {
          setCurrentIndex((prevIndex) =>
            prevIndex === sliderList.length - 1 ? 0 : prevIndex + 1
          );
          setTimeout(() => {
            setTextVisible(true);
          }, 800);
        }, 600);
      }, 6000);
    }
    return () => {
      if (autoPlayRef.current) clearTimeout(autoPlayRef.current);
    };
  }, [currentIndex, isAutoPlaying]);

  const handleDotClick = (index: number) => {
    if (index === currentIndex) return;
    setTextVisible(false);
    setTimeout(() => {
      setCurrentIndex(index);
      setTimeout(() => setTextVisible(true), 800);
    }, 600);

    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  // Scroll to next section below slider
  const handleShopNowClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (sliderRef.current) {
      const sliderBottom =
        sliderRef.current.getBoundingClientRect().bottom + window.scrollY;
      window.scrollTo({
        top: sliderBottom,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      ref={sliderRef}
      className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-[calc(100vh-80px)] overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <AnimatePresence mode="wait">
        {sliderList.map(
          (slider, index) =>
            index === currentIndex && (
              <motion.div
                key={slider.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 w-full h-full"
              >
                {/* Background Image with Responsive Overlay */}
                <div className="relative w-full h-full">
                  <Image
                    src={
                      slider.image[0]?.url ||
                      "/placeholder.svg?height=800&width=1200"
                    }
                    alt={slider.name || "Slider image"}
                    fill
                    className="object-cover object-center"
                    priority
                    sizes="100vw"
                  />
                  {/* Stronger gradient overlay for better text visibility */}
                  <div className="absolute inset-0 to-transparent " />
                </div>

                {/* Content Container - Strictly limited to left half */}
                <div className="absolute inset-0 flex items-center">
                  <div className="w-1/2 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
                    {/* Content centered vertically within the left half container */}
                    <div className="w-full max-w-full">
                      <AnimatePresence mode="wait">
                        {textVisible && (
                          <motion.div
                            key={`text-${currentIndex}`}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30 }}
                            transition={{
                              duration: 0.8,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="text-center"
                          >
                            {/* Badge */}
                            <motion.span
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.6, delay: 0.2 }}
                              className="inline-block px-2 py-0.5 sm:px-2.5 sm:py-1 bg-primary text-white text-xs font-medium rounded-full mb-4 sm:mb-6"
                            >
                              100% Organic
                            </motion.span>

                            {/* Main Heading - Centered */}
                            <motion.h1
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                duration: 0.8,
                                delay: 0.4,
                                type: "spring",
                                stiffness: 100,
                              }}
                              className="font-bold mb-6 sm:mb-8 leading-tight drop-shadow-lg text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl"
                            >
                              Premium Organic Produce, <br />
                              Fresh to Your Door.
                            </motion.h1>

                            {/* CTA Button - Centered */}
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                duration: 0.6,
                                delay: 0.6,
                                type: "spring",
                              }}
                            >
                              <Link
                                href="#"
                                onClick={handleShopNowClick}
                                className="inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-white px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-xs sm:text-sm md:text-base"
                              >
                                Shop Now
                              </Link>
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Right half - reserved for image visibility */}
                  <div className="w-1/2"></div>
                </div>
              </motion.div>
            )
        )}
      </AnimatePresence>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {sliderList.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-primary scale-125 shadow-lg"
                : "bg-white/60 sm:bg-gray-400 hover:bg-white/80 sm:hover:bg-gray-500"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Arrows for larger screens */}
      <div className="hidden lg:block">
        <button
          onClick={() =>
            handleDotClick(
              currentIndex === 0 ? sliderList.length - 1 : currentIndex - 1
            )
          }
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 sm:p-3 rounded-full transition-all duration-300 hover:scale-110"
          aria-label="Previous slide"
        >
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* <button
          onClick={() =>
            handleDotClick(
              currentIndex === sliderList.length - 1 ? 0 : currentIndex + 1
            )
          }
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 sm:p-3 rounded-full transition-all duration-300 hover:scale-110"
          aria-label="Next slide"
        >
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button> */}
      </div>
    </div>
  );
}
