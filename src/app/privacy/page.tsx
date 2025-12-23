"use client";

import { useTranslations } from "@/components/providers/locale-provider";

export default function PrivacyPage() {
  const t = useTranslations();

  return (
    <div className="bg-site-canvas">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-neutral-900">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1d4ed8]/20 via-neutral-900/80 to-neutral-900/90" />
        <div className="container relative py-24 md:py-32">
          <div className="max-w-3xl space-y-6 text-white">
            <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] backdrop-blur">
              Legal
            </span>
            <h1 className="font-heading text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
              Privacy Notice
            </h1>
            <p className="text-lg text-white/90 md:text-xl">
              Your privacy is important to us. This notice explains how we collect, use, and protect your personal information.
            </p>
            <p className="text-sm text-white/70">
              Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="bg-site-canvas py-16 md:py-20">
        <div className="container">
          <div className="mx-auto max-w-4xl space-y-12">
            <div className="prose prose-neutral max-w-none space-y-8">
              <div>
                <h2 className="font-heading text-2xl font-semibold text-neutral-900 md:text-3xl">
                  1. Information We Collect
                </h2>
                <p className="mt-4 leading-7 text-neutral-600">
                  We collect information that you provide directly to us, including:
                </p>
                <ul className="mt-4 space-y-2 text-neutral-600">
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[color:var(--brand-500)]" />
                    <span>Name, email address, phone number, and mailing address when you contact us or submit inquiries</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[color:var(--brand-500)]" />
                    <span>Property preferences, search criteria, and listing information when you use our search features</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[color:var(--brand-500)]" />
                    <span>Information about properties you list with us, including property details, images, and pricing</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[color:var(--brand-500)]" />
                    <span>Payment information when you engage our services (processed securely through third-party providers)</span>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="font-heading text-2xl font-semibold text-neutral-900 md:text-3xl">
                  2. How We Use Your Information
                </h2>
                <p className="mt-4 leading-7 text-neutral-600">
                  We use the information we collect to:
                </p>
                <ul className="mt-4 space-y-2 text-neutral-600">
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[color:var(--brand-500)]" />
                    <span>Provide, maintain, and improve our real estate services</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[color:var(--brand-500)]" />
                    <span>Respond to your inquiries, requests, and provide customer support</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[color:var(--brand-500)]" />
                    <span>Send you property listings, market updates, and relevant information (with your consent)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[color:var(--brand-500)]" />
                    <span>Process transactions and send related information</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[color:var(--brand-500)]" />
                    <span>Detect, prevent, and address technical issues and security threats</span>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="font-heading text-2xl font-semibold text-neutral-900 md:text-3xl">
                  3. Information Sharing and Disclosure
                </h2>
                <p className="mt-4 leading-7 text-neutral-600">
                  We do not sell your personal information. We may share your information only in the following circumstances:
                </p>
                <ul className="mt-4 space-y-2 text-neutral-600">
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[color:var(--brand-500)]" />
                    <span>With your explicit consent</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[color:var(--brand-500)]" />
                    <span>To comply with legal obligations, court orders, or government requests</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[color:var(--brand-500)]" />
                    <span>To protect our rights, property, or safety, or that of our users or others</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[color:var(--brand-500)]" />
                    <span>With service providers who assist us in operating our website and conducting our business (under strict confidentiality agreements)</span>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="font-heading text-2xl font-semibold text-neutral-900 md:text-3xl">
                  4. Data Security
                </h2>
                <p className="mt-4 leading-7 text-neutral-600">
                  We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-2xl font-semibold text-neutral-900 md:text-3xl">
                  5. Your Rights
                </h2>
                <p className="mt-4 leading-7 text-neutral-600">
                  You have the right to:
                </p>
                <ul className="mt-4 space-y-2 text-neutral-600">
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[color:var(--brand-500)]" />
                    <span>Access and receive a copy of your personal information</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[color:var(--brand-500)]" />
                    <span>Request correction of inaccurate or incomplete information</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[color:var(--brand-500)]" />
                    <span>Request deletion of your personal information (subject to legal and contractual obligations)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[color:var(--brand-500)]" />
                    <span>Object to or restrict processing of your personal information</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[color:var(--brand-500)]" />
                    <span>Opt-out of marketing communications at any time</span>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="font-heading text-2xl font-semibold text-neutral-900 md:text-3xl">
                  6. Cookies and Tracking Technologies
                </h2>
                <p className="mt-4 leading-7 text-neutral-600">
                  We use cookies and similar tracking technologies to enhance your experience, analyze usage patterns, and personalize content. You can control cookies through your browser settings, though this may affect website functionality.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-2xl font-semibold text-neutral-900 md:text-3xl">
                  7. Third-Party Links
                </h2>
                <p className="mt-4 leading-7 text-neutral-600">
                  Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-2xl font-semibold text-neutral-900 md:text-3xl">
                  8. Children's Privacy
                </h2>
                <p className="mt-4 leading-7 text-neutral-600">
                  Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-2xl font-semibold text-neutral-900 md:text-3xl">
                  9. Changes to This Privacy Notice
                </h2>
                <p className="mt-4 leading-7 text-neutral-600">
                  We may update this Privacy Notice from time to time. We will notify you of any material changes by posting the new notice on this page and updating the "Last updated" date.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-2xl font-semibold text-neutral-900 md:text-3xl">
                  10. Contact Us
                </h2>
                <p className="mt-4 leading-7 text-neutral-600">
                  If you have questions about this Privacy Notice or wish to exercise your rights, please contact us:
                </p>
                <div className="mt-4 space-y-2 text-neutral-600">
                  <p>
                    <strong>Brno Real Estate</strong>
                  </p>
                  <p>Email: privacy@brnoreality.cz</p>
                  <p>Phone: +420 539 012 345</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


