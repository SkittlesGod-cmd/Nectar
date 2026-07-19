import React from 'react';
import { motion } from 'framer-motion';
import waterDropsImg from '@assets/generated_images/water_droplets.png';
import citrusImg from '@assets/generated_images/citrus_cut.png';
import aluminumImg from '@assets/generated_images/aluminum_texture.png';
import botanicalImg from '@assets/generated_images/botanicals.png';

const images = [
  waterDropsImg,
  citrusImg,
  aluminumImg,
  botanicalImg
];

export default function BrandStory() {
  return (
    <section id="our-story" className="py-32 w-full bg-[#0A0A0A] relative z-20 border-t-[3px] border-border overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Text Content */}
          <div className="flex-1 w-full lg:pr-12">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-5xl md:text-7xl font-bold uppercase tracking-tighter text-white mb-10 leading-[0.9]"
            >
              Crafted <br/> From The <br/> Source.
            </motion.h2>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                visible: { transition: { staggerChildren: 0.2 } }
              }}
              className="space-y-6 text-xl font-medium text-gray-400"
            >
              <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 }}}>
                We didn't set out to make another seltzer. We set out to redefine what refreshment feels like. Nectar is born from a precise, 7-step micro-filtration process that strips away impurities, leaving behind water that is shockingly crisp.
              </motion.p>
              <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 }}}>
                Then, we infuse. No natural flavors. No "essences." We use whole organic botanicals and fruit extracts sourced from farms we actually visit. The color you see is the color of the earth.
              </motion.p>
              <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 }}} className="text-white border-l-4 border-primary pl-6 py-2 mt-8 font-bold text-2xl uppercase tracking-wide">
                Zero compromises. Just pure, electric flavor.
              </motion.p>
            </motion.div>
          </div>

          {/* Visual Grid */}
          <div className="flex-1 w-full">
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {images.map((src, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                  className={`relative w-full aspect-square border-2 border-border overflow-hidden bg-black ${i === 1 ? 'mt-8 md:mt-12' : ''} ${i === 2 ? '-mt-8 md:-mt-12' : ''}`}
                >
                  <img 
                    src={src} 
                    alt="Brand imagery" 
                    className="w-full h-full object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal hover:scale-110 hover:opacity-100 transition-all duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
