import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const [params] = useSearchParams();
  const [tab, setTab] = useState<'login' | 'register'>(params.get('tab') === 'register' ? 'register' : 'login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPass, setShowPass] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (tab === 'login') {
        // Validate login inputs
        if (!email || !password) {
          toast.error('Email and password are required');
          return;
        }

        const user = await login(email, password);
        if (user) {
          toast.success(`✅ Welcome back, ${user.name}!`);
          navigate(user.role === 'admin' ? '/admin' : '/portal');
        } else {
          toast.error('❌ Invalid email or password');
        }
      } else {
        // Register validation
        if (!name.trim()) {
          toast.error('Name is required');
          return;
        }

        if (password.length < 6) {
          toast.error('Password must be at least 6 characters');
          return;
        }

        const user = await register(name, email, password);
        if (user) {
          toast.success('✅ Account created successfully!');
          navigate('/portal');
        } else {
          toast.error('❌ Email already registered or invalid');
        }
      }
    } catch (error) {
      console.error('❌ Auth error:', error);
      const message = error instanceof Error ? error.message : 'Authentication failed';
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen pt-16 flex items-center justify-center bg-muted/30 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="glass rounded-2xl p-8 gold-glow">
          <div className="text-center mb-8">
            <h1 className="font-heading text-3xl font-bold text-foreground">
              {tab === 'login' ? 'Welcome Back' : 'Join Us'}
            </h1>
            <p className="text-muted-foreground text-sm mt-2">
              {tab === 'login' ? 'Sign in to your account' : 'Create your account'}
            </p>
          </div>

          <div className="flex rounded-lg bg-muted p-1 mb-6">
            {(['login', 'register'] as const).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                  tab === t ? 'bg-card shadow text-foreground' : 'text-muted-foreground'
                }`}
              >
                {t === 'login' ? 'Sign In' : 'Register'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {tab === 'register' && (
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none transition-all"
                  placeholder="Enter your name"
                  required
                />
              </div>
            )}
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none transition-all"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Password</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none transition-all pr-10"
                  placeholder="Enter your password"
                  required
                  minLength={4}
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <button type="submit" className="w-full py-3 rounded-lg gold-gradient text-primary font-semibold text-lg hover:opacity-90 transition-opacity mt-2">
              {tab === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          {tab === 'login' && (
            <p className="text-center text-xs text-muted-foreground mt-4">
              Admin: admin@karimaahlebait.com / admin123
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
}
