import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { BLOG_POSTS } from './blogData';
import styles from './Blog.module.css';
import s from '../../styles/shared.module.css';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = BLOG_POSTS.find(p => p.slug === slug);

  if (!post) return <Navigate to="/blog" replace />;

  const related = BLOG_POSTS.filter(p => p.slug !== slug && p.category === post.category).slice(0, 2);

  // Convert markdown-ish content to HTML paragraphs
  const renderContent = (content: string) => {
    const lines = content.trim().split('\n');
    const elements: React.ReactElement[] = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i].trim();

      if (line.startsWith('## ')) {
        elements.push(<h2 key={i} className={styles.postH2}>{line.replace('## ', '')}</h2>);
      } else if (line.startsWith('### ')) {
        elements.push(<h3 key={i} className={styles.postH3}>{line.replace('### ', '')}</h3>);
      } else if (line.startsWith('**') && line.endsWith('**') && (line.match(/\*\*/g) || []).length === 2) {
        elements.push(<p key={i} className={styles.postBold}>{line.slice(2, -2)}</p>);
      } else if (line.startsWith('```')) {
        // Code block
        const codeLines: string[] = [];
        i++;
        while (i < lines.length && !lines[i].startsWith('```')) {
          codeLines.push(lines[i]);
          i++;
        }
        elements.push(
          <pre key={i} className={styles.codeBlock}>
            <code>{codeLines.join('\n')}</code>
          </pre>
        );
      } else if (line.startsWith('- ')) {
        const listItems: string[] = [];
        while (i < lines.length && lines[i].trim().startsWith('- ')) {
          listItems.push(lines[i].trim().replace('- ', ''));
          i++;
        }
        elements.push(
          <ul key={i} className={styles.postList}>
            {listItems.map((item, idx) => (
              <li key={idx} dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
            ))}
          </ul>
        );
        continue;
      } else if (line.length > 0) {
        const html = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        elements.push(<p key={i} className={styles.postP} dangerouslySetInnerHTML={{ __html: html }} />);
      }

      i++;
    }

    return elements;
  };

  return (
    <div className={styles.postPage}>
      <div className={s.wrapWide}>
        <div className={styles.postLayout}>
          <article className={styles.postArticle}>
            {/* Back link */}
            <Link to="/blog" className={styles.backLink}>&larr; Back to Blog</Link>

            {/* Header */}
            <div className={styles.postHeader}>
              <div className={styles.postMeta}>
                <span className={styles.postCategory}>{post.category}</span>
                <span className={styles.postDate}>{post.date}</span>
                <span className={styles.postRead}>{post.readTime}</span>
              </div>
              <h1 className={styles.postH1}>{post.title}</h1>
              <p className={styles.postLead}>{post.excerpt}</p>
            </div>

            {/* Disclaimer */}
            <div className={styles.postDisclaimer}>
              This article is for educational and informational purposes only. It does not constitute legal, medical, or professional advice. Consult qualified professionals for guidance specific to your situation.
            </div>

            {/* Content */}
            <div className={styles.postContent}>
              {renderContent(post.content)}
            </div>

            {/* Author */}
            <div className={styles.postAuthor}>
              <div className={styles.authorAvatar}>SH</div>
              <div className={styles.authorInfo}>
                <div className={styles.authorName}>Dr. Shallanda Hunter, PharmD</div>
                <div className={styles.authorBio}>
                  Functional Medicine Educator, AI integration specialist, and builder of HIPAA-conscious health technology. Founder of Hunters Holistic Health and I Can Teach You AI.
                </div>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className={styles.postSidebar}>
            <div className={styles.sidebarCard}>
              <div className={styles.sidebarTitle}>Join the Waitlist</div>
              <p className={styles.sidebarText}>
                Get early access to courses, tools, and resources for healthcare professionals learning AI.
              </p>
              <Link to="/waitlist" className={styles.sidebarBtn}>Get Early Access</Link>
            </div>

            {related.length > 0 && (
              <div className={styles.sidebarCard}>
                <div className={styles.sidebarTitle}>Related Articles</div>
                <div className={styles.relatedList}>
                  {related.map(r => (
                    <Link key={r.slug} to={`/blog/${r.slug}`} className={styles.relatedItem}>
                      <span className={styles.relatedCategory}>{r.category}</span>
                      <span className={styles.relatedTitle}>{r.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className={styles.sidebarCard}>
              <div className={styles.sidebarTitle}>CCA-F Exam Prep</div>
              <p className={styles.sidebarText}>
                207 practice questions for the Claude Code Associate Foundations exam. All six domains covered.
              </p>
              <Link to="/exam-prep" className={styles.sidebarBtnGold}>View Exam Prep &rarr;</Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
