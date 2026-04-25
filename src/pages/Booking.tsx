import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { getPackageById, createBooking } from '@/lib/data-store';
import { Check, ShieldCheck, CreditCard, Lock, Calendar, Users, Mail, Phone, User, ArrowRight, ArrowLeft } from 'lucide-react';
import patternBg from '@/assets/pattern-bg.jpg';

export default function Booking() {
  const [params] = useSearchParams();
  const pkg = getPackageById(params.get('package') || '');
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center bg-black relative px-4">
        <div className="absolute inset-0 z-0 opacity-10 mix-blend-overlay">
          <img src={patternBg} alt="Pattern" className="w-full h-full object-cover" />
        </div>
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass-dark rounded-3xl p-12 text-center max-w-lg relative z-10 border border-gold/20 shadow-[0_0_50px_rgba(212,175,55,0.1)]">
          <Lock className="w-20 h-20 text-gold mx-auto mb-6 opacity-80 filter drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]" />
          <h2 className="font-heading text-4xl font-bold text-white mb-4">Secure Portal</h2>
          <p className="text-white/60 mb-10 text-lg font-light leading-relaxed">Please authenticate your identity to securely access the booking portal and finalize your spiritual journey.</p>
          <button onClick={() => navigate('/login')} className="w-full px-8 py-4 rounded-xl bg-gold text-black font-bold text-lg hover:scale-[1.02] transition-transform shadow-[0_0_30px_rgba(212,175,55,0.3)]">
            Proceed to Login
          </button>
        </motion.div>
      </div>
    );
  }

  if (!pkg) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center bg-black relative px-4">
        <div className="absolute inset-0 z-0 opacity-10 mix-blend-overlay">
          <img src={patternBg} alt="Pattern" className="w-full h-full object-cover" />
        </div>
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass-dark rounded-3xl p-12 text-center max-w-lg relative z-10 border border-white/10">
          <h2 className="font-heading text-3xl font-bold text-white mb-4">No Package Selected</h2>
          <p className="text-white/60 mb-8 font-light text-lg">Please browse our exclusive collection and select a journey to proceed.</p>
          <button onClick={() => navigate('/packages')} className="px-10 py-4 rounded-xl border border-white/20 text-white font-semibold hover:bg-white/10 transition-colors">
            Browse Packages
          </button>
        </motion.div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center px-4 bg-black relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10 mix-blend-overlay">
          <img src={patternBg} alt="Pattern" className="w-full h-full object-cover" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/20 rounded-full blur-[150px] z-0" />
        
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", bounce: 0.4 }} className="bg-black/60 backdrop-blur-3xl border border-gold/40 rounded-[2.5rem] p-16 text-center max-w-xl relative z-10 shadow-[0_0_80px_rgba(212,175,55,0.2)]">
          <div className="relative w-32 h-32 mx-auto mb-10">
            <div className="absolute inset-0 bg-gold/20 rounded-full animate-ping" />
            <div className="relative w-full h-full rounded-full bg-gradient-to-br from-gold-light via-gold to-gold-dark flex items-center justify-center shadow-[0_0_40px_rgba(212,175,55,0.5)]">
              <Check className="w-16 h-16 text-black" />
            </div>
          </div>
          <h2 className="font-heading text-5xl font-bold text-white mb-6 drop-shadow-lg">Reservation Secured</h2>
          <p className="text-white/80 mb-10 text-xl font-light leading-relaxed">
            Your sacred reservation for <strong className="text-gold font-semibold">{pkg.title}</strong> has been confirmed. May your journey be deeply blessed.
          </p>
          <button onClick={() => navigate('/portal')} className="w-full px-10 py-5 rounded-2xl bg-white text-black font-bold text-lg hover:scale-[1.02] transition-transform shadow-[0_0_30px_rgba(255,255,255,0.3)]">
            View Journey Portal
          </button>
        </motion.div>
      </div>
    );
  }

  const nextStep = () => {
    if (step === 1) {
      if (!form.fullName || !form.email || !form.phone) {
        toast.error('Please complete all traveler details', { style: { background: '#111', color: '#ff4444', border: '1px solid rgba(255,68,68,0.3)' } });
        return;
      }
    }
    setStep(s => Math.min(s + 1, 2));
  };

  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.travelDate) {
      toast.error('Please select a travel date', { style: { background: '#111', color: '#ff4444', border: '1px solid rgba(255,68,68,0.3)' } });
      return;
    }

    if (!user?.id) {
      toast.error('Session expired. Please log in again.', { style: { background: '#111', color: '#ff4444', border: '1px solid rgba(255,68,68,0.3)' } });
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

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
      
      await createBooking(bookingData);
      
      toast.success('Your booking has been secured!', { style: { background: '#111', color: '#d4af37', border: '1px solid rgba(212,175,55,0.3)' } });
      setSubmitted(true);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create booking';
      toast.error(errorMessage, { style: { background: '#111', color: '#ff4444', border: '1px solid rgba(255,68,68,0.3)' } });
    } finally {
      setIsSubmitting(false);
    }
  };

  const update = (key: string, val: string | number) => setForm(f => ({ ...f, [key]: val }));

  return (
    <div className="min-h-screen pt-32 pb-24 px-4 bg-black relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-[0.05] mix-blend-overlay">
        <img src={patternBg} alt="Pattern" className="w-full h-full object-cover" />
      </div>
      <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-primary/10 rounded-full blur-[150px] z-0 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-gold/10 rounded-full blur-[150px] z-0 pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="text-center mb-16">
            <span className="text-gold text-sm font-semibold uppercase tracking-[0.2em] drop-shadow-md">Secure Reservation</span>
            <h1 className="font-heading text-5xl md:text-7xl font-bold text-white mt-4 mb-6 drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">Finalize Your Journey</h1>
            <p className="text-white/70 text-xl font-light max-w-3xl mx-auto">
              You are securing the <span className="text-gold font-medium">{pkg.title}</span> experience.
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
            {/* Booking Wizard */}
            <div className="xl:col-span-8 bg-black/40 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 sm:p-12 relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
              
              {/* Stepper Header */}
              <div className="flex items-center justify-between mb-12 relative z-10">
                <div className={`flex items-center gap-4 transition-all duration-500 ${step >= 1 ? 'text-gold' : 'text-white/40'}`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold border-2 ${step >= 1 ? 'border-gold bg-gold/10 shadow-[0_0_20px_rgba(212,175,55,0.3)]' : 'border-white/20'}`}>1</div>
                  <span className="font-heading text-lg font-semibold tracking-wide hidden sm:block">Traveler Details</span>
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-gold/50 to-white/10 mx-6" />
                <div className={`flex items-center gap-4 transition-all duration-500 ${step >= 2 ? 'text-gold' : 'text-white/40'}`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold border-2 ${step >= 2 ? 'border-gold bg-gold/10 shadow-[0_0_20px_rgba(212,175,55,0.3)]' : 'border-white/20'}`}>2</div>
                  <span className="font-heading text-lg font-semibold tracking-wide hidden sm:block">Journey Preferences</span>
                </div>
              </div>

              <div className="relative z-10 min-h-[350px]">
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div 
                      key="step1"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-8"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <label className="text-xs font-semibold text-white/50 tracking-widest uppercase ml-2 flex items-center gap-2"><User className="w-3 h-3 text-gold"/> Full Name</label>
                          <input type="text" value={form.fullName} onChange={e => update('fullName', e.target.value)}
                            className="w-full px-6 py-5 rounded-2xl border border-white/10 bg-black/60 text-white text-lg placeholder-white/20 focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none transition-all duration-300" />
                        </div>
                        <div className="space-y-3">
                          <label className="text-xs font-semibold text-white/50 tracking-widest uppercase ml-2 flex items-center gap-2"><Mail className="w-3 h-3 text-gold"/> Email Address</label>
                          <input type="email" value={form.email} onChange={e => update('email', e.target.value)}
                            className="w-full px-6 py-5 rounded-2xl border border-white/10 bg-black/60 text-white text-lg placeholder-white/20 focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none transition-all duration-300" />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <label className="text-xs font-semibold text-white/50 tracking-widest uppercase ml-2 flex items-center gap-2"><Phone className="w-3 h-3 text-gold"/> Phone Number</label>
                        <input type="tel" value={form.phone} onChange={e => update('phone', e.target.value)}
                          className="w-full px-6 py-5 rounded-2xl border border-white/10 bg-black/60 text-white text-lg placeholder-white/20 focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none transition-all duration-300" />
                      </div>
                      <div className="pt-8">
                        <button type="button" onClick={nextStep} className="group flex items-center justify-center gap-3 w-full sm:w-auto ml-auto px-10 py-5 rounded-2xl bg-gold text-black font-bold text-lg hover:scale-105 transition-all shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                          Continue to Preferences <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div 
                      key="step2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-8"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <label className="text-xs font-semibold text-white/50 tracking-widest uppercase ml-2 flex items-center gap-2"><Calendar className="w-3 h-3 text-gold"/> Preferred Travel Date</label>
                          <input type="date" value={form.travelDate} onChange={e => update('travelDate', e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                            className="w-full px-6 py-5 rounded-2xl border border-white/10 bg-black/60 text-white text-lg placeholder-white/20 focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none transition-all duration-300 [color-scheme:dark]" />
                        </div>
                        <div className="space-y-3">
                          <label className="text-xs font-semibold text-white/50 tracking-widest uppercase ml-2 flex items-center gap-2"><Users className="w-3 h-3 text-gold"/> Passengers</label>
                          <input type="number" min={1} max={20} value={form.passengers} onChange={e => { const v = parseInt(e.target.value); update('passengers', v >= 1 && v <= 20 ? v : 1); }}
                            className="w-full px-6 py-5 rounded-2xl border border-white/10 bg-black/60 text-white text-lg placeholder-white/20 focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none transition-all duration-300" />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <label className="text-xs font-semibold text-white/50 tracking-widest uppercase ml-2">Special Requests (Optional)</label>
                        <textarea value={form.specialRequests} onChange={e => update('specialRequests', e.target.value)} rows={3}
                          className="w-full px-6 py-5 rounded-2xl border border-white/10 bg-black/60 text-white text-lg placeholder-white/20 focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none resize-none transition-all duration-300" 
                          placeholder="Dietary requirements, accessibility needs..." />
                      </div>
                      
                      <div className="flex flex-col sm:flex-row items-center justify-between pt-8 gap-4">
                        <button type="button" onClick={prevStep} className="group flex items-center gap-3 px-8 py-5 rounded-2xl text-white/70 font-semibold text-lg hover:bg-white/10 transition-colors w-full sm:w-auto justify-center">
                          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Back
                        </button>
                        <button 
                          onClick={handleSubmit} 
                          disabled={isSubmitting}
                          className="group relative flex items-center justify-center gap-3 px-10 py-5 rounded-2xl bg-white text-black font-bold text-lg overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] disabled:opacity-70 disabled:hover:scale-100 w-full sm:w-auto"
                        >
                          {isSubmitting ? 'Processing...' : 'Confirm & Reserve'}
                          {!isSubmitting && <Lock className="w-5 h-5 group-hover:text-gold transition-colors" />}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Summary Sidebar */}
            <div className="xl:col-span-4">
              <div className="bg-black/60 backdrop-blur-3xl border border-gold/30 rounded-[2.5rem] p-10 sticky top-32 overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.1)]">
                <div className="absolute inset-0 bg-gradient-to-b from-gold/10 to-transparent pointer-events-none" />
                
                <h3 className="font-heading text-3xl font-bold text-white mb-8 relative z-10 flex items-center gap-4 drop-shadow-md">
                  <CreditCard className="w-8 h-8 text-gold" />
                  Summary
                </h3>
                
                <div className="space-y-6 relative z-10">
                  <div className="bg-white/5 rounded-3xl p-6 border border-white/10 shadow-inner">
                    <h4 className="text-gold font-bold mb-2 text-xl tracking-wide">{pkg.title}</h4>
                    <p className="text-white/70 text-sm font-medium">{pkg.duration}</p>
                  </div>
                  
                  <div className="space-y-4 py-4 text-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-white/60 font-light">Price per traveler</span>
                      <span className="text-white font-medium">${pkg.price.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/60 font-light">Travelers</span>
                      <span className="text-white font-medium text-xl">× {form.passengers}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/60 font-light">Taxes & Fees</span>
                      <span className="text-gold/80 text-sm tracking-wider uppercase font-semibold">Included</span>
                    </div>
                  </div>
                  
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent my-6" />
                  
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-end">
                      <span className="text-white/80 font-medium text-xl">Total</span>
                      <span className="text-gold font-heading text-4xl font-bold drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                        ${(pkg.price * form.passengers).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center gap-3 mt-8 text-white/40 text-sm font-medium border border-white/10 py-3 rounded-xl bg-white/5">
                    <ShieldCheck className="w-5 h-5 text-gold/70" /> 256-bit Secure Reservation
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </motion.div>
      </div>
    </div>
  );
}
