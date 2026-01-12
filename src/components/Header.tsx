'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Menu,
  X,
  ChevronDown,
  Building2,
  Shield,
  Users,
  FileText,
  Phone,
  Award
} from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const navigation = [
    {
      name: 'About',
      href: '/about',
      dropdown: [
        { name: 'Our Story', href: '/about/story', icon: Building2 },
        { name: 'Leadership', href: '/about/leadership', icon: Users },
        { name: 'Governance', href: '/about/governance', icon: Shield },
      ]
    },
    {
      name: 'Sectors',
      href: '/sectors',
      dropdown: [
        { name: 'Education', href: '/sectors/education', icon: Building2 },
        { name: 'Healthcare', href: '/sectors/healthcare', icon: Building2 },
        { name: 'Commercial', href: '/sectors/commercial', icon: Building2 },
        { name: 'Residential', href: '/sectors/residential', icon: Building2 },
      ]
    },
    {
      name: 'Supply Chain',
      href: '/supply-chain',
      dropdown: [
        { name: 'Partner Portal', href: '/supply-chain/portal', icon: Users },
        { name: 'Prequalification', href: '/supply-chain/prequalification', icon: Shield },
        { name: 'Insurance Requirements', href: '/supply-chain/insurance', icon: FileText },
      ]
    },
    {
      name: 'SHEQ',
      href: '/sheq',
      dropdown: [
        { name: 'Health & Safety', href: '/sheq/health-safety', icon: Shield },
        { name: 'Environment', href: '/sheq/environment', icon: Building2 },
        { name: 'Quality', href: '/sheq/quality', icon: Award },
        { name: 'Golden Thread', href: '/sheq/golden-thread', icon: FileText },
      ]
    },
    { name: 'Projects', href: '/projects' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="bg-[#002147] text-white sticky top-0 z-50 shadow-lg">
      {/* Top bar */}
      <div className="bg-[#001530] border-b border-[#003366]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-10 text-sm">
            <div className="hidden md:flex items-center space-x-6 text-gray-300">
              <span className="flex items-center">
                <Phone className="h-3 w-3 mr-1" />
                023 9200 0000
              </span>
              <span>enquiries@valesouthern.co.uk</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/supply-chain/portal"
                className="text-gray-300 hover:text-[#c5a572] transition-colors"
              >
                Subcontractor Portal
              </Link>
              <span className="text-gray-600">|</span>
              <Link
                href="/admin"
                className="text-gray-300 hover:text-[#c5a572] transition-colors"
              >
                Project Lead Hub
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white rounded flex items-center justify-center">
              <span className="text-[#002147] font-bold text-xl">VS</span>
            </div>
            <div className="hidden sm:block">
              <div className="text-xl font-semibold tracking-tight">Vale Southern</div>
              <div className="text-xs text-[#c5a572] tracking-widest uppercase">Construction</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="flex items-center px-4 py-2 text-sm font-medium text-gray-200 hover:text-white hover:bg-[#003366] rounded transition-colors"
                >
                  {item.name}
                  {item.dropdown && <ChevronDown className="ml-1 h-4 w-4" />}
                </Link>

                {/* Dropdown */}
                {item.dropdown && activeDropdown === item.name && (
                  <div className="absolute left-0 mt-0 w-64 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50">
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#002147]"
                      >
                        <subItem.icon className="h-4 w-4 mr-3 text-[#707070]" />
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              href="/tender"
              className="px-6 py-2.5 bg-[#c5a572] text-[#002147] text-sm font-semibold rounded hover:bg-[#d4ba8f] transition-colors"
            >
              Submit Tender
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded hover:bg-[#003366]"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-[#001530] border-t border-[#003366]">
          <div className="px-4 py-4 space-y-2">
            {navigation.map((item) => (
              <div key={item.name}>
                <Link
                  href={item.href}
                  className="block px-4 py-3 text-gray-200 hover:bg-[#003366] rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
                {item.dropdown && (
                  <div className="ml-4 mt-1 space-y-1">
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className="block px-4 py-2 text-sm text-gray-400 hover:text-white"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link
              href="/tender"
              className="block mx-4 mt-4 px-4 py-3 bg-[#c5a572] text-[#002147] text-center font-semibold rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              Submit Tender
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
