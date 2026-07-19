import React from 'react';
import { motion } from 'framer-motion';

const DropletOffIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
    <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>
    <line x1="2" y1="2" x2="22" y2="22" />
  </svg>
);

const FruitIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 2v20"/>
    <path d="m4.93 4.93 14.14 14.14"/>
    <path d="m19.07 4.93-14.14 14.14"/>
  </svg>
);

const LeafRecycleIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
    <path d="m14 17 5 5"/>
    <path d="m19 17-5 5"/>
  </svg>
);

const props = [
  {
    num: "01",
    title: "Zero Added Sugar",
    desc: "Naturally sweet without the crash. No stevia, no erythritol, just pure refreshment.",
    icon: <DropletOffIcon />,
  },
  {
    num: "02",
    title: "100% Real Fruit",
    desc: "Cold-pressed extracts from premium organic fruits and botanicals. Nothing artificial.",
    icon: <FruitIcon />,
  },
  {
    num: "03",
    title: "Sustainably Sourced",
    desc: "Packaged in infinitely recyclable aluminum. Sourced with respect for the earth.",
    icon: <LeafRecycleIcon />,
  }
];

export default function ValueProps() {
  return (
    <section className="bg-[#0C0C0C] relative z-20 border-b border-border">
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
        {props.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{ backgroundColor: "#111111" }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="p-12 md:p-16 flex flex-col items-start relative overflow-hidden group transition-colors"
          >
            {/* Background Number */}
            <div className="absolute top-4 right-8 text-8xl font-black text-primary opacity-5 group-hover:opacity-10 select-none transition-all duration-700 group-hover:scale-110">
              {item.num}
            </div>

            <div className="mb-8 p-3 rounded-full border border-white/10 bg-[#1A1A1A] group-hover:border-white/20 group-hover:bg-[#222] transition-colors duration-300">
              {item.icon}
            </div>
            
            <h3 className="text-xl font-bold mb-3 text-white tracking-wide relative z-10">
              {item.title}
            </h3>
            
            <p className="text-gray-400 leading-relaxed text-sm max-w-[90%] relative z-10">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
