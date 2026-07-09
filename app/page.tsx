import { Hero } from '@/components/home/Hero'
import { BrandStory } from '@/components/home/BrandStory'
import { FeaturedProducts } from '@/components/home/FeaturedProducts'
import { HowItWorks } from '@/components/home/HowItWorks'
import { FeaturedCarousel } from '@/components/home/FeaturedCarousel'
import { Testimonials } from '@/components/home/Testimonials'
import { UrgencyTicker } from '@/components/ui/UrgencyTicker'

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandStory />
      <UrgencyTicker />
      <FeaturedProducts />
      <HowItWorks />
      <FeaturedCarousel />
      <Testimonials />
    </>
  )
}
