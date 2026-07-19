import React from 'react';
import { motion } from 'framer-motion';

const images = [
  {
    src: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=600&q=90&fit=crop",
    alt: "Crystal clear sparkling water with ice"
  },
  {
    src: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=600&q=90&fit=crop",
    alt: "Sparkling water being poured over citrus"
  },
  {
    src: "https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9e?w=600&q=90&fit=crop",
    alt: "Effervescent water bubbles close-up"
  },
  {
    src: "https://images.unsplash.com/photo-1560508180-03f285f67ded?w=600&q=90&fit=crop",
    alt: "Refreshing beverage can on ice"
  }
];

export default function BrandStory() {
  return (
    <section id="our-story" className="py-24 md:py-32 w-full bg-[#0C0C0C] relative z-20 border-t border-border overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 md:gap-24 items-center">
          
          {/* Text Content */}
          <div className="flex-1 w-full lg:pr-8">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-6xl font-bold uppercase tracking-tighter text-white mb-10 leading-[1.05]"
            >
              Crafted <br/> From The <br/> Source.
            </motion.h2>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{
                visible: { transition: { staggerChildren: 0.15 } }
              }}
              className="space-y-6 text-lg md:text-xl text-gray-400 font-medium"
            >
              <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}}>
                We didn't set out to make another seltzer. We set out to redefine what refreshment feels like. Nectar is born from a precise, 7-step micro-filtration process that strips away impurities, leaving behind water that is shockingly crisp.
              </motion.p>
              <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}}>
                Then, we infuse. No natural flavors. No "essences." We use whole organic botanicals and fruit extracts sourced from farms we actually visit. The color you see is the color of the earth.
              </motion.p>
              <motion.blockquote 
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="border-l-4 border-primary pl-6 py-2 mt-10"
              >
                <p className="text-white font-bold text-2xl md:text-3xl uppercase tracking-wide leading-tight">
                  Zero compromises. <br className="hidden md:block"/> Just pure, electric flavor.
                </p>
              </motion.blockquote>
            </motion.div>
          </div>

          {/* Visual Grid (Staggered Editorial) */}
          <div className="flex-1 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 items-center">
              
              <div className="space-y-4 md:space-y-6">
                {/* Tall aspect */}
                <motion.div
                  initial={{ opacity: 0, x: 32 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0 }}
                  whileHover={{ scale: 1.03 }}
                  className="w-full aspect-[2/3] overflow-hidden group"
                >
                  <motion.img 
                    src={images[0].src} 
                    alt={images[0].alt} 
                    className="w-full h-full object-cover" 
                    transition={{ duration: 0.6, ease: [0.4,0,0.2,1] }}
                  />
                </motion.div>
                {/* Square aspect */}
                <motion.div
                  initial={{ opacity: 0, x: 32 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                  whileHover={{ scale: 1.03 }}
                  className="w-full aspect-square overflow-hidden group"
                >
                  <motion.img 
                    src={images[2].src} 
                    alt={images[2].alt} 
                    className="w-full h-full object-cover" 
                    transition={{ duration: 0.6, ease: [0.4,0,0.2,1] }}
                  />
                </motion.div>
              </div>

              <div className="space-y-4 md:space-y-6 sm:pt-12 md:pt-24">
                {/* Short aspect */}
                <motion.div
                  initial={{ opacity: 0, x: 32 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.30 }}
                  whileHover={{ scale: 1.03 }}
                  className="w-full aspect-[4/3] overflow-hidden group"
                >
                  <motion.img 
                    src={images[1].src} 
                    alt={images[1].alt} 
                    className="w-full h-full object-cover" 
                    transition={{ duration: 0.6, ease: [0.4,0,0.2,1] }}
                  />
                </motion.div>
                {/* Tall aspect */}
                <motion.div
                  initial={{ opacity: 0, x: 32 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
                  whileHover={{ scale: 1.03 }}
                  className="w-full aspect-[2/3] overflow-hidden group"
                >
                  <motion.img 
                    src={images[3].src} 
                    alt={images[3].alt} 
                    className="w-full h-full object-cover" 
                    transition={{ duration: 0.6, ease: [0.4,0,0.2,1] }}
                  />
                </motion.div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
