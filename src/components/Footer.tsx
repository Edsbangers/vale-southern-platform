'use client';

import Link from 'next/link';
import {
  MapPin,
  Phone,
  Mail,
  Linkedin,
  Twitter,
  Shield,
  Award,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

interface Accreditation {
  name: string;
  status: 'valid' | 'pending' | 'expired';
  validUntil: string;
  logo?: string;
}

const accreditations: Accreditation[] = [
  { name: 'ISO 9001:2015', status: 'valid', validUntil: '2025-12-31' },
  { name: 'ISO 14001:2015', status: 'valid', validUntil: '2025-12-31' },
  { name: 'ISO 45001:2018', status: 'valid', validUntil: '2025-12-31' },
  { name: 'CHAS Premier', status: 'valid', validUntil: '2025-08-15' },
  { name: 'Constructionline Gold', status: 'valid', validUntil: '2025-10-22' },
  { name: 'SafeContractor', status: 'valid', validUntil: '2025-09-30' },
];

export default function Footer() {
  return (
    <footer className="bg-[#002147] text-white">
      {/* Accreditation Ribbon */}
      <div className="bg-[#001530] border-b border-[#003366]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <Shield className="h-5 w-5 text-[#c5a572] mr-2" />
              <span className="text-sm font-medium text-gray-300">
                Audit Ready Status via PICMS.com
              </span>
              <span className="ml-2 flex items-center text-xs text-green-400">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-1 status-live"></span>
                LIVE
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {accreditations.map((acc) => (
                <div
                  key={acc.name}
                  className="flex items-center px-3 py-1.5 bg-[#002147] rounded border border-[#003366]"
                >
                  <CheckCircle2 className="h-4 w-4 text-green-400 mr-2" />
                  <span className="text-xs font-medium text-gray-300">{acc.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-white rounded flex items-center justify-center">
                <span className="text-[#002147] font-bold text-lg">VS</span>
              </div>
              <div>
                <div className="font-semibold">Vale Southern</div>
                <div className="text-xs text-[#c5a572]">Construction</div>
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Delivering certainty across the South of England. A trusted Tier 1 Main Contractor
              specialising in Education, Healthcare, Commercial, and Residential sectors.
            </p>
            <div className="flex space-x-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-[#003366] rounded hover:bg-[#004080] transition-colors"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-[#003366] rounded hover:bg-[#004080] transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#c5a572] mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {['About Us', 'Our Projects', 'Sectors', 'Careers', 'News', 'Contact'].map((link) => (
                <li key={link}>
                  <Link
                    href={`/${link.toLowerCase().replace(' ', '-')}`}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Supply Chain */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#c5a572] mb-4">
              Supply Chain
            </h3>
            <ul className="space-y-2">
              {[
                { name: 'Subcontractor Portal', href: '/supply-chain/portal' },
                { name: 'Prequalification', href: '/supply-chain/prequalification' },
                { name: 'Insurance Requirements', href: '/supply-chain/insurance' },
                { name: 'Tender Opportunities', href: '/tender' },
                { name: 'Payment Terms', href: '/supply-chain/payments' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors flex items-center"
                  >
                    {link.name}
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#c5a572] mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-4 w-4 text-[#c5a572] mt-1 mr-2 flex-shrink-0" />
                <span className="text-sm text-gray-400">
                  Vale House, Lakeside North Harbour<br />
                  Western Road, Portsmouth<br />
                  PO6 3EN
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-4 w-4 text-[#c5a572] mr-2" />
                <a
                  href="tel:02392000000"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  023 9200 0000
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-4 w-4 text-[#c5a572] mr-2" />
                <a
                  href="mailto:enquiries@valesouthern.co.uk"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  enquiries@valesouthern.co.uk
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[#003366]">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-500 mb-4 md:mb-0">
              © {new Date().getFullYear()} Vale Southern Construction Ltd. All rights reserved.
            </div>
            <div className="flex items-center space-x-6">
              <Link
                href="/privacy"
                className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookies"
                className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
              >
                Cookie Policy
              </Link>
              <Link
                href="/modern-slavery"
                className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
              >
                Modern Slavery Statement
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Golden Thread */}
      <div className="h-1 golden-thread"></div>
    </footer>
  );
}
