import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://regenerationcredit.org',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
      alternates: {
        languages: {
          en: 'https://regenerationcredit.org',
          pt: 'https://regenerationcredit.org/pt'
        }
      }
    },
    {
      url: 'https://regenerationcredit.org/resources',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
      alternates: {
        languages: {
          en: 'https://regenerationcredit.org/resources',
          pt: 'https://regenerationcredit.org/pt/resources'
        }
      }
    },
    {
      url: 'https://regenerationcredit.org/tutorials',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
      alternates: {
        languages: {
          en: 'https://regenerationcredit.org/tutorials',
          pt: 'https://regenerationcredit.org/pt/tutorials'
        }
      }
    },
  ]
}
