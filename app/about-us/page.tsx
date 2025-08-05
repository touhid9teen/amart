import {
  Heart,
  Users,
  Truck,
  Shield,
  Award,
  Clock,
  Leaf,
  CheckCircle,
  Star,
  MapPin,
} from "lucide-react";

export default function AboutUs() {
  const values = [
    {
      icon: Heart,
      title: "Customer First",
      description:
        "We prioritize our customers' needs and satisfaction above everything else.",
    },
    {
      icon: Leaf,
      title: "Fresh & Quality",
      description:
        "We ensure the highest quality fresh produce and groceries for your family.",
    },
    {
      icon: Clock,
      title: "Reliable Service",
      description: "Timely deliveries and consistent service you can count on.",
    },
    {
      icon: Shield,
      title: "Trust & Safety",
      description:
        "Secure transactions and safe handling of your personal information.",
    },
  ];

  const stats = [
    { number: "50,000+", label: "Happy Customers" },
    { number: "10,000+", label: "Products Available" },
    { number: "1", label: "Delivery Areas" },
    { number: "99%", label: "Customer Satisfaction" },
  ];

  // const team = [
  //   {
  //     name: "Ahmed Rahman",
  //     role: "Founder & CEO",
  //     image: "/placeholder.svg?height=200&width=200",
  //     description:
  //       "Passionate about bringing fresh groceries to every household in Bangladesh.",
  //   },
  //   {
  //     name: "Fatima Khan",
  //     role: "Head of Operations",
  //     image: "/placeholder.svg?height=200&width=200",
  //     description:
  //       "Ensures smooth operations and quality control across all our services.",
  //   },
  //   {
  //     name: "Mohammad Ali",
  //     role: "Technology Director",
  //     image: "/placeholder.svg?height=200&width=200",
  //     description:
  //       "Leading our digital transformation and platform development.",
  //   },
  // ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Amart</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Your trusted online grocery partner, delivering fresh quality
              products to your doorstep across Bangladesh.
            </p>
            <div className="flex items-center justify-center gap-2">
              <MapPin className="w-5 h-5" />
              <span>Serving Mirpur DOHS areas nationwide</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Our Story */}
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Story
              </h2>
              <div className="w-24 h-1 bg-green-500 mx-auto"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {`Founded in 2020, Amart began with a simple mission: to make fresh, quality groceries accessible to
                  every household in Bangladesh. What started as a small local delivery service has grown into one of
                  the country's most trusted online grocery platforms.`}
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {` We understand the challenges of modern life - busy schedules,
                  traffic congestion, and the need for fresh, quality products.
                  That's why we've built a platform that brings the market to
                  your doorstep, ensuring you never have to compromise on
                  quality or convenience.`}
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Today, we serve over 50,000 happy customers, offering more
                  than 10,000 products from trusted suppliers and local farmers.
                </p>
              </div>
              <div className="relative">
                {/* <img
                  src="/placeholder.svg?height=400&width=500"
                  alt="Amart warehouse"
                  className="rounded-lg shadow-lg"
                /> */}
                <div className="absolute -bottom-4 -right-4 bg-green-500 text-white p-4 rounded-lg">
                  <div className="text-2xl font-bold">2020</div>
                  <div className="text-sm">Founded</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center"
              >
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Our Values */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do at Amart
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center hover:shadow-md transition-shadow"
                >
                  <div className="p-3 bg-green-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Icon className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Our Team */}
        {/* <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {`The passionate people behind Amart's success`}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center"
              >
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-green-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.description}</p>
              </div>
            ))}
          </div>
        </section> */}

        {/* Why Choose Us */}
        <section>
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why Choose Amart?
              </h2>
              <p className="text-lg text-gray-600">
                {`Here's what makes us different`}
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: CheckCircle,
                  title: "Quality Guarantee",
                  description: "100% fresh products or your money back",
                },
                {
                  icon: Truck,
                  title: "Fast Delivery",
                  description: "Same-day delivery available in most areas",
                },
                {
                  icon: Star,
                  title: "Best Prices",
                  description: "Competitive prices with regular discounts",
                },
                {
                  icon: Users,
                  title: "24/7 Support",
                  description: "Round-the-clock customer service",
                },
                {
                  icon: Shield,
                  title: "Secure Shopping",
                  description: "Safe and secure payment options",
                },
                {
                  icon: Award,
                  title: "Trusted Brand",
                  description: "Rated #1 grocery delivery service",
                },
              ].map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex items-start gap-4">
                    <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
                      <Icon className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
