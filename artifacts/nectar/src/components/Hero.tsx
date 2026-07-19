import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const flavors = [
  { color: '#FFE600', accent: '#FFA800', label: 'YUZU SPLASH' },
  { color: '#FF2E93', accent: '#FF006E', label: 'BERRY BLISS' },
  { color: '#00F0A8', accent: '#00C98A', label: 'CUCUMBER CRISP' },
];

export default function Hero() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((p) => (p + 1) % flavors.length), 3000);
    return () => clearInterval(t);
  }, []);

  const { color, accent, label } = flavors[idx];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[100dvh] w-full flex items-center justify-center pt-20 overflow-hidden">
      {/* Radial glow behind can */}
      <motion.div
        className="absolute right-[5%] top-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full blur-[120px] pointer-events-none"
        animate={{ backgroundColor: `${color}33` }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
      />

      <div className="container mx-auto px-6 h-full flex flex-col lg:flex-row items-center justify-between gap-12 z-10">

        {/* ── Text ── */}
        <div className="flex-1 flex flex-col items-start justify-center pt-12 lg:pt-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Floating flavor pill */}
            <motion.div
              key={label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 border-2 font-bold text-xs tracking-widest uppercase"
              style={{ borderColor: color, color }}
            >
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: color }}
              />
              Now Available — {label}
            </motion.div>

            <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-bold tracking-tighter leading-[0.9] uppercase text-white mb-6">
              Pure <br />
              Refreshment. <br />
              <motion.span
                animate={{ color }}
                transition={{ duration: 1, ease: 'easeInOut' }}
              >
                Naturally <br /> Elevated.
              </motion.span>
            </h1>

            <p
              className="text-xl md:text-2xl font-medium text-gray-300 mb-10 max-w-lg border-l-4 pl-4 transition-colors duration-700"
              style={{ borderColor: color }}
            >
              0 Sugar · 0 Calories · 100% Real Fruit Extract
            </p>

            <div className="flex flex-col sm:flex-row gap-6">
              <motion.button
                onClick={() => scrollTo('flavors')}
                whileHover={{ x: -4, y: -4 }}
                whileTap={{ x: 2, y: 2 }}
                className="px-8 py-4 font-bold text-lg uppercase tracking-wide text-black border-2 transition-all"
                style={{
                  backgroundColor: color,
                  borderColor: color,
                  boxShadow: `6px 6px 0 0 ${color}55`,
                }}
              >
                Shop Flavors
              </motion.button>
              <motion.button
                onClick={() => scrollTo('our-story')}
                whileHover={{ x: -4, y: -4 }}
                whileTap={{ x: 2, y: 2 }}
                className="px-8 py-4 bg-transparent font-bold text-lg uppercase tracking-wide text-white border-2 border-white transition-all"
                style={{ boxShadow: '6px 6px 0 0 rgba(255,255,255,0.2)' }}
              >
                Explore Ingredients
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* ── Can ── */}
        <div className="flex-1 w-full flex items-center justify-center min-h-[500px]">
          <motion.div
            animate={{ y: [-14, 14, -14] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="relative"
          >
            {/* Outer glow ring */}
            <motion.div
              className="absolute inset-0 rounded-[34px] blur-2xl scale-110"
              animate={{ backgroundColor: `${color}55` }}
              transition={{ duration: 1.2 }}
            />

            {/* Can body */}
            <motion.div
              className="relative w-64 md:w-80 rounded-[30px] overflow-hidden border-2"
              style={{ aspectRatio: '3/5' }}
              animate={{ borderColor: `${color}66` }}
              transition={{ duration: 1 }}
            >
              {/* Full-bleed gradient — no gray caps */}
              <motion.div
                className="absolute inset-0"
                animate={{
                  background: `linear-gradient(160deg, ${accent} 0%, ${color} 35%, #1a1a2e 75%, #0A0A0A 100%)`,
                }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
              />

              {/* Specular shine stripe */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.18) 50%, transparent 65%)',
                  animation: 'shineMove 3.5s ease-in-out infinite',
                }}
              />

              {/* Horizontal flavor bands */}
              <motion.div
                className="absolute left-0 right-0 h-[3px]"
                style={{ top: '18%' }}
                animate={{ backgroundColor: color, opacity: 0.7 }}
                transition={{ duration: 1 }}
              />
              <motion.div
                className="absolute left-0 right-0 h-[2px]"
                style={{ top: '22%' }}
                animate={{ backgroundColor: color, opacity: 0.4 }}
                transition={{ duration: 1 }}
              />
              <motion.div
                className="absolute left-0 right-0 h-[3px]"
                style={{ bottom: '18%' }}
                animate={{ backgroundColor: color, opacity: 0.7 }}
                transition={{ duration: 1 }}
              />
              <motion.div
                className="absolute left-0 right-0 h-[2px]"
                style={{ bottom: '22%' }}
                animate={{ backgroundColor: color, opacity: 0.4 }}
                transition={{ duration: 1 }}
              />

              {/* Brand text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center -rotate-90">
                <motion.span
                  className="text-5xl font-black tracking-tighter select-none"
                  animate={{ color: color === '#FFE600' ? '#0A0A0A' : '#ffffff' }}
                  transition={{ duration: 0.6 }}
                  style={{ textShadow: `0 0 40px ${color}99` }}
                >
                  NECTAR
                </motion.span>
                <motion.span
                  key={label}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 0.7, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-xs font-bold tracking-[0.3em] uppercase mt-1"
                  style={{ color: color === '#FFE600' ? '#0A0A0A99' : '#ffffff99' }}
                >
                  {label}
                </motion.span>
              </div>

              {/* Subtle bubbles inside can */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: 4 + (i % 3) * 2,
                    height: 4 + (i % 3) * 2,
                    left: `${20 + i * 12}%`,
                    bottom: -8,
                    backgroundColor: `${color}cc`,
                  }}
                  animate={{ y: [-140 - i * 20, 10], opacity: [0.8, 0] }}
                  transition={{
                    duration: 2.5 + i * 0.4,
                    delay: i * 0.5,
                    repeat: Infinity,
                    ease: 'easeOut',
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
