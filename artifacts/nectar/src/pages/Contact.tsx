import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'wouter';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Loader2, ChevronLeft, ChevronDown, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAppContext } from '@/App';

export default function Contact() {
  const { activeFlavor, setActiveFlavor } = useAppContext();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    document.documentElement.classList.add('dark');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveFlavor(null);
  }, [setActiveFlavor]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    else if (formData.message.trim().length < 10) newErrors.message = 'Message must be at least 10 characters';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setSubmitStatus('loading');
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSubmitStatus('success');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const faqs = [
    {
      question: 'Where do you ship?',
      answer: 'We currently ship to the United States, Canada, UK, and Australia. We\'re working on expanding to more countries soon!'
    },
    {
      question: 'What\'s your return policy?',
      answer: 'If you\'re not satisfied with your order, contact us within 30 days for a full refund. No questions asked, no returns needed for damaged items.'
    },
    {
      question: 'Do you offer subscriptions?',
      answer: 'Yes! Subscribe and save 15% on every order. Choose your frequency (2, 4, or 8 weeks), pause or cancel anytime.'
    },
    {
      question: 'Are your ingredients natural?',
      answer: 'Absolutely. No artificial flavors, colors, or preservatives. Just real fruit juice, botanicals, organic cane sugar, and carbonated water.'
    },
    {
      question: 'Is there caffeine in your drinks?',
      answer: 'Our core flavors (Yuzu, Wild Berry, Cucumber Mint) are caffeine-free. Limited editions like Matcha Lime contain natural caffeine from tea.'
    },
    {
      question: 'How should I store Nectar?',
      answer: 'Best enjoyed chilled! Store in a cool, dry place. Once opened, consume within 24 hours for optimal carbonation and flavor.'
    },
  ];

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      details: ['hello@drinknectar.com', 'support@drinknectar.com'],
      description: 'We respond within 24 hours'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: ['1-800-NECTAR-1', 'Mon-Fri 9am-6pm EST'],
      description: 'For urgent inquiries'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: ['Nectar HQ', '123 Citrus Lane, Miami, FL 33101'],
      description: 'By appointment only'
    },
  ];

  return (
    <div className="relative min-h-[100dvh] w-full overflow-hidden text-foreground bg-[#0C0C0C] font-sans selection:bg-primary selection:text-black">
      <div
        className="fixed inset-0 pointer-events-none z-[1] opacity-[0.03] mix-blend-overlay"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />

      <div className="relative z-10 flex flex-col w-full">
        <Navbar />
        
        <main className="flex-1 pt-24 pb-16 px-6">
          <div className="container mx-auto max-w-7xl">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium uppercase tracking-wider mb-6">
                <Mail className="w-4 h-4 text-primary" />
                Get in Touch
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6">
                We\'d Love to
                <span className="block bg-gradient-to-r from-yellow-400 via-pink-500 to-green-400 bg-clip-text text-transparent">
                  Hear From You
                </span>
              </h1>
              <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto">
                Questions about our flavors, shipping, or wholesale? Our team is here to help. 
                Drop us a line and we\'ll get back to you within 24 hours.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-2"
              >
                <AnimatePresence mode="wait">
                  {submitStatus === 'success' ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="bg-green-500/10 border border-green-500/30 rounded-2xl p-12 text-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200 }}
                        className="w-16 h-16 mx-auto mb-6 bg-green-500/20 rounded-full flex items-center justify-center"
                      >
                        <CheckCircle className="w-8 h-8 text-green-500" />
                      </motion.div>
                      <h2 className="text-2xl font-bold text-white mb-3">Message Sent!</h2>
                      <p className="text-white/60 mb-6">Thanks for reaching out. We\'ll get back to you at <strong className="text-white">{formData.email}</strong> within 24 hours.</p>
                      <button
                        onClick={() => setSubmitStatus('idle')}
                        className="px-6 py-3 bg-primary text-[#0C0C0C] font-bold uppercase tracking-wider rounded-xl hover:bg-primary/90 transition-colors"
                      >
                        Send Another Message
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField
                          label="Name"
                          value={formData.name}
                          onChange={(v) => handleChange('name', v)}
                          error={errors.name}
                          required
                          placeholder="Your name"
                          autoComplete="name"
                        />
                        <InputField
                          label="Email"
                          type="email"
                          value={formData.email}
                          onChange={(v) => handleChange('email', v)}
                          error={errors.email}
                          required
                          placeholder="you@email.com"
                          autoComplete="email"
                        />
                      </div>
                      
                      <InputField
                        label="Subject"
                        value={formData.subject}
                        onChange={(v) => handleChange('subject', v)}
                        error={errors.subject}
                        required
                        as="select"
                        options={[
                          { value: '', label: 'Select a topic' },
                          { value: 'general', label: 'General Inquiry' },
                          { value: 'order', label: 'Order Support' },
                          { value: 'shipping', label: 'Shipping Question' },
                          { value: 'wholesale', label: 'Wholesale/B2B' },
                          { value: 'press', label: 'Press & Media' },
                          { value: 'careers', label: 'Careers' },
                          { value: 'other', label: 'Other' },
                        ]}
                      />
                      
                      <InputField
                        label="Message"
                        value={formData.message}
                        onChange={(v) => handleChange('message', v)}
                        error={errors.message}
                        required
                        as="textarea"
                        placeholder="Tell us what's on your mind..."
                        rows={6}
                      />

                      {submitStatus === 'error' && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-xl"
                        >
                          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                          <p className="text-red-400">Something went wrong. Please try again or email us directly.</p>
                        </motion.div>
                      )}

                      <button
                        type="submit"
                        disabled={submitStatus === 'loading'}
                        className="w-full py-4 bg-primary text-[#0C0C0C] font-bold uppercase tracking-wider rounded-xl hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-3"
                      >
                        {submitStatus === 'loading' ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            Send Message
                          </>
                        )}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Contact Info & FAQ */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-8"
              >
                {/* Contact Methods */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Mail className="w-5 h-5 text-primary" />
                    Contact Methods
                  </h3>
                  {contactInfo.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                      className="flex gap-4 p-4 bg-white/5 border border-white/10 rounded-xl hover:border-primary/30 transition-colors"
                    >
                      <div className="p-3 bg-primary/20 rounded-xl">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white">{item.title}</h4>
                        {item.details.map((detail, d) => (
                          <p key={d} className="text-white/60 text-sm">{detail}</p>
                        ))}
                        <p className="text-primary text-sm mt-1">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* FAQ */}
                <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                  <div className="p-6 border-b border-white/10">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-primary" />
                      Frequently Asked
                    </h3>
                  </div>
                  <div className="divide-y divide-white/10">
                    {faqs.map((faq, i) => (
                      <FAQItem key={i} faq={faq} index={i} />
                    ))}
                  </div>
                </div>

                {/* Newsletter */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="relative overflow-hidden rounded-2xl p-8 text-center"
                  style={{ background: 'linear-gradient(135deg, rgba(242,201,76,0.1) 0%, rgba(201,24,74,0.1) 50%, rgba(45,198,83,0.1) 100%)' }}
                >
                  <div className="relative z-10 max-w-md mx-auto">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-sm font-medium uppercase tracking-wider mb-4">
                      <Mail className="w-4 h-4 text-primary" />
                      Stay in the Loop
                    </div>
                    <h4 className="text-2xl md:text-3xl font-bold text-white mb-3">
                      Never miss a drop
                    </h4>
                    <p className="text-white/60 mb-6">
                      New flavors, subscriber exclusives, and 15% off your first order.
                    </p>
                    <form className="flex gap-3" onSubmit={(e) => e.preventDefault()}>
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="flex-1 bg-white/10 border border-white/20 focus:border-primary focus:outline-none text-white placeholder-white/50 px-4 py-3 rounded-xl transition-colors"
                      />
                      <button className="px-6 py-3 bg-primary text-[#0C0C0C] font-bold uppercase tracking-wider rounded-xl hover:bg-primary/90 transition-colors whitespace-nowrap">
                        Subscribe
                      </button>
                    </form>
                    <p className="text-white/40 text-xs mt-4">No spam. Unsubscribe anytime.</p>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Wholesale CTA */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-16"
            >
              <div className="relative overflow-hidden rounded-3xl p-8 md:p-16 text-center" style={{ background: 'linear-gradient(135deg, rgba(242,201,76,0.15) 0%, rgba(201,24,74,0.15) 50%, rgba(45,198,83,0.15) 100%)' }}>
                <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
                <div className="relative z-10 max-w-3xl mx-auto">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-sm font-medium uppercase tracking-wider mb-6">
                    <Sparkles className="w-4 h-4 text-primary" />
                    Wholesale Inquiries
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
                    Stock Nectar in Your Store
                  </h3>
                  <p className="text-white/60 text-lg mb-8">
                    We partner with cafes, restaurants, grocery stores, and offices. 
                    Volume pricing, net terms, and dedicated support available.
                  </p>
                  <Link
                    href="/contact?subject=wholesale"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#0C0C0C] font-bold uppercase tracking-wider rounded-xl hover:bg-white/90 transition-colors"
                  >
                    Become a Partner <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.section>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  as?: 'input' | 'select' | 'textarea';
  options?: { value: string; label: string }[];
  rows?: number;
}

function InputField({
  label,
  value,
  onChange,
  error,
  required,
  type = 'text',
  placeholder,
  autoComplete,
  as = 'input',
  options,
  rows,
}: InputFieldProps) {
  const id = label.toLowerCase().replace(/\s+/g, '-');
  
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-white/70 mb-2">
        {label} {required && <span className="text-primary">*</span>}
      </label>
      {as === 'select' ? (
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-white/5 border border-white/10 focus:border-primary focus:outline-none text-white px-4 py-3 rounded-xl transition-colors"
          autoComplete={autoComplete}
          required={required}
        >
          {options?.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      ) : as === 'textarea' ? (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          required={required}
          className={`w-full bg-white/5 border ${error ? 'border-red-500/50' : 'border-white/10'} focus:border-primary focus:outline-none text-white placeholder-white/40 px-4 py-3 rounded-xl transition-colors resize-y ${error ? 'focus:ring-2 focus:ring-red-500/20' : ''}`}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          className={`w-full bg-white/5 border ${error ? 'border-red-500/50' : 'border-white/10'} focus:border-primary focus:outline-none text-white placeholder-white/40 px-4 py-3 rounded-xl transition-colors ${error ? 'focus:ring-2 focus:ring-red-500/20' : ''}`}
        />
      )}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1.5 text-red-400 text-sm flex items-center gap-1"
        >
          <AlertCircle className="w-3 h-3" />
          {error}
        </motion.p>
      )}
    </div>
  );
}

interface FAQItemProps {
  faq: { question: string; answer: string };
  index: number;
}

function FAQItem({ faq, index }: FAQItemProps) {
  const [open, setOpen] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [open]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="bg-white/5"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-6 py-4 flex items-center justify-between text-left"
        aria-expanded={open}
      >
        <span className="font-medium text-white pr-4">{faq.question}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-white/50 flex-shrink-0"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.span>
      </button>
      <div className="overflow-hidden transition-all duration-300 ease-in-out">
        <div
          ref={contentRef}
          className={`px-6 pb-4 transition-all duration-300 ease-in-out ${open ? 'opacity-100' : 'opacity-0'}`}
          style={{ maxHeight: open ? `${height}px` : '0' }}
        >
          <p className="text-white/60">{faq.answer}</p>
        </div>
      </div>
    </motion.div>
  );
}