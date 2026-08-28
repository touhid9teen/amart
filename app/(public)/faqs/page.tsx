"use client";

import {
  ChevronDown,
  ChevronUp,
  Search,
  ShoppingCart,
  CreditCard,
  Truck,
  Package,
  User,
  HelpCircle,
  Phone,
  Mail,
} from "lucide-react";
import { useState } from "react";

export default function FAQs() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Questions", icon: HelpCircle },
    { id: "ordering", name: "Ordering", icon: ShoppingCart },
    { id: "payment", name: "Payment", icon: CreditCard },
    { id: "delivery", name: "Delivery", icon: Truck },
    { id: "products", name: "Products", icon: Package },
    { id: "account", name: "Account", icon: User },
  ];

  const faqs = [
    {
      category: "ordering",
      question: "How do I place an order on Amart?",
      answer:
        "To place an order, simply browse our website or mobile app, add items to your cart, select your delivery address and time slot, choose your payment method, and confirm your order. You'll receive a confirmation email with your order details.",
    },
    {
      category: "ordering",
      question: "What is the minimum order amount?",
      answer:
        "The minimum order amount is ৳100. Orders below this amount will incur a small order fee of ৳40.",
    },
    {
      category: "ordering",
      question: "Can I modify or cancel my order after placing it?",
      answer:
        "You can modify or cancel your order within 30 minutes of placing it, provided it hasn't been dispatched from our warehouse. After that, please contact our customer support for assistance.",
    },
    {
      category: "delivery",
      question: "What are your delivery areas?",
      answer: "We currently deliver to Mirpur, DOHS, in Bangladesh.",
    },
    {
      category: "delivery",
      question: "What are your delivery time slots?",
      answer: "You can choose a time slot that suits you best during checkout.",
    },
    {
      category: "delivery",
      question: "Do you offer same-day delivery?",
      answer:
        "Yes, we offer same-day delivery for orders placed before 2 PM, subject to availability and delivery area.",
    },
    {
      category: "delivery",
      question: "What if I'm not home during delivery?",
      answer:
        "Our delivery partner will call you before arrival. If you're not available, you can reschedule the delivery or authorize someone else to receive it. Failed deliveries may incur additional charges.",
    },
    {
      category: "payment",
      question: "What payment methods do you accept?",
      answer:
        "We accept cash on delivery, credit/debit cards, and mobile banking services like bKash, Nagad, and Rocket. All online payments are processed through secure, encrypted channels.",
    },
    {
      category: "payment",
      question: "Is it safe to pay online?",
      answer:
        "Yes, absolutely. We use industry-standard SSL encryption and work with PCI-compliant payment gateways to ensure your payment information is completely secure.",
    },
    {
      category: "payment",
      question: "How do refunds work?",
      answer:
        "Refunds are processed within 1 days to your original payment method. For cash on delivery orders, refunds are processed via bank transfer or mobile banking.",
    },
    {
      category: "products",
      question: "How do you ensure product freshness?",
      answer:
        "We source directly from trusted suppliers and local farmers. Our products are stored in temperature-controlled warehouses and delivered in insulated bags to maintain freshness.",
    },
    {
      category: "products",
      question: "What if I receive damaged or wrong products?",
      answer:
        "If you receive damaged, expired, or wrong products, you can reject them at the time of delivery or contact us within 24 hours. We'll provide a full refund or replacement.",
    },
    {
      category: "products",
      question: "Do you offer organic products?",
      answer:
        "Yes, we have a dedicated organic section with certified organic fruits, vegetables, and other products. Look for the 'Organic' label on product listings.",
    },
    {
      category: "account",
      question: "How do I create an account?",
      answer:
        "You can create an account by clicking 'Sign Up' on our website or app, entering your mobile number, and verifying it with the OTP sent to you. You can also sign up using your Google or Facebook account.",
    },
    {
      category: "account",
      question: "I forgot my password. How can I reset it?",
      answer:
        "Click on 'Forgot Password' on the login page, enter your registered mobile number or email, and follow the instructions sent to you to reset your password.",
    },
    {
      category: "account",
      question: "Can I have multiple delivery addresses?",
      answer:
        "Yes, you can save multiple delivery addresses in your account. During checkout, you can select which address you want your order delivered to.",
    },
  ];

  const filteredFAQs = faqs.filter((faq) => {
    const matchesCategory =
      selectedCategory === "all" || faq.category === selectedCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Find quick answers to common questions about shopping with Amart.
            </p>
            <div className="max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search FAQs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === category.id
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700 hover:bg-blue-50 border border-gray-200"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* FAQ List */}
        <div className="max-w-4xl mx-auto">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12">
              <HelpCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No FAQs found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search or category filter.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFAQs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-sm border border-gray-200"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 pr-4">
                      {faq.question}
                    </h3>
                    {openFAQ === index ? (
                      <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    )}
                  </button>
                  {openFAQ === index && (
                    <div className="px-6 pb-4">
                      <div className="border-t border-gray-100 pt-4">
                        <p className="text-gray-700 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Still Need Help */}
        <div className="mt-16">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Still Need Help?
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              {`Can't find what you're looking for? Our support team is here to help.`}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center justify-center gap-2">
                <Phone className="w-5 h-5" />
                Call Support
              </button>
              <button className="bg-white text-blue-600 border border-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-flex items-center justify-center gap-2">
                <Mail className="w-5 h-5" />
                Email Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
