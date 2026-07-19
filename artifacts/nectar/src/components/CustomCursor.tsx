import React, { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { useAppContext } from '../App';

const flavorCursorColors: Record<string, string> = {
  yuzu: '#FFE600',
  berry: '#FF2E93',
  cucumber: '#00F0A8',
};

export default function CustomCursor() {
  const { activeFlavor } = useAppContext();
  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const dotX = useSpring(rawX, { stiffness: 900, damping: 50, mass: 0.3 });
  const dotY = useSpring(rawY, { stiffness: 900, damping: 50, mass: 0.3 });
  const ringX = useSpring(rawX, { stiffness: 220, damping: 28, mass: 0.8 });
  const ringY = useSpring(rawY, { stiffness: 220, damping: 28, mass: 0.8 });

  const cursorColor = activeFlavor ? flavorCursorColors[activeFlavor] : '#ffffff';

  useEffect(() => {
    const move = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      setVisible(true);
    };
    const down = () => setClicking(true);
    const up = () => setClicking(false);
    const over = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      setHovering(
        !!(el.closest('a') || el.closest('button') || (el as HTMLElement).style?.cursor === 'pointer')
      );
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);
    window.addEventListener('mouseover', over);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
      window.removeEventListener('mouseover', over);
    };
  }, [rawX, rawY]);

  if (!visible) return null;

  return (
    <>
      {/* Outer ring — lags behind */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border-2 mix-blend-difference"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          borderColor: cursorColor,
          width: hovering ? 56 : clicking ? 28 : 40,
          height: hovering ? 56 : clicking ? 28 : 40,
          opacity: 0.85,
          transition: 'width 0.2s ease, height 0.2s ease, border-color 0.4s ease',
        }}
      />
      {/* Inner dot — snappy */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          backgroundColor: cursorColor,
          width: clicking ? 6 : 8,
          height: clicking ? 6 : 8,
          transition: 'width 0.1s ease, height 0.1s ease, background-color 0.4s ease',
        }}
      />
      {/* Glow orb — flavor tinted, floats lazily */}
      {activeFlavor && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full blur-2xl opacity-30"
          style={{
            x: ringX,
            y: ringY,
            translateX: '-50%',
            translateY: '-50%',
            backgroundColor: cursorColor,
            width: 80,
            height: 80,
            transition: 'background-color 0.4s ease',
          }}
        />
      )}
    </>
  );
}
