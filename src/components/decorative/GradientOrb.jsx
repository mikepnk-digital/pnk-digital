import { motion } from 'framer-motion';

export function GradientOrb({
  color = 'cyan',
  size = 400,
  top,
  left,
  right,
  bottom,
  blur = 120,
  opacity = 0.3,
  animate = true,
  delay = 0,
}) {
  const colors = {
    cyan: 'bg-neon-cyan',
    purple: 'bg-neon-purple',
    magenta: 'bg-neon-magenta',
    mixed: 'bg-gradient-to-br from-neon-cyan via-neon-purple to-neon-magenta',
  };

  const position = {
    top: top !== undefined ? top : undefined,
    left: left !== undefined ? left : undefined,
    right: right !== undefined ? right : undefined,
    bottom: bottom !== undefined ? bottom : undefined,
  };

  const animationVariants = {
    initial: { scale: 1, x: 0, y: 0 },
    animate: {
      y: [0, -40, 0],
      x: [0, 20, 0],
      scale: [1, 1.15, 1],
    },
  };

  return (
    <motion.div
      className={`absolute rounded-full ${colors[color]} pointer-events-none`}
      style={{
        width: size,
        height: size,
        filter: `blur(${blur}px)`,
        opacity,
        ...position,
      }}
      initial="initial"
      animate={animate ? 'animate' : 'initial'}
      variants={animationVariants}
      transition={{
        duration: 10 + Math.random() * 4,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    />
  );
}

// Preset orb configurations for easy reuse
export function HeroOrbs() {
  return (
    <>
      <GradientOrb
        color="cyan"
        size={700}
        top="-250px"
        left="-250px"
        opacity={0.15}
        blur={150}
        delay={0}
      />
      <GradientOrb
        color="purple"
        size={600}
        bottom="-200px"
        right="-200px"
        opacity={0.12}
        blur={140}
        delay={2}
      />
      <GradientOrb
        color="magenta"
        size={400}
        top="30%"
        right="5%"
        opacity={0.08}
        blur={100}
        delay={4}
      />
      <GradientOrb
        color="cyan"
        size={300}
        bottom="20%"
        left="10%"
        opacity={0.06}
        blur={80}
        delay={3}
      />
    </>
  );
}
