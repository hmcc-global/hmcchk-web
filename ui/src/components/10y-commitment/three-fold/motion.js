import { Box, Image, Text, VStack, usePrefersReducedMotion } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Chakra components wrapped with framer-motion so they accept motion props
// (variants, animate, whileHover, transition) on top of Chakra style props.
export const MotionBox = motion(Box);
export const MotionImage = motion(Image);
export const MotionText = motion(Text);
export const MotionVStack = motion(VStack);

// Shared variants — keep timings in one place instead of scattering magic
// durations across every panel.
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

// Parent that staggers its direct children (each using `fadeUp` or `popIn`).
export const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

// City circles / diagram nodes scaling into place.
export const popIn = {
  hidden: { opacity: 0, scale: 0.6 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 260, damping: 20 },
  },
};

// Spring used for the sliding tab underline and hover lifts.
export const SNAPPY_SPRING = { type: 'spring', stiffness: 400, damping: 35 };

// Animate a number from 0 → target with easeOutCubic once `start` is true.
// Honors reduced-motion by jumping straight to the final value.
export const useCountUp = (target, { start = false, duration = 1600 } = {}) => {
  const prefersReduced = usePrefersReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return undefined;
    if (prefersReduced) {
      setValue(target);
      return undefined;
    }
    let raf;
    let startTs;
    const tick = (ts) => {
      if (startTs === undefined) startTs = ts;
      const progress = Math.min((ts - startTs) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration, prefersReduced]);

  return value;
};
