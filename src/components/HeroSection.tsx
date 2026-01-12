'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Play,
  Shield,
  Award,
  Building2,
  ChevronRight
} from 'lucide-react';

const heroSlides = [
  {
    title: 'Delivering Certainty',
    subtitle: 'Across the South of England',
    description: 'A trusted Tier 1 Main Contractor with 40 years of excellence in Education, Healthcare, Commercial, and Residential construction.',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920',
    cta: { text: 'Our Capabilities', href: '/about' }
  },
  {
    title: 'Portsmouth Hospital',
    subtitle: 'Critical Care Expansion',
    description: '£45M state-of-the-art critical care facility delivered on time with zero operational disruption to live hospital services.',
    image: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=1920',
    cta: { text: 'View Project', href: '/projects/portsmouth-hospital' }
  },
  {
    title: 'Southampton University',
    subtitle: 'Engineering Building',
    description: '£32M BREEAM Outstanding research facility featuring cutting-edge laboratory spaces and collaborative learning environments.',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=1920',
    cta: { text: 'View Project', href: '/projects/southampton-university' }
  }
];

const stats = [
  { value: '£120M', label: 'Annual Turnover', icon: Building2 },
  { value: '40+', label: 'Years Experience', icon: Award },
  { value: '98%', label: 'Client Satisfaction', icon: Shield },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        setIsTransitioning(false);
      }, 500);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const slide = heroSlides[currentSlide];

  return (
    <section className="relative h-[90vh] min-h-[700px] bg-[#002147] overflow-hidden">
      {/* Background Image */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
        style={{ backgroundImage: `url(${slide.image})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#002147] via-[#002147]/90 to-[#002147]/60" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className={`inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm mb-6 transition-all duration-500 ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
            <span className="w-2 h-2 bg-[#c5a572] rounded-full mr-2"></span>
            Tier 1 Main Contractor
          </div>

          {/* Title */}
          <h1 className={`text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-2 transition-all duration-500 delay-100 ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
            {slide.title}
          </h1>
          <p className={`text-2xl md:text-3xl text-[#c5a572] font-light mb-6 transition-all duration-500 delay-150 ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
            {slide.subtitle}
          </p>

          {/* Description */}
          <p className={`text-lg text-gray-300 mb-8 max-w-xl transition-all duration-500 delay-200 ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
            {slide.description}
          </p>

          {/* CTAs */}
          <div className={`flex flex-wrap items-center gap-4 transition-all duration-500 delay-300 ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
            <Link
              href={slide.cta.href}
              className="inline-flex items-center px-8 py-4 bg-[#c5a572] text-[#002147] font-semibold rounded-lg hover:bg-[#d4ba8f] transition-colors"
            >
              {slide.cta.text}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/tender"
              className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/20 transition-colors border border-white/20"
            >
              Submit a Tender
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </div>

          {/* Slide Indicators */}
          <div className="flex items-center space-x-2 mt-10">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsTransitioning(true);
                  setTimeout(() => {
                    setCurrentSlide(index);
                    setIsTransitioning(false);
                  }, 500);
                }}
                className={`h-1 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'w-12 bg-[#c5a572]' : 'w-4 bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-[#001530]/90 backdrop-blur-sm border-t border-[#003366]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 divide-x divide-[#003366]">
            {stats.map((stat, index) => (
              <div key={index} className="py-6 px-4 text-center">
                <div className="flex items-center justify-center mb-1">
                  <stat.icon className="h-5 w-5 text-[#c5a572] mr-2" />
                  <span className="text-2xl md:text-3xl font-bold text-white">{stat.value}</span>
                </div>
                <span className="text-sm text-gray-400">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
