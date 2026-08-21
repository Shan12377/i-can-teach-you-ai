import { useEffect } from 'react';

export const SITE_URL = 'https://www.icanteachyouai.com';
export const SITE_NAME = 'I Can Teach You AI';

export interface SeoInput {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article';
  noindex?: boolean;
  jsonLd?: object;
}

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

export function applySeo(seo: SeoInput) {
  const url = SITE_URL + seo.path;
  document.title = seo.title;
  setMeta('name', 'description', seo.description);
  setMeta('name', 'robots', seo.noindex ? 'noindex, nofollow' : 'index, follow');
  setMeta('property', 'og:title', seo.title);
  setMeta('property', 'og:description', seo.description);
  setMeta('property', 'og:url', url);
  setMeta('property', 'og:type', seo.type ?? 'website');
  setMeta('property', 'og:site_name', SITE_NAME);
  setMeta('property', 'og:image', `${SITE_URL}/og-image.png`);
  setMeta('name', 'twitter:card', 'summary_large_image');
  setMeta('name', 'twitter:title', seo.title);
  setMeta('name', 'twitter:description', seo.description);
  setMeta('name', 'twitter:image', `${SITE_URL}/og-image.png`);

  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = url;

  const existing = document.getElementById('seo-jsonld');
  if (existing) existing.remove();
  if (seo.jsonLd) {
    const script = document.createElement('script');
    script.id = 'seo-jsonld';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(seo.jsonLd);
    document.head.appendChild(script);
  }
}

// Pass null to skip (keeps hook order valid on pages with early returns)
export function useSeo(seo: SeoInput | null) {
  useEffect(() => {
    if (seo) applySeo(seo);
  }, [seo?.path]); // eslint-disable-line react-hooks/exhaustive-deps
}

// Static route metadata. Blog post pages set their own via useSeo in BlogPostPage.
export const ROUTE_META: Record<string, SeoInput> = {
  '/': {
    title: 'AI Training for Healthcare Professionals | I Can Teach You AI',
    description:
      'HIPAA-conscious AI workflows, Claude Code certification prep, and vibe coding for non-developers. Taught by Dr. Shallanda Hunter, PharmD, who built a functional medicine platform with AI.',
    path: '/',
  },
  '/about': {
    title: 'About Dr. Shallanda Hunter, PharmD | I Can Teach You AI',
    description:
      'Dr. Shallanda Hunter is a PharmD and Functional Medicine Educator teaching healthcare professionals to build secure, compliant AI systems without a development background.',
    path: '/about',
  },
  '/products': {
    title: 'AI Courses for Healthcare Professionals | I Can Teach You AI',
    description:
      'Courses and products for healthcare professionals building with AI: CCA-F exam prep, HIPAA-conscious workflow training, and monthly access to Hunters Holistic Health resources.',
    path: '/products',
  },
  '/exam-prep': {
    title: 'CCA-F Exam Prep: 207 Claude Code Practice Questions',
    description:
      '207 practice questions for the Claude Code certification exam, written by a PharmD who builds production systems with Claude Code. Study smarter and pass the CCA-F.',
    path: '/exam-prep',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'CCA-F Exam Prep',
      description:
        '207 practice questions for the Claude Code Associate Foundations (CCA-F) exam, covering all six domains with official documentation citations.',
      brand: { '@id': `${SITE_URL}/#org` },
      offers: {
        '@type': 'Offer',
        price: '37.00',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: `${SITE_URL}/exam-prep`,
      },
    },
  },
  '/blog': {
    title: 'Blog: HIPAA-Conscious AI and Vibe Coding | I Can Teach You AI',
    description:
      'Technical guides on HIPAA-conscious AI workflows, n8n automation, Claude Code, and vibe coding for healthcare professionals. Written by Dr. Shallanda Hunter, PharmD.',
    path: '/blog',
  },
  '/services': {
    title: 'AI Workflow Services for Healthcare | I Can Teach You AI',
    description:
      'Done-for-you AI workflow design, n8n automation, and compliant intake systems for healthcare practices and health educators. Built by a PharmD who ships production systems.',
    path: '/services',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Do I need technical experience?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. All workshops and sessions are designed for non-technical professionals. The goal is to teach you how to direct AI tools, not how to code them.',
          },
        },
        {
          '@type': 'Question',
          name: 'Are sessions HIPAA compliant?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'All 1-on-1 sessions are conducted via Doxy.me, a free HIPAA-compliant video platform. No PHI is collected or stored during sessions.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can you customize a workshop for my specialty?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Workshops can be tailored for pharmacy, nursing, functional medicine, or general healthcare administration. Contact us to discuss your specific needs.',
          },
        },
        {
          '@type': 'Question',
          name: 'How long does a custom build take?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Most custom workflow builds are completed within 1 to 2 weeks after the discovery call and scope agreement. Larger app builds are quoted per project.',
          },
        },
      ],
    },
  },
  '/waitlist': {
    title: 'Join the Waitlist | I Can Teach You AI',
    description:
      'Get early access to AI training built for healthcare professionals: HIPAA-conscious workflows, Claude Code prep, and vibe coding fundamentals.',
    path: '/waitlist',
  },
  '/exam': {
    title: 'Exam Practice | I Can Teach You AI',
    description: 'CCA-F exam practice, for verified purchasers.',
    path: '/exam',
    noindex: true,
  },
  '/waitlist/questions': {
    title: 'Waitlist Questions | I Can Teach You AI',
    description: 'Tell us about your background and goals so we can tailor your early access.',
    path: '/waitlist/questions',
    noindex: true,
  },
  '/checkout': {
    title: 'Checkout | I Can Teach You AI',
    description: 'Secure checkout for I Can Teach You AI products.',
    path: '/checkout',
    noindex: true,
  },
  '/checkout/success': {
    title: 'Order Confirmed | I Can Teach You AI',
    description: 'Your order is confirmed.',
    path: '/checkout/success',
    noindex: true,
  },
  '/terms': {
    title: 'Terms of Service | I Can Teach You AI',
    description: 'Terms of service for I Can Teach You AI.',
    path: '/terms',
  },
  '/privacy': {
    title: 'Privacy Policy | I Can Teach You AI',
    description: 'Privacy policy for I Can Teach You AI. We collect the minimum data needed and never sell it.',
    path: '/privacy',
  },
};
