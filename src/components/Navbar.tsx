import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Menu, X, LogOut, User, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout, isAdmin, isLoggedIn } = useAuth();
  const location = useLocation();

  const links = [
    { to: '/', label: 'Home' },
    { to: '/packages', label: 'Packages' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/30">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full gold-gradient flex items-center justify-center">
            <span className="text-primary font-heading font-bold text-sm">K</span>
          </div>
          <span className="font-heading text-xl font-bold text-foreground">
            Karima <span className="text-gold">Ahle-Bait</span>
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-sm font-medium transition-colors hover:text-gold ${
                isActive(l.to) ? 'text-gold' : 'text-muted-foreground'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {isLoggedIn ? (
            <>
              {isAdmin && (
                <Link to="/admin" className="flex items-center gap-1 text-sm text-gold hover:text-gold-light transition-colors">
                  <Shield className="w-4 h-4" /> Admin
                </Link>
              )}
              <Link to="/portal" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <User className="w-4 h-4" /> {user?.name}
              </Link>
              <button onClick={logout} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-destructive transition-colors">
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Login
              </Link>
              <Link to="/login?tab=register" className="text-sm font-medium px-4 py-2 rounded-lg gold-gradient text-primary hover:opacity-90 transition-opacity">
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-border/30 overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              {links.map(l => (
                <Link key={l.to} to={l.to} onClick={() => setOpen(false)}
                  className={`text-sm font-medium py-2 ${isActive(l.to) ? 'text-gold' : 'text-muted-foreground'}`}>
                  {l.label}
                </Link>
              ))}
              <hr className="border-border/30" />
              {isLoggedIn ? (
                <>
                  {isAdmin && <Link to="/admin" onClick={() => setOpen(false)} className="text-sm text-gold py-2">Admin Dashboard</Link>}
                  <Link to="/portal" onClick={() => setOpen(false)} className="text-sm text-muted-foreground py-2">My Portal</Link>
                  <button onClick={async () => { await logout(); setOpen(false); }} className="text-sm text-destructive py-2 text-left">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setOpen(false)} className="text-sm text-muted-foreground py-2">Login</Link>
                  <Link to="/login?tab=register" onClick={() => setOpen(false)} className="text-sm text-gold py-2">Register</Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
