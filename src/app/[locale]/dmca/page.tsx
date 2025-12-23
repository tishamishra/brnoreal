"use client";

import { useTranslations } from "@/components/providers/locale-provider";

export default function DMCAPage() {
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
              DMCA Notice
            </h1>
            <p className="text-lg text-white/90 md:text-xl">
              Brno Real Estate respects the intellectual property rights of others and expects our users to do the same. This page outlines our policy regarding copyright infringement claims.
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
                  Digital Millennium Copyright Act (DMCA) Policy
                </h2>
                <p className="mt-4 leading-7 text-neutral-600">
                  Brno Real Estate ("we," "our," or "us") respects the intellectual property rights of others and expects our users to do the same. In accordance with the Digital Millennium Copyright Act of 1998 (DMCA), we will respond expeditiously to claims of copyright infringement committed using our service that are reported to our designated copyright agent.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-2xl font-semibold text-neutral-900 md:text-3xl">
                  Reporting Copyright Infringement
                </h2>
                <p className="mt-4 leading-7 text-neutral-600">
                  If you are a copyright owner, or authorized to act on behalf of one, and believe that your copyrighted work has been copied in a way that constitutes copyright infringement, please provide our copyright agent with the following information in writing:
                </p>
                <ol className="mt-4 space-y-3 text-neutral-600">
                  <li className="flex items-start gap-3">
                    <span className="mt-2 flex h-6 w-6 items-center justify-center rounded-full bg-[color:var(--brand-500)] text-xs font-semibold text-white">1</span>
                    <div>
                      <strong className="text-neutral-900">Identification of the copyrighted work:</strong> A physical or electronic signature of a person authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 flex h-6 w-6 items-center justify-center rounded-full bg-[color:var(--brand-500)] text-xs font-semibold text-white">2</span>
                    <div>
                      <strong className="text-neutral-900">Identification of the infringing material:</strong> Identification of the copyrighted work claimed to have been infringed, or, if multiple copyrighted works are covered by a single notification, a representative list of such works.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 flex h-6 w-6 items-center justify-center rounded-full bg-[color:var(--brand-500)] text-xs font-semibold text-white">3</span>
                    <div>
                      <strong className="text-neutral-900">Location of the material:</strong> Identification of the material that is claimed to be infringing or to be the subject of infringing activity and that is to be removed or access to which is to be disabled, and information reasonably sufficient to permit us to locate the material.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 flex h-6 w-6 items-center justify-center rounded-full bg-[color:var(--brand-500)] text-xs font-semibold text-white">4</span>
                    <div>
                      <strong className="text-neutral-900">Contact information:</strong> Information reasonably sufficient to permit us to contact you, such as an address, telephone number, and, if available, an electronic mail address.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 flex h-6 w-6 items-center justify-center rounded-full bg-[color:var(--brand-500)] text-xs font-semibold text-white">5</span>
                    <div>
                      <strong className="text-neutral-900">Good faith statement:</strong> A statement that you have a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 flex h-6 w-6 items-center justify-center rounded-full bg-[color:var(--brand-500)] text-xs font-semibold text-white">6</span>
                    <div>
                      <strong className="text-neutral-900">Accuracy statement:</strong> A statement that the information in the notification is accurate, and under penalty of perjury, that you are authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.
                    </div>
                  </li>
                </ol>
              </div>

              <div className="rounded-3xl border border-soft bg-white p-8 shadow-sm">
                <h2 className="font-heading text-2xl font-semibold text-neutral-900 md:text-3xl">
                  Designated Copyright Agent
                </h2>
                <p className="mt-4 leading-7 text-neutral-600">
                  Please send all DMCA notices to our designated copyright agent:
                </p>
                <div className="mt-6 space-y-2 text-neutral-600">
                  <p>
                    <strong>Brno Real Estate</strong>
                  </p>
                  <p>
                    <strong>Attn:</strong> Copyright Agent
                  </p>
                  <p>
                    <strong>Email:</strong> copyright@brnoreality.cz
                  </p>
                  <p>
                    <strong>Phone:</strong> +420 539 012 345
                  </p>
                  <p>
                    <strong>Subject Line:</strong> "DMCA Copyright Infringement Notice"
                  </p>
                </div>
                <p className="mt-4 text-sm text-neutral-600">
                  Please note that we may share your notice with the user who posted the allegedly infringing content, and we may publish your notice (with personal information redacted) on a publicly accessible website.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-2xl font-semibold text-neutral-900 md:text-3xl">
                  Counter-Notification
                </h2>
                <p className="mt-4 leading-7 text-neutral-600">
                  If you believe that your content was removed in error, you may submit a counter-notification. Your counter-notification must include:
                </p>
                <ul className="mt-4 space-y-2 text-neutral-600">
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[color:var(--brand-500)]" />
                    <span>Your physical or electronic signature</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[color:var(--brand-500)]" />
                    <span>Identification of the material that has been removed or to which access has been disabled and the location at which the material appeared before it was removed or disabled</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[color:var(--brand-500)]" />
                    <span>A statement under penalty of perjury that you have a good faith belief that the material was removed or disabled as a result of mistake or misidentification</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[color:var(--brand-500)]" />
                    <span>Your name, address, and telephone number, and a statement that you consent to the jurisdiction of the federal court in your district</span>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="font-heading text-2xl font-semibold text-neutral-900 md:text-3xl">
                  Repeat Infringers
                </h2>
                <p className="mt-4 leading-7 text-neutral-600">
                  It is our policy to terminate, in appropriate circumstances, the accounts of users who are repeat infringers of intellectual property rights.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-2xl font-semibold text-neutral-900 md:text-3xl">
                  False Claims
                </h2>
                <p className="mt-4 leading-7 text-neutral-600">
                  Please be aware that under Section 512(f) of the DMCA, any person who knowingly materially misrepresents that material or activity is infringing may be subject to liability for damages. Please ensure that you have a good faith belief that the material is actually infringing before submitting a notice.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-2xl font-semibold text-neutral-900 md:text-3xl">
                  Questions
                </h2>
                <p className="mt-4 leading-7 text-neutral-600">
                  If you have questions about this DMCA Notice or our copyright policy, please contact us at copyright@brnoreality.cz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

