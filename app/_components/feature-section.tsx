import { Truck, CreditCard, ShieldCheck, Tag } from "lucide-react";
import Image from "next/image";

export default function FeaturesSection() {
  const features = [
    {
      icon: Truck,
      title: "Free Delivery",
      description: "Enjoy free shipping on all orders over $50 to your doorstep.",
    },
    {
      icon: CreditCard,
      title: "Secure Payment",
      description: "We ensure secure payment with 100% safe & trusted gateways.",
    },
    {
      icon: ShieldCheck,
      title: "Quality Guarantee",
      description: "We provide high-quality organic products from trusted farms.",
    },
    {
      icon: Tag,
      title: "Guaranteed Savings",
      description: "Get the best prices and save more with our daily deals.",
    },
  ];

  return (
    <section className="relative w-full h-auto">
      {/* Background Container */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/footer-features-bg-image.png"
          alt="Features Background"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Dark overlay for mobile readability */}
        <div className="absolute inset-0 bg-black/50 lg:bg-transparent" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Features List Column */}
          <div className="max-w-md">
            <div className="flex flex-col">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index}>
                    <div className="flex items-center gap-5 py-6 group hover:translate-x-2 transition-transform duration-300">
                      <div className="shrink-0 transition-colors duration-300">
                        <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" strokeWidth={1.5} />
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-lg sm:text-xl mb-1 tracking-wide">
                          {feature.title}
                        </h3>
                        <p className="text-gray-300 text-sm sm:text-base font-light tracking-wide opacity-80">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                    {/* Divider Line (except for last item) */}
                    {index !== features.length - 1 && (
                      <div className="h-px w-full bg-gray-600/50" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Right Column (Spacer to let the image vegetables show) */}
          <div className="hidden lg:block" />
        </div>
      </div>
    </section>
  );
}
