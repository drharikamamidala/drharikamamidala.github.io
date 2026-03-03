# Requirements Document

## Introduction

A static GitHub Pages portfolio for Harika Mamidala — a healthcare data analyst actively seeking roles in healthcare analytics. The site is a three-tab single-page application: a Home tab with profile and social links, a Certifications tab, and a Case Studies tab showcasing analytical projects. The design is deliberately minimal — clean white/cream surfaces, a single teal accent, no clutter — built to communicate credibility and clarity to hiring managers in healthcare.

**Person:** Harika Mamidala, BDS · MS Health Informatics (Sacred Heart University, 3.9 GPA)
**Job target:** Healthcare Data Analyst
**Contact:** Jersey City, NJ | harika.mamidala09@gmail.com

**Tech stack confirmed:** React 18 + Vite, plain CSS with CSS custom properties (no UI framework), Inter for UI text, deployed as a static site to GitHub Pages via `gh-pages`.

---

## Requirements

### Requirement 1

**User Story:** As a hiring manager, I want to see Harika's photo, a concise professional identity, and her social/coding platform links on the Home tab so that I can immediately understand who she is and verify her work.

#### Acceptance Criteria

1. WHEN the Home tab loads, THE SYSTEM SHALL display a circular profile photo of Harika centered above her name and tagline.
2. WHEN rendering the Home tab, THE SYSTEM SHALL display her full name `Harika Mamidala` in a large heading, followed by exactly two lines of text: a title line (`Healthcare Data Analyst · MS Health Informatics`) and a one-sentence positioning statement (`Translating clinical and claims data into decisions that improve care delivery and reduce cost.`).
3. WHEN rendering the social links section, THE SYSTEM SHALL display icon-based link pills for the following platforms in this order: LinkedIn, GitHub, LeetCode, HackerRank, DataLemur, Kaggle, Medium — each opening in a new tab.
4. WHEN rendering the LeetCode link pill, THE SYSTEM SHALL fetch Harika's public LeetCode problem-solved count via the LeetCode public GraphQL API and display it inline as a live badge (e.g., `LeetCode · 42 solved`); if the fetch fails, THE SYSTEM SHALL fall back to displaying only the icon and label without a count.
5. WHEN rendering the HackerRank link pill, THE SYSTEM SHALL display the static label `HackerRank` with a star badge indicating her highest achieved skill tier (e.g., `★★★★★ SQL`) sourced from a config constant; live fetching is not required as HackerRank has no public API.
6. WHEN the Home tab loads on a mobile viewport (≤ 640 px wide), THE SYSTEM SHALL stack the social link pills vertically and reduce the profile photo diameter to 96 px.

---

### Requirement 2

**User Story:** As a visitor, I want to see Harika's certifications listed clearly on the Certifications tab so that I can assess her credentials at a glance.

#### Acceptance Criteria

1. WHEN the Certifications tab loads, THE SYSTEM SHALL render a vertically stacked list of certification cards, one per certification.
2. WHEN rendering a certification card, THE SYSTEM SHALL display: issuing organization logo or icon, certification name, issuing body name, and a "View Certificate" link that opens the credential URL in a new tab.
3. WHEN rendering the Certifications tab, THE SYSTEM SHALL include the following certifications in this order:
   - **Microsoft PL-300: Power BI Data Analyst Associate** — Microsoft
   - **HIPAA Compliance & Healthcare Data Privacy** — Alison
   - **Intermediate SQL for Data Analysis** — (issuing body as configured)
4. WHEN a certification does not have a live credential URL configured, THE SYSTEM SHALL omit the "View Certificate" link entirely rather than rendering a broken or placeholder link.
5. WHEN rendering the Certifications tab on a desktop viewport (≥ 768 px), THE SYSTEM SHALL lay out cards in a two-column grid; on mobile (< 768 px), THE SYSTEM SHALL stack them in a single column.

---

### Requirement 3

**User Story:** As a hiring manager, I want to browse Harika's case studies on the Case Studies tab so that I can evaluate her analytical depth and the tools she uses.

#### Acceptance Criteria

1. WHEN the Case Studies tab loads, THE SYSTEM SHALL display project cards in a grid — two columns on desktop (≥ 768 px), one column on mobile.
2. WHEN rendering a project card, THE SYSTEM SHALL display: project title, a one-sentence summary, tool tags (e.g., `Power BI`, `SQL`, `PostgreSQL`), and a "View Project" link to the GitHub repository or live demo.
3. WHEN rendering the Case Studies tab, THE SYSTEM SHALL include the following projects:
   - **NY Inpatient Hip Replacement Cost & LOS Analytics** — Power BI dashboard analyzing 26,594 inpatient cases; identified >$40K cost variation among in-state hospitals and disproved the "more volume = more cost" assumption. Tools: `Power BI`, `DAX`, `Power Query`.
   - **Excel Healthcare Analytics Dashboard** — Analyzed 54,966 patient records across 6 conditions, building 8 interactive dashboards with Pivot Tables, Slicers, VLOOKUPs, and $1.4B+ insurance billing analysis via Power Query + VBA. Tools: `Excel`, `Power Query`, `VBA`.
   - **Emergency Room Patient Visit Analytics Dashboard** — Interactive Power BI dashboard for 9,216 ER visits tracking avg. wait time (35.26 min), satisfaction (5.47), and referral rate (75.1%) with AM/PM slicers and demographic drill-downs. Tools: `Power BI`, `DAX`.
   - **Type 2 Diabetes Claims Analytics (RCM)** — Built a PostgreSQL CTE pipeline for a 3,000-member T2D cohort (ICD-10 E11) flagging 280 high-risk claim lines (~$190K allowed); operationalized weekly RCM worklist that recovered $38K in 90 days and reduced duplicate submissions by 22%. Tools: `SQL`, `PostgreSQL`, `Power BI`.
