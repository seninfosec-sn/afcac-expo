import TopBar from '@/components/TopBar'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Stats from '@/components/Stats'
import About from '@/components/About'
import Remarks from '@/components/Remarks'
import Programme from '@/components/Programme'
import Speakers from '@/components/Speakers'
import Sponsors from '@/components/Sponsors'
import Venue from '@/components/Venue'
import Travel from '@/components/Travel'
import Accommodation from '@/components/Accommodation'
import RegisterCTA from '@/components/RegisterCTA'
import BackToTop from '@/components/BackToTop'
import ScrollReveal from '@/components/ScrollReveal'

export default function Home() {
  return (
    <>
      <TopBar />
      <Header />
      <main>
        <Hero />
        <Stats />
        <About />
        <Remarks />
        <Programme />
        <Speakers />
        <Sponsors />
        <Venue />
        <Travel />
        <Accommodation />
        <RegisterCTA />
      </main>
      <BackToTop />
      <ScrollReveal />
    </>
  )
}
