import type { Metadata } from "next";
import { Montserrat, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const headingFont = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

const bodyFont = Source_Sans_3({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Brno Real Estate",
  description: "Premium residences, local expertise, and market intelligence for Brno and South Moravia.",
  icons: {
    // Cache-busted favicon (remote)
    icon: "https://ik.imagekit.io/affin/brno%20favicon.png?v=3",
    apple: "https://ik.imagekit.io/affin/brno%20favicon.png?v=3",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-site-canvas">
      <head>
        {/* Favicon */}
        <link rel="icon" type="image/png" href="https://ik.imagekit.io/affin/brno%20favicon.png?v=3" />
        <link rel="apple-touch-icon" href="https://ik.imagekit.io/affin/brno%20favicon.png?v=3" />
        {/* Hreflang tags for SEO - will be updated by locale layout */}
        <link rel="alternate" hrefLang="en" href="https://www.brnorealestate.com/en" />
        <link rel="alternate" hrefLang="cs" href="https://www.brnorealestate.com/cs" />
        <link rel="alternate" hrefLang="x-default" href="https://www.brnorealestate.com/en" />
      </head>
      <body
        className={`${headingFont.variable} ${bodyFont.variable} min-h-screen bg-site-canvas font-body text-neutral-950 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
