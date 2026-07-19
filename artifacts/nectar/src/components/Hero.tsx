import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
};
const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

export default function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[100dvh] w-full flex items-center pt-16 overflow-hidden bg-[radial-gradient(circle_at_center,_var(--nectar-charcoal)_0%,_var(--nectar-dark)_100%)]">
      <div className="container mx-auto px-6 h-full flex flex-col lg:flex-row items-center gap-12 z-10 py-12 lg:py-0">
        
        {/* ── Text Column ── */}
        <motion.div 
          className="flex-1 flex flex-col items-start justify-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center px-4 py-1.5 mb-8 border border-white/20 rounded-full font-medium text-xs tracking-widest uppercase text-white/80"
          >
            Organic · Sparkling · 0 Sugar
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.05] text-white mb-6">
            <motion.span 
              variants={itemVariants}
              className="block"
            >
              Pure Refreshment.
            </motion.span>
            <motion.span 
              variants={itemVariants}
              className="block text-primary"
            >
              Naturally Elevated.
            </motion.span>
          </h1>

          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl font-medium text-gray-400 mb-12 max-w-lg leading-relaxed"
          >
            Zero sugar. Zero compromise. 100% real fruit extract. Experience the clarity of flavor.
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-6 mb-16 w-full sm:w-auto"
          >
            <motion.button
              onClick={() => scrollTo('flavors')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="px-8 py-4 font-bold text-sm uppercase tracking-wider text-[#0C0C0C] bg-primary transition-colors hover:bg-white w-full sm:w-auto text-center"
              style={{ boxShadow: '4px 4px 0 0 rgba(242, 201, 76, 0.3)' }}
            >
              Shop Flavors
            </motion.button>
            <motion.button
              onClick={() => scrollTo('our-story')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="px-8 py-4 bg-transparent font-bold text-sm uppercase tracking-wider text-white border border-white/30 transition-colors hover:border-white w-full sm:w-auto text-center"
            >
              Explore Ingredients
            </motion.button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div variants={itemVariants}>
            <motion.div 
              className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-white/50"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1.3 }}
            >
              <ArrowDown className="w-4 h-4" />
              <span>Scroll to discover</span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ── Photography Column ── */}
        <div className="flex-1 w-full lg:h-[85vh] flex items-center justify-center lg:justify-end relative order-first lg:order-last">
          <motion.div 
            animate={{ y: [-8, 8, -8] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-full max-w-md aspect-[4/5] max-h-[55vh] lg:max-h-none lg:-mt-8"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full relative"
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
                className="absolute -bottom-6 -left-6"
              >
                <motion.div
                  animate={{ y: [-3, 3, -3] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="bg-[#0C0C0C] border border-primary px-6 py-3 rounded-full flex items-center justify-center shadow-lg"
                >
                  <span className="text-xs font-bold uppercase tracking-widest text-white">100% Organic</span>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
