import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getUserBookings } from '@/lib/data-store';
import { Booking } from '@/lib/data-store';
import { Package, Calendar, Clock, DollarSign, RotateCw } from 'lucide-react';

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-emerald-100 text-emerald-800',
  completed: 'bg-blue-100 text-blue-800',
  cancelled: 'bg-red-100 text-red-800',
};

export default function CustomerPortal() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      setIsLoading(true);
      console.log('📡 Fetching bookings for user:', user?.id);
      if (user?.id) {
        const userBookings = await getUserBookings(user.id);
        console.log('✅ Fetched bookings:', userBookings);
        setBookings(userBookings);
      } else {
        console.warn('⚠️ No user ID found');
      }
    } catch (error) {
      console.error('❌ Failed to fetch bookings:', error);
      setBookings([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [user?.id]);

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mb-10 flex justify-between items-center">
            <div>
              <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground">Welcome, {user?.name}</h1>
              <p className="text-muted-foreground mt-2">Manage your bookings and travel plans</p>
            </div>
            <button 
              onClick={fetchBookings}
              disabled={isLoading}
              className="px-4 py-2 rounded-lg border border-input bg-background hover:bg-muted text-foreground disabled:opacity-50 flex items-center gap-2 transition-all"
            >
              <RotateCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>

          {isLoading ? (
            <div className="glass rounded-xl p-10 text-center">
              <div className="w-12 h-12 border-4 border-gold/20 border-t-gold rounded-full animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">Loading your bookings...</p>
            </div>
          ) : (
            <>
              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                {[
                  { icon: Package, label: 'Total Bookings', value: bookings.length },
                  { icon: Clock, label: 'Pending', value: bookings.filter(b => b.status === 'pending').length },
                  { icon: DollarSign, label: 'Total Spent', value: `$${bookings.reduce((s, b) => s + b.totalPrice, 0).toLocaleString()}` },
                ].map(s => (
                  <div key={s.label} className="glass rounded-xl p-5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl gold-gradient flex items-center justify-center">
                      <s.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{s.label}</p>
                      <p className="text-xl font-heading font-bold text-foreground">{s.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bookings */}
              <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Your Bookings</h2>
              {bookings.length > 0 ? (
                <div className="space-y-4">
                  {bookings.map(b => (
                    <div key={b.id} className="glass rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-heading font-bold text-foreground">{b.packageTitle}</h3>
                        <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {b.travelDate}</span>
                          <span>{b.passengers} passenger{b.passengers > 1 ? 's' : ''}</span>
                          <span className="font-semibold text-foreground">${b.totalPrice.toLocaleString()}</span>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${statusColors[b.status]}`}>
                        {b.status}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="glass rounded-xl p-10 text-center text-muted-foreground">
                  <p>No bookings yet. Start by exploring our packages!</p>
                </div>
              )}
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
