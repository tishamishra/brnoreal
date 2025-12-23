"use client";

import { useTranslations } from "@/components/providers/locale-provider";

export default function TermsPage() {
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
              Terms of Use
            </h1>
            <p className="text-lg text-white/90 md:text-xl">
              Please read these terms carefully before using our website and services. By accessing or using our services, you agree to be bound by these terms.
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
                  1. Acceptance of Terms
                </h2>
                <p className="mt-4 leading-7 text-neutral-600">
                  By accessing and using the Brno Real Estate website and services, you accept and agree to be bound by these Terms of Use and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-2xl font-semibold text-neutral-900 md:text-3xl">
                  2. Use License
                </h2>
                <p className="mt-4 leading-7 text-neutral-600">
                  Permission is granted to temporarily access the materials on Brno Real Estate's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                </p>
                <ul className="mt-4 space-y-2 text-neutral-600">
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[color:var(--brand-500)]" />
                    <span>Modify or copy the materials</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[color:var(--brand-500)]" />
                    <span>Use the materials for any commercial purpose or for any public display</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[color:var(--brand-500)]" />
                    <span>Attempt to reverse engineer any software contained on the website</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[color:var(--brand-500)]" />
                    <span>Remove any copyright or other proprietary notations from the materials</span>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="font-heading text-2xl font-semibold text-neutral-900 md:text-3xl">
                  3. Property Listings and Information
                </h2>
                <p className="mt-4 leading-7 text-neutral-600">
                  All property listings, descriptions, images, and information provided on this website are for informational purposes only. While we strive for accuracy, we do not guarantee the completeness, reliability, or accuracy of any property information. Property availability, pricing, and features are subject to change without notice.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-2xl font-semibold text-neutral-900 md:text-3xl">
                  4. User Conduct
                </h2>
                <p className="mt-4 leading-7 text-neutral-600">
                  You agree to use our website and services only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the website. Prohibited behavior includes:
                </p>
                <ul className="mt-4 space-y-2 text-neutral-600">
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[color:var(--brand-500)]" />
                    <span>Harassing, threatening, or defaming any person or entity</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[color:var(--brand-500)]" />
                    <span>Posting false, misleading, or fraudulent information</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[color:var(--brand-500)]" />
                    <span>Violating any applicable laws or regulations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[color:var(--brand-500)]" />
                    <span>Transmitting viruses, malware, or other harmful code</span>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="font-heading text-2xl font-semibold text-neutral-900 md:text-3xl">
                  5. Intellectual Property
                </h2>
                <p className="mt-4 leading-7 text-neutral-600">
                  The website and its original content, features, and functionality are owned by Brno Real Estate and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws. You may not reproduce, distribute, modify, create derivative works of, publicly display, or exploit any of our proprietary materials without our express written permission.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-2xl font-semibold text-neutral-900 md:text-3xl">
                  6. Disclaimer
                </h2>
                <p className="mt-4 leading-7 text-neutral-600">
                  The materials on Brno Real Estate's website are provided on an "as is" basis. Brno Real Estate makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-2xl font-semibold text-neutral-900 md:text-3xl">
                  7. Limitations of Liability
                </h2>
                <p className="mt-4 leading-7 text-neutral-600">
                  In no event shall Brno Real Estate or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Brno Real Estate's website, even if Brno Real Estate or a Brno Real Estate authorized representative has been notified orally or in writing of the possibility of such damage.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-2xl font-semibold text-neutral-900 md:text-3xl">
                  8. Accuracy of Materials
                </h2>
                <p className="mt-4 leading-7 text-neutral-600">
                  The materials appearing on Brno Real Estate's website could include technical, typographical, or photographic errors. Brno Real Estate does not warrant that any of the materials on its website are accurate, complete, or current. Brno Real Estate may make changes to the materials contained on its website at any time without notice.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-2xl font-semibold text-neutral-900 md:text-3xl">
                  9. Links to Third-Party Sites
                </h2>
                <p className="mt-4 leading-7 text-neutral-600">
                  Our website may contain links to third-party websites or services that are not owned or controlled by Brno Real Estate. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services. You acknowledge and agree that Brno Real Estate shall not be responsible or liable for any damage or loss caused by or in connection with the use of any such content, goods, or services.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-2xl font-semibold text-neutral-900 md:text-3xl">
                  10. Modifications
                </h2>
                <p className="mt-4 leading-7 text-neutral-600">
                  Brno Real Estate may revise these Terms of Use at any time without notice. By using this website, you are agreeing to be bound by the then current version of these Terms of Use.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-2xl font-semibold text-neutral-900 md:text-3xl">
                  11. Governing Law
                </h2>
                <p className="mt-4 leading-7 text-neutral-600">
                  These terms and conditions are governed by and construed in accordance with the laws of the Czech Republic. Any disputes relating to these terms shall be subject to the exclusive jurisdiction of the courts of the Czech Republic.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-2xl font-semibold text-neutral-900 md:text-3xl">
                  12. Contact Information
                </h2>
                <p className="mt-4 leading-7 text-neutral-600">
                  If you have any questions about these Terms of Use, please contact us:
                </p>
                <div className="mt-4 space-y-2 text-neutral-600">
                  <p>
                    <strong>Brno Real Estate</strong>
                  </p>
                  <p>Email: legal@brnoreality.cz</p>
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

