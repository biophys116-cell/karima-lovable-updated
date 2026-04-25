import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Menu, X, LogOut, User, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout, isAdmin, isLoggedIn } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { to: '/', label: 'Home' },
    { to: '/packages', label: 'Packages' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
        scrolled 
          ? 'bg-white/80 dark:bg-black/80 backdrop-blur-2xl border-white/20 dark:border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.05)] py-2' 
          : 'bg-transparent border-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-light via-gold to-gold-dark flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <span className="text-white font-heading font-bold text-lg drop-shadow-md">K</span>
          </div>
          <span className={`font-heading text-2xl font-bold tracking-wide transition-colors ${scrolled ? 'text-foreground' : 'text-white drop-shadow-md'}`}>
            Karima <span className="text-gold">Ahle-Bait</span>
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-10">
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className={`relative text-sm font-semibold tracking-wider uppercase transition-colors py-2 group ${
                scrolled ? (isActive(l.to) ? 'text-gold' : 'text-foreground/70 hover:text-gold') 
                         : (isActive(l.to) ? 'text-gold' : 'text-white/80 hover:text-white')
              }`}
            >
              {l.label}
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gold transform origin-left transition-transform duration-300 ${
                isActive(l.to) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              }`} />
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-6">
          {isLoggedIn ? (
            <>
              {isAdmin && (
                <Link to="/admin" className={`flex items-center gap-2 text-sm font-semibold transition-colors ${scrolled ? 'text-gold hover:text-gold-dark' : 'text-gold-light hover:text-white'}`}>
                  <Shield className="w-4 h-4" /> Admin
                </Link>
              )}
              <Link to="/portal" className={`flex items-center gap-2 text-sm font-semibold transition-colors ${scrolled ? 'text-foreground/70 hover:text-foreground' : 'text-white/80 hover:text-white'}`}>
                <User className="w-4 h-4" /> {user?.name}
              </Link>
              <button onClick={logout} className={`flex items-center gap-2 text-sm font-semibold transition-colors ${scrolled ? 'text-foreground/50 hover:text-destructive' : 'text-white/50 hover:text-destructive'}`}>
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={`text-sm font-semibold tracking-wider uppercase transition-colors ${scrolled ? 'text-foreground/70 hover:text-foreground' : 'text-white/80 hover:text-white'}`}>
                Login
              </Link>
              <Link to="/login?tab=register" className="text-sm font-bold uppercase tracking-wider px-6 py-2.5 rounded-full bg-gold text-white hover:scale-105 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all">
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button className={scrolled ? 'text-foreground md:hidden' : 'text-white md:hidden'} onClick={() => setOpen(!open)}>
          {open ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-black border-t border-border/30 shadow-2xl overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {links.map(l => (
                <Link key={l.to} to={l.to} onClick={() => setOpen(false)}
                  className={`text-lg font-heading font-bold ${isActive(l.to) ? 'text-gold' : 'text-foreground'}`}>
                  {l.label}
                </Link>
              ))}
              <hr className="border-border/30" />
              {isLoggedIn ? (
                <>
                  {isAdmin && <Link to="/admin" onClick={() => setOpen(false)} className="text-lg font-heading font-bold text-gold">Admin Dashboard</Link>}
                  <Link to="/portal" onClick={() => setOpen(false)} className="text-lg font-heading font-bold text-foreground">My Portal</Link>
                  <button onClick={async () => { await logout(); setOpen(false); }} className="text-lg font-heading font-bold text-destructive text-left">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setOpen(false)} className="text-lg font-heading font-bold text-foreground">Login</Link>
                  <Link to="/login?tab=register" onClick={() => setOpen(false)} className="text-lg font-heading font-bold text-gold">Register</Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
