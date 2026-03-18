import { MetadataRoute } from 'next'
import statesAM from '@/data/states-a-m.json'
import statesNZ from '@/data/states-n-z.json'

const BASE_URL = 'https://mortcalc.org'
const allStates = { ...statesAM, ...statesNZ }

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  // Static core pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/mortgage-calculator`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
  ]

  // 50 state pages
  const statePages: MetadataRoute.Sitemap = Object.keys(allStates).map((slug) => ({
    url: `${BASE_URL}/mortgage-calculator/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [...staticPages, ...statePages]
}
