import { certifications } from '../data/content'

/* ── External link icon ──────────────────────────────────── */
const ExternalLinkIcon = () => (
  <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <path d="M2 10L10 2M10 2H5M10 2v5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

/* ── Issuer logos ────────────────────────────────────────── */

/* Microsoft — official 4-square logo */
const MicrosoftLogo = () => (
  <svg viewBox="0 0 21 21" aria-label="Microsoft" role="img">
    <rect x="1"  y="1"  width="9" height="9" fill="#f25022" />
    <rect x="11" y="1"  width="9" height="9" fill="#7fba00" />
    <rect x="1"  y="11" width="9" height="9" fill="#00a4ef" />
    <rect x="11" y="11" width="9" height="9" fill="#ffb900" />
  </svg>
)

/* DataCamp — DC hexagon badge */
const DataCampLogo = () => (
  <svg viewBox="0 0 32 32" aria-label="DataCamp" role="img" fill="none">
    <polygon
      points="16,2 28,9 28,23 16,30 4,23 4,9"
      fill="none"
      stroke="#03EF62"
      strokeWidth="2"
    />
    <text
      x="16" y="21"
      textAnchor="middle"
      fontFamily="'Inter', sans-serif"
      fontWeight="700"
      fontSize="10"
      fill="#03EF62"
    >DC</text>
  </svg>
)

/* Alison — stylised "A" in brand green */
const AlisonLogo = () => (
  <svg viewBox="0 0 32 32" aria-label="Alison" role="img" fill="none">
    <rect width="32" height="32" rx="6" fill="#4CAF50" fillOpacity="0.15" />
    <text
      x="16" y="23"
      textAnchor="middle"
      fontFamily="'Inter', sans-serif"
      fontWeight="800"
      fontSize="18"
      fill="#4CAF50"
    >A</text>
  </svg>
)

/* CMS — Centers for Medicare & Medicaid Services */
const CMSLogo = () => (
  <svg viewBox="0 0 32 32" aria-label="CMS" role="img" fill="none">
    <rect width="32" height="32" rx="6" fill="#1565C0" fillOpacity="0.15" />
    <text
      x="16" y="21"
      textAnchor="middle"
      fontFamily="'Inter', sans-serif"
      fontWeight="800"
      fontSize="9"
      letterSpacing="0.5"
      fill="#4FC3F7"
    >CMS</text>
    {/* Small stars motif */}
    <text x="16" y="13" textAnchor="middle" fontSize="7" fill="#4FC3F7">★ ★ ★</text>
  </svg>
)

const LOGOS = {
  microsoft: <MicrosoftLogo />,
  datacamp:  <DataCampLogo />,
  alison:    <AlisonLogo />,
  cms:       <CMSLogo />,
}

/* ── Component ───────────────────────────────────────────── */
export default function Certifications() {
  return (
    <section className="certifications">
      <div className="section-header">
        <h2 className="section-title">Certifications</h2>
        <p className="section-subtitle">
          Credentials in data analytics, healthcare compliance, and business intelligence.
        </p>
      </div>

      <div className="cert-grid">
        {certifications.map(cert => (
          <div key={cert.id} className="cert-card">

            {/* Issuer row */}
            <div className="cert-org-row">
              <span className="cert-org-logo">
                {LOGOS[cert.logoType] ?? (
                  <span className="cert-org-badge">{cert.issuerCode}</span>
                )}
              </span>
              <div className="cert-org-meta">
                <span className="cert-org-name">{cert.issuer}</span>
                <span className="cert-year">{cert.year}</span>
              </div>
            </div>

            {/* Cert name */}
            <p className="cert-name">{cert.name}</p>

            {/* View certificate link */}
            {cert.url && (
              <div className="cert-footer">
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cert-link"
                >
                  View Certificate <ExternalLinkIcon />
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
