// Types for Section.jsx, so TypeScript callers can pass its props.
import type { ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';

export interface SectionProps {
  id?: string;
  children?: ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'default' | 'lg' | 'hero' | 'page-header';
  background?: 'transparent' | 'midnight' | 'void' | 'gradient' | 'gradientMidnight';
  orbs?: Array<Record<string, unknown>>;
  overflow?: boolean;
  maxWidth?: '4xl' | '7xl';
}

export const Section: ForwardRefExoticComponent<SectionProps & RefAttributes<HTMLElement>>;
