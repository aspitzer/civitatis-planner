'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { LandingPage } from '@/components/landing-page'
import { TripCockpit } from '@/components/trip-cockpit'
import { useTripStore } from '@/lib/store/useTripStore'

export default function Home() {
  const isLandingMode = useTripStore((state) => state.isLandingMode)

  return (
    <main className="min-h-screen">
      <AnimatePresence mode="wait">
        {isLandingMode ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <LandingPage />
          </motion.div>
        ) : (
          <motion.div
            key="cockpit"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <TripCockpit />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
