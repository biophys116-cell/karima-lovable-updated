import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import PackageCard from '@/components/PackageCard';
import ScrollReveal from '@/components/ScrollReveal';
import { getPackagesByCategory } from '@/lib/data-store';

const categories = [
  { key: 'all', label: 'All Packages' },
  { key: 'umrah', label: 'Umrah' },
  { key: 'hajj', label: 'Hajj' },
  { key: 'ziyarat', label: 'Ziyarat' },
];

export default function Packages() {
  const [params, setParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const category = params.get('category') || 'all';

  const packages = useMemo(() => {
    let pkgs = getPackagesByCategory(category);
    if (search) {
      const q = search.toLowerCase();
      pkgs = pkgs.filter(p => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    return pkgs;
  }, [category, search]);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="text-gold text-sm font-semibold uppercase tracking-wider">Explore</span>
            <h1 className="font-heading text-3xl md:text-5xl font-bold mt-3 text-foreground">Our Packages</h1>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              Discover our carefully curated spiritual travel packages
            </p>
          </div>
        </ScrollReveal>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-10">
          <div className="flex gap-2 flex-wrap justify-center">
            {categories.map(c => (
              <button
                key={c.key}
                onClick={() => setParams(c.key === 'all' ? {} : { category: c.key })}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  category === c.key
                    ? 'gold-gradient text-primary shadow-md'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search packages..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none text-sm"
            />
          </div>
        </div>

        {/* Grid */}
        {packages.length > 0 ? (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg, i) => (
              <PackageCard key={pkg.id} pkg={pkg} index={i} />
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-lg">No packages found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
