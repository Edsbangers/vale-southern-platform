'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  Heart,
  Building,
  Home,
  ArrowRight,
  Award,
  Users,
  TrendingUp
} from 'lucide-react';

interface Sector {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  stats: {
    projects: number;
    value: string;
    team: number;
  };
  image: string;
  highlights: string[];
  color: string;
}

const sectors: Sector[] = [
  {
    id: 'education',
    name: 'Education',
    description: 'Delivering inspiring learning environments from primary schools to university campuses.',
    icon: GraduationCap,
    stats: {
      projects: 45,
      value: '£180M',
      team: 35
    },
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800',
    highlights: [
      'DfE Framework contractor',
      'Net zero carbon designs',
      'Minimal disruption methodology'
    ],
    color: '#1e40af'
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    description: 'Building critical healthcare infrastructure with zero operational impact.',
    icon: Heart,
    stats: {
      projects: 28,
      value: '£220M',
      team: 42
    },
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800',
    highlights: [
      'NHS framework partner',
      'Live hospital environment expertise',
      'HTM & HBN compliant'
    ],
    color: '#dc2626'
  },
  {
    id: 'commercial',
    name: 'Commercial',
    description: 'Creating dynamic workspaces that drive productivity and wellbeing.',
    icon: Building,
    stats: {
      projects: 52,
      value: '£150M',
      team: 28
    },
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
    highlights: [
      'BREEAM Excellent track record',
      'Fit-out specialists',
      'Cat A & B expertise'
    ],
    color: '#059669'
  },
  {
    id: 'residential',
    name: 'Residential',
    description: 'Crafting quality homes and mixed-use developments across the South.',
    icon: Home,
    stats: {
      projects: 35,
      value: '£280M',
      team: 55
    },
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
    highlights: [
      'Build to Rent specialists',
      'Affordable housing delivery',
      'Golden Thread compliant'
    ],
    color: '#7c3aed'
  }
];

export default function SectorsGrid() {
  const [hoveredSector, setHoveredSector] = useState<string | null>(null);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 bg-[#002147]/5 text-[#002147] text-sm font-medium rounded-full mb-4">
            Our Expertise
          </span>
          <h2 className="text-4xl font-bold text-[#002147] mb-4">
            Sector Specialisation
          </h2>
          <p className="text-lg text-[#707070] max-w-2xl mx-auto">
            Four decades of experience delivering complex projects across the South of England's
            most demanding sectors.
          </p>
        </div>

        {/* Sectors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sectors.map((sector) => (
            <Link
              key={sector.id}
              href={`/sectors/${sector.id}`}
              className="group relative overflow-hidden rounded-2xl bg-gray-100 corporate-card"
              onMouseEnter={() => setHoveredSector(sector.id)}
              onMouseLeave={() => setHoveredSector(null)}
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${sector.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#002147] via-[#002147]/70 to-transparent" />

              {/* Content */}
              <div className="relative p-8 min-h-[400px] flex flex-col justify-end text-white">
                {/* Icon Badge */}
                <div
                  className="absolute top-6 left-6 w-14 h-14 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: sector.color }}
                >
                  <sector.icon className="h-7 w-7 text-white" />
                </div>

                {/* Stats Row */}
                <div className="absolute top-6 right-6 flex items-center space-x-4">
                  <div className="flex items-center bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <Award className="h-4 w-4 mr-2 text-[#c5a572]" />
                    <span className="text-sm font-medium">{sector.stats.projects} Projects</span>
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="text-2xl font-bold mb-2">{sector.name}</h3>
                <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                  {sector.description}
                </p>

                {/* Highlights */}
                <div className="space-y-2 mb-6">
                  {sector.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-300">
                      <div className="w-1.5 h-1.5 bg-[#c5a572] rounded-full mr-2" />
                      {highlight}
                    </div>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between border-t border-white/20 pt-4">
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center">
                      <TrendingUp className="h-4 w-4 text-[#c5a572] mr-2" />
                      <span className="text-sm">{sector.stats.value} delivered</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-[#c5a572] mr-2" />
                      <span className="text-sm">{sector.stats.team} specialists</span>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex items-center text-[#c5a572] group-hover:translate-x-1 transition-transform">
                    <span className="text-sm font-medium mr-2">Explore</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center px-8 py-4 bg-[#002147] text-white font-medium rounded-lg hover:bg-[#003366] transition-colors"
          >
            View All Projects
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
