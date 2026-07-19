import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../App';

const flavorBubbleColors: Record<string, string[]> = {
  yuzu: ['#FFE600', '#FFF176', '#FFD600'],
  berry: ['#FF2E93', '#FF80C0', '#E91E8C'],
  cucumber: ['#00F0A8', '#69FFDB', '#00C98A'],
};
const defaultColors = ['#FFE600', '#FF2E93', '#00F0A8'];

function randomBetween(a: number, b: number) {
  return a + Math.random() * (b - a);
}

interface Bubble {
  id: number;
  x: number;
  size: number;
  delay: number;
  duration: number;
  colorIndex: number;
  opacity: number;
  blur: number;
}

export default function Bubbles({ count = 18 }: { count?: number }) {
  const { activeFlavor } = useAppContext();

  const bubbles = useMemo<Bubble[]>(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: randomBetween(2, 98),
      size: randomBetween(6, 28),
      delay: randomBetween(0, 8),
      duration: randomBetween(6, 16),
      colorIndex: i % 3,
      opacity: randomBetween(0.12, 0.5),
      blur: randomBetween(0, 2),
    })),
    [count]
  );

  const colors = activeFlavor && flavorBubbleColors[activeFlavor]
    ? flavorBubbleColors[activeFlavor]
    : defaultColors;

  return (
    <div className="fixed inset-0 pointer-events-none z-[2] overflow-hidden">
      {bubbles.map((b) => (
        <motion.div
          key={b.id}
          className="absolute rounded-full"
          style={{
            left: `${b.x}%`,
            bottom: `-${b.size + 10}px`,
            width: b.size,
            height: b.size,
            backgroundColor: colors[b.colorIndex],
            opacity: b.opacity,
            filter: `blur(${b.blur}px)`,
            boxShadow: `0 0 ${b.size * 1.5}px ${colors[b.colorIndex]}66`,
          }}
          animate={{
            y: [0, -(window.innerHeight + b.size + 40)],
            x: [0, randomBetween(-40, 40)],
            opacity: [b.opacity, b.opacity * 0.6, 0],
            scale: [1, 1.15, 0.85],
          }}
          transition={{
            duration: b.duration,
            delay: b.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
