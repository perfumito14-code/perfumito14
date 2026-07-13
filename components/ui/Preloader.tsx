'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const DURATION_MS = 2200

export function Preloader() {
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    setMounted(true)
    document.body.style.overflow = 'hidden'
    const timer = setTimeout(() => {
      setVisible(false)
      document.body.style.overflow = ''
    }, DURATION_MS)
    return () => {
      clearTimeout(timer)
      document.body.style.overflow = ''
    }
  }, [])

  if (!mounted) return null

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-8 bg-foreground"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-5xl font-semibold tracking-[0.22em] text-background md:text-7xl"
          >
            PERFUMITO14
          </motion.span>

          <div className="h-px w-48 overflow-hidden bg-background/25 md:w-64">
            <motion.div
              className="h-full bg-background"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: DURATION_MS / 1000 - 0.3, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
