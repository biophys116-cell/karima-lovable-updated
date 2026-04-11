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
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group glass rounded-2xl overflow-hidden card-hover"
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={images[pkg.image] || heroKaaba}
          alt={pkg.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
        <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold gold-gradient text-primary uppercase tracking-wider">
          {pkg.category}
        </span>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="font-heading text-lg font-bold text-primary-foreground">{pkg.title}</h3>
        </div>
      </div>
      <div className="p-5 flex flex-col gap-3">
        <p className="text-sm text-muted-foreground line-clamp-2">{pkg.description}</p>
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-1 text-muted-foreground">
            <Clock className="w-4 h-4" /> {pkg.duration}
          </span>
          <span className="flex items-center gap-1 text-gold">
            <Star className="w-4 h-4 fill-current" /> {pkg.rating}
          </span>
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div>
            <span className="text-xs text-muted-foreground">From</span>
            <p className="text-xl font-heading font-bold text-foreground">${pkg.price.toLocaleString()}</p>
          </div>
          <Link
            to={`/packages/${pkg.id}`}
            className="flex items-center gap-1 text-sm font-medium text-gold hover:text-gold-light transition-colors group/link"
          >
            View Details <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
