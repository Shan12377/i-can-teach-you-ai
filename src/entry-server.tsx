/* eslint-disable react-refresh/only-export-components */
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import RouteTree, { type RoutePages } from './RouteTree';
import LandingPage from './pages/LandingPage';
import WaitlistPage from './pages/intake/WaitlistPage';
import WaitlistQuestionsPage from './pages/intake/WaitlistQuestionsPage';
import AboutPage from './pages/AboutPage';
import ProductsPage from './pages/ProductsPage';
import ExamPrepPage from './pages/ExamPrepPage';
import ExamPage from './pages/ExamPage';
import BlogIndexPage from './pages/blog/BlogIndexPage';
import BlogPostPage from './pages/blog/BlogPostPage';
import TermsPage from './pages/legal/TermsPage';
import PrivacyPage from './pages/legal/PrivacyPage';
import CheckoutPage from './pages/CheckoutPage';
import CheckoutSuccessPage from './pages/CheckoutSuccessPage';
import ServicesPage from './pages/ServicesPage';
import { ROUTE_META, SITE_URL, SITE_NAME } from './lib/seo';
import { BLOG_POSTS } from './pages/blog/blogData';
import { getBlogPostSeo } from './pages/blog/blogSeo';

const serverPages: RoutePages = {
  LandingPage,
  AboutPage,
  ProductsPage,
  ExamPrepPage,
  ExamPage,
  BlogIndexPage,
  BlogPostPage,
  WaitlistPage,
  WaitlistQuestionsPage,
  CheckoutPage,
  CheckoutSuccessPage,
  ServicesPage,
  TermsPage,
  PrivacyPage,
};

export function render(url: string): string {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <RouteTree pages={serverPages} />
      </StaticRouter>
    </StrictMode>
  );
}

export { ROUTE_META, SITE_URL, SITE_NAME, BLOG_POSTS, getBlogPostSeo };
