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
          scrolled ? 'bg-[#0A0A0A]/90 backdrop-blur-md border-b-[2px] border-border shadow-sm' : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <div 
            className="text-3xl font-bold tracking-tighter cursor-pointer text-white"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            NECTAR
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 font-medium">
            <button onClick={() => scrollTo('flavors')} className="text-white hover:text-primary transition-colors relative group">
              Flavors
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all group-hover:w-full"></span>
            </button>
            <button onClick={() => scrollTo('our-story')} className="text-white hover:text-primary transition-colors relative group">
              Our Story
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all group-hover:w-full"></span>
            </button>
            <button onClick={() => scrollTo('shop')} className="text-white hover:text-primary transition-colors relative group">
              Shop
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all group-hover:w-full"></span>
            </button>
          </nav>

          {/* Cart & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-white hover:text-primary transition-colors group">
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <motion.span 
                  key={cartCount}
                  initial={{ scale: 0.5, y: -10 }}
                  animate={{ scale: 1, y: 0 }}
                  className="absolute top-0 right-0 bg-primary text-black text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border border-black"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>
            <button 
              className="md:hidden p-2 text-white"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="fixed inset-0 z-[60] bg-[#0A0A0A] flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="p-6 flex justify-between items-center border-b-[2px] border-border">
              <div className="text-3xl font-bold tracking-tighter text-white">NECTAR</div>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-white">
                <X className="w-8 h-8" />
              </button>
            </div>
            <div className="flex-1 flex flex-col justify-center items-center gap-12 text-3xl font-bold">
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
