"use client";

import Image from "next/image";
import Link from "next/link";
import {
  HomeIcon,
  ChartBarIcon,
  BriefcaseIcon,
  MapPinIcon,
  DocumentTextIcon,
  UsersIcon,
  CurrencyDollarIcon,
  BuildingOfficeIcon,
  KeyIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import { useTranslations } from "@/components/providers/locale-provider";

const services = [
  {
    id: "residential-sales",
    icon: HomeIcon,
    title: "Residential Sales",
    description:
      "Expert guidance for buying and selling luxury residences, heritage villas, and architecturally significant properties across Brno and South Moravia.",
    features: [
      "Property valuation and market analysis",
      "Neighborhood intelligence and insights",
      "Discreet marketing and presentation",
      "Transaction management",
      "Due diligence support",
    ],
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "investment-advisory",
    icon: ChartBarIcon,
    title: "Investment Advisory",
    description:
      "Strategic investment guidance for building diversified property portfolios, from single acquisitions to institutional-scale investments.",
    features: [
      "Portfolio strategy and planning",
      "Market trend analysis",
      "ROI and yield calculations",
      "Risk assessment",
      "Exit strategy planning",
    ],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "commercial-real-estate",
    icon: BuildingOfficeIcon,
    title: "Commercial Real Estate",
    description:
      "Comprehensive services for office spaces, retail properties, mixed-use developments, and investment buildings.",
    features: [
      "Commercial property sourcing",
      "Lease negotiations",
      "Tenant representation",
      "Property management advisory",
      "Development consulting",
    ],
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "relocation-services",
    icon: MapPinIcon,
    title: "Relocation & Concierge",
    description:
      "Seamless relocation support for expatriates, international professionals, and families moving to Brno and the Czech Republic.",
    features: [
      "Neighborhood orientation",
      "School and amenities research",
      "Visa and documentation support",
      "Furnished property sourcing",
      "Ongoing concierge services",
    ],
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "valuation-services",
    icon: CurrencyDollarIcon,
    title: "Valuation & Market Intelligence",
    description:
      "Accurate property valuations and comprehensive market analysis to inform your real estate decisions.",
    features: [
      "Professional property appraisals",
      "Comparative market analysis",
      "Investment feasibility studies",
      "Market trend reports",
      "Neighborhood assessments",
    ],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "property-marketing",
    icon: DocumentTextIcon,
    title: "Property Marketing & Presentation",
    description:
      "Premium marketing strategies and property staging to showcase your property to its fullest potential.",
    features: [
      "Professional photography and videography",
      "Virtual tours and 3D visualization",
      "Luxury marketing materials",
      "Digital marketing campaigns",
      "Open house coordination",
    ],
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "legal-advisory",
    icon: ShieldCheckIcon,
    title: "Legal & Transaction Management",
    description:
      "Expert legal support and transaction management to ensure smooth, secure property transactions.",
    features: [
      "Contract review and negotiation",
      "Due diligence coordination",
      "Title verification",
      "Transaction documentation",
      "Post-closing support",
    ],
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "private-client",
    icon: UsersIcon,
    title: "Private Client Services",
    description:
      "Bespoke advisory services for high-net-worth individuals, families, and institutional clients.",
    features: [
      "Discreet property sourcing",
      "Confidential transactions",
      "Portfolio management",
      "Estate planning support",
      "Multi-generational wealth strategies",
    ],
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Initial Consultation",
    description: "We begin with a comprehensive discussion of your goals, preferences, and timeline.",
  },
  {
    number: "02",
    title: "Market Analysis",
    description: "Our team conducts thorough research and analysis tailored to your specific needs.",
  },
  {
    number: "03",
    title: "Strategy Development",
    description: "We create a customized strategy and action plan aligned with your objectives.",
  },
  {
    number: "04",
    title: "Execution",
    description: "Our specialists execute the plan with precision, keeping you informed every step.",
  },
  {
    number: "05",
    title: "Ongoing Support",
    description: "We provide continued support and advisory services to ensure long-term success.",
  },
];

export default function ServicesPage() {
  const t = useTranslations();

  return (
    <div className="bg-site-canvas">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-neutral-900">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1d4ed8]/20 via-neutral-900/80 to-neutral-900/90" />
        <div className="container relative py-24 md:py-32">
          <div className="max-w-3xl space-y-6 text-white">
            <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] backdrop-blur">
              Services
            </span>
            <h1 className="font-heading text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
              Discover Services
            </h1>
            <p className="text-lg text-white/90 md:text-xl">
              Comprehensive real estate advisory services tailored to your unique needs. From luxury residential sales to investment advisory, we provide expert guidance at every step.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-site-canvas py-16 md:py-20">
        <div className="container space-y-16">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isEven = index % 2 === 0;

            return (
              <div
                key={service.id}
                className={`grid gap-0 overflow-hidden rounded-3xl border border-soft bg-white shadow-[0_30px_60px_-40px_rgba(0,0,0,0.15)] md:grid-cols-2 ${
                  !isEven ? "md:grid-flow-row-dense" : ""
                }`}
              >
                <div
                  className={`relative aspect-[4/3] overflow-hidden ${
                    !isEven ? "md:order-2" : ""
                  }`}
                >
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/40" />
                </div>

                <div className="flex flex-col justify-center space-y-6 p-8 md:p-12">
                  <div className="flex items-center gap-4">
                    <div className="rounded-2xl bg-[color:var(--brand-100)] p-4">
                      <Icon className="h-8 w-8 text-[color:var(--brand-600)]" />
                    </div>
                    <h2 className="font-heading text-3xl font-semibold text-neutral-900 md:text-4xl">
                      {service.title}
                    </h2>
                  </div>

                  <p className="text-sm leading-7 text-neutral-600 md:text-base">
                    {service.description}
                  </p>

                  <div>
                    <p className="mb-4 text-xs uppercase tracking-[0.3em] text-neutral-500">
                      What's Included
                    </p>
                    <ul className="space-y-3">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[color:var(--brand-500)]" />
                          <span className="text-sm text-neutral-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Process Section */}
      <section className="border-t border-soft bg-white py-16 md:py-20">
        <div className="container space-y-12">
          <div className="text-center">
            <span className="inline-flex items-center rounded-full border border-soft bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-neutral-700">
              Our Process
            </span>
            <h2 className="mt-6 font-heading text-3xl font-semibold text-neutral-900 md:text-4xl">
              How We Work
            </h2>
            <p className="mt-4 text-neutral-600">
              A structured approach ensuring every engagement is tailored, transparent, and results-driven.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-5">
            {processSteps.map((step) => (
              <div
                key={step.number}
                className="group relative rounded-3xl border border-soft bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-4 font-heading text-5xl font-bold text-[color:var(--brand-200)]">
                  {step.number}
                </div>
                <h3 className="mb-2 font-heading text-lg font-semibold text-neutral-900">
                  {step.title}
                </h3>
                <p className="text-sm leading-6 text-neutral-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-soft bg-site-canvas py-16 md:py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl rounded-3xl border border-soft bg-gradient-to-br from-white to-neutral-50 p-12 text-center shadow-[0_30px_60px_-40px_rgba(0,0,0,0.15)]">
            <div className="mb-6 flex justify-center">
              <div className="rounded-full bg-[color:var(--brand-100)] p-4">
                <PhoneIcon className="h-8 w-8 text-[color:var(--brand-600)]" />
              </div>
            </div>
            <h2 className="font-heading text-3xl font-semibold text-neutral-900 md:text-4xl">
              Ready to Get Started?
            </h2>
            <p className="mt-4 text-neutral-600">
              Contact our team to discuss your real estate needs. We're here to provide expert guidance and personalized service.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn-primary">
                Schedule Consultation
              </Link>
              <Link href="/about/team" className="btn-secondary">
                Meet the Team
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

