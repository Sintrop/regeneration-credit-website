import type { MetadataRoute } from 'next';
import { SITE_URL, localizedUrl } from '@/lib/metadata';

type Route = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
};

const routes: Route[] = [
  { path: '/', priority: 1, changeFrequency: 'daily' },
  { path: '/resources', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/publications', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/community', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/supporters', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/download', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/faq', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/network', priority: 0.6, changeFrequency: 'monthly' },
  {
    path: '/methods/sintropia/privacy-policy',
    priority: 0.3,
    changeFrequency: 'yearly',
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: path === '/' ? SITE_URL : `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
    alternates: {
      languages: {
        en: localizedUrl(path, 'en'),
        pt: localizedUrl(path, 'pt'),
      },
    },
  }));
}
