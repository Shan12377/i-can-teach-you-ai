import { useEffect } from 'react';
import { HOME_FAQ, WORKSHOP_FAQ, type FaqItem } from './faq';

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

// Builds FAQPage JSON-LD from the same FAQ arrays the pages render.
export function faqJsonLd(items: FaqItem[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}

function breadcrumb(items: Array<[string, string]>) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map(([name, path], i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name,
      item: `${SITE_URL}${path}`,
    })),
  };
}

export const WORKSHOPS_PATH = '/healthcare-ai-workshops';

// Static route metadata. Blog post pages set their own via useSeo in BlogPostPage.
// Descriptions stay under 155 characters so Google does not truncate them.
export const ROUTE_META: Record<string, SeoInput> = {
  '/': {
    title: 'AI Training for Healthcare Professionals | I Can Teach You AI',
    description:
      'AI training for healthcare professionals: HIPAA-conscious workshops, 1:1 sessions, and Claude Code prep, taught by a PharmD who ships real software.',
    path: '/',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        faqJsonLd(HOME_FAQ),
        {
          '@type': 'Service',
          '@id': `${SITE_URL}/#ai-training`,
          name: 'AI Training for Healthcare Professionals',
          serviceType: 'AI training and workflow education for healthcare organizations',
          provider: { '@id': `${SITE_URL}/#org` },
          areaServed: { '@type': 'Country', name: 'United States' },
          audience: { '@type': 'Audience', audienceType: 'Healthcare professionals, hospitals, pharmacy and nursing programs' },
          url: SITE_URL,
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'I Can Teach You AI services',
            itemListElement: [
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Healthcare AI Workshops', url: `${SITE_URL}${WORKSHOPS_PATH}` } },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '1-on-1 AI Integration Sessions', url: `${SITE_URL}/services#sessions` } },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Custom AI Workflow Build', url: `${SITE_URL}/services#builds` } },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI-Powered Exam Prep', url: `${SITE_URL}/services#exam-prep` } },
            ],
          },
        },
      ],
    },
  },
  [WORKSHOPS_PATH]: {
    title: 'Healthcare AI Workshops for Hospitals and Schools | PharmD-Led',
    description:
      'Half-day and full-day AI workshops for hospitals, pharmacy and nursing programs. HIPAA-conscious, hands-on, taught by Dr. Shallanda Hunter, PharmD.',
    path: WORKSHOPS_PATH,
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Service',
          '@id': `${SITE_URL}${WORKSHOPS_PATH}#service`,
          name: 'Healthcare AI Workshops',
          serviceType: 'AI training workshop for healthcare organizations',
          description:
            'Half-day or full-day AI workshops for hospitals, health systems, pharmacy programs, and nursing schools. Staff learn the Two-Layer Architecture for separating administrative AI from clinical data, hands-on use of ChatGPT, Claude, NotebookLM, Perplexity, and Gemini, and leave with an AI policy template.',
          provider: { '@id': `${SITE_URL}/#org` },
          url: `${SITE_URL}${WORKSHOPS_PATH}`,
          areaServed: { '@type': 'Country', name: 'United States' },
          availableChannel: [
            { '@type': 'ServiceChannel', name: 'Virtual workshop', serviceUrl: `${SITE_URL}${WORKSHOPS_PATH}` },
            { '@type': 'ServiceChannel', name: 'In-person workshop', serviceUrl: `${SITE_URL}${WORKSHOPS_PATH}` },
          ],
          audience: { '@type': 'Audience', audienceType: 'Hospital departments, health systems, pharmacy programs, nursing schools, clinical educators' },
          offers: [
            { '@type': 'Offer', name: 'Half-day AI workshop (3 hours)', availability: 'https://schema.org/InStock', url: `${SITE_URL}${WORKSHOPS_PATH}` },
            { '@type': 'Offer', name: 'Full-day AI workshop (6 hours)', availability: 'https://schema.org/InStock', url: `${SITE_URL}${WORKSHOPS_PATH}` },
          ],
        },
        faqJsonLd(WORKSHOP_FAQ),
        breadcrumb([['Home', '/'], ['Services', '/services'], ['Healthcare AI Workshops', WORKSHOPS_PATH]]),
      ],
    },
  },
  '/about': {
    title: 'About Dr. Shallanda Hunter, PharmD | I Can Teach You AI',
    description:
      'Dr. Shallanda Hunter is a PharmD and Functional Medicine Educator who teaches healthcare professionals to build secure, compliant AI systems.',
    path: '/about',
  },
  '/products': {
    title: 'AI Courses for Healthcare Professionals | I Can Teach You AI',
    description:
      'Courses and products for healthcare professionals building with AI: CCAR-F exam prep, HIPAA-conscious workflow training, and member resources.',
    path: '/products',
  },
  '/exam-prep': {
    title: 'CCAR-F Exam Prep: 207 Practice Questions',
    description:
      '207 practice questions for the Claude Certified Architect: Foundations exam, written by a PharmD who builds production systems with Claude Code.',
    path: '/exam-prep',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Product',
          name: 'CCAR-F Exam Prep',
          description:
            '207 practice questions for the Claude Certified Architect: Foundations (CCAR-F) exam, covering all five domains with official documentation citations.',
          brand: { '@id': `${SITE_URL}/#org` },
          offers: {
            '@type': 'Offer',
            price: '37.00',
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
            url: `${SITE_URL}/exam-prep`,
          },
        },
        {
          '@type': 'Course',
          name: 'CCAR-F Exam Prep',
          description:
            '207 practice questions for the Claude Certified Architect: Foundations (CCAR-F) exam, organized by domain with official documentation citations and explanations.',
          url: `${SITE_URL}/exam-prep`,
          provider: { '@id': `${SITE_URL}/#org` },
          teaches: [
            'Core Claude Code concepts',
            'CLAUDE.md configuration and mastery',
            'Agentic workflows',
            'Safety and compliance in Claude Code',
            'Tool use and integration',
            'Advanced Claude Code patterns',
          ],
          hasCourseInstance: {
            '@type': 'CourseInstance',
            courseMode: 'online',
            instructor: { '@id': `${SITE_URL}/#shallanda-hunter` },
          },
        },
      ],
    },
  },
  '/blog': {
    title: 'Blog: HIPAA-Conscious AI and Vibe Coding | I Can Teach You AI',
    description:
      'Technical guides on HIPAA-conscious AI workflows, n8n automation, Claude Code, and vibe coding for healthcare professionals, by a PharmD.',
    path: '/blog',
  },
  '/services': {
    title: 'AI Services for Healthcare Teams | I Can Teach You AI',
    description:
      'Healthcare AI workshops, 1:1 AI integration sessions, NotebookLM exam prep, and custom n8n workflow builds. Taught and built by a PharmD who ships.',
    path: '/services',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        faqJsonLd([
          {
            q: 'Do I need technical experience?',
            a: 'No. All workshops and sessions are designed for non-technical professionals. The goal is to teach you how to direct AI tools, ChatGPT, Claude, Claude Code, Perplexity, Gemini, and more, not how to code them.',
          },
          {
            q: 'Can you customize a workshop for my specialty?',
            a: 'Yes. Workshops can be tailored for pharmacy, nursing, functional medicine, or general healthcare administration. Contact us to discuss your specific needs.',
          },
          {
            q: 'How long does a custom build take?',
            a: 'Most custom workflow builds are completed within 1 to 2 weeks after the discovery call and scope agreement. Larger app builds are quoted per project.',
          },
        ]),
        breadcrumb([['Home', '/'], ['Services', '/services']]),
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
    description: 'CCAR-F exam practice, for verified purchasers.',
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
