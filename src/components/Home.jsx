import { useState, useEffect } from 'react'
import { profile, socials } from '../data/content'
import { SocialIcon } from './icons/SocialIcons'

export default function Home() {
  const [imgError, setImgError]       = useState(false)
  const [leetcodeCount, setLeetcodeCount] = useState(null)

  useEffect(() => {
    const lc = socials.find(s => s.type === 'leetcode')
    if (!lc?.username) return
    fetch(`https://leetcode-stats-api.herokuapp.com/${lc.username}`)
      .then(r => r.json())
      .then(data => { if (data?.totalSolved != null) setLeetcodeCount(data.totalSolved) })
      .catch(() => {})
  }, [])

  return (
    <section className="home">

      {/* ── Left column: bio ─────────────────────────────── */}
      <div className="home-left">
        <p className="home-greeting">Hello,</p>

        <h1 className="home-name">
          <strong>{profile.name.split(' ')[0]}</strong>{' '}
          {profile.name.split(' ').slice(1).join(' ')}
        </h1>

        <div className="home-bio">
          <p>
            I am a <code>Healthcare Data Analyst</code> focused on revenue cycle
            and quality analytics — <code>denial management</code>, AR aging,
            claims, and reimbursement. I pair a clinical background{' '}
            <code>(BDS, India)</code> with an <code>MS in Health Informatics</code>{' '}
            from Sacred Heart University.
          </p>

          <p>
            My work centers on turning claims and payer data into clear,
            prioritized action — building <code>SQL</code> models and{' '}
            <code>Power BI</code> dashboards on <code>Epic</code> (Clarity,
            Caboodle) data that help RCM and operations leadership reduce denials
            and recover revenue.
          </p>

          <p>
            My focus areas include denial and AR analytics, reimbursement and
            underpayment analysis, revenue integrity, coding edits{' '}
            <code>(ICD-10-CM, CPT/HCPCS)</code>, and healthcare quality analytics{' '}
            <code>(HEDIS)</code>.
          </p>
        </div>

        {/* Social links */}
        <div className="socials">
          {socials.map(s => (
            <a
              key={s.id}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-pill"
              aria-label={s.label}
            >
              <span className="social-icon"><SocialIcon id={s.id} /></span>
              <span className="social-label">{s.label}</span>
              {s.type === 'leetcode' && leetcodeCount != null && (
                <span className="social-count">{leetcodeCount}</span>
              )}
              {s.type === 'hackerrank' && s.badge && (
                <span className="social-badge">{s.badge}</span>
              )}
            </a>
          ))}
        </div>
      </div>

      {/* ── Right column: photo ───────────────────────────── */}
      <div className="home-right">
        <div className="home-photo-wrap">
          {!imgError ? (
            <img
              src={profile.photo}
              alt={profile.name}
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="home-photo-fallback">HM</div>
          )}
        </div>

        <p className="home-location">{profile.location}</p>
        <a href={`mailto:${profile.email}`} className="home-email">
          {profile.email}
        </a>
      </div>

    </section>
  )
}
