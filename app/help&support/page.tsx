import {
  Phone,
  Mail,
  MessageCircle,
  Clock,
  MapPin,
  Headphones,
  FileText,
  CreditCard,
  Package,
  Truck,
  User,
  Settings,
  HelpCircle,
  Search,
  ArrowRight,
} from "lucide-react";

export default function HelpSupport() {
  const contactMethods = [
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with our support team",
      contact: "01785250717",
      availability: "24/7 Available",
      color: "green",
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Get instant help through live chat",
      contact: "Start Chat",
      availability: "Response within 2 minutes",
      color: "blue",
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us your questions via email",
      contact: "support@amart.com.bd",
      availability: "Response within 4 hours",
      color: "purple",
    },
  ];

  const supportCategories = [
    {
      icon: Package,
      title: "Order Issues",
      description:
        "Problems with your orders, missing items, or delivery issues",
      topics: [
        "Missing Items",
        "Wrong Products",
        "Order Cancellation",
        "Delivery Problems",
      ],
    },
    {
      icon: CreditCard,
      title: "Payment & Billing",
      description: "Payment problems, refunds, and billing inquiries",
      topics: [
        "Payment Failed",
        "Refund Status",
        "Billing Questions",
        "Payment Methods",
      ],
    },
    {
      icon: User,
      title: "Account Help",
      description: "Account creation, login issues, and profile management",
      topics: [
        "Login Problems",
        "Password Reset",
        "Account Settings",
        "Profile Update",
      ],
    },
    {
      icon: Truck,
      title: "Delivery Support",
      description: "Delivery scheduling, tracking, and location issues",
      topics: [
        "Delivery Tracking",
        "Schedule Change",
        "Address Update",
        "Delivery Areas",
      ],
    },
  ];

  const quickLinks = [
    {
      icon: FileText,
      title: "Order History",
      description: "View your past orders",
    },
    {
      icon: CreditCard,
      title: "Payment Methods",
      description: "Manage your payment options",
    },
    {
      icon: MapPin,
      title: "Delivery Addresses",
      description: "Update delivery locations",
    },
    {
      icon: Settings,
      title: "Account Settings",
      description: "Manage your account preferences",
    },
  ];

  const operatingHours = [
    { day: "Monday - Friday", hours: "8:00 AM - 10:00 PM" },
    { day: "Saturday", hours: "9:00 AM - 10:00 PM" },
    { day: "Sunday", hours: "10:00 AM - 8:00 PM" },
    { day: "Holidays", hours: "10:00 AM - 6:00 PM" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Help & Support
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              {`We're here to help you with any questions or issues you may have.`}
            </p>
            <div className="max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for help..."
                  className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Contact Methods */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Get in Touch
            </h2>
            <p className="text-lg text-gray-600">
              Choose the best way to reach us
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              const colorClasses = {
                green: "bg-green-100 text-green-600 border-green-200",
                blue: "bg-blue-100 text-blue-600 border-blue-200",
                purple: "bg-purple-100 text-purple-600 border-purple-200",
              };
              return (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center hover:shadow-md transition-shadow"
                >
                  <div
                    className={`p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center ${
                      colorClasses[method.color as keyof typeof colorClasses]
                    }`}
                  >
                    <Icon className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {method.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{method.description}</p>
                  <div className="text-lg font-semibold text-blue-600 mb-2">
                    {method.contact}
                  </div>
                  <div className="text-sm text-gray-500">
                    {method.availability}
                  </div>
                  <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Contact Now
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* Support Categories */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How Can We Help?
            </h2>
            <p className="text-lg text-gray-600">
              Find help for common issues and questions
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {supportCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-100 rounded-lg flex-shrink-0">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {category.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {category.description}
                      </p>
                      <div className="space-y-2">
                        {category.topics.map((topic, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600 cursor-pointer"
                          >
                            <ArrowRight className="w-4 h-4" />
                            <span>{topic}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Quick Links */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Quick Actions
            </h2>
            <p className="text-lg text-gray-600">
              Manage your account and orders
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="p-3 bg-gray-100 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                    <Icon className="w-8 h-8 text-gray-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm">
                    {link.title}
                  </h3>
                  <p className="text-xs text-gray-500">{link.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Operating Hours & Emergency */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Operating Hours */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-green-100 rounded-lg">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                Operating Hours
              </h3>
            </div>
            <div className="space-y-3">
              {operatingHours.map((schedule, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
                >
                  <span className="text-gray-700 font-medium">
                    {schedule.day}
                  </span>
                  <span className="text-gray-600">{schedule.hours}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Emergency Support */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <Headphones className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                Emergency Support
              </h3>
            </div>
            <p className="text-gray-700 mb-4">
              For urgent issues like food safety concerns or delivery
              emergencies, contact us immediately.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-red-600" />
                <span className="font-semibold text-red-600">
                  Emergency Hotline: 01785250717
                </span>
              </div>
              <div className="text-sm text-gray-600">
                Available 24/7 for urgent matters
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Link */}
        <section>
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-8 text-center">
            <div className="p-4 bg-white rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
              <HelpCircle className="w-10 h-10 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Still Have Questions?
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Check out our comprehensive FAQ section for quick answers to
              common questions.
            </p>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center gap-2">
              View FAQs
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
