import { Box, VStack, usePrefersReducedMotion } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

// Chakra components wrapped with framer-motion so they accept motion props
// (variants, animate, whileHover, transition) on top of Chakra style props.
export const MotionBox = motion(Box);
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

// Spring used for the sliding tab underline and hover lifts.
export const SNAPPY_SPRING = { type: 'spring', stiffness: 400, damping: 35 };

// Animate a number to `target` with easeOutCubic once `start` is true.
// Counts from whatever value is currently displayed, so a `target` that
// changes mid-animation (e.g. live data arriving after mount) continues
// smoothly instead of jumping back to 0. Honors reduced-motion by jumping
// straight to the final value.
export const useCountUp = (target, { start = false, duration = 1600 } = {}) => {
  const prefersReduced = usePrefersReducedMotion();
  const [value, setValue] = useState(0);
  const valueRef = useRef(0);

  useEffect(() => {
    if (!start) return undefined;
    if (prefersReduced) {
      valueRef.current = target;
      setValue(target);
      return undefined;
    }
    const from = valueRef.current;
    let raf;
    let startTs;
    const tick = (ts) => {
      if (startTs === undefined) startTs = ts;
      const progress = Math.min((ts - startTs) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const next = Math.round(from + (target - from) * eased);
      valueRef.current = next;
      setValue(next);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration, prefersReduced]);

  return value;
};
