import { projects } from '../data/content'

const ExternalLinkIcon = () => (
  <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <path d="M2 10L10 2M10 2H5M10 2v5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default function CaseStudies() {
  return (
    <section className="case-studies">
      <div className="section-header">
        <h2 className="section-title">Projects</h2>
        <p className="section-subtitle">Healthcare analytics projects — from claims pipelines to clinical dashboards.</p>
      </div>

      <div className="projects-grid">
        {projects.map(project => (
          <div key={project.id} className="project-card">

            {/* Title row with inline GitHub icon */}
            <div className="project-header">
              <h3 className="project-title">{project.title}</h3>
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-title-link"
                  aria-label={`View ${project.title} on GitHub`}
                >
                  <ExternalLinkIcon />
                </a>
              )}
            </div>

            {/* Bullet points */}
            <ul className="project-bullets">
              {project.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>

            {/* Tool tags */}
            <div className="tool-tags">
              {project.tools.map(tool => (
                <span key={tool} className="tool-tag">{tool}</span>
              ))}
            </div>

            {/* Footer link */}
            {project.url && (
              <div className="project-footer">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  View on GitHub <ExternalLinkIcon />
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
