import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Twitter, MessageCircle } from 'lucide-react';

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

  return (
    <footer id="shop" className="bg-[#0C0C0C] pt-24 pb-12 border-t border-border text-white relative z-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-24">
          
          <div className="w-full max-w-lg">
            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-6 text-white">
              Stay in the Loop.
            </h2>
            <p className="text-gray-400 mb-8 text-lg font-medium leading-relaxed">
              Early access to new flavors and exclusive drops. No noise, just the good stuff.
            </p>

            <form onSubmit={handleSubmit} className="relative w-full">
              <div className="flex w-full">
                <input 
                  type="text"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === 'error') setStatus('idle');
                  }}
                  className={`flex-1 bg-transparent border-b ${status === 'error' ? 'border-[#C9184A]' : 'border-gray-600'} text-white p-3 px-0 focus:outline-none focus:border-primary transition-colors placeholder:text-gray-600 rounded-none text-sm`}
                />
                <button 
                  type="submit"
                  className="bg-transparent text-primary text-sm font-bold uppercase tracking-wider px-6 border-b border-gray-600 hover:border-primary transition-colors"
                >
                  Subscribe
                </button>
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

          <div className="flex flex-col items-start md:items-end gap-6">
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
          
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium text-gray-500 uppercase tracking-widest">
          <p>© 2025 Nectar</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
