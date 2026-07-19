import React from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../App';
import { ShoppingCart } from 'lucide-react';

const flavors = [
  {
    id: 'yuzu',
    name: 'Yuzu Citrus',
    color: '#F2C94C',
    price: '$2.99',
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=900&q=90&fit=crop',
    alt: 'Fresh yuzu and citrus fruits sliced open',
    size: 'large'
  },
  {
    id: 'berry',
    name: 'Wild Berry',
    color: '#C9184A',
    price: '$2.99',
    image: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=600&q=90&fit=crop',
    alt: 'Collection of wild berries – blackberries, blueberries, raspberries',
    size: 'small'
  },
  {
    id: 'cucumber',
    name: 'Cucumber Mint',
    color: '#2DC653',
    price: '$2.99',
    image: 'https://images.unsplash.com/photo-1604999333679-b86d54738315?w=600&q=90&fit=crop',
    alt: 'Fresh cucumber slices with mint leaves and water',
    size: 'small'
  }
];

export default function FlavorShowcase() {
  const { setCartCount, setActiveFlavor } = useAppContext();

  return (
    <section id="flavors" className="py-24 min-h-screen relative z-10 bg-[#0C0C0C]">
      <div className="container mx-auto px-6">
        
        <div className="mb-12 border-b border-border pb-6 flex items-baseline justify-between">
          <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-white">
            The Collection
          </h2>
          <span className="text-sm font-bold uppercase tracking-widest text-gray-500">03 Flavors</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 h-auto lg:h-[80vh]">
          
          {/* Large Card (Left) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex-[3] relative group overflow-hidden border border-border hover:border-[#F2C94C] transition-colors duration-500 min-h-[400px]"
            onMouseEnter={() => setActiveFlavor('yuzu')}
            onMouseLeave={() => setActiveFlavor(null)}
          >
            {/* Background Image */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                className="w-full h-full"
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0 }}
              >
                <img 
                  src={flavors[0].image} 
                  alt={flavors[0].alt} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </motion.div>
            </div>

            {/* Hover Tint Overlay */}
            <div 
              className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[0.16,1,0.3,1]"
              style={{ backgroundColor: `${flavors[0].color}40` }} // 25% opacity
            />

            {/* Hover Text */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 translate-y-10 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 delay-100 ease-[0.16,1,0.3,1] pointer-events-none">
              <h3 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter text-white drop-shadow-xl">
                {flavors[0].name}
              </h3>
            </div>

            {/* Bottom Bar (Always visible) */}
            <div className="absolute bottom-0 left-0 right-0 bg-[#0C0C0C]/90 backdrop-blur-md border-t border-white/10 p-6 flex items-center justify-between z-10">
              <div>
                <h4 className="text-xl font-bold uppercase tracking-wide text-white">{flavors[0].name}</h4>
                <span className="text-gray-400 font-medium text-sm">{flavors[0].price} / can</span>
              </div>
              <button 
                onClick={() => setCartCount(c => c + 1)}
                className="flex items-center justify-center w-12 h-12 bg-white text-black hover:bg-[#F2C94C] transition-colors"
                aria-label={`Add ${flavors[0].name} to cart`}
              >
                <ShoppingCart className="w-5 h-5" />
              </button>
            </div>
          </motion.div>

          {/* Small Cards Column (Right) */}
          <div className="flex-[2] flex flex-col gap-6">
            {flavors.slice(1).map((flavor, i) => (
              <motion.div
                key={flavor.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: 0.2 + (i * 0.2) }}
                className="flex-1 relative group overflow-hidden border border-border hover:border-white transition-colors duration-500 min-h-[300px]"
                style={{ '--hover-border': flavor.color } as any}
                onMouseEnter={() => setActiveFlavor(flavor.id)}
                onMouseLeave={() => setActiveFlavor(null)}
              >
                <style>{`.group:hover { border-color: ${flavor.color} !important; }`}</style>
                {/* Background Image */}
                <div className="absolute inset-0 overflow-hidden">
                  <motion.div
                    className="w-full h-full"
                    animate={{ scale: [1, 1.03, 1] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: (i + 1) * 2 }}
                  >
                    <img 
                      src={flavor.image} 
                      alt={flavor.alt} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                  </motion.div>
                </div>

                {/* Hover Tint Overlay */}
                <div 
                  className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[0.16,1,0.3,1]"
                  style={{ backgroundColor: `${flavor.color}40` }}
                />

                {/* Hover Text */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 translate-y-10 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 delay-100 ease-[0.16,1,0.3,1] pointer-events-none p-4 text-center">
                  <h3 className="text-3xl md:text-4xl font-bold uppercase tracking-tighter text-white drop-shadow-xl">
                    {flavor.name}
                  </h3>
                </div>

                {/* Bottom Bar (Always visible) */}
                <div className="absolute bottom-0 left-0 right-0 bg-[#0C0C0C]/90 backdrop-blur-md border-t border-white/10 p-5 flex items-center justify-between z-10">
                  <div>
                    <h4 className="text-lg font-bold uppercase tracking-wide text-white">{flavor.name}</h4>
                    <span className="text-gray-400 font-medium text-sm">{flavor.price} / can</span>
                  </div>
                  <button 
                    onClick={() => setCartCount(c => c + 1)}
                    className="flex items-center justify-center w-10 h-10 bg-white text-black hover:bg-black hover:text-white transition-colors border border-transparent hover:border-white"
                    aria-label={`Add ${flavor.name} to cart`}
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}