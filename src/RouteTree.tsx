import { Suspense, type ComponentType } from 'react';
import { Routes, Route } from 'react-router-dom';
import SiteLayout from './components/layout/SiteLayout';

export interface RoutePages {
  LandingPage: ComponentType;
  AboutPage: ComponentType;
  ProductsPage: ComponentType;
  ExamPrepPage: ComponentType;
  ExamPage: ComponentType;
  BlogIndexPage: ComponentType;
  BlogPostPage: ComponentType;
  WaitlistPage: ComponentType;
  WaitlistQuestionsPage: ComponentType;
  CheckoutPage: ComponentType;
  CheckoutSuccessPage: ComponentType;
  ServicesPage: ComponentType;
  TermsPage: ComponentType;
  PrivacyPage: ComponentType;
}

interface RouteTreeProps {
  pages: RoutePages;
}

function renderPage(Page: ComponentType) {
  return (
    <Suspense fallback={null}>
      <Page />
    </Suspense>
  );
}

export default function RouteTree({ pages }: RouteTreeProps) {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={renderPage(pages.LandingPage)} />
        <Route path="/about" element={renderPage(pages.AboutPage)} />
        <Route path="/products" element={renderPage(pages.ProductsPage)} />
        <Route path="/exam-prep" element={renderPage(pages.ExamPrepPage)} />
        <Route path="/exam" element={renderPage(pages.ExamPage)} />
        <Route path="/blog" element={renderPage(pages.BlogIndexPage)} />
        <Route path="/blog/:slug" element={renderPage(pages.BlogPostPage)} />
        <Route path="/waitlist" element={renderPage(pages.WaitlistPage)} />
        <Route path="/waitlist/questions" element={renderPage(pages.WaitlistQuestionsPage)} />
        <Route path="/checkout" element={renderPage(pages.CheckoutPage)} />
        <Route path="/checkout/success" element={renderPage(pages.CheckoutSuccessPage)} />
        <Route path="/services" element={renderPage(pages.ServicesPage)} />
        <Route path="/terms" element={renderPage(pages.TermsPage)} />
        <Route path="/privacy" element={renderPage(pages.PrivacyPage)} />
      </Route>
    </Routes>
  );
}
