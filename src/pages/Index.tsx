import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Shield, Heart, Users } from 'lucide-react';
import heroKaaba from '@/assets/hero-kaaba.jpg';
import madinah from '@/assets/madinah.jpg';
import ziyarat from '@/assets/ziyarat.jpg';
import patternBg from '@/assets/pattern-bg.jpg';
import PackageCard from '@/components/PackageCard';
import ScrollReveal from '@/components/ScrollReveal';
import { getFeaturedPackages } from '@/lib/data-store';

export default function Index() {
  const featured = getFeaturedPackages();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroKaaba} alt="The Holy Kaaba" className="w-full h-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/50 to-background" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full gold-gradient text-primary text-sm font-semibold mb-6 tracking-wider uppercase">
              Your Spiritual Journey Awaits
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
              Begin Your Sacred
              <br />
              <span className="text-gold-gradient">Pilgrimage Today</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10">
              Premium Umrah, Hajj, and Ziyarat packages crafted with care, comfort, and devotion for a transformative spiritual experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/packages" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl gold-gradient text-primary font-semibold text-lg hover:opacity-90 transition-opacity shadow-lg">
                Explore Packages <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-primary-foreground/30 text-primary-foreground font-semibold text-lg hover:bg-primary-foreground/10 transition-colors">
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/40 flex justify-center pt-2">
            <div className="w-1.5 h-3 rounded-full bg-gold" />
          </div>
        </motion.div>
      </section>

      {/* Categories */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-gold text-sm font-semibold uppercase tracking-wider">Our Services</span>
              <h2 className="font-heading text-3xl md:text-5xl font-bold mt-3 text-foreground">Choose Your Journey</h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Umrah', desc: 'Visit the Holy Kaaba in Makkah with our carefully crafted packages.', img: heroKaaba, cat: 'umrah' },
              { title: 'Hajj', desc: 'Fulfill the fifth pillar of Islam with our comprehensive Hajj services.', img: madinah, cat: 'hajj' },
              { title: 'Ziyarat', desc: 'Sacred tours to Iran and Iraq visiting holy shrines and historical sites.', img: ziyarat, cat: 'ziyarat' },
            ].map((c, i) => (
              <ScrollReveal key={c.cat} delay={i * 0.15}>
                <Link to={`/packages?category=${c.cat}`} className="group block relative h-80 rounded-2xl overflow-hidden card-hover">
                  <img src={c.img} alt={c.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="font-heading text-2xl font-bold text-primary-foreground mb-2">{c.title}</h3>
                    <p className="text-sm text-primary-foreground/70">{c.desc}</p>
                    <span className="inline-flex items-center gap-1 text-gold text-sm font-medium mt-3 group-hover:gap-2 transition-all">
                      View Packages <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Packages */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-gold text-sm font-semibold uppercase tracking-wider">Featured</span>
              <h2 className="font-heading text-3xl md:text-5xl font-bold mt-3 text-foreground">Popular Packages</h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.map((pkg, i) => (
              <PackageCard key={pkg.id} pkg={pkg} index={i} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/packages" className="inline-flex items-center gap-2 px-8 py-3 rounded-xl border-2 border-gold text-gold font-semibold hover:bg-gold hover:text-primary transition-colors">
              View All Packages <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <img src={patternBg} alt="" className="w-full h-full object-cover" loading="lazy" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-gold text-sm font-semibold uppercase tracking-wider">Why Us</span>
              <h2 className="font-heading text-3xl md:text-5xl font-bold mt-3 text-foreground">Trusted by Thousands</h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Shield, title: 'Licensed & Trusted', desc: 'Fully licensed travel operator with years of experience.' },
              { icon: Star, title: 'Premium Service', desc: 'Luxury accommodations and personalized experiences.' },
              { icon: Heart, title: 'Spiritual Focus', desc: 'Every detail designed for your spiritual enrichment.' },
              { icon: Users, title: '10,000+ Pilgrims', desc: 'Thousands of satisfied pilgrims trust us every year.' },
            ].map((f, i) => (
              <ScrollReveal key={f.title} delay={i * 0.1}>
                <div className="glass rounded-2xl p-8 text-center card-hover">
                  <div className="w-16 h-16 rounded-2xl gold-gradient flex items-center justify-center mx-auto mb-5">
                    <f.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-heading text-lg font-bold mb-2 text-foreground">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 emerald-gradient relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <ScrollReveal>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-primary-foreground mb-6">
              Ready to Start Your <span className="text-gold-gradient">Journey?</span>
            </h2>
            <p className="text-primary-foreground/70 text-lg max-w-xl mx-auto mb-10">
              Book your spiritual pilgrimage today and let us handle every detail.
            </p>
            <Link to="/packages" className="inline-flex items-center gap-2 px-10 py-4 rounded-xl gold-gradient text-primary font-semibold text-lg hover:opacity-90 transition-opacity shadow-lg">
              Browse Packages <ArrowRight className="w-5 h-5" />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
