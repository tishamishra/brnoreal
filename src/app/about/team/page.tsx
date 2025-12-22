"use client";

import Image from "next/image";
import Link from "next/link";
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  TrophyIcon,
  UsersIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/outline";
import { useTranslations } from "@/components/providers/locale-provider";

// Team members data
const teamMembers = [
  {
    id: "tereza-kralova",
    name: "Tereza Králová",
    title: "Senior Partner & Founder",
    region: "Brno & South Moravia",
    email: "tereza@brnoreality.cz",
    phone: "+420 539 012 345",
    specialties: ["Luxury Residences", "Heritage Properties", "Investment Advisory"],
    bio: "With over 15 years in Brno's real estate market, Tereza brings deep local knowledge and international perspective. She specializes in architecturally significant properties and high-net-worth client advisory.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "jan-novak",
    name: "Jan Novák",
    title: "Partner, Valuation & Market Intelligence",
    region: "Brno-střed, Masarykova čtvrť",
    email: "jan@brnoreality.cz",
    phone: "+420 539 012 346",
    specialties: ["Property Valuation", "Market Analysis", "Investment Strategy"],
    bio: "Jan leads our valuation practice and market intelligence division. His expertise in Brno's historic neighborhoods and emerging districts helps clients make informed investment decisions.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "martina-svobodova",
    name: "Martina Svobodová",
    title: "Senior Advisor, Relocation & Concierge",
    region: "Královo Pole, Technology Park",
    email: "martina@brnoreality.cz",
    phone: "+420 539 012 347",
    specialties: ["Relocation Services", "Expat Advisory", "Corporate Housing"],
    bio: "Martina specializes in helping international clients and expatriates navigate Brno's property market. Her multilingual expertise and relocation services ensure seamless transitions.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "petr-horak",
    name: "Petr Horák",
    title: "Senior Advisor, Commercial & Investment",
    region: "Prague, Olomouc",
    email: "petr@brnoreality.cz",
    phone: "+420 539 012 348",
    specialties: ["Commercial Real Estate", "Investment Buildings", "Portfolio Management"],
    bio: "Petr focuses on commercial properties and investment assets across the Czech Republic. His strategic approach helps institutional and private investors build diversified portfolios.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "eva-cernova",
    name: "Eva Černová",
    title: "Advisor, Marketing & Property Presentation",
    region: "Brno & South Moravia",
    email: "eva@brnoreality.cz",
    phone: "+420 539 012 349",
    specialties: ["Property Marketing", "Staging", "Digital Strategy"],
    bio: "Eva leads our marketing and property presentation division. Her creative approach ensures properties are showcased to their fullest potential, attracting the right buyers and tenants.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "lukas-prochazka",
    name: "Lukáš Procházka",
    title: "Advisor, Legal & Transaction Management",
    region: "Brno & South Moravia",
    email: "lukas@brnoreality.cz",
    phone: "+420 539 012 350",
    specialties: ["Transaction Management", "Legal Advisory", "Due Diligence"],
    bio: "Lukáš ensures every transaction is executed flawlessly. His legal expertise and attention to detail protect clients throughout the buying, selling, and leasing process.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
  },
];

const stats = [
  { label: "Team Members", value: "20+", icon: UsersIcon },
  { label: "Years Combined Experience", value: "150+", icon: TrophyIcon },
  { label: "Properties Sold", value: "500+", icon: BriefcaseIcon },
];

export default function TeamPage() {
  const t = useTranslations();

  return (
    <div className="bg-site-canvas">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-neutral-900">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1d4ed8]/20 via-neutral-900/80 to-neutral-900/90" />
        <div className="container relative py-24 md:py-32">
          <div className="max-w-3xl space-y-6 text-white">
            <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] backdrop-blur">
              Our Team
            </span>
            <h1 className="font-heading text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
              Meet the Team
            </h1>
            <p className="text-lg text-white/90 md:text-xl">
              Our locally rooted advisors offer discreet service, neighbourhood intelligence, and tailored strategies for every acquisition, sale, or relocation across Brno and South Moravia.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-b border-soft bg-white py-16">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-3">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="flex flex-col items-center gap-4 rounded-3xl border border-soft bg-white/80 p-8 text-center shadow-sm"
                >
                  <div className="rounded-full bg-[color:var(--brand-100)] p-4">
                    <Icon className="h-8 w-8 text-[color:var(--brand-600)]" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-heading text-4xl font-semibold text-neutral-900">
                      {stat.value}
                    </p>
                    <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
                      {stat.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Members Grid */}
      <section className="bg-site-canvas py-16 md:py-20">
        <div className="container space-y-12">
          <div className="text-center">
            <h2 className="font-heading text-3xl font-semibold text-neutral-900 md:text-4xl">
              Our Specialists
            </h2>
            <p className="mt-4 text-neutral-600">
              Each advisor brings deep expertise and local knowledge to serve your unique needs.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="group overflow-hidden rounded-3xl border border-soft bg-white shadow-[0_30px_60px_-40px_rgba(0,0,0,0.15)] transition hover:-translate-y-1 hover:shadow-[0_40px_70px_-45px_rgba(0,0,0,0.25)]"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-neutral-200">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <h3 className="font-heading text-2xl font-semibold">{member.name}</h3>
                    <p className="mt-1 text-sm text-white/90">{member.title}</p>
                  </div>
                </div>

                <div className="space-y-6 p-6">
                  <div className="flex items-center gap-2 text-sm text-neutral-600">
                    <MapPinIcon className="h-4 w-4" />
                    <span>{member.region}</span>
                  </div>

                  <p className="text-sm leading-7 text-neutral-600">{member.bio}</p>

                  <div>
                    <p className="mb-3 text-xs uppercase tracking-[0.3em] text-neutral-500">
                      Specialties
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {member.specialties.map((specialty) => (
                        <span
                          key={specialty}
                          className="rounded-full border border-soft bg-white px-3 py-1 text-xs font-semibold text-neutral-700"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 border-t border-soft pt-4">
                    <a
                      href={`mailto:${member.email}`}
                      className="flex items-center gap-2 text-sm text-neutral-700 transition hover:text-[color:var(--brand-600)]"
                    >
                      <EnvelopeIcon className="h-4 w-4" />
                      <span>{member.email}</span>
                    </a>
                    <a
                      href={`tel:${member.phone}`}
                      className="flex items-center gap-2 text-sm text-neutral-700 transition hover:text-[color:var(--brand-600)]"
                    >
                      <PhoneIcon className="h-4 w-4" />
                      <span>{member.phone}</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-soft bg-white py-16 md:py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl rounded-3xl border border-soft bg-gradient-to-br from-white to-neutral-50 p-12 text-center shadow-[0_30px_60px_-40px_rgba(0,0,0,0.15)]">
            <h2 className="font-heading text-3xl font-semibold text-neutral-900 md:text-4xl">
              Ready to Work With Us?
            </h2>
            <p className="mt-4 text-neutral-600">
              Connect with our team to discuss your property needs. We're here to guide you through every step.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn-primary">
                Get in Touch
              </Link>
              <Link href="/services" className="btn-secondary">
                Discover Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

