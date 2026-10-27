import { CartBar } from './components/CartBar'
import { CartDialog } from './components/CartDialog'
import { Footer } from './components/layout/Footer'
import { Nav } from './components/layout/Nav'
import { About } from './components/sections/About'
import { Closing } from './components/sections/Closing'
import { Faq } from './components/sections/Faq'
import { Hero } from './components/sections/Hero'
import { HowItWorks } from './components/sections/HowItWorks'
import { Menu } from './components/sections/Menu'
import { Pillars } from './components/sections/Pillars'
import { Steps } from './components/sections/Steps'
import { Testimonials } from './components/sections/Testimonials'
import { Trust } from './components/sections/Trust'
import { OrderProvider } from './context/OrderProvider'

export default function App() {
  return (
    <OrderProvider>
      <a
        href="#topo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        Pular para o conteúdo
      </a>
      <Nav />
      <main id="topo" tabIndex={-1} className="pt-16">
        <Hero />
        <Steps />
        <About />
        <Pillars />
        <Menu />
        <HowItWorks />
        <Trust />
        <Testimonials />
        <Faq />
        <Closing />
      </main>
      <Footer />
      <CartBar />
      <CartDialog />
    </OrderProvider>
  )
}
