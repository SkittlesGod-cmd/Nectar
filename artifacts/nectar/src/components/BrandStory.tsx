import React from 'react';
import { motion } from 'framer-motion';

const images = [
  "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=600&q=90&fit=crop", // Water
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=90&fit=crop", // Citrus
  "https://images.unsplash.com/photo-1490885578174-acda8905c2c6?w=600&q=90&fit=crop", // Botanicals
  "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&q=90&fit=crop"  // Aluminum
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
              viewport={{ once: true, margin: "-100px" }}
              className="text-4xl md:text-6xl font-bold uppercase tracking-tighter text-white mb-10 leading-[1.05]"
            >
              Crafted <br/> From The <br/> Source.
            </motion.h2>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                visible: { transition: { staggerChildren: 0.15 } }
              }}
              className="space-y-6 text-lg md:text-xl text-gray-400 font-medium"
            >
              <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 }}}>
                We didn't set out to make another seltzer. We set out to redefine what refreshment feels like. Nectar is born from a precise, 7-step micro-filtration process that strips away impurities, leaving behind water that is shockingly crisp.
              </motion.p>
              <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 }}}>
                Then, we infuse. No natural flavors. No "essences." We use whole organic botanicals and fruit extracts sourced from farms we actually visit. The color you see is the color of the earth.
              </motion.p>
              <motion.blockquote 
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 }}} 
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
            <div className="grid grid-cols-2 gap-4 md:gap-6 items-center">
              
              <div className="space-y-4 md:space-y-6">
                {/* Tall aspect */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className="w-full aspect-[2/3] overflow-hidden"
                >
                  <img src={images[0]} alt="Crisp Water" className="w-full h-full object-cover" />
                </motion.div>
                {/* Square aspect */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="w-full aspect-square overflow-hidden"
                >
                  <img src={images[2]} alt="Botanicals" className="w-full h-full object-cover" />
                </motion.div>
              </div>

              <div className="space-y-4 md:space-y-6 pt-12 md:pt-24">
                {/* Short aspect */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="w-full aspect-[4/3] overflow-hidden"
                >
                  <img src={images[1]} alt="Citrus" className="w-full h-full object-cover" />
                </motion.div>
                {/* Tall aspect */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="w-full aspect-[2/3] overflow-hidden"
                >
                  <img src={images[3]} alt="Aluminum Can" className="w-full h-full object-cover" />
                </motion.div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
