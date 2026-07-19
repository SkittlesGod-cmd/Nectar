import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

export default function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[100dvh] w-full flex items-center pt-16 overflow-hidden bg-[radial-gradient(circle_at_center,_var(--nectar-charcoal)_0%,_var(--nectar-dark)_100%)]">
      <div className="container mx-auto px-6 h-full flex flex-col lg:flex-row items-center gap-12 z-10 py-12 lg:py-0">
        
        {/* ── Text Column ── */}
        <div className="flex-1 flex flex-col items-start justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Tag */}
            <div className="inline-flex items-center px-4 py-1.5 mb-8 border border-white/20 rounded-full font-medium text-xs tracking-widest uppercase text-white/80">
              Organic · Sparkling · 0 Sugar
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[1.05] text-white mb-6">
              Pure Refreshment. <br />
              <span className="text-primary">Naturally Elevated.</span>
            </h1>

            <p className="text-lg md:text-xl font-medium text-gray-400 mb-12 max-w-lg leading-relaxed">
              Zero sugar. Zero compromise. 100% real fruit extract. Experience the clarity of flavor.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 mb-16">
              <button
                onClick={() => scrollTo('flavors')}
                className="px-8 py-4 font-bold text-sm uppercase tracking-wider text-[#0C0C0C] bg-primary transition-all hover:bg-white"
                style={{ boxShadow: '4px 4px 0 0 rgba(242, 201, 76, 0.3)' }}
              >
                Shop Flavors
              </button>
              <button
                onClick={() => scrollTo('our-story')}
                className="px-8 py-4 bg-transparent font-bold text-sm uppercase tracking-wider text-white border border-white/30 transition-all hover:border-white"
              >
                Explore Ingredients
              </button>
            </div>

            {/* Scroll Indicator */}
            <motion.div 
              className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-white/50"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDown className="w-4 h-4" />
              <span>Scroll to discover</span>
            </motion.div>
          </motion.div>
        </div>

        {/* ── Photography Column ── */}
        <div className="flex-1 w-full lg:h-[85vh] flex items-center justify-center lg:justify-end relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-md aspect-[4/5] lg:-mt-8"
          >
            {/* Main Photo */}
            <img 
              src="https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=900&q=90&fit=crop" 
              alt="Nectar sparkling water with fresh citrus" 
              className="w-full h-full object-cover rounded-lg"
            />
            
            {/* Blend Overlay */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-[#0C0C0C] via-transparent to-transparent opacity-80 pointer-events-none" />

            {/* Floating Badge */}
            <motion.div 
              initial={{ opacity: 0, x: -20, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="absolute -bottom-6 -left-6 bg-[#0C0C0C] border border-primary px-6 py-3 rounded-full flex items-center justify-center shadow-lg"
            >
              <span className="text-xs font-bold uppercase tracking-widest text-white">100% Organic</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
