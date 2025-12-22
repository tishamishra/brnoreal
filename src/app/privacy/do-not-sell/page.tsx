"use client";

import { useTranslations } from "@/components/providers/locale-provider";
import Link from "next/link";

export default function DoNotSellPage() {
  const t = useTranslations();

  return (
    <div className="bg-site-canvas">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-neutral-900">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1d4ed8]/20 via-neutral-900/80 to-neutral-900/90" />
        <div className="container relative py-24 md:py-32">
          <div className="max-w-3xl space-y-6 text-white">
            <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] backdrop-blur">
              Privacy Rights
            </span>
            <h1 className="font-heading text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
              Do Not Sell My Personal Information
            </h1>
            <p className="text-lg text-white/90 md:text-xl">
              Your privacy matters to us. We respect your right to control how your personal information is used and shared.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="bg-site-canvas py-16 md:py-20">
        <div className="container">
          <div className="mx-auto max-w-4xl space-y-12">
            <div className="prose prose-neutral max-w-none space-y-8">
              <div className="rounded-3xl border border-soft bg-white p-8 shadow-sm">
                <h2 className="font-heading text-2xl font-semibold text-neutral-900 md:text-3xl">
                  We Do Not Sell Your Personal Information
                </h2>
                <p className="mt-4 leading-7 text-neutral-600">
                  Brno Real Estate does not sell, rent, or trade your personal information to third parties for their marketing purposes. We are committed to protecting your privacy and maintaining your trust.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-2xl font-semibold text-neutral-900 md:text-3xl">
                  Your Privacy Rights
                </h2>
                <p className="mt-4 leading-7 text-neutral-600">
                  You have the right to control your personal information. Under applicable privacy laws, you may have the following rights:
                </p>
                <ul className="mt-4 space-y-3 text-neutral-600">
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[color:var(--brand-500)]" />
                    <div>
                      <strong className="text-neutral-900">Right to Know:</strong> You have the right to know what personal information we collect, use, disclose, and sell (if applicable).
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[color:var(--brand-500)]" />
                    <div>
                      <strong className="text-neutral-900">Right to Delete:</strong> You have the right to request deletion of your personal information, subject to certain exceptions.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[color:var(--brand-500)]" />
                    <div>
                      <strong className="text-neutral-900">Right to Opt-Out:</strong> You have the right to opt-out of the sale of your personal information (though we do not sell your information).
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[color:var(--brand-500)]" />
                    <div>
                      <strong className="text-neutral-900">Right to Non-Discrimination:</strong> We will not discriminate against you for exercising your privacy rights.
                    </div>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="font-heading text-2xl font-semibold text-neutral-900 md:text-3xl">
                  How We Use Your Information
                </h2>
                <p className="mt-4 leading-7 text-neutral-600">
                  We use your personal information solely for the following purposes:
                </p>
                <ul className="mt-4 space-y-2 text-neutral-600">
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[color:var(--brand-500)]" />
                    <span>To provide and improve our real estate services</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[color:var(--brand-500)]" />
                    <span>To respond to your inquiries and provide customer support</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[color:var(--brand-500)]" />
                    <span>To send you property listings and market information (with your consent)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[color:var(--brand-500)]" />
                    <span>To process transactions and manage our business operations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[color:var(--brand-500)]" />
                    <span>To comply with legal obligations and protect our rights</span>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="font-heading text-2xl font-semibold text-neutral-900 md:text-3xl">
                  Exercising Your Rights
                </h2>
                <p className="mt-4 leading-7 text-neutral-600">
                  To exercise any of your privacy rights, please contact us using the information below. We will respond to your request within a reasonable timeframe and in accordance with applicable laws.
                </p>
                <div className="mt-6 rounded-2xl border border-soft bg-neutral-50 p-6">
                  <h3 className="font-heading text-lg font-semibold text-neutral-900">
                    Contact Us
                  </h3>
                  <div className="mt-4 space-y-2 text-neutral-600">
                    <p>
                      <strong>Email:</strong> privacy@brnoreality.cz
                    </p>
                    <p>
                      <strong>Phone:</strong> +420 539 012 345
                    </p>
                    <p>
                      <strong>Subject Line:</strong> "Privacy Rights Request"
                    </p>
                  </div>
                  <p className="mt-4 text-sm text-neutral-600">
                    Please include your full name, email address, and a description of the specific right you wish to exercise. We may need to verify your identity before processing your request.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="font-heading text-2xl font-semibold text-neutral-900 md:text-3xl">
                  Third-Party Services
                </h2>
                <p className="mt-4 leading-7 text-neutral-600">
                  We may use third-party service providers to help us operate our website and conduct our business. These service providers are contractually obligated to protect your information and use it only for the purposes we specify. We do not authorize these providers to sell your information.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-2xl font-semibold text-neutral-900 md:text-3xl">
                  Updates to This Notice
                </h2>
                <p className="mt-4 leading-7 text-neutral-600">
                  We may update this notice from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We encourage you to review this page periodically for the latest information about our privacy practices.
                </p>
              </div>

              <div className="rounded-3xl border border-soft bg-[color:var(--brand-50)] p-8">
                <h2 className="font-heading text-2xl font-semibold text-neutral-900 md:text-3xl">
                  Additional Information
                </h2>
                <p className="mt-4 leading-7 text-neutral-600">
                  For more detailed information about our privacy practices, please review our{" "}
                  <Link href="/privacy" className="font-semibold text-[color:var(--brand-600)] hover:underline">
                    Privacy Notice
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

