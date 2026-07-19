import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const flavorColors = ['#FFE600', '#FF2E93', '#00F0A8'];

export default function Hero() {
  const [currentColorIndex, setCurrentColorIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentColorIndex((prev) => (prev + 1) % flavorColors.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const currentColor = flavorColors[currentColorIndex];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[100dvh] w-full flex items-center justify-center pt-20 overflow-hidden">
      <div className="container mx-auto px-6 h-full flex flex-col lg:flex-row items-center justify-between gap-12 z-10">
        
        {/* Text Content */}
        <div className="flex-1 flex flex-col items-start justify-center pt-12 lg:pt-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-bold tracking-tighter leading-[0.9] uppercase text-white mb-6">
              Pure <br/>
              Refreshment. <br/>
              <span className="transition-colors duration-1000" style={{ color: currentColor }}>
                Naturally <br/> Elevated.
              </span>
            </h1>
            <p className="text-xl md:text-2xl font-medium text-gray-300 mb-10 max-w-lg border-l-4 pl-4 transition-colors duration-1000" style={{ borderColor: currentColor }}>
              0 Sugar · 0 Calories · 100% Real Fruit Extract
            </p>

            <div className="flex flex-col sm:flex-row gap-6">
              <button 
                onClick={() => scrollTo('flavors')}
                className="group relative px-8 py-4 bg-primary text-black font-bold text-lg uppercase tracking-wide border-2 border-primary shadow-[6px_6px_0px_0px_rgba(255,255,255,0.1)] hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.1)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all active:translate-x-[6px] active:translate-y-[6px] active:shadow-none"
              >
                Shop Flavors
              </button>
              <button 
                onClick={() => scrollTo('our-story')}
                className="group px-8 py-4 bg-transparent text-white font-bold text-lg uppercase tracking-wide border-2 border-white shadow-[6px_6px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all active:translate-x-[6px] active:translate-y-[6px] active:shadow-none"
              >
                Explore Ingredients
              </button>
            </div>
          </motion.div>
        </div>

        {/* 3D Can Visual */}
        <div className="flex-1 w-full flex items-center justify-center min-h-[500px]">
          <motion.div
            animate={{ y: [-15, 15, -15] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="relative w-64 md:w-80 aspect-[3/5] rounded-[30px] border-[3px] border-white/20 shadow-2xl overflow-hidden"
          >
            {/* Can Body Gradient */}
            <motion.div 
              className="absolute inset-0 transition-colors duration-1000"
              style={{
                background: `linear-gradient(135deg, ${currentColor} 0%, rgba(10,10,10,1) 80%)`
              }}
            />
            {/* Metallic Sheen */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-[200%] animate-[shine_3s_infinite_linear]" />
            {/* Can Top/Bottom styling */}
            <div className="absolute top-0 inset-x-0 h-6 bg-gradient-to-b from-gray-300 to-gray-500 rounded-t-[26px] opacity-80" />
            <div className="absolute bottom-0 inset-x-0 h-8 bg-gradient-to-t from-gray-300 to-gray-500 rounded-b-[26px] opacity-80" />
            
            {/* Brand text on can */}
            <div className="absolute inset-0 flex flex-col items-center justify-center -rotate-90">
              <span className="text-6xl font-bold tracking-tighter text-white mix-blend-overlay">NECTAR</span>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
