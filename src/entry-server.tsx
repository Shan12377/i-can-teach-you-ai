import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { AppRoutes } from './App';
import { ROUTE_META, SITE_URL, SITE_NAME } from './lib/seo';
import { BLOG_POSTS } from './pages/blog/blogData';
import { getBlogPostSeo } from './pages/blog/blogSeo';

export function render(url: string): string {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </StrictMode>
  );
}

export { ROUTE_META, SITE_URL, SITE_NAME, BLOG_POSTS, getBlogPostSeo };
