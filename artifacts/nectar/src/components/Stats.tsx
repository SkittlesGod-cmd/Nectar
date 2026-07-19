import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const statsData = [
  { value: 7, suffix: '', tag: 'Step', label: 'Micro-Filtration' },
  { value: 100, suffix: '%', tag: '', label: 'Real Fruit Extract' },
  { value: 0, suffix: 'g', tag: '', label: 'Added Sugar' },
  { value: 3, suffix: '', tag: '', label: 'Signature Flavors' },
];

const StatItem = ({
  value,
  suffix,
  tag,
  label,
  index,
}: {
  value: number;
  suffix: string;
  tag: string;
  label: string;
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView || value === 0) {
      setCount(value);
      return;
    }
    let startTime: number | null = null;
    const duration = 1600;

    const tick = (now: number) => {
      if (!startTime) startTime = now;
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
      else setCount(value);
    };

    requestAnimationFrame(tick);
  }, [isInView, value]);

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <motion.div
      ref={ref}
      variants={itemVariants}
      className="flex flex-col items-center justify-center py-10 md:py-14 px-4 text-center"
    >
      <div className="flex items-end leading-none mb-1">
        <span className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-[#F2C94C] tabular-nums">
          {count}
        </span>
        {suffix && (
          <span className="text-3xl md:text-5xl font-black text-[#F2C94C] mb-1 ml-0.5">
            {suffix}
          </span>
        )}
      </div>
      {tag && (
        <span className="block text-base md:text-lg font-bold uppercase tracking-[0.2em] text-[#F2C94C] mb-1">
          {tag}
        </span>
      )}
      <span className="text-xs sm:text-sm uppercase tracking-widest text-gray-500 font-medium mt-1">
        {label}
      </span>
    </motion.div>
  );
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } }
};

export default function Stats() {
  return (
    <section className="bg-[#0A0A0A] border-y border-border relative z-20">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-border"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {statsData.map((stat, i) => (
            <StatItem key={i} {...stat} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
