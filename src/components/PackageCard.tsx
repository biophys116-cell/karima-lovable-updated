import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Star, ArrowRight } from 'lucide-react';
import { Package } from '@/lib/data-store';
import heroKaaba from '@/assets/hero-kaaba.jpg';
import madinah from '@/assets/madinah.jpg';
import ziyarat from '@/assets/ziyarat.jpg';

const images: Record<string, string> = { kaaba: heroKaaba, madinah, ziyarat };

export default function PackageCard({ pkg, index = 0 }: { pkg: Package; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
      className="group relative rounded-3xl overflow-hidden bg-white/40 dark:bg-black/40 backdrop-blur-3xl border border-white/50 dark:border-white/10 shadow-lg hover:shadow-[0_20px_40px_rgba(212,175,55,0.15)] transition-all duration-500 hover:-translate-y-2 flex flex-col"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none z-0" />
      
      <div className="relative h-56 overflow-hidden z-10 m-2 rounded-2xl">
        <img
          src={images[pkg.image] || heroKaaba}
          alt={pkg.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <span className="absolute top-4 left-4 px-4 py-1.5 rounded-full text-xs font-bold bg-white/20 backdrop-blur-md text-gold uppercase tracking-[0.2em] border border-white/20 shadow-md">
          {pkg.category}
        </span>
        <div className="absolute bottom-4 left-5 right-5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
          <h3 className="font-heading text-2xl font-bold text-white drop-shadow-md">{pkg.title}</h3>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow z-10">
        <p className="text-sm text-foreground/70 dark:text-white/70 line-clamp-2 mb-5 leading-relaxed font-light">
          {pkg.description}
        </p>
        
        <div className="flex items-center justify-between text-sm mb-6">
          <span className="flex items-center gap-2 text-foreground/80 font-medium">
            <Clock className="w-4 h-4 text-gold" /> {pkg.duration}
          </span>
          <span className="flex items-center gap-1.5 text-gold font-semibold bg-gold/10 px-2.5 py-1 rounded-lg">
            <Star className="w-4 h-4 fill-current" /> {pkg.rating}
          </span>
        </div>
        
        <div className="mt-auto flex items-center justify-between pt-5 border-t border-black/5 dark:border-white/10">
          <div>
            <span className="text-xs text-foreground/50 uppercase tracking-wider font-semibold">From</span>
            <p className="text-2xl font-heading font-bold text-foreground">
              ${pkg.price.toLocaleString()}
            </p>
          </div>
          <Link
            to={`/packages/${pkg.id}`}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gold/10 hover:bg-gold text-gold hover:text-black font-semibold text-sm transition-all duration-300 group/link shadow-sm hover:shadow-md"
          >
            View Details <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
