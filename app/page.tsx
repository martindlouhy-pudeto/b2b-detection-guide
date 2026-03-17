import HeroSection from '@/components/HeroSection'
import HowItWorksSection from '@/components/HowItWorksSection'
import GuideSection from '@/components/GuideSection'
import DownloadSection from '@/components/DownloadSection'
import LimitationsSection from '@/components/LimitationsSection'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <HowItWorksSection />
      <GuideSection />
      <DownloadSection />
      <LimitationsSection />
      <Footer />
    </main>
  )
}