4. WHEN the user clicks "View Project" on a card, THE SYSTEM SHALL open the linked URL in a new tab.
5. WHEN a project has no external link configured, THE SYSTEM SHALL render the card without a "View Project" link rather than showing a broken or disabled button.

---

### Requirement 4

**User Story:** As a visitor, I want smooth tab navigation so that switching between Home, Certifications, and Case Studies feels instant and does not reload the page.

#### Acceptance Criteria

1. WHEN the app loads, THE SYSTEM SHALL default to displaying the Home tab with the `Home` tab indicator in the active state.
2. WHEN the user clicks a tab label, THE SYSTEM SHALL switch the visible tab panel instantly (no page reload or scroll-to-top), and THE SYSTEM SHALL update the active tab indicator.
3. WHEN the active tab changes, THE SYSTEM SHALL update the URL hash (`#home`, `#certifications`, `#case-studies`) so that direct linking and browser back/forward work correctly.
4. WHEN the page loads with a URL hash matching a valid tab, THE SYSTEM SHALL activate that tab on load rather than defaulting to Home.
5. WHEN the tab bar is rendered on a mobile viewport (≤ 640 px), THE SYSTEM SHALL display all three tab labels without truncation or horizontal scrolling.

---

### Requirement 5

**User Story:** As a visitor, I want the portfolio to look polished and professional on any device so that it reflects Harika's attention to quality.

#### Acceptance Criteria

1. WHEN rendering in light mode (the only supported mode), THE SYSTEM SHALL use the following palette:
   - Page background: `#fafafa` (near-white)
   - Card surface: `#ffffff`
   - Border / divider: `#e5e7eb`
   - Primary accent: `#0d9488` (teal-600 — connotes healthcare, analytics)
   - Body text: `#111827`
   - Muted text: `#6b7280`
2. WHEN rendering typography, THE SYSTEM SHALL use `Inter` (loaded via Google Fonts) for all text; no monospace font is required since this is not a financial data view.
3. WHEN rendering cards (certification cards, project cards), THE SYSTEM SHALL apply a 1 px border (`#e5e7eb`), 12 px border-radius, and a subtle `box-shadow: 0 1px 3px rgba(0,0,0,0.08)` with no heavy drop-shadows.
4. WHEN the user hovers a card, THE SYSTEM SHALL elevate the shadow to `0 4px 12px rgba(0,0,0,0.12)` and shift the card up by 2 px via a `transform: translateY(-2px)` with a `0.2s ease` transition — conveying interactivity without heavy animation.
5. WHEN rendering tool tags on project cards, THE SYSTEM SHALL display them as small pill badges using the accent teal at 10% opacity as background and 100% opacity as text color.
6. WHEN rendering on a mobile viewport (≤ 640 px), THE SYSTEM SHALL ensure no horizontal scroll exists and all touch targets are at least 44 × 44 px.
7. THE SYSTEM SHALL NOT use any CSS framework (Tailwind, Bootstrap, etc.); all styles shall be plain CSS with CSS custom properties defined in `:root`.

---

### Requirement 6

**User Story:** As Harika, I want the portfolio to be deployable to GitHub Pages with a single command so that I can publish and update it without any DevOps complexity.

#### Acceptance Criteria

1. WHEN Harika runs `npm run build`, THE SYSTEM SHALL produce a `dist/` directory containing a fully self-contained static site with all assets inlined or fingerprinted.
2. WHEN Harika runs `npm run deploy`, THE SYSTEM SHALL publish the contents of `dist/` to the `gh-pages` branch of the configured GitHub repository using the `gh-pages` npm package, making the site live at `https://drharikamamidala.github.io/`.
3. WHEN the app is built, THE SYSTEM SHALL set `base` in `vite.config.js` to `/` (root) since the site is hosted at the apex of the GitHub Pages domain (not a subdirectory).
4. WHEN the built site is served from GitHub Pages, THE SYSTEM SHALL function correctly with no 404 errors on direct URL access to any tab hash — achieved via hash-based routing rather than HTML5 history routing.
5. WHEN Harika updates content (adds a project, changes a certification link), THE SYSTEM SHALL require changes only to a single `data/content.js` config file — not to component or layout files.
