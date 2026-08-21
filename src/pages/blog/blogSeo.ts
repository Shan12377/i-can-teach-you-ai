import type { BlogPost } from './blogData';
import { SITE_URL, type SeoInput } from '../../lib/seo';

export function getBlogPostSeo(post: BlogPost): SeoInput {
  return {
    title: `${post.title} | I Can Teach You AI`,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    type: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.title,
      description: post.excerpt,
      datePublished: new Date(post.date).toISOString().slice(0, 10),
      url: `${SITE_URL}/blog/${post.slug}`,
      author: { '@id': `${SITE_URL}/#shallanda-hunter` },
      publisher: { '@id': `${SITE_URL}/#org` },
    },
  };
}
