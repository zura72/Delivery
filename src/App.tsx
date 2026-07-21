import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Stats } from './components/Stats'
import { Services } from './components/Services'
import { Fleet } from './components/Fleet'
import { HowItWorks } from './components/HowItWorks'
import { Estimator } from './components/Estimator'
import { Tracking } from './components/Tracking'
import { Features } from './components/Features'
import { Testimonials } from './components/Testimonials'
import { CTA } from './components/CTA'
import { Footer } from './components/Footer'
import { Booking } from './pages/Booking'
import { CompanyProfile } from './pages/CompanyProfile'

function ScrollTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Kembali ke atas"
          style={{
            bottom: 'max(1.5rem, env(safe-area-inset-bottom))',
            right: 'max(1.5rem, env(safe-area-inset-right))',
          }}
          className="fixed z-40 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-accent-500 text-on-brand shadow-xl shadow-brand-600/30 transition-transform hover:scale-105 active:scale-95"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

function useHashRoute() {
  const [hash, setHash] = useState(window.location.hash)
  useEffect(() => {
    const onHash = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])
  return hash
}

const routeFade = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
}

export default function App() {
  const hash = useHashRoute()
  const route = hash.startsWith('#/pesan')
    ? 'pesan'
    : hash.startsWith('#/profil')
      ? 'profil'
      : 'home'

  useEffect(() => {
    if (route !== 'home') window.scrollTo({ top: 0 })
  }, [route])

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <AnimatePresence mode="wait">
        {route === 'pesan' && (
          <motion.div key="pesan" {...routeFade}>
            <Booking />
          </motion.div>
        )}

        {route === 'profil' && (
          <motion.div key="profil" {...routeFade}>
            <CompanyProfile />
          </motion.div>
        )}

        {route === 'home' && (
          <motion.div key="home" {...routeFade}>
            <Navbar />
            <main>
              <Hero />
              <Stats />
              <Services />
              <Fleet />
              <HowItWorks />
              <Estimator />
              <Tracking />
              <Features />
              <Testimonials />
              <CTA />
            </main>
            <Footer />
            <ScrollTop />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
