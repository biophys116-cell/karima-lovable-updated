import { motion } from 'framer-motion';
import { Shield, Heart, Globe, Award } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import heroKaaba from '@/assets/hero-kaaba.jpg';
import madinah from '@/assets/madinah.jpg';

export default function About() {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <img src={madinah} alt="Masjid an-Nabawi" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/70 to-background" />
        <div className="relative z-10 text-center px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-gold text-sm font-semibold uppercase tracking-wider">Our Story</span>
            <h1 className="font-heading text-3xl md:text-5xl font-bold text-primary-foreground mt-3">About Karima Ahle-Bait Travels</h1>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <ScrollReveal>
            <div className="glass rounded-2xl p-8 md:p-12 mb-16">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                At Karima Ahle-Bait Travels, we believe every pilgrim deserves a journey that is spiritually enriching, comfortable, and worry-free. Founded with a deep reverence for the sacred sites of Islam, we have been helping Muslims from around the world fulfill their spiritual aspirations.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our dedicated team of experienced travel professionals works tirelessly to ensure every aspect of your pilgrimage is handled with the utmost care and attention to detail. From visa processing to luxury accommodation, from guided rituals to comfortable transportation — we leave no stone unturned.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
            {[
              { icon: Shield, title: 'Licensed & Certified', desc: 'Fully accredited by international travel authorities with proper Hajj and Umrah licenses.' },
              { icon: Heart, title: 'Pilgrim First', desc: 'Every package is designed with the spiritual needs and comfort of our pilgrims as the top priority.' },
              { icon: Globe, title: 'Global Reach', desc: 'Serving pilgrims from over 30 countries with multilingual support and local expertise.' },
              { icon: Award, title: 'Award Winning', desc: 'Recognized for excellence in Islamic travel services with multiple industry awards.' },
            ].map((f, i) => (
              <ScrollReveal key={f.title} delay={i * 0.1}>
                <div className="glass rounded-xl p-6 card-hover h-full">
                  <div className="w-12 h-12 rounded-xl gold-gradient flex items-center justify-center mb-4">
                    <f.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-foreground mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="relative rounded-2xl overflow-hidden h-64 md:h-80">
              <img src={heroKaaba} alt="Kaaba" loading="lazy" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-primary/50 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-2">10,000+</h3>
                  <p className="text-primary-foreground/80 text-lg">Pilgrims Served</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
