import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../App';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'wouter';
import { releasedFlavors } from '@/data/flavors';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

export default function FlavorShowcase() {
  const { setCartCount, setActiveFlavor, addToCart, cartItems } = useAppContext();
  const [hoveredFlavor, setHoveredFlavor] = useState<string | null>(null);

  const handleMouseEnter = (id: string) => {
    setActiveFlavor(id);
    setHoveredFlavor(id);
  };

  const handleMouseLeave = () => {
    setActiveFlavor(null);
    setHoveredFlavor(null);
  };

  return (
    <section id="flavors" className="py-24 min-h-screen relative z-10 bg-[#0C0C0C]">
      <motion.div 
        className="container mx-auto px-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div variants={itemVariants} className="mb-12 border-b border-border pb-6 flex items-baseline justify-between">
          <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-white">
            The Collection
          </h2>
          <span className="text-sm font-bold uppercase tracking-widest text-gray-500">
            {releasedFlavors.length} Flavors
          </span>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-6 h-auto lg:h-[80vh]">
          
          {/* Large Card (Left) - Yuzu */}
          <motion.div
            variants={itemVariants}
            className="flex-[3] relative group overflow-hidden border border-border hover:border-[#F2C94C] transition-colors duration-500 min-h-[320px] md:min-h-[400px]"
            onMouseEnter={() => handleMouseEnter(releasedFlavors[0].id)}
            onMouseLeave={handleMouseLeave}
          >
            {/* Background Image */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                className="w-full h-full"
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0 }}
              >
                <Link href={`/shop/${releasedFlavors[0].id}`} className="block w-full h-full">
                  <img 
                    src={releasedFlavors[0].image} 
                    alt={releasedFlavors[0].alt} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                </Link>
              </motion.div>
            </div>

            {/* Hover Tint Overlay with AnimatePresence */}
            <AnimatePresence>
              {hoveredFlavor === releasedFlavors[0].id && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.3 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="absolute inset-0 pointer-events-none"
                  style={{ backgroundColor: releasedFlavors[0].color }}
                />
              )}
            </AnimatePresence>

            {/* Hover Text */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 translate-y-10 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-[0.16,1,0.3,1] pointer-events-none p-4 text-center">
              <h3 className="text-4xl sm:text-5xl md:text-7xl font-bold uppercase tracking-tighter text-white drop-shadow-xl">
                {releasedFlavors[0].name}
              </h3>
            </div>

            {/* Bottom Bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-[#0C0C0C]/90 backdrop-blur-md border-t border-white/10 p-6 flex items-center justify-between z-10">
              <div>
                <h4 className="text-xl font-bold uppercase tracking-wide text-white">{releasedFlavors[0].name}</h4>
                <span className="text-gray-400 font-medium text-sm">{releasedFlavors[0].price} / can</span>
              </div>
              <div className="flex items-center gap-3">
                <Link 
                  href={`/shop/${releasedFlavors[0].id}`}
                  className="text-white/60 hover:text-primary transition-colors text-sm font-medium uppercase tracking-wider"
                >
                  View Details
                </Link>
                <motion.button 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    addToCart({ 
                      id: releasedFlavors[0].id, 
                      name: releasedFlavors[0].name, 
                      price: releasedFlavors[0].priceValue, 
                      image: releasedFlavors[0].image 
                    });
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="flex items-center justify-center w-12 h-12 bg-white text-black hover:bg-[#F2C94C] transition-colors"
                  aria-label={`Add ${releasedFlavors[0].name} to cart`}
                >
                  <ShoppingCart className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Small Cards Column (Right) */}
          <div className="flex-[2] flex flex-col gap-6">
            {releasedFlavors.slice(1).map((flavor, i) => (
              <motion.div
                key={flavor.id}
                variants={itemVariants}
                className="flex-1 relative group overflow-hidden border border-border transition-colors duration-500 min-h-[260px]"
                style={{ '--hover-border': flavor.color } as React.CSSProperties}
                onMouseEnter={() => handleMouseEnter(flavor.id)}
                onMouseLeave={handleMouseLeave}
              >
                <style>{`.group:hover { border-color: ${flavor.color} !important; }`}</style>
                {/* Background Image */}
                <div className="absolute inset-0 overflow-hidden">
                  <motion.div
                    className="w-full h-full"
                    animate={{ scale: [1, 1.03, 1] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: (i + 1) * 2 }}
                  >
                    <Link href={`/shop/${flavor.id}`} className="block w-full h-full">
                      <img 
                        src={flavor.image} 
                        alt={flavor.alt} 
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                    </Link>
                  </motion.div>
                </div>

                {/* Hover Tint Overlay */}
                <AnimatePresence>
                  {hoveredFlavor === flavor.id && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.3 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="absolute inset-0 pointer-events-none"
                      style={{ backgroundColor: flavor.color }}
                    />
                  )}
                </AnimatePresence>

                {/* Hover Text */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 translate-y-10 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-[0.16,1,0.3,1] pointer-events-none p-4 text-center">
                  <h3 className="text-3xl md:text-4xl font-bold uppercase tracking-tighter text-white drop-shadow-xl">
                    {flavor.name}
                  </h3>
                </div>

                {/* Bottom Bar */}
                <div className="absolute bottom-0 left-0 right-0 bg-[#0C0C0C]/90 backdrop-blur-md border-t border-white/10 p-5 flex items-center justify-between z-10">
                  <div>
                    <h4 className="text-lg font-bold uppercase tracking-wide text-white">{flavor.name}</h4>
                    <span className="text-gray-400 font-medium text-sm">{flavor.price} / can</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link 
                      href={`/shop/${flavor.id}`}
                      className="text-white/60 hover:text-primary transition-colors text-xs font-medium uppercase tracking-wider"
                    >
                      Details
                    </Link>
                    <motion.button 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addToCart({ 
                          id: flavor.id, 
                          name: flavor.name, 
                          price: flavor.priceValue, 
                          image: flavor.image 
                        });
                      }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      className="flex items-center justify-center w-10 h-10 bg-white text-black hover:bg-black hover:text-white transition-colors border border-transparent hover:border-white"
                      aria-label={`Add ${flavor.name} to cart`}
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

        {/* CTA to full shop */}
        <motion.div
          variants={itemVariants}
          className="mt-12 text-center"
        >
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-primary text-primary font-bold uppercase tracking-wider rounded-lg hover:bg-primary hover:text-[#0C0C0C] transition-colors"
          >
            View All Flavors
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
