import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Shield, Heart, Users, CheckCircle2 } from 'lucide-react';
import heroKaaba from '@/assets/hero-kaaba.jpg';
import madinah from '@/assets/madinah.jpg';
import ziyarat from '@/assets/ziyarat.jpg';
import patternBg from '@/assets/pattern-bg.jpg';
import PackageCard from '@/components/PackageCard';
import ScrollReveal from '@/components/ScrollReveal';
import Hero3D from '@/components/Hero3D';
import { getFeaturedPackages } from '@/lib/data-store';

export default function Index() {
  const featured = getFeaturedPackages();

  return (
    <div className="bg-background overflow-hidden selection:bg-gold selection:text-white">
      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Ken Burns Background */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-black">
          <img 
            src={heroKaaba} 
            alt="The Holy Kaaba" 
            className="w-full h-full object-cover ken-burns opacity-90" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-black/40 to-background mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        {/* 3D Shape overlaying the image */}
        <Hero3D />

        <div className="relative z-10 container mx-auto px-4 text-center mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <motion.span 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 1, type: "spring" }}
              className="inline-block px-8 py-2 rounded-full border border-gold/40 bg-white/10 backdrop-blur-md text-gold text-sm font-semibold mb-6 tracking-widest uppercase shadow-lg"
            >
              Exclusive Spiritual Journeys
            </motion.span>
            <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight drop-shadow-2xl">
              Sacred
              <br />
              <span className="text-gold drop-shadow-xl">Pilgrimage</span>
            </h1>
            <p className="text-lg md:text-2xl text-white/90 max-w-2xl mx-auto mb-10 font-light tracking-wide leading-relaxed">
              Premium packages crafted with exceptional care and divine comfort.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/packages" className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gold text-white font-bold text-lg overflow-hidden transition-all hover:scale-105 shadow-xl">
                <span className="relative z-10">Explore Packages</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-gold text-xs tracking-widest uppercase font-semibold">Scroll</span>
          <div className="w-5 h-8 rounded-full border border-gold flex justify-center pt-2">
            <div className="w-1 h-2 rounded-full bg-gold" />
          </div>
        </motion.div>
      </section>

      {/* Categories */}
      <section className="py-24 relative z-20 overflow-hidden">
        {/* Minimal Background Design */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />
        
        <div className="container mx-auto px-4 relative">
          <ScrollReveal>
            <div className="text-center mb-20 relative">
              <span className="text-gold text-sm font-semibold uppercase tracking-widest">Our Services</span>
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mt-4 text-foreground tracking-tight drop-shadow-sm">Choose Your Journey</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-6 rounded-full opacity-80" />
            </div>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative z-10">
            {[
              { title: 'Umrah', desc: 'Embark on a serene and profoundly spiritual visit to the Holy Kaaba.', img: heroKaaba, cat: 'umrah' },
              { title: 'Hajj', desc: 'Fulfill your sacred obligation with our comprehensive, premium Hajj services.', img: madinah, cat: 'hajj' },
              { title: 'Ziyarat', desc: 'Connect with Islamic heritage through guided tours to historic, sacred shrines.', img: ziyarat, cat: 'ziyarat' },
            ].map((c, i) => (
              <ScrollReveal key={c.cat} delay={i * 0.15}>
                <Link to={`/packages?category=${c.cat}`} className="group block relative h-[500px] lg:h-[600px] rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-700 hover:-translate-y-4 hover:shadow-[0_30px_60px_rgba(212,175,55,0.25)]">
                  {/* Glowing border effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gold/0 via-gold/0 to-gold/0 group-hover:from-gold/40 group-hover:via-transparent group-hover:to-gold/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-30 pointer-events-none rounded-[2.5rem]" />
                  <div className="absolute inset-[2px] bg-black rounded-[2.4rem] z-0" />

                  {/* Image with saturation and scale effects */}
                  <div className="absolute inset-[2px] z-10 rounded-[2.4rem] overflow-hidden bg-black">
                    <div className="absolute inset-0 bg-black/40 z-10 group-hover:bg-black/10 transition-colors duration-700" />
                    <img 
                      src={c.img} 
                      alt={c.title} 
                      loading="lazy" 
                      className="w-full h-full object-cover saturate-50 group-hover:saturate-100 group-hover:scale-110 transition-all duration-1000 ease-out opacity-80" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10 opacity-90 group-hover:opacity-70 transition-opacity duration-700" />
                  </div>
                  
                  {/* Content Overlay */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-end z-20">
                    <div className="relative">
                      {/* Decorative Gold Line */}
                      <div className="w-12 h-1 bg-gold mb-6 transform origin-left group-hover:scale-x-150 transition-transform duration-500" />
                      
                      <h3 className="font-heading text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-lg transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                        {c.title}
                      </h3>
                      
                      <div className="overflow-hidden">
                        <p className="text-white/80 text-lg leading-relaxed mb-8 transform translate-y-[120%] group-hover:translate-y-0 transition-transform duration-500 ease-out delay-75">
                          {c.desc}
                        </p>
                      </div>

                      <div className="transform translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out delay-150">
                        <span className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-gold/20 backdrop-blur-md border border-gold/50 text-gold font-bold uppercase tracking-widest text-sm hover:bg-gold hover:text-black transition-colors shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                          Discover More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Packages */}
      <section className="py-24 relative z-20 bg-muted/30 border-y border-border/50 overflow-hidden">
        {/* Minimal Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none">
          <img src={patternBg} alt="Islamic Pattern" className="w-full h-full object-cover" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <ScrollReveal>
              <span className="text-gold text-sm font-semibold uppercase tracking-widest">Featured</span>
              <h2 className="font-heading text-4xl md:text-5xl font-bold mt-3 text-foreground tracking-tight">Premium Packages</h2>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <Link to="/packages" className="hidden md:inline-flex items-center gap-2 text-primary font-semibold hover:text-gold transition-colors">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </ScrollReveal>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.map((pkg, i) => (
              <div key={pkg.id} className="glass rounded-[2rem] overflow-hidden p-2 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-gold/30">
                <PackageCard pkg={pkg} index={i} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 relative overflow-hidden bg-primary text-white z-20">
        <div className="absolute inset-0 opacity-5 mix-blend-overlay">
          <img src={patternBg} alt="" className="w-full h-full object-cover" loading="lazy" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <ScrollReveal>
                <span className="text-gold text-sm font-semibold uppercase tracking-widest">Excellence</span>
                <h2 className="font-heading text-4xl md:text-5xl font-bold mt-3 mb-6">
                  Spiritual Hospitality
                </h2>
                <p className="text-white/80 text-lg mb-8 leading-relaxed font-light">
                  Experience unmatched comfort and dedicated support so you can focus entirely on your devotion.
                </p>
                <ul className="space-y-4 mb-8">
                  {['5-Star Luxury Accommodations', '24/7 Ground Support', 'Complete Visa Processing'].map((item, i) => (
                    <motion.li 
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      key={i} 
                      className="flex items-center gap-3 text-white/90 font-medium"
                    >
                      <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </ScrollReveal>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { icon: Shield, title: 'Trusted', desc: 'Licensed operator.' },
                { icon: Star, title: 'Premium', desc: 'Luxury stays.' },
                { icon: Heart, title: 'Spiritual', desc: 'Devotion first.' },
                { icon: Users, title: '10K+', desc: 'Happy pilgrims.' },
              ].map((f, i) => (
                <ScrollReveal key={f.title} delay={i * 0.1}>
                  <div className="glass bg-white/10 border-white/20 rounded-3xl p-6 hover:bg-white/20 transition-colors duration-300">
                    <f.icon className="w-8 h-8 text-gold mb-4" />
                    <h3 className="font-heading text-lg font-bold mb-2 text-white">{f.title}</h3>
                    <p className="text-white/70 text-sm">{f.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
