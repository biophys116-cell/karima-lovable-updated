import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { getBookings, getAllUsers, updateBookingStatus, type Booking } from '@/lib/data-store';
import { Users, Package, Calendar, TrendingUp } from 'lucide-react';

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-emerald-100 text-emerald-800',
  completed: 'bg-blue-100 text-blue-800',
  cancelled: 'bg-red-100 text-red-800',
};

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const users = getAllUsers();
  const [tab, setTab] = useState<'bookings' | 'users'>('bookings');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const allBookings = await getBookings();
        setBookings(allBookings);
      } catch (error) {
        console.error('❌ Failed to fetch bookings:', error);
        setBookings([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const totalRevenue = bookings.reduce((s, b) => s + b.totalPrice, 0);

  const handleStatus = async (id: string, status: Booking['status']) => {
    try {
      await updateBookingStatus(id, status);
      // Refresh bookings
      const allBookings = await getBookings();
      setBookings(allBookings);
      toast.success(`Booking ${status}`);
    } catch (error) {
      console.error('❌ Failed to update booking status:', error);
      toast.error('Failed to update booking status');
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground mb-10">Manage bookings, users, and monitor performance</p>

          {isLoading ? (
            <div className="glass rounded-xl p-10 text-center">
              <div className="w-12 h-12 border-4 border-gold/20 border-t-gold rounded-full animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">Loading dashboard...</p>
            </div>
          ) : (
            <>
              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {[
              { icon: Package, label: 'Total Bookings', value: bookings.length, color: 'gold-gradient' },
              { icon: Users, label: 'Total Users', value: users.length, color: 'emerald-gradient' },
              { icon: TrendingUp, label: 'Revenue', value: `$${totalRevenue.toLocaleString()}`, color: 'gold-gradient' },
              { icon: Calendar, label: 'Pending', value: bookings.filter(b => b.status === 'pending').length, color: 'emerald-gradient' },
            ].map(s => (
              <div key={s.label} className="glass rounded-xl p-5 flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl ${s.color} flex items-center justify-center`}>
                  <s.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                  <p className="text-xl font-heading font-bold text-foreground">{s.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            {(['bookings', 'users'] as const).map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`px-5 py-2 rounded-full text-sm font-medium capitalize transition-all ${
                  tab === t ? 'gold-gradient text-primary' : 'bg-muted text-muted-foreground'
                }`}
              >{t}</button>
            ))}
          </div>

          {tab === 'bookings' && (
            <div className="glass rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="text-left p-4 font-semibold text-foreground">Customer</th>
                      <th className="text-left p-4 font-semibold text-foreground">Package</th>
                      <th className="text-left p-4 font-semibold text-foreground">Date</th>
                      <th className="text-left p-4 font-semibold text-foreground">Amount</th>
                      <th className="text-left p-4 font-semibold text-foreground">Status</th>
                      <th className="text-left p-4 font-semibold text-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.length > 0 ? bookings.map(b => (
                      <tr key={b.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                        <td className="p-4 text-foreground">{b.fullName}</td>
                        <td className="p-4 text-foreground">{b.packageTitle}</td>
                        <td className="p-4 text-muted-foreground">{b.travelDate}</td>
                        <td className="p-4 font-semibold text-foreground">${b.totalPrice.toLocaleString()}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${statusColors[b.status]}`}>{b.status}</span>
                        </td>
                        <td className="p-4">
                          <select
                            value={b.status}
                            onChange={e => handleStatus(b.id, e.target.value as Booking['status'])}
                            className="text-xs border border-input rounded-lg px-2 py-1 bg-background text-foreground"
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    )) : (
                      <tr><td colSpan={6} className="p-8 text-center text-muted-foreground">No bookings yet</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {tab === 'users' && (
            <div className="glass rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="text-left p-4 font-semibold text-foreground">Name</th>
                      <th className="text-left p-4 font-semibold text-foreground">Email</th>
                      <th className="text-left p-4 font-semibold text-foreground">Role</th>
                      <th className="text-left p-4 font-semibold text-foreground">Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(u => (
                      <tr key={u.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                        <td className="p-4 text-foreground">{u.name}</td>
                        <td className="p-4 text-muted-foreground">{u.email}</td>
                        <td className="p-4"><span className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${u.role === 'admin' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'}`}>{u.role}</span></td>
                        <td className="p-4 text-muted-foreground">{new Date(u.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
