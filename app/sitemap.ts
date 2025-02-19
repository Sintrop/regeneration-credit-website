import type {MetadataRoute} from 'next';

export default function sitemap(): MetadataRoute.Sitemap{
    return [
        {
            url: 'https://regenerationcredit.com',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
            alternates: {
                languages: {
                    en: 'https://regenerationcredit.com',
                    pt: 'https://regenerationcredit.com/pt'
                }
            }
        },
        {
            url: 'https://regenerationcredit.com/resources',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
            alternates: {
                languages: {
                    en: 'https://regenerationcredit.com/resources',
                    pt: 'https://regenerationcredit.com/pt/resources'
                }
            }
        },
    ]
}