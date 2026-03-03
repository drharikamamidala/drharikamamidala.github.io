import { useState } from 'react'
import { sqlCategories } from '../data/sqlProblems'

/* ── Icons ────────────────────────────────────────────────── */
const ExternalLinkIcon = () => (
  <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <path d="M2 10L10 2M10 2H5M10 2v5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const CheckIcon = () => (
  <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
    <path d="M1.5 6l3 3 6-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const ChevronIcon = () => (
  <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <path d="M2.5 4.5L6 8l3.5-3.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

/* ── localStorage helpers ────────────────────────────────── */
const STORAGE_KEY = 'sql-practice-checked'

function loadChecked() {
  try {
    return new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'))
  } catch {
    return new Set()
  }
}

function saveChecked(set) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]))
  } catch {}
}

/* ── Component ───────────────────────────────────────────── */
export default function SQL() {
  const [checked, setChecked]     = useState(loadChecked)
  const [collapsed, setCollapsed] = useState({})

  const totalProblems = sqlCategories.reduce((s, c) => s + c.problems.length, 0)
  const totalChecked  = checked.size
  const pct           = totalProblems ? Math.round((totalChecked / totalProblems) * 100) : 0

  function toggle(id) {
    setChecked(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      saveChecked(next)
      return next
    })
  }

  function toggleCollapse(catId) {
    setCollapsed(prev => ({ ...prev, [catId]: !prev[catId] }))
  }

  return (
    <section className="sql-practice">

      {/* ── Page header ──────────────────────────────────── */}
      <div className="section-header">
        <h2 className="section-title">SQL Practice</h2>
        <p className="section-subtitle">
          49 curated LeetCode SQL problems — check off as you solve them. Progress saves locally in your browser.
        </p>
      </div>

      {/* ── Overall progress bar ─────────────────────────── */}
      <div className="sql-progress-wrap">
        <div className="sql-progress-track">
          <div className="sql-progress-fill" style={{ width: `${pct}%` }} />
        </div>
        <span className="sql-progress-label">
          {totalChecked}&thinsp;/&thinsp;{totalProblems}
        </span>
      </div>

      {/* ── Problem list ─────────────────────────────────── */}
      <div className="sql-list">
        {sqlCategories.map(cat => {
          const catSolved   = cat.problems.filter(p => checked.has(p.id)).length
          const isCollapsed = !!collapsed[cat.id]

          return (
            <div key={cat.id} className="sql-category">

              {/* Category header */}
              <button
                className="sql-cat-header"
                onClick={() => toggleCollapse(cat.id)}
                aria-expanded={!isCollapsed}
              >
                <span className={`sql-chevron${isCollapsed ? ' sql-chevron--up' : ''}`}>
                  <ChevronIcon />
                </span>
                <span className="sql-cat-name">{cat.name}</span>
                <span className="sql-cat-count">
                  <span className={catSolved === cat.problems.length && cat.problems.length > 0 ? 'sql-cat-count--done' : ''}>
                    {catSolved}
                  </span>
                  &thinsp;/&thinsp;{cat.problems.length}
                </span>
              </button>

              {/* Problem rows */}
              {!isCollapsed && (
                <div className="sql-rows">
                  {/* Column labels */}
                  <div className="sql-col-labels" aria-hidden="true">
                    <span />
                    <span className="sql-col-num">#</span>
                    <span className="sql-col-title">Problem</span>
                    <span className="sql-col-diff">Difficulty</span>
                    <span />
                  </div>

                  {cat.problems.map((p, i) => {
                    const done = checked.has(p.id)
                    return (
                      <div
                        key={p.id}
                        className={[
                          'sql-row',
                          i % 2 === 1 ? 'sql-row--stripe' : '',
                          done          ? 'sql-row--done'   : '',
                        ].filter(Boolean).join(' ')}
                      >
                        {/* Checkbox */}
                        <button
                          className={`sql-checkbox${done ? ' sql-checkbox--checked' : ''}`}
                          onClick={() => toggle(p.id)}
                          aria-label={`Mark "${p.title}" as ${done ? 'incomplete' : 'complete'}`}
                        >
                          {done && <CheckIcon />}
                        </button>

                        {/* Problem number */}
                        <span className="sql-num">{p.id}.</span>

                        {/* Title — opens LeetCode */}
                        <a
                          href={p.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`sql-title${done ? ' sql-title--done' : ''}`}
                        >
                          {p.title}
                        </a>

                        {/* Difficulty badge */}
                        <span className={`sql-diff sql-diff--${p.difficulty.toLowerCase()}`}>
                          {p.difficulty}
                        </span>

                        {/* External link icon */}
                        <a
                          href={p.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="sql-ext"
                          aria-label={`Open on LeetCode`}
                          tabIndex={-1}
                        >
                          <ExternalLinkIcon />
                        </a>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
