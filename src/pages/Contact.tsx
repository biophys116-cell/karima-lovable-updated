import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import patternBg from '@/assets/pattern-bg.jpg';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate network request for effect
    await new Promise(resolve => setTimeout(resolve, 800));
    
    toast.success('Divine message received! We will connect with you shortly.', {
      style: { background: '#111', color: '#d4af37', border: '1px solid rgba(212,175,55,0.3)' }
    });
    setForm({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-4 bg-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 opacity-10 mix-blend-overlay">
        <img src={patternBg} alt="Pattern" className="w-full h-full object-cover" />
      </div>
      <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-gold/20 rounded-full blur-[100px] z-0" />
      <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] z-0" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <ScrollReveal>
          <div className="text-center mb-20">
            <span className="text-gold text-sm font-semibold uppercase tracking-widest">Get in Touch</span>
            <h1 className="font-heading text-4xl md:text-6xl font-bold mt-4 text-white drop-shadow-lg">Connect With Us</h1>
            <p className="text-white/60 mt-6 max-w-2xl mx-auto text-lg font-light tracking-wide">
              Have questions about your spiritual journey? Our dedicated experts are here to provide profound guidance and support.
            </p>
            <div className="w-24 h-1 bg-gold mx-auto mt-8 rounded-full opacity-60" />
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Contact Information Cards */}
          <div className="lg:col-span-5 space-y-6">
            {[
              { icon: Phone, title: 'Direct Line', info: '+1 (555) 123-4567', sub: 'Available Mon-Fri 9am-6pm' },
              { icon: Mail, title: 'Electronic Mail', info: 'divine@karimaahlebait.com', sub: 'Guaranteed 24-hour response' },
              { icon: MapPin, title: 'Headquarters', info: '123 Spiritual Avenue, Suite 100', sub: 'New York, NY 10001' },
            ].map((c, i) => (
              <ScrollReveal key={c.title} delay={i * 0.15}>
                <div className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 flex items-center gap-6 overflow-hidden transition-all duration-500 hover:bg-white/10 hover:-translate-y-1 hover:border-gold/30">
                  <div className="absolute inset-0 bg-gradient-to-r from-gold/0 via-gold/5 to-gold/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
                  <div className="w-16 h-16 rounded-2xl bg-black border border-gold/20 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(212,175,55,0.1)] group-hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all">
                    <c.icon className="w-7 h-7 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-white tracking-wide">{c.title}</h3>
                    <p className="text-md text-white/90 mt-1 font-medium">{c.info}</p>
                    <p className="text-sm text-white/50 mt-1 font-light">{c.sub}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-7 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-10 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
            <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
              <h2 className="font-heading text-3xl text-white mb-8">Send a Message</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-white/60 tracking-widest uppercase ml-1">Full Name</label>
                  <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required
                    className="w-full px-5 py-4 rounded-xl border border-white/10 bg-black/50 text-white placeholder-white/30 focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none transition-all duration-300" 
                    placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-white/60 tracking-widest uppercase ml-1">Email Address</label>
                  <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required
                    className="w-full px-5 py-4 rounded-xl border border-white/10 bg-black/50 text-white placeholder-white/30 focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none transition-all duration-300" 
                    placeholder="john@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-white/60 tracking-widest uppercase ml-1">Subject</label>
                <input type="text" value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} required
                  className="w-full px-5 py-4 rounded-xl border border-white/10 bg-black/50 text-white placeholder-white/30 focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none transition-all duration-300" 
                  placeholder="How can we assist you?" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-white/60 tracking-widest uppercase ml-1">Message</label>
                <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} required rows={6}
                  className="w-full px-5 py-4 rounded-xl border border-white/10 bg-black/50 text-white placeholder-white/30 focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none resize-none transition-all duration-300" 
                  placeholder="Share your thoughts or questions..." />
              </div>
              
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="group relative w-full sm:w-auto px-10 py-4 rounded-xl bg-gold text-black font-bold text-lg overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center gap-3"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                <span className="relative z-10">{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                <Send className={`w-5 h-5 relative z-10 ${isSubmitting ? 'animate-pulse' : 'group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform'}`} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
