import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const statsData = [
  { value: 7, suffix: '-Step', label: 'Micro-Filtration' },
  { value: 100, suffix: '%', label: 'Real Fruit Extract' },
  { value: 0, suffix: 'g', label: 'Added Sugar' },
  { value: 3, suffix: '', label: 'Signature Flavors' }
];

const StatItem = ({ value, suffix, label }: { value: number, suffix: string, label: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      if (value === 0) {
        setCount(0);
        return;
      }
      let startTime: number;
      const duration = 1500; // 1.5s
      
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        // easeOutQuart
        const easeOut = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(easeOut * value));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(value);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="flex flex-col items-center justify-center py-12 px-2 md:px-6 relative text-center">
      <div className="flex items-baseline mb-2">
        <span className="text-7xl md:text-9xl font-black text-[#F2C94C]">{count}</span>
        {suffix && <span className="text-4xl md:text-6xl font-black text-[#F2C94C] ml-1">{suffix}</span>}
      </div>
      <span className="text-sm uppercase tracking-widest text-gray-500 font-medium">{label}</span>
    </div>
  );
};

export default function Stats() {
  return (
    <section className="bg-[#0A0A0A] border-y border-border relative z-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 md:divide-x divide-border">
          {statsData.map((stat, i) => (
            <StatItem key={i} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}