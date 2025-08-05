import {
  FileText,
  ShoppingCart,
  CreditCard,
  Truck,
  RotateCcw,
  User,
  ExternalLink,
  MessageSquare,
  Shield,
  Settings,
  Lock,
  Package,
  Copyright,
  Database,
  Mail,
  Edit,
  UserCheck,
  Scale,
  AlertTriangle,
  DollarSign,
  Phone,
  Globe,
} from "lucide-react";

export default function TermsConditions() {
  const sections = [
    { id: "introduction", title: "Introduction", icon: FileText },
    { id: "definitions", title: "Definitions", icon: FileText },
    { id: "ordering", title: "Ordering", icon: ShoppingCart },
    { id: "pricing", title: "Pricing & Payment", icon: CreditCard },
    { id: "delivery", title: "Delivery", icon: Truck },
    { id: "returns", title: "Returns & Refunds", icon: RotateCcw },
    { id: "responsibilities", title: "User Responsibilities", icon: User },
    { id: "linked", title: "Linked Websites", icon: ExternalLink },
    { id: "complaints", title: "Complaints", icon: MessageSquare },
    { id: "liability", title: "Limitations of Liability", icon: Shield },
    { id: "general", title: "General Terms", icon: Settings },
    { id: "security", title: "Account Security", icon: Lock },
    { id: "accuracy", title: "Product Accuracy", icon: Package },
    { id: "intellectual", title: "Intellectual Property", icon: Copyright },
    { id: "data", title: "Data Protection", icon: Database },
    { id: "marketing", title: "Marketing Communication", icon: Mail },
    { id: "amendments", title: "Amendments", icon: Edit },
    { id: "eligibility", title: "Eligibility", icon: UserCheck },
    { id: "disputes", title: "Dispute Resolution", icon: Scale },
    { id: "force", title: "Force Majeure", icon: AlertTriangle },
    { id: "pricing-accuracy", title: "Pricing Accuracy", icon: DollarSign },
    { id: "contact", title: "Contact Us", icon: Phone },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Terms and Conditions
          </h1>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Please read the following Terms and Conditions ("Terms") carefully
              before placing any order from Amart. By accessing this Website or
              placing an order via phone, our Website, or mobile applications,
              you agree to be bound by these Terms.
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Table of Contents - Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Table of Contents
              </h3>
              <nav className="space-y-2">
                {sections.map((section, index) => {
                  const Icon = section.icon;
                  return (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 p-2 rounded-md transition-colors"
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      <span className="text-xs font-medium mr-2">
                        {index + 1}.
                      </span>
                      <span className="truncate">{section.title}</span>
                    </a>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-8 space-y-12">
                {/* Section 1: Introduction */}
                <section id="introduction">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <FileText className="w-6 h-6 text-blue-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Section 1: Introduction
                    </h2>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    We are Amart (
                    <a
                      href="https://www.amart.com.bd"
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      www.amart.com.bd
                    </a>
                    ), your trusted online grocery partner.
                  </p>
                </section>

                {/* Section 2: Definitions */}
                <section id="definitions">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <FileText className="w-6 h-6 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Section 2: Definitions
                    </h2>
                  </div>
                  <div className="space-y-4">
                    {[
                      {
                        term: "Agreement",
                        definition:
                          "refers to these Terms and Conditions, our Privacy Policy, order instructions, and payment terms.",
                      },
                      {
                        term: "Privacy Policy",
                        definition:
                          "refers to our policy on how we collect, handle, and store your personal data.",
                      },
                      {
                        term: "You",
                        definition:
                          "refers to any individual using our services or purchasing from Amart.",
                      },
                      {
                        term: "We",
                        definition: "means Amart (www.amart.com.bd).",
                      },
                      {
                        term: "Goods",
                        definition:
                          "means any grocery or related product available on our Website.",
                      },
                      {
                        term: "Service(s)",
                        definition:
                          "refers to delivery, order handling, and other services offered by Amart.",
                      },
                      {
                        term: "Website",
                        definition:
                          "refers to our online portal, www.amart.com.bd, or affiliated mobile apps.",
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex gap-4 p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="text-sm font-semibold text-gray-900 min-w-0 flex-shrink-0">
                          2.{index + 1}. "{item.term}"
                        </div>
                        <div className="text-sm text-gray-700">
                          {item.definition}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Section 3: Ordering */}
                <section id="ordering">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <ShoppingCart className="w-6 h-6 text-purple-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Section 3: Ordering
                    </h2>
                  </div>
                  <div className="space-y-4">
                    {[
                      "Orders placed on Amart are subject to acceptance based on availability, location, payment, and system confirmation.",
                      "You agree that all goods ordered are for personal use and not for resale.",
                      "Age-restricted items may only be purchased by those of legal age.",
                      "You are responsible for safeguarding your account and login credentials.",
                      "We use secure protocols for order and payment processing but cannot be held liable for unauthorized access in the absence of negligence on our part.",
                      "Confirmation of order does not guarantee delivery—final acceptance depends on availability and logistics.",
                      "Amart reserves the right to communicate any changes or cancellations via SMS, call, or email.",
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white font-semibold text-xs">
                            3.{index + 1}
                          </span>
                        </div>
                        <p className="text-gray-700 text-sm">{item}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Section 4: Pricing & Payment */}
                <section id="pricing">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <CreditCard className="w-6 h-6 text-orange-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Section 4: Pricing & Payment
                    </h2>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    {[
                      {
                        title: "Pricing",
                        content:
                          "Prices shown include applicable VAT and are subject to change without notice.",
                      },
                      {
                        title: "Price Variations",
                        content:
                          "Final prices may vary due to product substitutions, weight differences, or market fluctuations.",
                      },
                      {
                        title: "Payment Methods",
                        content:
                          "Full payment is required before or at the time of delivery via cash, card, or mobile payments (e.g., bKash, Nagad).",
                      },
                      {
                        title: "Security",
                        content:
                          "All online transactions are processed via secure encryption technologies.",
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="p-4 border border-orange-200 rounded-lg bg-orange-50"
                      >
                        <h4 className="font-semibold text-gray-900 mb-2">
                          4.{index + 1}. {item.title}
                        </h4>
                        <p className="text-sm text-gray-700">{item.content}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Section 5: Delivery */}
                <section id="delivery">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Truck className="w-6 h-6 text-blue-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Section 5: Delivery
                    </h2>
                  </div>
                  <div className="space-y-4">
                    {[
                      "Delivery timelines are estimates only. Delays may occur due to weather, traffic, or other external factors.",
                      "Customers are responsible for ensuring someone is present to receive the delivery.",
                      "Failed deliveries due to incorrect information or unavailability may incur additional charges.",
                      "Not all locations may be serviceable; we reserve the right to cancel orders in such cases with prior notice.",
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg"
                      >
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-semibold text-xs">
                            5.{index + 1}
                          </span>
                        </div>
                        <p className="text-gray-700 text-sm">{item}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Section 6: Cancellation, Returns & Refunds */}
                <section id="returns">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <RotateCcw className="w-6 h-6 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Section 6: Cancellation, Returns & Refunds
                    </h2>
                  </div>
                  <div className="space-y-4">
                    {[
                      "Cancellations must be communicated immediately via our customer support.",
                      "Orders canceled before dispatch may be fully refunded.",
                      "In case of unavailable items or system errors, Amart may cancel the order and refund the customer.",
                      "If you receive wrong, damaged, or perished goods, you may reject them upon delivery.",
                      "Refunds are processed within 21 days to the original method of payment.",
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="border-l-4 border-green-500 pl-4 py-2"
                      >
                        <p className="text-gray-700 text-sm">
                          <span className="font-semibold">6.{index + 1}.</span>{" "}
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Sections 7-12: Condensed Format */}
                <div className="grid gap-8 md:grid-cols-2">
                  {/* Section 7: User Responsibilities */}
                  <section
                    id="responsibilities"
                    className="p-6 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <User className="w-5 h-5 text-gray-600" />
                      <h3 className="text-lg font-semibold text-gray-900">
                        Section 7: User Responsibilities
                      </h3>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>
                        7.1. You agree to provide accurate personal and delivery
                        information.
                      </li>
                      <li>
                        7.2. You may request a copy of the personal data Amart
                        holds about you.
                      </li>
                    </ul>
                  </section>

                  {/* Section 8: Linked Websites */}
                  <section id="linked" className="p-6 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-4">
                      <ExternalLink className="w-5 h-5 text-gray-600" />
                      <h3 className="text-lg font-semibold text-gray-900">
                        Section 8: Linked Websites
                      </h3>
                    </div>
                    <p className="text-sm text-gray-700">
                      Amart may provide links to external websites for your
                      convenience. We do not control or endorse these sites and
                      are not responsible for their content or services.
                    </p>
                  </section>

                  {/* Section 9: Complaints */}
                  <section
                    id="complaints"
                    className="p-6 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <MessageSquare className="w-5 h-5 text-gray-600" />
                      <h3 className="text-lg font-semibold text-gray-900">
                        Section 9: Complaints
                      </h3>
                    </div>
                    <p className="text-sm text-gray-700">
                      We take customer feedback seriously. Please contact us at
                      [Insert Contact Info]. Complaints older than 6 months will
                      not be entertained.
                    </p>
                  </section>

                  {/* Section 12: User Account Security */}
                  <section id="security" className="p-6 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-4">
                      <Lock className="w-5 h-5 text-gray-600" />
                      <h3 className="text-lg font-semibold text-gray-900">
                        Section 12: User Account Security
                      </h3>
                    </div>
                    <p className="text-sm text-gray-700">
                      You are solely responsible for maintaining the
                      confidentiality of your Amart account. We are not liable
                      for unauthorized account activity.
                    </p>
                  </section>
                </div>

                {/* Section 10: Limitations of Liability */}
                <section id="liability">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <Shield className="w-6 h-6 text-red-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Section 10: Limitations of Liability
                    </h2>
                  </div>
                  <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
                    <div className="space-y-3">
                      <p className="text-sm text-gray-700">
                        <span className="font-semibold">10.1.</span> Amart shall
                        not be liable for indirect, incidental, or consequential
                        damages, including but not limited to lost profits or
                        data.
                      </p>
                      <p className="text-sm text-gray-700">
                        <span className="font-semibold">10.2.</span> We are not
                        liable for delivery delays or website errors beyond our
                        reasonable control.
                      </p>
                      <p className="text-sm text-gray-700">
                        <span className="font-semibold">10.3.</span> Our
                        liability is limited to the amount paid by you for the
                        specific goods or services in question.
                      </p>
                      <p className="text-sm text-gray-700">
                        <span className="font-semibold">10.4.</span> We do not
                        guarantee uninterrupted access to our Website or that it
                        will be free from viruses or other harmful components.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Section 11: General Terms */}
                <section id="general">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                      <Settings className="w-6 h-6 text-indigo-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Section 11: General Terms
                    </h2>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    {[
                      "All transactions are conducted in Bangladeshi Taka (BDT).",
                      "We reserve the right to change or update these Terms without prior notice.",
                      "Use of automation or scraping tools on our Website is strictly prohibited.",
                      "If any provision in this Agreement is deemed invalid, the rest will remain enforceable.",
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="p-3 border border-indigo-200 rounded-lg"
                      >
                        <p className="text-sm text-gray-700">
                          <span className="font-semibold">11.{index + 1}.</span>{" "}
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Remaining Sections in Compact Format */}
                <div className="space-y-6">
                  {[
                    {
                      id: "accuracy",
                      title: "Section 13: Product Accuracy & Return",
                      icon: Package,
                      content:
                        "Amart strives for product accuracy, but does not warrant that descriptions are error-free. Return policies apply as detailed on our Website.",
                    },
                    {
                      id: "intellectual",
                      title: "Section 14: Intellectual Property",
                      icon: Copyright,
                      content:
                        "All content on Amart's Website, including logos, text, images, and software, is protected by copyright and trademark law.",
                    },
                    {
                      id: "data",
                      title: "Section 15: Data Protection",
                      icon: Database,
                      content:
                        "We are committed to protecting your data as outlined in our [Privacy Policy]. We do not sell your information to third parties.",
                    },
                    {
                      id: "marketing",
                      title: "Section 16: Marketing Communication",
                      icon: Mail,
                      content:
                        "By using our services, you agree to receive communications, including marketing messages. You may opt out at any time.",
                    },
                    {
                      id: "amendments",
                      title: "Section 17: Amendments",
                      icon: Edit,
                      content:
                        "Amart reserves the right to amend these Terms at any time. Material changes will be communicated on our Website or by direct notice.",
                    },
                    {
                      id: "eligibility",
                      title: "Section 18: Eligibility",
                      icon: UserCheck,
                      content:
                        "You confirm that you are of legal age to enter into contracts and use Amart's services.",
                    },
                    {
                      id: "disputes",
                      title: "Section 19: Dispute Resolution",
                      icon: Scale,
                      content:
                        "Any disputes will be resolved through amicable mediation or arbitration in accordance with Bangladeshi law.",
                    },
                    {
                      id: "force",
                      title: "Section 20: Force Majeure & Limitations",
                      icon: AlertTriangle,
                      content:
                        "Amart is not liable for service failures due to events beyond our control (natural disasters, strikes, internet outages, etc.).",
                    },
                  ].map((section) => {
                    const Icon = section.icon;
                    return (
                      <section
                        key={section.id}
                        id={section.id}
                        className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg"
                      >
                        <div className="p-2 bg-gray-100 rounded-lg flex-shrink-0">
                          <Icon className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">
                            {section.title}
                          </h3>
                          <p className="text-sm text-gray-700">
                            {section.content}
                          </p>
                        </div>
                      </section>
                    );
                  })}
                </div>

                {/* Section 21: Pricing Accuracy */}
                <section id="pricing-accuracy">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <DollarSign className="w-6 h-6 text-yellow-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Section 21: Pricing Accuracy
                    </h2>
                  </div>
                  <div className="space-y-4">
                    {[
                      "Prices shown are subject to market fluctuations and may change without prior notice.",
                      "In case of pricing errors, Amart may cancel the order or adjust the amount.",
                      "If MRP is lower than listed, a refund or replacement will be offered.",
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200"
                      >
                        <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-semibold text-xs">
                            21.{index + 1}
                          </span>
                        </div>
                        <p className="text-gray-700 text-sm">{item}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Contact Us */}
                <section id="contact">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Phone className="w-6 h-6 text-blue-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Contact Us
                    </h2>
                  </div>
                  <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      For questions, complaints, or assistance:
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Globe className="w-5 h-5 text-blue-600" />
                        <span className="font-medium">Website:</span>
                        <a
                          href="https://www.amart.com.bd"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          www.amart.com.bd
                        </a>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-blue-600" />
                        <span className="font-medium">Phone:</span>
                        <span className="text-gray-700">01577-119901</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-blue-600" />
                        <span className="font-medium">Email:</span>
                        <span className="text-gray-700">
                          mahfuza0423@gmail.com
                        </span>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
