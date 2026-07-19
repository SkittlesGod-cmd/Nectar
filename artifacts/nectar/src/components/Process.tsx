import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    num: "01",
    title: "Source",
    desc: "We start with mountain-filtered spring water. Nothing from a tap. Nothing compromised.",
    color: "var(--nectar-yuzu)"
  },
  {
    num: "02",
    title: "Filter",
    desc: "Seven micro-filtration stages. Each one strips another layer of impurity until only the purest water remains.",
    color: "var(--nectar-berry)"
  },
  {
    num: "03",
    title: "Infuse",
    desc: "Whole organic botanicals and cold-pressed fruit extracts are added in precise ratios. No concentrates.",
    color: "var(--nectar-cucumber)"
  },
  {
    num: "04",
    title: "Seal",
    desc: "Canned in infinitely recyclable aluminum within 90 minutes of infusion. Flavor locked at peak.",
    color: "var(--nectar-yuzu)"
  }
];

const containerV = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };
const cardV = { 
  hidden: { opacity: 0, y: 44 }, 
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16,1,0.3,1] } } 
};

export default function Process() {
  return (
    <section className="py-24 md:py-32 bg-[#0C0C0C] border-t border-border relative z-20 overflow-hidden">
      <div className="container mx-auto px-6">
        
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-6xl font-bold uppercase tracking-tighter text-white mb-16 md:mb-24"
        >
          How We Make It
        </motion.h2>

        <div className="relative">
          {/* Desktop dashed line */}
          <div className="hidden md:block absolute top-[2.75rem] left-0 right-0 border-t border-dashed border-white/10 z-0" />

          <motion.div 
            className="flex flex-col md:flex-row gap-8 md:gap-6 relative z-10"
            variants={containerV} 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, amount: 0.2 }}
          >
            {steps.map((step, i) => (
              <motion.div
                key={i}
                variants={cardV}
                whileHover={{ y: -4, borderColor: step.color }}
                transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                style={{ borderColor: 'rgba(255,255,255,0.08)' }}
                className="flex-1 bg-[#121212] border p-6 md:p-8 relative overflow-hidden group rounded-sm"
              >
                {/* Background Number */}
                <div 
                  className="absolute -top-4 -right-4 text-[10rem] font-black leading-none opacity-[0.03] select-none pointer-events-none transition-transform duration-700 group-hover:scale-110"
                  style={{ color: step.color }}
                >
                  {step.num}
                </div>

                <div 
                  className="w-12 h-12 flex items-center justify-center rounded-full border border-white/10 bg-[#1A1A1A] mb-8 text-white font-bold relative z-10"
                >
                  {step.num}
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-white tracking-wide relative z-10">
                  {step.title}
                </h3>
                
                <p className="text-gray-400 text-sm leading-relaxed relative z-10">
                  {step.desc}
                </p>

                {/* Animated Bottom Border */}
                <div 
                  className="absolute bottom-0 left-0 right-0 h-1 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[0.16,1,0.3,1]"
                  style={{ backgroundColor: step.color }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
