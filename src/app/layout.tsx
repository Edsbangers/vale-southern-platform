import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vale Southern Construction | Tier 1 Main Contractor",
  description: "Vale Southern Construction - Delivering certainty across the South of England. A trusted Tier 1 Main Contractor specialising in Education, Healthcare, Commercial, and Residential sectors.",
  keywords: "construction, main contractor, Vale Southern, Portsmouth, Southampton, education, healthcare, commercial, residential, ISO 9001, ISO 14001, ISO 45001",
  openGraph: {
    title: "Vale Southern Construction | Delivering Certainty",
    description: "A trusted Tier 1 Main Contractor with 40 years of excellence in Education, Healthcare, Commercial, and Residential construction.",
    type: "website",
    locale: "en_GB",
    siteName: "Vale Southern Construction",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vale Southern Construction",
    description: "Delivering certainty across the South of England",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
