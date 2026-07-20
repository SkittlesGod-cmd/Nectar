import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useAppContext } from '../App';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'wouter';

export default function Navbar() {
  const { cartCount } = useAppContext();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const isHome = location === '/';
    const el = document.getElementById(id);
    
    if (isHome && el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Navigate home with hash
      window.location.href = `/#${id}`;
    }
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-[#0C0C0C]/80 backdrop-blur-md border-b border-white/5 shadow-sm' : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="text-2xl font-bold tracking-tighter text-white hover:text-primary transition-colors"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            NECTAR
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 font-medium text-sm uppercase tracking-wide">
            <button onClick={() => scrollTo('flavors')} className="text-white hover:text-primary transition-colors relative group py-2">
              Flavors
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-[0.4,0,0.2,1]" />
            </button>
            <button onClick={() => scrollTo('our-story')} className="text-white hover:text-primary transition-colors relative group py-2">
              Our Story
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-[0.4,0,0.2,1]" />
            </button>
            <Link href="/shop" className="text-white hover:text-primary transition-colors relative group py-2">
              Shop
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-[0.4,0,0.2,1]" />
            </Link>
          </nav>

          {/* Cart & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Link href="/cart" className="relative p-2 text-white hover:text-primary transition-colors group">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                <ShoppingCart className="w-5 h-5" />
              </motion.div>
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span 
                    key="cart-count"
                    initial={{ scale: 0.5, y: -10, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    exit={{ scale: 0.5, y: -10, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className="absolute -top-1 -right-1 bg-primary text-[#0C0C0C] text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
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
              <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
              <Link href="/cart" className="flex items-center gap-2 hover:text-primary transition-colors">
                <ShoppingCart className="w-6 h-6" />
                Cart
                {cartCount > 0 && (
                  <span className="bg-primary text-[#0C0C0C] text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
