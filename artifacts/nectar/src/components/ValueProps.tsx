import React from 'react';
import { motion } from 'framer-motion';

const DropletOffIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#FFE600]">
    <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>
    <line x1="2" y1="2" x2="22" y2="22" />
  </svg>
);

const FruitIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#FF2E93]">
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 2v20"/>
    <path d="m4.93 4.93 14.14 14.14"/>
    <path d="m19.07 4.93-14.14 14.14"/>
  </svg>
);

const LeafRecycleIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#00F0A8]">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
    <path d="m14 17 5 5"/>
    <path d="m19 17-5 5"/>
  </svg>
);

const props = [
  {
    title: "Zero Added Sugar",
    desc: "Naturally sweet without the crash. No stevia, no erythritol, just pure refreshment.",
    icon: <DropletOffIcon />,
    borderColor: 'border-[#FFE600]'
  },
  {
    title: "100% Real Fruit",
    desc: "Cold-pressed extracts from premium organic fruits and botanicals. Nothing artificial.",
    icon: <FruitIcon />,
    borderColor: 'border-[#FF2E93]'
  },
  {
    title: "Sustainably Sourced",
    desc: "Packaged in infinitely recyclable aluminum. Sourced with respect for the earth.",
    icon: <LeafRecycleIcon />,
    borderColor: 'border-[#00F0A8]'
  }
];

export default function ValueProps() {
  return (
    <section className="py-24 w-full bg-[#0A0A0A] relative z-20 border-y-[3px] border-border">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {props.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.2, ease: "easeOut" }}
              className={`p-8 bg-[#121212] border-[3px] ${item.borderColor} shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 transition-all duration-300 flex flex-col items-start group`}
            >
              <div className="mb-6 p-4 bg-black rounded-lg border-2 border-border group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white uppercase tracking-wide">
                {item.title}
              </h3>
              <p className="text-gray-400 font-medium leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
