import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="emerald-gradient text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <h3 className="font-heading text-2xl font-bold mb-4">
              Karima <span className="text-gold">Ahle-Bait</span>
            </h3>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Your trusted partner for spiritual journeys to the Holy Lands. Premium Umrah, Hajj, and Ziyarat packages.
            </p>
          </div>
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4 text-gold">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {[{ to: '/', label: 'Home' }, { to: '/packages', label: 'Packages' }, { to: '/about', label: 'About Us' }, { to: '/contact', label: 'Contact' }].map(l => (
                <Link key={l.to} to={l.to} className="text-sm text-primary-foreground/70 hover:text-gold transition-colors">{l.label}</Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4 text-gold">Packages</h4>
            <div className="flex flex-col gap-2">
              {['Umrah Packages', 'Hajj Packages', 'Ziyarat Tours'].map(t => (
                <Link key={t} to="/packages" className="text-sm text-primary-foreground/70 hover:text-gold transition-colors">{t}</Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4 text-gold">Contact</h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-sm text-primary-foreground/70">
                <Phone className="w-4 h-4 text-gold" /> +1 (555) 123-4567
              </div>
              <div className="flex items-center gap-2 text-sm text-primary-foreground/70">
                <Mail className="w-4 h-4 text-gold" /> info@karimaahlebait.com
              </div>
              <div className="flex items-center gap-2 text-sm text-primary-foreground/70">
                <MapPin className="w-4 h-4 text-gold" /> 123 Spiritual Ave, Suite 100
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-primary-foreground/10 mt-12 pt-8 text-center text-sm text-primary-foreground/50">
          © {new Date().getFullYear()} Karima Ahle-Bait Travels. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
