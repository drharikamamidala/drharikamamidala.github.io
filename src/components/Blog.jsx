import { useState, useEffect } from 'react'

const MEDIUM_USERNAME = 'drharikamamidala'
const RSS_API = `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${MEDIUM_USERNAME}`
const MEDIUM_URL = `https://${MEDIUM_USERNAME}.medium.com/`

/* ── Helpers ─────────────────────────────────────────────── */
function stripHtml(html = '') {
  return html.replace(/<[^>]*>/g, '').replace(/&[a-z]+;/gi, ' ').replace(/\s+/g, ' ').trim()
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  })
}

function readTime(content = '') {
  const words = stripHtml(content).split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

/* ── Skeleton card ───────────────────────────────────────── */
function Skeleton() {
  return (
    <div className="blog-card blog-card--skeleton" aria-hidden="true">
      <div className="blog-thumb blog-skel-thumb" />
      <div className="blog-body">
        <div className="blog-skel-line blog-skel-line--short" />
        <div className="blog-skel-line" />
        <div className="blog-skel-line blog-skel-line--med" />
        <div className="blog-skel-line blog-skel-line--short" />
      </div>
    </div>
  )
}

/* ── External arrow icon ─────────────────────────────────── */
const ArrowIcon = () => (
  <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <path d="M2 10L10 2M10 2H5M10 2v5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

/* ── Component ───────────────────────────────────────────── */
export default function Blog() {
  const [posts,   setPosts]   = useState([])
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(false)

  useEffect(() => {
    fetch(RSS_API)
      .then(r => r.json())
      .then(data => {
        if (data.status === 'ok') setPosts(data.items ?? [])
        else setError(true)
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="blog">
      <div className="section-header">
        <h2 className="section-title">Blog</h2>
        <p className="section-subtitle">
          Writing on healthcare analytics, SQL, and data-driven decision making.
          &nbsp;
          <a href={MEDIUM_URL} target="_blank" rel="noopener noreferrer" className="blog-medium-link">
            View all on Medium <ArrowIcon />
          </a>
        </p>
      </div>

      {/* Loading skeletons */}
      {loading && (
        <div className="blog-grid">
          <Skeleton /><Skeleton /><Skeleton /><Skeleton />
        </div>
      )}

      {/* Error state */}
      {!loading && error && (
        <div className="blog-empty">
          <p>Couldn't load posts right now.</p>
          <a href={MEDIUM_URL} target="_blank" rel="noopener noreferrer" className="blog-fallback-link">
            Read on Medium <ArrowIcon />
          </a>
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && posts.length === 0 && (
        <div className="blog-empty">
          <p>No posts published yet.</p>
          <a href={MEDIUM_URL} target="_blank" rel="noopener noreferrer" className="blog-fallback-link">
            Visit Medium <ArrowIcon />
          </a>
        </div>
      )}

      {/* Post cards */}
      {!loading && !error && posts.length > 0 && (
        <div className="blog-grid">
          {posts.map(post => {
            const raw     = stripHtml(post.description ?? '')
            const excerpt = raw.length > 180 ? raw.slice(0, 180).trimEnd() + '…' : raw
            const mins    = readTime(post.content ?? post.description)
            const tags    = (post.categories ?? []).slice(0, 3)

            return (
              <a
                key={post.guid}
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="blog-card"
              >
                {/* Thumbnail */}
                {post.thumbnail && (
                  <div className="blog-thumb">
                    <img src={post.thumbnail} alt="" loading="lazy" />
                  </div>
                )}

                <div className="blog-body">
                  {/* Meta */}
                  <div className="blog-meta">
                    <time className="blog-date">{formatDate(post.pubDate)}</time>
                    <span className="blog-dot">·</span>
                    <span className="blog-read">{mins} min read</span>
                  </div>

                  {/* Title */}
                  <h3 className="blog-title">{post.title}</h3>

                  {/* Excerpt */}
                  <p className="blog-excerpt">{excerpt}</p>

                  {/* Tags */}
                  {tags.length > 0 && (
                    <div className="blog-tags">
                      {tags.map(tag => (
                        <span key={tag} className="blog-tag">{tag}</span>
                      ))}
                    </div>
                  )}

                  {/* CTA */}
                  <span className="blog-cta">
                    Read on Medium <ArrowIcon />
                  </span>
                </div>
              </a>
            )
          })}
        </div>
      )}
    </section>
  )
}
