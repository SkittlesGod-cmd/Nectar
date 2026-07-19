import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useAppContext } from '../App';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const { cartCount } = useAppContext();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          scrolled ? 'bg-[#0C0C0C]/90 backdrop-blur-md border-b border-border shadow-sm' : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div 
            className="text-2xl font-bold tracking-tighter cursor-pointer text-white"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            NECTAR
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 font-medium text-sm uppercase tracking-wide">
            <button onClick={() => scrollTo('flavors')} className="text-white hover:text-primary transition-colors relative group">
              Flavors
            </button>
            <button onClick={() => scrollTo('our-story')} className="text-white hover:text-primary transition-colors relative group">
              Our Story
            </button>
            <button onClick={() => scrollTo('shop')} className="text-white hover:text-primary transition-colors relative group">
              Shop
            </button>
          </nav>

          {/* Cart & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-white hover:text-primary transition-colors group">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <motion.span 
                  key={cartCount}
                  initial={{ scale: 0.5, y: -10 }}
                  animate={{ scale: 1, y: 0 }}
                  className="absolute -top-1 -right-1 bg-primary text-[#0C0C0C] text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>
            <button 
              className="md:hidden p-2 text-white hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="fixed inset-0 z-[60] bg-[#0C0C0C] flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-6 h-16 flex justify-between items-center border-b border-border">
              <div className="text-2xl font-bold tracking-tighter text-white">NECTAR</div>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-white hover:text-primary transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1 flex flex-col justify-center items-center gap-12 text-2xl font-bold uppercase tracking-wider">
              <button onClick={() => scrollTo('flavors')} className="hover:text-primary transition-colors">Flavors</button>
              <button onClick={() => scrollTo('our-story')} className="hover:text-primary transition-colors">Our Story</button>
              <button onClick={() => scrollTo('shop')} className="hover:text-primary transition-colors">Shop</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
