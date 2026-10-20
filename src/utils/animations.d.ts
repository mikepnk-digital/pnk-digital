// Types for animations.js, so TypeScript callers see framer-motion Variants
// (the cubic-bezier `ease` arrays otherwise infer as number[]).
import type { Variants } from 'framer-motion';

export const staggerContainer: Variants;
export function createStaggerContainer(staggerChildren?: number, delayChildren?: number): Variants;
export const fadeInUp: Variants;
export const fadeInUpLarge: Variants;
export const fadeInLeft: Variants;
export const fadeInRight: Variants;
export const viewportWithMargin: { once: boolean; amount: number };
