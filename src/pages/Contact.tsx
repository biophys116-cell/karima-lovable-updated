import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent successfully! We\'ll get back to you soon.');
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-5xl">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-gold text-sm font-semibold uppercase tracking-wider">Get in Touch</span>
            <h1 className="font-heading text-3xl md:text-5xl font-bold mt-3 text-foreground">Contact Us</h1>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">Have questions about our packages? We're here to help.</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-6">
            {[
              { icon: Phone, title: 'Phone', info: '+1 (555) 123-4567', sub: 'Mon-Fri 9am-6pm' },
              { icon: Mail, title: 'Email', info: 'info@karimaahlebait.com', sub: 'We reply within 24 hours' },
              { icon: MapPin, title: 'Office', info: '123 Spiritual Ave, Suite 100', sub: 'New York, NY 10001' },
            ].map((c, i) => (
              <ScrollReveal key={c.title} delay={i * 0.1}>
                <div className="glass rounded-xl p-6 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl gold-gradient flex items-center justify-center flex-shrink-0">
                    <c.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-foreground">{c.title}</h3>
                    <p className="text-sm text-foreground mt-1">{c.info}</p>
                    <p className="text-xs text-muted-foreground">{c.sub}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="lg:col-span-2 glass rounded-2xl p-8 space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Name *</label>
                <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Email *</label>
                <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Subject *</label>
              <input type="text" value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} required
                className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Message *</label>
              <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} required rows={5}
                className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none resize-none" />
            </div>
            <button type="submit" className="px-8 py-3 rounded-xl gold-gradient text-primary font-semibold hover:opacity-90 transition-opacity flex items-center gap-2">
              <Send className="w-4 h-4" /> Send Message
            </button>
          </motion.form>
        </div>
      </div>
    </div>
  );
}
