import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { getPackageById, createBooking } from '@/lib/data-store';
import { Check } from 'lucide-react';

export default function Booking() {
  const [params] = useSearchParams();
  const pkg = getPackageById(params.get('package') || '');
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    travelDate: '',
    passengers: 1,
    specialRequests: '',
  });

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <p className="text-muted-foreground">Please log in to make a booking.</p>
      </div>
    );
  }

  if (!pkg) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <p className="text-muted-foreground">Please select a package first.</p>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center px-4">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass rounded-2xl p-10 text-center max-w-md gold-glow">
          <div className="w-20 h-20 rounded-full gold-gradient flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-primary" />
          </div>
          <h2 className="font-heading text-2xl font-bold text-foreground mb-3">Booking Confirmed!</h2>
          <p className="text-muted-foreground mb-6">Your booking for <strong>{pkg.title}</strong> has been submitted successfully. We'll contact you shortly.</p>
          <button onClick={() => navigate('/portal')} className="px-8 py-3 rounded-xl gold-gradient text-primary font-semibold hover:opacity-90 transition-opacity">
            View My Bookings
          </button>
        </motion.div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    console.log('👤 Current user:', user);
    console.log('🎁 Current package:', pkg);
    console.log('📋 Submitting booking with data:', form);
    e.preventDefault();
    
    // Validation
    if (!form.fullName || !form.email || !form.phone || !form.travelDate) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (!user?.id) {
      console.error('❌ User ID not found:', user);
      toast.error('User ID not found. Please log in again.');
      return;
    }

    try {
      // Attempt to create booking
      const bookingData = {
        userId: user.id,
        packageId: pkg.id,
        packageTitle: pkg.title,
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        travelDate: form.travelDate,
        passengers: form.passengers,
        specialRequests: form.specialRequests,
        totalPrice: pkg.price * form.passengers,
      };
      console.log('📤 Sending booking data:', bookingData);
      await createBooking(bookingData);

      toast.success('✅ Booking created successfully!');
      setSubmitted(true);
    } catch (error) {
      console.error('❌ Booking failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to create booking';
      toast.error(errorMessage);
    }
  };

  const update = (key: string, val: string | number) => setForm(f => ({ ...f, [key]: val }));

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">Book Your Journey</h1>
          <p className="text-muted-foreground mb-8">Complete your booking for <span className="text-gold font-semibold">{pkg.title}</span></p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <form onSubmit={handleSubmit} className="lg:col-span-2 glass rounded-2xl p-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Full Name *</label>
                  <input type="text" value={form.fullName} onChange={e => update('fullName', e.target.value)} required
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Email *</label>
                  <input type="email" value={form.email} onChange={e => update('email', e.target.value)} required
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Phone *</label>
                  <input type="tel" value={form.phone} onChange={e => update('phone', e.target.value)} required
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Travel Date *</label>
                  <input type="date" value={form.travelDate} onChange={e => update('travelDate', e.target.value)} required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Number of Passengers *</label>
                <input type="number" min={1} max={20} value={form.passengers} onChange={e => { const v = parseInt(e.target.value); update('passengers', v >= 1 && v <= 20 ? v : 1); }}
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Special Requests</label>
                <textarea value={form.specialRequests} onChange={e => update('specialRequests', e.target.value)} rows={3}
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none resize-none" />
              </div>
              <button type="submit" className="w-full py-3 rounded-xl gold-gradient text-primary font-semibold text-lg hover:opacity-90 transition-opacity">
                Confirm Booking
              </button>
            </form>

            {/* Summary */}
            <div className="glass rounded-2xl p-6 h-fit sticky top-24">
              <h3 className="font-heading text-lg font-bold text-foreground mb-4">Booking Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Package</span><span className="font-medium text-foreground">{pkg.title}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Duration</span><span className="text-foreground">{pkg.duration}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Price/person</span><span className="text-foreground">${pkg.price.toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Passengers</span><span className="text-foreground">{form.passengers}</span></div>
                <hr className="border-border" />
                <div className="flex justify-between text-lg font-heading font-bold">
                  <span className="text-foreground">Total</span>
                  <span className="text-gold">${(pkg.price * form.passengers).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
