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
    <footer id="shop" className="bg-[#050505] pt-32 pb-12 border-t-[3px] border-border text-white relative z-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-24">
          
          <div className="w-full max-w-xl">
            <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-6">
              Join The <br/><span className="text-primary">Source</span>
            </h2>
            <p className="text-gray-400 font-medium mb-8 text-xl">
              Drop your email to get early access to new flavors and exclusive merch. No spam, just the good stuff.
            </p>

            <form onSubmit={handleSubmit} className="relative w-full">
              <div className="flex w-full">
                <input 
                  type="text"
                  placeholder="ENTER YOUR EMAIL"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === 'error') setStatus('idle');
                  }}
                  className={`flex-1 bg-black border-[3px] ${status === 'error' ? 'border-[#FF2E93]' : 'border-border'} text-white font-bold p-4 focus:outline-none focus:border-primary transition-colors placeholder:text-gray-600 rounded-none uppercase`}
                />
                <button 
                  type="submit"
                  className="bg-primary text-black font-bold uppercase tracking-wide px-8 border-[3px] border-l-0 border-primary hover:bg-[#E6CF00] transition-colors"
                >
                  Subscribe
                </button>
              </div>

              <AnimatePresence>
                {status === 'error' && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute -bottom-8 left-0 text-[#FF2E93] font-bold text-sm uppercase"
                  >
                    Please enter a valid email address.
                  </motion.p>
                )}
                {status === 'success' && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute -bottom-8 left-0 text-[#00F0A8] font-bold text-sm uppercase"
                  >
                    Welcome to the source. You're in.
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </div>

          <div className="flex flex-col items-start md:items-end gap-8 mt-4 md:mt-0">
            <h3 className="text-3xl font-bold uppercase tracking-tighter text-gray-500">Nectar</h3>
            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 bg-black border-[3px] border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="w-12 h-12 bg-black border-[3px] border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="w-12 h-12 bg-black border-[3px] border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors">
                <MessageCircle className="w-6 h-6" /> {/* Placeholder for TikTok/Discord */}
              </a>
            </div>
          </div>
          
        </div>

        <div className="border-t-[3px] border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4 font-bold uppercase text-sm text-gray-600 tracking-wider">
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
          <p>© 2025 Nectar · Crafted with care.</p>
        </div>
      </div>
    </footer>
  );
}
