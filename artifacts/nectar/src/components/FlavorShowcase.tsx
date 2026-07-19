import React from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../App';
import { ShoppingCart } from 'lucide-react';
import yuzuImg from '@assets/generated_images/yuzu_splash.png';
import berryImg from '@assets/generated_images/berry_bliss.png';
import cucumberImg from '@assets/generated_images/cucumber_crisp.png';

const flavors = [
  {
    id: 'yuzu',
    name: 'Yuzu Splash',
    color: '#FFE600',
    notes: 'Zesty yuzu, lemongrass & a hint of ginger. Sunshine in a can.',
    image: yuzuImg,
    borderColor: 'border-[#FFE600]'
  },
  {
    id: 'berry',
    name: 'Berry Bliss',
    color: '#FF2E93',
    notes: 'Wild blackberry, hibiscus & rose. A ruby rush with every sip.',
    image: berryImg,
    borderColor: 'border-[#FF2E93]'
  },
  {
    id: 'cucumber',
    name: 'Cucumber Crisp',
    color: '#00F0A8',
    notes: 'Garden cucumber, cool mint & lime zest. Clarity in a can.',
    image: cucumberImg,
    borderColor: 'border-[#00F0A8]'
  }
];

export default function FlavorShowcase() {
  const { setCartCount, setActiveFlavor } = useAppContext();

  return (
    <section id="flavors" className="py-32 min-h-screen relative z-10">
      <div className="container mx-auto px-6">
        
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter text-white">
            Find Your <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFE600] via-[#FF2E93] to-[#00F0A8]">Flavor</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {flavors.map((flavor, i) => (
            <motion.div
              key={flavor.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.15 }}
              onMouseEnter={() => setActiveFlavor(flavor.id)}
              onMouseLeave={() => setActiveFlavor(null)}
              className={`bg-[#0F0F0F] border-[3px] ${flavor.borderColor} flex flex-col shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-4 transition-all duration-300 group overflow-hidden`}
            >
              <div className="w-full aspect-[3/4] relative overflow-hidden border-b-[3px] border-inherit">
                <img 
                  src={flavor.image} 
                  alt={flavor.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100 mix-blend-luminosity group-hover:mix-blend-normal"
                />
                <div 
                  className="absolute inset-0 transition-opacity duration-500 opacity-60 group-hover:opacity-0 mix-blend-multiply pointer-events-none"
                  style={{ backgroundColor: flavor.color }}
                />
              </div>

              <div className="p-8 flex flex-col flex-grow justify-between bg-black">
                <div>
                  <h3 className="text-3xl font-bold uppercase tracking-wide text-white mb-2" style={{ color: flavor.color }}>
                    {flavor.name}
                  </h3>
                  <p className="text-gray-400 font-medium min-h-[3rem] mb-6">
                    {flavor.notes}
                  </p>
                </div>
                
                <div className="flex items-center justify-between border-t-[2px] border-border pt-6">
                  <span className="text-2xl font-bold text-white">$2.99 <span className="text-sm text-gray-500">/ can</span></span>
                  <button 
                    onClick={() => setCartCount(c => c + 1)}
                    className="flex items-center justify-center w-12 h-12 rounded-none border-2 border-transparent text-black font-bold transition-all hover:scale-110 active:scale-95"
                    style={{ backgroundColor: flavor.color }}
                    aria-label={`Add ${flavor.name} to cart`}
                  >
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
