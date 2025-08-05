"use client";

import { Mail, Calendar, Shield, Users, Settings, Lock } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-6">
            <Calendar className="w-4 h-4" />
            <span>Last updated: August 5, 2025</span>
          </div>
          <div className="max-w-2xl mx-auto">
            <p className="text-lg text-gray-700 leading-relaxed">
              Welcome to Amart! We are committed to protecting your privacy and
              the security of your personal information.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-8 space-y-12">
            {/* Introduction */}
            <section>
              <p className="text-gray-700 leading-relaxed mb-6">
                {`This Privacy Policy explains how we collect, use, and share your
                information when you use our website, mobile application, and
                related services (collectively, the "Services"). By using our
                Services, you agree to the terms of this Privacy Policy and our
                Terms of Use.`}
              </p>
              <p className="text-gray-700 leading-relaxed">
                We encourage you to read this policy carefully and to check back
                periodically for any updates. If you have any questions, please
                contact us at{" "}
                <a
                  href="mailto:privacy@amart.com.bd"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  privacy@amart.com.bd
                </a>
                .
              </p>
            </section>

            {/* Information We Collect */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Information We Collect
                </h2>
              </div>

              <p className="text-gray-700 leading-relaxed mb-8">
                We collect several types of information to provide you with the
                best possible service.
              </p>

              <div className="space-y-8">
                {/* Information You Provide */}
                <div className="border-l-4 border-blue-500 pl-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    1. Information You Provide to Us
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    This includes information you give us when you create an
                    account, place an order, or interact with our Services. This
                    may include:
                  </p>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <strong>Personal Information:</strong> Your name,
                        address, email address, mobile phone number, and other
                        information you provide for your account, such as your
                        date of birth or gender.
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <strong>Order Information:</strong> Details about the
                        products you order, your purchase history, and delivery
                        instructions.
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <strong>Communications:</strong> Your correspondence
                        with our customer service team, your participation in
                        surveys or contests, and any feedback you provide.
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <strong>Payment Information:</strong> If you make a
                        purchase, we may collect and store billing information
                        and payment details to process your transactions. This
                        information is handled securely by our PCI-compliant
                        payment gateway partners.
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Information We Collect Automatically */}
                <div className="border-l-4 border-green-500 pl-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    2. Information We Collect Automatically
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    As you use our Services, we automatically collect certain
                    information about your device and your activity. This helps
                    us understand how our Services are being used and how we can
                    improve them. This information includes:
                  </p>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <strong>Usage Information:</strong> Details about how
                        you use our Services, such as the pages you view, the
                        products you search for, and the features you interact
                        with.
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <strong>Device Information:</strong> Your IP address,
                        operating system, browser type, device type, and unique
                        device identifiers.
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <strong>Location Information:</strong> With your
                        permission, our mobile application may collect real-time
                        location data to provide you with location-based
                        services, such as finding nearby stores or tracking your
                        delivery.
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <strong>Cookies and Tracking Technologies:</strong> We
                        use cookies and similar technologies to remember your
                        preferences, track your use of the Services, and deliver
                        relevant content and advertising.
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Information from Third Parties */}
                <div className="border-l-4 border-purple-500 pl-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    3. Information from Third Parties
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    We may receive information about you from third parties,
                    such as social media platforms if you choose to sign in
                    using your social media account. We may also get data from
                    marketing partners and researchers to improve our Services
                    and tailor our offers to you.
                  </p>
                </div>
              </div>
            </section>

            {/* How We Use Your Information */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Settings className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  How We Use Your Information
                </h2>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                We use the information we collect for several purposes to
                enhance your experience with Amart. This includes:
              </p>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Providing and Improving Services
                  </h4>
                  <p className="text-sm text-gray-700">
                    To process your orders, deliver your groceries, and
                    personalize your shopping experience by recommending
                    products you might like.
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Communication
                  </h4>
                  <p className="text-sm text-gray-700">
                    To send you important updates about your orders, respond to
                    your inquiries, and inform you about promotions, new
                    products, and other offers that may interest you.
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Security and Fraud Prevention
                  </h4>
                  <p className="text-sm text-gray-700">
                    To protect your account and our Services from fraudulent
                    activity and to ensure the safety of our platform and users.
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Analytics
                  </h4>
                  <p className="text-sm text-gray-700">
                    To analyze user behavior, understand market trends, and
                    improve the functionality and design of our website and app.
                  </p>
                </div>
              </div>
            </section>

            {/* How We Share Your Information */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Users className="w-6 h-6 text-orange-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  How We Share Your Information
                </h2>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                We may share your information with third parties in the
                following situations:
              </p>

              <div className="space-y-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Service Providers
                  </h4>
                  <p className="text-gray-700 text-sm">
                    We share your information with trusted partners who help us
                    run our business, such as delivery partners, payment
                    processors, and marketing and analytics providers. These
                    partners are required to keep your information confidential
                    and use it only for the purposes we specify.
                  </p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Sellers and Brands
                  </h4>
                  <p className="text-gray-700 text-sm">
                    To address feedback or resolve issues, we may share your
                    personal data with relevant brands or sellers. If you
                    participate in a contest or promotion run with a brand, we
                    may share your details with them as part of the campaign.
                  </p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Legal Compliance
                  </h4>
                  <p className="text-gray-700 text-sm">
                    We may disclose your information to law enforcement,
                    government agencies, or courts if required by law or to
                    protect our rights, property, or the safety of our users and
                    the public.
                  </p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Business Transfers
                  </h4>
                  <p className="text-gray-700 text-sm">
                    In the event of a merger, acquisition, or sale of our
                    assets, your information may be transferred to the new owner
                    as part of the transaction.
                  </p>
                </div>
              </div>
            </section>

            {/* Your Choices and Rights */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Your Choices and Rights
                </h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-semibold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Account Deletion
                    </h4>
                    <p className="text-gray-700 text-sm">
                      You can request to have your account permanently deleted
                      by contacting us at privacy@amart.com.bd. Please be aware
                      that some of your information may remain in our backup
                      systems for legal and administrative purposes.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-semibold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Communication Preferences
                    </h4>
                    <p className="text-gray-700 text-sm">
                      You can manage your email and notification settings in
                      your account profile. You can also unsubscribe from our
                      marketing emails by following the instructions in the
                      email.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-semibold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Location Services
                    </h4>
                    <p className="text-gray-700 text-sm">
                      {` You can enable or disable location services for our mobile
                      app at any time through your device's settings.
                  `}{" "}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Data Security */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-red-100 rounded-lg">
                  <Lock className="w-6 h-6 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Data Security
                </h2>
              </div>

              <div className="p-6 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border border-red-200">
                <p className="text-gray-700 leading-relaxed">
                  We take the security of your information seriously and use a
                  combination of physical, electronic, and managerial safeguards
                  to protect it. However, no data transmission over the internet
                  can be guaranteed to be 100% secure. You are also responsible
                  for keeping your account information, such as your password,
                  confidential.
                </p>
              </div>
            </section>

            {/* Contact Us */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Contact Us</h2>
              </div>

              <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-gray-700 leading-relaxed mb-4">
                  If you have any questions or concerns about this Privacy
                  Policy, please contact us at:
                </p>
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <a
                    href="mailto:privacy@amart.com.bd"
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    privacy@amart.com.bd
                  </a>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
