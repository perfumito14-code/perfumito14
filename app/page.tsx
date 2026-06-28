import { Hero } from '@/components/home/Hero'
import { BrandStory } from '@/components/home/BrandStory'
import { FeaturedProducts } from '@/components/home/FeaturedProducts'
import { HowItWorks } from '@/components/home/HowItWorks'
import { Testimonials } from '@/components/home/Testimonials'
import { Newsletter } from '@/components/home/Newsletter'

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandStory />
      <FeaturedProducts />
      <HowItWorks />
      <Testimonials />
      <Newsletter />
    </>
  )
}
