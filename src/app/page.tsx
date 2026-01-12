import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import SectorsGrid from '@/components/SectorsGrid';
import AccreditationRibbon from '@/components/AccreditationRibbon';
import ValeConcierge from '@/components/ValeConcierge';
import Link from 'next/link';
import {
  Award,
  Target,
  Handshake,
  ShieldCheck,
  ArrowRight,
  Quote,
  Building2,
  MapPin
} from 'lucide-react';

const values = [
  {
    icon: ShieldCheck,
    title: 'Safety First',
    description: 'Zero harm is our non-negotiable commitment. Every decision prioritises the wellbeing of our people and communities.'
  },
  {
    icon: Target,
    title: 'Delivering Certainty',
    description: 'We deliver on our promises. Every project is completed to the highest standards, on time and within budget.'
  },
  {
    icon: Handshake,
    title: 'Partnership Approach',
    description: 'We build lasting relationships with clients, supply chain partners, and communities based on trust and mutual success.'
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'Continuous improvement drives everything we do. We never settle for "good enough" when better is possible.'
  }
];

const featuredProjects = [
  {
    title: 'Portsmouth Hospital Critical Care',
    sector: 'Healthcare',
    value: '£45M',
    location: 'Portsmouth',
    image: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=600'
  },
  {
    title: 'Southampton University Engineering',
    sector: 'Education',
    value: '£32M',
    location: 'Southampton',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=600'
  },
  {
    title: 'Lakeside Business Park',
    sector: 'Commercial',
    value: '£28M',
    location: 'Cosham',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600'
  }
];

const testimonials = [
  {
    quote: "Vale Southern's professionalism and commitment to our operational requirements was exceptional. They delivered a world-class facility while we maintained full hospital services.",
    author: "Sarah Mitchell",
    role: "Director of Estates",
    company: "Portsmouth Hospitals NHS Trust"
  },
  {
    quote: "Their understanding of the education sector and ability to work around term times made them the perfect partner for our campus expansion programme.",
    author: "Prof. David Chen",
    role: "Deputy Vice Chancellor",
    company: "University of Southampton"
  }
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <AccreditationRibbon />

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-[#002147]/5 text-[#002147] text-sm font-medium rounded-full mb-4">
              Our Foundation
            </span>
            <h2 className="text-4xl font-bold text-[#002147] mb-4">
              Values That Define Us
            </h2>
            <p className="text-lg text-[#707070] max-w-2xl mx-auto">
              For over four decades, these principles have guided every project we deliver.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-[#002147]/5 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-[#002147] transition-colors duration-300">
                  <value.icon className="h-8 w-8 text-[#002147] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-semibold text-[#002147] mb-3">{value.title}</h3>
                <p className="text-[#707070] text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sectors Grid */}
      <SectorsGrid />

      {/* Featured Projects */}
      <section className="py-20 bg-[#f8f9fa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div>
              <span className="inline-block px-4 py-1 bg-[#002147]/5 text-[#002147] text-sm font-medium rounded-full mb-4">
                Portfolio
              </span>
              <h2 className="text-4xl font-bold text-[#002147]">Featured Projects</h2>
            </div>
            <Link
              href="/projects"
              className="mt-4 md:mt-0 inline-flex items-center text-[#002147] font-medium hover:text-[#003366]"
            >
              View All Projects
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <Link
                key={index}
                href={`/projects/${project.title.toLowerCase().replace(/\s+/g, '-')}`}
                className="group bg-white rounded-2xl overflow-hidden corporate-card"
              >
                <div className="relative h-56 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url(${project.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 bg-[#c5a572] text-[#002147] text-xs font-semibold rounded-full">
                      {project.sector}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-[#002147] mb-2 group-hover:text-[#003366]">
                    {project.title}
                  </h3>
                  <div className="flex items-center justify-between text-sm text-[#707070]">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {project.location}
                    </div>
                    <div className="flex items-center">
                      <Building2 className="h-4 w-4 mr-1" />
                      {project.value}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-[#002147]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-white/10 text-white text-sm font-medium rounded-full mb-4">
              Testimonials
            </span>
            <h2 className="text-4xl font-bold text-white">What Our Clients Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <Quote className="h-10 w-10 text-[#c5a572] mb-6" />
                <p className="text-lg text-gray-300 mb-6 italic leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div>
                  <div className="font-semibold text-white">{testimonial.author}</div>
                  <div className="text-sm text-gray-400">{testimonial.role}</div>
                  <div className="text-sm text-[#c5a572]">{testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-[#002147] mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-lg text-[#707070] mb-8">
            Whether you&apos;re planning a new build, refurbishment, or complex infrastructure project,
            our team is ready to deliver certainty.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-4 bg-[#002147] text-white font-semibold rounded-lg hover:bg-[#003366] transition-colors"
            >
              Get in Touch
            </Link>
            <Link
              href="/tender"
              className="px-8 py-4 bg-[#c5a572] text-[#002147] font-semibold rounded-lg hover:bg-[#d4ba8f] transition-colors"
            >
              Submit a Tender
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <ValeConcierge />
    </main>
  );
}
