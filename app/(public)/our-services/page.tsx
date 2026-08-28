import {
  ShoppingCart,
  Truck,
  Clock,
  Package,
  Headphones,
  CreditCard,
  Leaf,
  Home,
  Baby,
  Coffee,
  Utensils,
  Shirt,
  ArrowRight,
  CheckCircle,
  Star,
} from "lucide-react";

export default function OurServices() {
  const mainServices = [
    {
      icon: ShoppingCart,
      title: "Online Grocery Shopping",
      description:
        "Browse and shop from over 10,000 products including fresh produce, pantry staples, and household essentials.",
      features: [
        "10,000+ Products",
        "Fresh Produce",
        "Pantry Staples",
        "Household Items",
      ],
      color: "green",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description:
        "Get your groceries delivered to your doorstep with our reliable and fast delivery service.",
      features: [
        "Same-day Delivery",
        "Scheduled Delivery",
        "Express Delivery",
        "25+ Areas Covered",
      ],
      color: "blue",
    },
    {
      icon: Clock,
      title: "Flexible Timing",
      description:
        "Choose delivery slots that work for your schedule, from early morning to late evening.",
      features: [
        "Morning Slots",
        "Evening Slots",
        "Weekend Delivery",
        "Holiday Service",
      ],
      color: "purple",
    },
    {
      icon: Headphones,
      title: "24/7 Customer Support",
      description:
        "Our dedicated support team is always ready to help you with any questions or concerns.",
      features: [
        "Live Chat",
        "Phone Support",
        "Email Support",
        "Order Tracking",
      ],
      color: "orange",
    },
  ];

  const categories = [
    { icon: Leaf, name: "Fresh Produce", count: "500+ items", color: "green" },
    { icon: Coffee, name: "Beverages", count: "300+ items", color: "brown" },
    {
      icon: Utensils,
      name: "Cooking Essentials",
      count: "800+ items",
      color: "red",
    },
    { icon: Home, name: "Household Items", count: "600+ items", color: "blue" },
    { icon: Baby, name: "Baby Care", count: "200+ items", color: "pink" },
    {
      icon: Shirt,
      name: "Personal Care",
      count: "400+ items",
      color: "purple",
    },
  ];

  const deliveryOptions = [
    {
      title: "Light Orders",
      weight: "Up to 2 kg",
      price: "৳40",
      description: "Perfect for small grocery runs and essentials",
      features: [
        "Ideal for 1-2 person households",
        "Quick essentials delivery",
        "Fruits, vegetables, dairy",
        "Same-day delivery available",
      ],
      popular: false,
    },
    {
      title: "Standard Orders",
      weight: "2 kg - 10 kg",
      price: "৳60",
      description: "Great for weekly family grocery shopping",
      features: [
        "Perfect for family of 3-4",
        "Complete grocery shopping",
        "Bulk items included",
        "Most popular choice",
      ],
      popular: true,
    },
    {
      title: "Bulk Orders",
      weight: "Over 10 kg",
      price: "৳100",
      description: "Ideal for large families and bulk purchases",
      features: [
        "Large family orders",
        "Monthly stock-up",
        "Wholesale quantities",
        "Special handling included",
      ],
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Services
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Comprehensive grocery solutions designed to make your life easier
              and more convenient.
            </p>
            <div className="flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>10,000+ Products</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>Same-day Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Main Services */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What We Offer
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need for a complete grocery shopping experience
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {mainServices.map((service, index) => {
              const Icon = service.icon;
              const colorClasses = {
                green: "bg-green-100 text-green-600 border-green-200",
                blue: "bg-blue-100 text-blue-600 border-blue-200",
                purple: "bg-purple-100 text-purple-600 border-purple-200",
                orange: "bg-orange-100 text-orange-600 border-orange-200",
              };
              return (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                >
                  <div
                    className={`p-3 rounded-lg w-16 h-16 mb-4 flex items-center justify-center ${
                      colorClasses[service.color as keyof typeof colorClasses]
                    }`}
                  >
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {service.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-sm text-gray-700"
                      >
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Product Categories */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-lg text-gray-600">
              Explore our wide range of product categories
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="p-3 bg-gray-100 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                    <Icon className="w-8 h-8 text-gray-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm">
                    {category.name}
                  </h3>
                  <p className="text-xs text-gray-500">{category.count}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Delivery Options */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Delivery Options
            </h2>
            <p className="text-lg text-gray-600">
              Choose the delivery option based on your order weight
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {deliveryOptions.map((option, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 relative hover:shadow-md transition-shadow"
              >
                <div className="text-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {option.title}
                  </h3>
                  <div className="text-3xl font-bold text-green-600 mb-1">
                    {option.price}
                  </div>
                  <div className="text-sm text-gray-500 font-medium">
                    {option.weight}
                  </div>
                </div>
                <p className="text-gray-600 text-center mb-4">
                  {option.description}
                </p>
                <div className="space-y-2">
                  {option.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-sm text-gray-700"
                    >
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                {option.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Additional Services */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Additional Services
              </h2>
              <p className="text-lg text-gray-600">
                Extra services to enhance your shopping experience
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Package,
                  title: "Bulk Orders",
                  description: "Special pricing for large quantity orders",
                },
                {
                  icon: CreditCard,
                  title: "Multiple Payment Options",
                  description: "Cash, card, mobile banking - pay your way",
                },
                {
                  icon: Star,
                  title: "Loyalty Program",
                  description: "Earn points and get exclusive discounts",
                },
                {
                  icon: Truck,
                  title: "Order Tracking",
                  description: "Real-time updates on your delivery status",
                },
              ].map((service, index) => {
                const Icon = service.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="p-3 bg-white rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-sm">
                      <Icon className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {service.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section>
          <div className="bg-green-600 text-white rounded-lg p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-6">
              Join thousands of satisfied customers and experience the
              convenience of Amart
            </p>
            <button className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2">
              Start Shopping Now
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
