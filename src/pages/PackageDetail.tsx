import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Star, Check, ArrowLeft, ArrowRight } from 'lucide-react';
import { getPackageById } from '@/lib/data-store';
import { useAuth } from '@/contexts/AuthContext';
import heroKaaba from '@/assets/hero-kaaba.jpg';
import madinah from '@/assets/madinah.jpg';
import ziyarat from '@/assets/ziyarat.jpg';

const images: Record<string, string> = { kaaba: heroKaaba, madinah, ziyarat };

export default function PackageDetail() {
  const { id } = useParams();
  const pkg = getPackageById(id || '');
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  if (!pkg) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-3xl font-bold text-foreground mb-4">Package Not Found</h1>
          <Link to="/packages" className="text-gold hover:underline">Back to Packages</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Hero */}
      <div className="relative h-[50vh] overflow-hidden">
        <img src={images[pkg.image] || heroKaaba} alt={pkg.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-primary/30 to-transparent" />
        <div className="absolute bottom-8 left-0 right-0 container mx-auto px-4">
          <Link to="/packages" className="inline-flex items-center gap-1 text-sm text-primary-foreground/80 hover:text-primary-foreground mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Packages
          </Link>
          <span className="block px-3 py-1 w-fit rounded-full gold-gradient text-primary text-xs font-semibold uppercase tracking-wider mb-3">
            {pkg.category}
          </span>
          <h1 className="font-heading text-3xl md:text-5xl font-bold text-primary-foreground">{pkg.title}</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Content */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-4">Overview</h2>
              <p className="text-muted-foreground leading-relaxed">{pkg.longDescription}</p>
            </div>
            <div>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-4">Package Highlights</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {pkg.highlights.map(h => (
                  <div key={h} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <div className="w-6 h-6 rounded-full gold-gradient flex items-center justify-center flex-shrink-0">
                      <Check className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <span className="text-sm text-foreground">{h}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-4">What's Included</h2>
              <div className="flex flex-wrap gap-2">
                {pkg.includes.map(i => (
                  <span key={i} className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">{i}</span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Booking sidebar */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <div className="glass rounded-2xl p-6 sticky top-24 gold-glow">
              <div className="flex items-center justify-between mb-4">
                <span className="flex items-center gap-1 text-gold">
                  <Star className="w-5 h-5 fill-current" /> {pkg.rating}
                </span>
                <span className="flex items-center gap-1 text-muted-foreground text-sm">
                  <Clock className="w-4 h-4" /> {pkg.duration}
                </span>
              </div>
              <div className="mb-6">
                <span className="text-sm text-muted-foreground">Starting from</span>
                <p className="text-4xl font-heading font-bold text-foreground">${pkg.price.toLocaleString()}</p>
                <span className="text-sm text-muted-foreground">per person</span>
              </div>
              <button
                onClick={() => {
                  if (isLoggedIn) navigate(`/booking?package=${pkg.id}`);
                  else navigate('/login');
                }}
                className="w-full py-3 rounded-xl gold-gradient text-primary font-semibold text-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                Book Now <ArrowRight className="w-5 h-5" />
              </button>
              <p className="text-xs text-muted-foreground text-center mt-3">No hidden charges • Free cancellation</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
