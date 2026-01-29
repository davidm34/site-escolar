import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { AboutUs } from "@/components/about"
import { Portfolio } from "@/components/portfolio"
import { Testimonials } from "@/components/case-studies"
import { Team } from "@/components/team"
import { ContactCTA } from "@/components/contact-cta"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Portfolio />
      <AboutUs />
      <Team />
      <Testimonials />
      <ContactCTA />
      <Footer />
    </main>
  )
}
