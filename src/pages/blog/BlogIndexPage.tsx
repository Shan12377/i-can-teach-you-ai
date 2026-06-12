import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BLOG_POSTS } from './blogData';
import styles from './Blog.module.css';
import s from '../../styles/shared.module.css';

const CATEGORIES = ['All', 'HIPAA', 'Vibe Coding', 'Claude Code', 'Exam Prep', 'Automation', 'Compliance', 'Business', 'Build Notes', 'Strategy'];

export default function BlogIndexPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? BLOG_POSTS
    : BLOG_POSTS.filter(p => p.category === activeCategory);

  const featured = BLOG_POSTS[0];
  const rest = filtered.slice(activeCategory === 'All' ? 1 : 0);

  return (
    <div className={styles.page}>
      <div className={s.wrapWide}>
        <div className={styles.header}>
          <span className={styles.kicker}>Knowledge Base</span>
          <h1 className={styles.h1}>The Healthcare AI Blog</h1>
          <p className={styles.subtitle}>
            HIPAA-conscious workflows, vibe coding for clinicians, compliance strategy, and build notes from real deployed systems.
          </p>
        </div>

        {/* Category Filter */}
        <div className={styles.filters}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`${styles.filterBtn} ${activeCategory === cat ? styles.filterBtnActive : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        {activeCategory === 'All' && (
          <Link to={`/blog/${featured.slug}`} className={styles.featured}>
            <div className={styles.featuredMeta}>
              <span className={styles.featuredBadge}>Featured</span>
              <span className={styles.featuredCategory}>{featured.category}</span>
              <span className={styles.featuredDate}>{featured.date}</span>
              <span className={styles.featuredRead}>{featured.readTime}</span>
            </div>
            <h2 className={styles.featuredTitle}>{featured.title}</h2>
            <p className={styles.featuredExcerpt}>{featured.excerpt}</p>
            <span className={styles.readMore}>Read article &rarr;</span>
          </Link>
        )}

        {/* Post Grid */}
        <div className={styles.grid}>
          {rest.map(post => (
            <Link key={post.slug} to={`/blog/${post.slug}`} className={styles.card}>
              <div className={styles.cardMeta}>
                <span className={styles.cardCategory}>{post.category}</span>
                <span className={styles.cardDate}>{post.date}</span>
              </div>
              <h3 className={styles.cardTitle}>{post.title}</h3>
              <p className={styles.cardExcerpt}>{post.excerpt}</p>
              <div className={styles.cardFooter}>
                <span className={styles.cardRead}>{post.readTime}</span>
                <span className={styles.cardArrow}>&rarr;</span>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className={styles.empty}>
            <p>No posts in this category yet. Check back soon.</p>
          </div>
        )}
      </div>
    </div>
  );
}
