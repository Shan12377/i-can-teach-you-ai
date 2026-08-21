import { lazy } from 'react';
import { BrowserRouter } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import RouteTree, { type RoutePages } from './RouteTree';
import './index.css';

const AboutPage = lazy(() => import('./pages/AboutPage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const ExamPrepPage = lazy(() => import('./pages/ExamPrepPage'));
const ExamPage = lazy(() => import('./pages/ExamPage'));
const BlogIndexPage = lazy(() => import('./pages/blog/BlogIndexPage'));
const BlogPostPage = lazy(() => import('./pages/blog/BlogPostPage'));
const WaitlistPage = lazy(() => import('./pages/intake/WaitlistPage'));
const WaitlistQuestionsPage = lazy(() => import('./pages/intake/WaitlistQuestionsPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const CheckoutSuccessPage = lazy(() => import('./pages/CheckoutSuccessPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const TermsPage = lazy(() => import('./pages/legal/TermsPage'));
const PrivacyPage = lazy(() => import('./pages/legal/PrivacyPage'));

const clientPages: RoutePages = {
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

export default function App() {
  return (
    <BrowserRouter>
      <RouteTree pages={clientPages} />
    </BrowserRouter>
  );
}
