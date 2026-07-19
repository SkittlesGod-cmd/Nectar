import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Twitter, MessageCircle, ChevronRight } from 'lucide-react';
import { Link } from 'wouter';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'error' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      return;
    }
    setStatus('success');
    setEmail('');
  };

  const footerLinks = {
    shop: [
      { label: 'All Flavors', href: '/shop' },
      { label: 'Yuzu Citrus', href: '/shop/yuzu' },
      { label: 'Wild Berry', href: '/shop/berry' },
      { label: 'Cucumber Mint', href: '/shop/cucumber' },
      { label: 'Coming Soon', href: '/shop#upcoming' },
    ],
    help: [
      { label: 'Contact Us', href: '/contact' },
      { label: 'FAQ', href: '/contact#faq' },
      { label: 'Shipping Info', href: '/contact#shipping' },
      { label: 'Returns', href: '/contact#returns' },
      { label: 'Wholesale', href: '/contact?subject=wholesale' },
    ],
    company: [
      { label: 'Our Story', href: '#our-story' },
      { label: 'Sustainability', href: '#sustainability' },
      { label: 'Careers', href: '/contact?subject=careers' },
      { label: 'Press', href: '/contact?subject=press' },
    ],
  };

  return (
    <footer id="shop" className="bg-[#0C0C0C] pt-24 pb-12 border-t border-border text-white relative z-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12 mb-16">
          
          <div className="col-span-2 md:col-span-1 lg:col-span-2 max-w-lg">
            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-6 text-white">
              Stay in the Loop.
            </h2>
            <p className="text-gray-400 mb-8 text-lg font-medium leading-relaxed">
              Early access to new flavors and exclusive drops. No noise, just the good stuff.
            </p>

            <form onSubmit={handleSubmit} className="relative w-full">
              <div className="flex flex-col sm:flex-row w-full gap-4 sm:gap-0">
                <input 
                  type="text"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === 'error') setStatus('idle');
                  }}
                  className={`flex-1 bg-transparent border-b ${status === 'error' ? 'border-[#C9184A]' : 'border-gray-600'} text-white p-3 px-0 focus:outline-none focus:border-primary transition-colors placeholder:text-gray-600 rounded-none text-sm w-full`}
                />
                <motion.button 
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="bg-transparent text-primary text-sm font-bold uppercase tracking-wider px-6 py-3 sm:py-0 border-b border-gray-600 sm:hover:border-primary transition-colors w-full sm:w-auto text-left sm:text-center"
                >
                  Subscribe
                </motion.button>
              </div>

              <AnimatePresence>
                {status === 'error' && (
                  <motion.p 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute -bottom-6 left-0 text-[#C9184A] text-xs font-medium"
                  >
                    Please enter a valid email address.
                  </motion.p>
                )}
                {status === 'success' && (
                  <motion.p 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute -bottom-6 left-0 text-[#2DC653] text-xs font-medium"
                  >
                    Welcome to the source. You're in.
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </div>

          <div className="col-span-2 md:col-span-1">
            <div className="text-2xl font-bold tracking-tighter text-white mb-2">NECTAR</div>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 border border-border flex items-center justify-center rounded-full hover:border-primary hover:text-primary transition-colors text-gray-400">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 border border-border flex items-center justify-center rounded-full hover:border-primary hover:text-primary transition-colors text-gray-400">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 border border-border flex items-center justify-center rounded-full hover:border-primary hover:text-primary transition-colors text-gray-400">
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          <nav className="col-span-2 md:col-span-1">
            <h3 className="font-bold text-sm font-bold uppercase tracking-wider text-white mb-4">Shop</h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link, i) => (
                <li key={i}>
                  <Link 
                    href={link.href} 
                    className="text-gray-400 hover:text-primary transition-colors text-sm font-medium flex items-center gap-2 group"
                  >
                    {link.label}
                    <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="col-span-2 md:col-span-1">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Help</h3>
            <ul className="space-y-3">
              {footerLinks.help.map((link, i) => (
                <li key={i}>
                  <Link 
                    href={link.href} 
                    className="text-gray-400 hover:text-primary transition-colors text-sm font-medium flex items-center gap-2 group"
                  >
                    {link.label}
                    <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="col-span-2 md:col-span-1">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link, i) => (
                <li key={i}>
                  <Link 
                    href={link.href} 
                    className="text-gray-400 hover:text-primary transition-colors text-sm font-medium flex items-center gap-2 group"
                  >
                    {link.label}
                    <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium text-gray-500 uppercase tracking-widest">
          <p>© 2025 Nectar</p>
          <div className="flex gap-6">
            <Link href="/contact?subject=privacy" className="hover:text-primary transition-colors">Privacy</Link>
            <Link href="/contact?subject=terms" className="hover:text-primary transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
