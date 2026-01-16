import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from 'framer-motion';

// Node positions in the final structured state (100x100 viewBox)
const NODES = {
  center: { x: 50, y: 50 },
  primary: [
    { x: 50, y: 30 }, // top
    { x: 67, y: 40 }, // top-right
    { x: 67, y: 60 }, // bottom-right
    { x: 50, y: 70 }, // bottom
    { x: 33, y: 60 }, // bottom-left
    { x: 33, y: 40 }, // top-left
  ],
  secondary: [
    { x: 50, y: 12 }, // far top
    { x: 82, y: 28 }, // far top-right
    { x: 82, y: 72 }, // far bottom-right
    { x: 50, y: 88 }, // far bottom
    { x: 18, y: 72 }, // far bottom-left
    { x: 18, y: 28 }, // far top-left
  ],
};

// Scattered starting positions for particles (chaotic state)
const SCATTERED_POSITIONS = [
  { x: 15, y: 8 },
  { x: 88, y: 15 },
  { x: 92, y: 55 },
  { x: 85, y: 90 },
  { x: 12, y: 85 },
  { x: 5, y: 45 },
  { x: 35, y: 5 },
  { x: 75, y: 10 },
  { x: 95, y: 40 },
  { x: 70, y: 95 },
  { x: 25, y: 92 },
  { x: 8, y: 60 },
];

// Animated particle component
function AnimatedParticle({ startPos, endPos, progress, color, size = 1.5, delay = 0 }) {
  const x = useTransform(progress, [delay, 0.7 + delay * 0.3], [startPos.x, endPos.x]);
  const y = useTransform(progress, [delay, 0.7 + delay * 0.3], [startPos.y, endPos.y]);
  const opacity = useTransform(progress, [0, 0.2, 0.6], [0.15, 0.4, 0.7]);
  const scale = useTransform(progress, [0.5, 0.8], [1, 1.2]);

  return (
    <motion.circle
      r={size}
      fill={color}
      style={{ cx: x, cy: y, opacity, scale }}
    />
  );
}

// Animated path component
function AnimatedPath({ d, progress, startAt = 0, endAt = 0.6, color }) {
  const pathLength = useTransform(progress, [startAt, endAt], [0, 1]);
  const opacity = useTransform(progress, [startAt, startAt + 0.15, endAt], [0, 0.5, 0.6]);

  return (
    <motion.path
      d={d}
      stroke={color}
      strokeWidth="0.5"
      fill="none"
      strokeLinecap="round"
      style={{ pathLength, opacity }}
    />
  );
}

export function DataTransformationViz({ opacity = 0.5, className = '' }) {
  const containerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Central hub animations
  const centerOpacity = useTransform(smoothProgress, [0.4, 0.8], [0, 1]);
  const centerGlow = useTransform(smoothProgress, [0.6, 1], [0, 12]);
  const centerScale = useTransform(smoothProgress, [0.5, 0.9], [0.5, 1]);

  if (prefersReducedMotion) {
    return null;
  }

  // Generate path data
  const centerToPrimaryPaths = NODES.primary.map(
    (node) => `M ${NODES.center.x} ${NODES.center.y} L ${node.x} ${node.y}`
  );

  const primaryRingPaths = NODES.primary.map((node, i) => {
    const next = NODES.primary[(i + 1) % 6];
    return `M ${node.x} ${node.y} L ${next.x} ${next.y}`;
  });

  const primaryToSecondaryPaths = NODES.primary.map(
    (node, i) => `M ${node.x} ${node.y} L ${NODES.secondary[i].x} ${NODES.secondary[i].y}`
  );

  // Combine all end positions for particles
  const allEndPositions = [
    ...NODES.primary,
    ...NODES.secondary,
  ];

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ opacity, zIndex: 1 }}
    >
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full"
      >
        <defs>
          {/* Cyan to Purple gradient */}
          <linearGradient id="cyanPurpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00f5ff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.6" />
          </linearGradient>

          {/* Purple to Magenta gradient */}
          <linearGradient id="purpleMagentaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#ff006e" stopOpacity="0.5" />
          </linearGradient>

          {/* Radial glow for center */}
          <radialGradient id="centerGlow">
            <stop offset="0%" stopColor="#00f5ff" stopOpacity="1" />
            <stop offset="40%" stopColor="#8b5cf6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#ff006e" stopOpacity="0" />
          </radialGradient>

          {/* Glow filter */}
          <filter id="glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Layer 1: Center to Primary paths (draw first) */}
        {centerToPrimaryPaths.map((d, i) => (
          <AnimatedPath
            key={`c2p-${i}`}
            d={d}
            progress={smoothProgress}
            startAt={0.15 + i * 0.03}
            endAt={0.55 + i * 0.03}
            color="url(#cyanPurpleGrad)"
          />
        ))}

        {/* Layer 2: Primary ring paths */}
        {primaryRingPaths.map((d, i) => (
          <AnimatedPath
            key={`ring-${i}`}
            d={d}
            progress={smoothProgress}
            startAt={0.25 + i * 0.02}
            endAt={0.65 + i * 0.02}
            color="#8b5cf6"
          />
        ))}

        {/* Layer 3: Primary to Secondary paths (draw last) */}
        {primaryToSecondaryPaths.map((d, i) => (
          <AnimatedPath
            key={`p2s-${i}`}
            d={d}
            progress={smoothProgress}
            startAt={0.35 + i * 0.03}
            endAt={0.75 + i * 0.03}
            color="url(#purpleMagentaGrad)"
          />
        ))}

        {/* Animated particles */}
        {SCATTERED_POSITIONS.map((startPos, i) => (
          <AnimatedParticle
            key={`particle-${i}`}
            startPos={startPos}
            endPos={allEndPositions[i % allEndPositions.length]}
            progress={smoothProgress}
            color={i % 2 === 0 ? '#00f5ff' : '#8b5cf6'}
            size={i < 6 ? 2 : 1.5}
            delay={i * 0.02}
          />
        ))}

        {/* Central hub node */}
        <motion.circle
          cx={NODES.center.x}
          cy={NODES.center.y}
          r={4}
          fill="url(#centerGlow)"
          filter="url(#glow)"
          style={{
            opacity: centerOpacity,
            scale: centerScale,
            transformOrigin: 'center',
          }}
        />

        {/* Central hub inner glow */}
        <motion.circle
          cx={NODES.center.x}
          cy={NODES.center.y}
          r={2}
          fill="#00f5ff"
          style={{
            opacity: centerOpacity,
            scale: centerScale,
            transformOrigin: 'center',
          }}
        />
      </svg>
    </div>
  );
}

export default DataTransformationViz;
