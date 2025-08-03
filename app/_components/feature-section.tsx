import { Headphones, Truck, DollarSign, Gift } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: Truck,
      title: "Affordable Grocery Delivery",
      description:
        "Doorstep delivery starting at ৳40 for orders up to 2 kg. For orders between 2 and 10 kg, a flat charge of ৳60 applies. Orders over 10 kg incur a delivery fee of ৳100.",
    },
    {
      icon: DollarSign,
      title: "Transparent Shipping Costs",
      description:
        "No hidden fees — simple, fixed delivery charges based on your order weight, so you always know what you pay.",
    },
    {
      icon: Headphones,
      title: "Dedicated Customer Support",
      description:
        "Our support team is available 24/7 to assist you with orders, delivery inquiries, and any questions you may have.",
    },
    {
      icon: Gift,
      title: "Rewards Program Coming Soon",
      description:
        "Stay tuned and follow us for updates on exciting rewards and promotions.",
    },
  ];

  return (
    <section className="py-10 bg-white min-h-[60vh] flex items-center justify-center">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center max-w-xs mx-auto"
            >
              <div className="bg-[#f2f5e9] rounded-full p-4 mb-6 md:mb-4 w-16 h-16 flex items-center justify-center">
                <feature.icon className="w-6 h-6 text-gray-700" />
              </div>
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
