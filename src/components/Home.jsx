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
            I am a <code>Health Informatics</code> graduate student at Sacred Heart
            University with prior training in dental medicine{' '}
            <code>(BDS, India)</code>, specializing in healthcare data analytics,
            interoperability, and clinical data systems.
          </p>

          <p>
            My experience includes building analytical pipelines and dashboards
            using <code>SQL</code>, <code>Power BI</code>, and <code>Python</code>,
            working with healthcare datasets, and aligning data workflows with
            standards such as <code>HL7</code>, <code>FHIR</code>, and{' '}
            <code>TEFCA</code>.
          </p>

          <p>
            My current interests include healthcare analytics, data modeling,
            interoperability frameworks, and clinical decision support systems.
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
