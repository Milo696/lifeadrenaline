"use client"
import { motion } from 'framer-motion'

export default function AnimateIn({ children, delay = 0, y = 12 }: { children: React.ReactNode; delay?: number; y?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, ease: 'easeOut', delay }}>
      {children}
    </motion.div>
  )
}


