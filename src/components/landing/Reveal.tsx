'use client'

import { motion, type Variants } from 'framer-motion'

interface RevealProps {
  children: React.ReactNode
  /** Seconds to wait before animating once in view */
  delay?: number
  /** Vertical travel distance in px */
  y?: number
  className?: string
}

const variants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
}

/** Fade-up scroll reveal — animates once when ~20% of the element enters the viewport. */
export function Reveal({ children, delay = 0, y = 28, className }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{ ...variants, hidden: { opacity: 0, y } }}
      transition={{ duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  )
}
