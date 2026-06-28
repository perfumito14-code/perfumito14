import { Hero } from '@/components/home/Hero'
import { BrandStory } from '@/components/home/BrandStory'
import { FeaturedProducts } from '@/components/home/FeaturedProducts'
import { HowItWorks } from '@/components/home/HowItWorks'
import { Testimonials } from '@/components/home/Testimonials'
import { Newsletter } from '@/components/home/Newsletter'
import { UrgencyTicker } from '@/components/ui/UrgencyTicker'

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandStory />
      <UrgencyTicker />
      <FeaturedProducts />
      <HowItWorks />
      <Testimonials />
      <Newsletter />
    </>
  )
}
