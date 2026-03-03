import { useState, useEffect, useRef } from 'react'
import Home from './components/Home'
import Blog from './components/Blog'
import Certifications from './components/Certifications'
import CaseStudies from './components/CaseStudies'
import SQL from './components/SQL'
import './index.css'

/* ── Top-level tabs (no dropdown) ──────────────────────── */
const TABS = [
  { id: 'home',           label: 'about' },
  { id: 'blog',           label: 'blog' },
  { id: 'certifications', label: 'certifications' },
  { id: 'case-studies',   label: 'projects' },
]

/* ── Practice dropdown items ───────────────────────────── */
const PRACTICE_ITEMS = [
  { id: 'sql', label: 'SQL' },
  // add more practice sections here in the future
]

const ALL_IDS = [...TABS.map(t => t.id), ...PRACTICE_ITEMS.map(p => p.id)]

function getTabFromHash() {
  const hash = window.location.hash.replace('#', '')
  return ALL_IDS.includes(hash) ? hash : 'home'
}

/* ── Icons ─────────────────────────────────────────────── */
const ChevronDown = () => (
  <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
    <path d="M2 4l4 4 4-4" />
  </svg>
)

const SunIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
    <circle cx="10" cy="10" r="3.5" />
    <path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.2 4.2l1.4 1.4M14.4 14.4l1.4 1.4M4.2 15.8l1.4-1.4M14.4 5.6l1.4-1.4" />
  </svg>
)

const MoonIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
  </svg>
)

export default function App() {
  const [activeTab, setActiveTab] = useState(getTabFromHash)
  const [theme,     setTheme]     = useState(() => localStorage.getItem('theme') ?? 'dark')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  /* Apply theme to <html> */
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  /* Hash routing */
  useEffect(() => {
    const onHashChange = () => setActiveTab(getTabFromHash())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  /* Close dropdown on outside click */
  useEffect(() => {
    if (!dropdownOpen) return
    function onOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', onOutside)
    return () => document.removeEventListener('mousedown', onOutside)
  }, [dropdownOpen])

  function handleTabClick(tabId) {
    setActiveTab(tabId)
    window.location.hash = tabId
  }

  function handlePracticeItem(id) {
    handleTabClick(id)
    setDropdownOpen(false)
  }

  const isPracticeActive = PRACTICE_ITEMS.some(p => p.id === activeTab)

  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <nav className="tab-nav" role="tablist">

            {/* Regular tabs */}
            {TABS.map(tab => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                className={`tab-btn${activeTab === tab.id ? ' tab-btn--active' : ''}`}
                onClick={() => handleTabClick(tab.id)}
              >
                {tab.label}
              </button>
            ))}

            {/* Practice dropdown */}
            <div
              className="nav-dropdown-wrap"
              ref={dropdownRef}
            >
              <button
                className={`tab-btn tab-btn--dropdown${isPracticeActive ? ' tab-btn--active' : ''}`}
                onClick={() => setDropdownOpen(o => !o)}
                aria-haspopup="listbox"
                aria-expanded={dropdownOpen}
              >
                practice
                <span className={`dropdown-chevron${dropdownOpen ? ' dropdown-chevron--open' : ''}`}>
                  <ChevronDown />
                </span>
              </button>

              {dropdownOpen && (
                <div className="dropdown-menu" role="listbox">
                  {PRACTICE_ITEMS.map(item => (
                    <button
                      key={item.id}
                      role="option"
                      aria-selected={activeTab === item.id}
                      className={`dropdown-item${activeTab === item.id ? ' dropdown-item--active' : ''}`}
                      onClick={() => handlePracticeItem(item.id)}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

          </nav>

          {/* Theme toggle */}
          <button
            className="theme-toggle"
            onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </header>

      <main className="main">
        {activeTab === 'home'           && <Home />}
        {activeTab === 'blog'           && <Blog />}
        {activeTab === 'certifications' && <Certifications />}
        {activeTab === 'case-studies'   && <CaseStudies />}
        {activeTab === 'sql'            && <SQL />}
      </main>
    </div>
  )
}
