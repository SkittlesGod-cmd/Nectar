import React, { useEffect } from 'react';
import { useAppContext } from '../App';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ValueProps from '../components/ValueProps';
import FlavorShowcase from '../components/FlavorShowcase';
import BrandStory from '../components/BrandStory';
import Footer from '../components/Footer';
import CustomCursor from '../components/CustomCursor';
import Bubbles from '../components/Bubbles';
import { motion, AnimatePresence } from 'framer-motion';

const flavorColors: Record<string, string> = {
  yuzu: 'rgba(255, 230, 0, 0.15)',
  berry: 'rgba(255, 46, 147, 0.15)',
  cucumber: 'rgba(0, 240, 168, 0.15)',
};

export default function Home() {
  const { activeFlavor } = useAppContext();
  
  // Base background for the page
  const bgColor = activeFlavor && flavorColors[activeFlavor] ? flavorColors[activeFlavor] : 'transparent';

  useEffect(() => {
    // Add dark class to html to force dark mode styles if not already set
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="relative min-h-[100dvh] w-full overflow-hidden text-foreground bg-[#0A0A0A] font-sans selection:bg-primary selection:text-black cursor-none">
      <CustomCursor />
      <Bubbles count={22} />

      {/* Dynamic Background Layer */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-0"
        initial={{ backgroundColor: 'transparent' }}
        animate={{ backgroundColor: bgColor }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      />

      {/* Noise Texture */}
      <div
        className="fixed inset-0 pointer-events-none z-[1] opacity-20 mix-blend-overlay"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />

      <div className="relative z-10 flex flex-col w-full">
        <Navbar />
        <main>
          <Hero />
          <ValueProps />
          <FlavorShowcase />
          <BrandStory />
        </main>
        <Footer />
      </div>
    </div>
  );
}
