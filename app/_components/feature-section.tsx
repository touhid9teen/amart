import {
  Headphones,
  Truck,
  DollarSign,
  Gift,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: Truck,
      title: "Affordable Grocery Delivery",
      description:
        "Doorstep delivery starting at ৳40 for orders up to 2 kg. For orders between 2 and 10 kg, a flat charge of ৳60 applies. Orders over 10 kg incur a delivery fee of ৳100.",
      color: "green",
      highlight: "Starting at ৳40",
    },
    {
      icon: DollarSign,
      title: "Transparent Shipping Costs",
      description:
        "No hidden fees — simple, fixed delivery charges based on your order weight, so you always know what you pay.",
      color: "blue",
      highlight: "No Hidden Fees",
    },
    {
      icon: Headphones,
      title: "Dedicated Customer Support",
      description:
        "Our support team is available 24/7 to assist you with orders, delivery inquiries, and any questions you may have.",
      color: "purple",
      highlight: "24/7 Available",
    },
    {
      icon: Gift,
      title: "Rewards Program Coming Soon",
      description:
        "Stay tuned and follow us for updates on exciting rewards and promotions.",
      color: "orange",
      highlight: "Coming Soon",
    },
  ];

  const colorClasses = {
    green: {
      bg: "bg-green-50",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      accent: "text-green-600",
      border: "border-green-200",
      hover: "hover:bg-green-50",
    },
    blue: {
      bg: "bg-blue-50",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      accent: "text-blue-600",
      border: "border-blue-200",
      hover: "hover:bg-blue-50",
    },
    purple: {
      bg: "bg-purple-50",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      accent: "text-purple-600",
      border: "border-purple-200",
      hover: "hover:bg-purple-50",
    },
    orange: {
      bg: "bg-orange-50",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
      accent: "text-orange-600",
      border: "border-orange-200",
      hover: "hover:bg-orange-50",
    },
  };

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <CheckCircle className="w-4 h-4" />
            Why Choose Amart
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Experience the Best in Grocery Delivery
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're committed to providing exceptional service with transparent
            pricing, reliable delivery, and outstanding customer support.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const colors =
              colorClasses[feature.color as keyof typeof colorClasses];

            return (
              <div
                key={index}
                className={`group relative bg-white rounded-xl shadow-sm border border-gray-200 p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${colors.hover}`}
              >
                {/* Icon Container */}
                <div className="relative mb-6">
                  <div
                    className={`${colors.iconBg} rounded-2xl p-4 w-20 h-20 flex items-center justify-center mx-auto transition-transform duration-300 group-hover:scale-110`}
                  >
                    <Icon className={`w-10 h-10 ${colors.iconColor}`} />
                  </div>
                  {/* Highlight Badge */}
                  <div
                    className={`absolute -top-2 -right-2 ${colors.bg} ${colors.border} border-2 rounded-full px-3 py-1`}
                  >
                    <span className={`text-xs font-semibold ${colors.accent}`}>
                      {feature.highlight}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm mb-4">
                    {feature.description}
                  </p>

                  {/* Learn More Link */}
                  <div className="flex items-center justify-center gap-1 text-sm font-medium text-gray-500 group-hover:text-gray-700 transition-colors">
                    <span>Learn more</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>

                {/* Decorative Element */}
                <div
                  className={`absolute top-0 left-0 w-full h-1 ${colors.bg} rounded-t-xl transition-all duration-300 group-hover:h-2`}
                ></div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Experience the Difference?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Join thousands of satisfied customers who trust Amart for their
              grocery needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2">
                Start Shopping
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {[
            { number: "50K+", label: "Happy Customers" },
            { number: "10K+", label: "Products Available" },
            { number: "25+", label: "Delivery Areas" },
            { number: "99%", label: "On-time Delivery" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {stat.number}
              </div>
              <div className="text-sm text-gray-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
