export const profile = {
  name: 'Harika Mamidala',
  credentials: 'BDS · MS Health Informatics',
  title: 'Healthcare Data Analyst',
  tagline:
    'Translating clinical and claims data into decisions that improve care delivery and reduce cost.',
  location: 'Jersey City, NJ',
  email: 'harika.mamidala09@gmail.com',
  photo: '/harika.jpg',
}

export const socials = [
  {
    id: 'linkedin',
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/drharikamamidala/',
    type: 'link',
  },
  {
    id: 'github',
    label: 'GitHub',
    url: 'https://github.com/drharikamamidala',
    type: 'link',
  },
  {
    id: 'leetcode',
    label: 'LeetCode',
    url: 'https://leetcode.com/u/drharikamamidala/',
    username: 'drharikamamidala',
    type: 'leetcode',
  },
  {
    id: 'hackerrank',
    label: 'HackerRank',
    url: 'https://www.hackerrank.com/profile/drharikamamidala',
    type: 'hackerrank',
  },
  {
    id: 'datalemur',
    label: 'DataLemur',
    url: 'https://datalemur.com/profile/drharikamamidala',
    type: 'link',
  },
  {
    id: 'kaggle',
    label: 'Kaggle',
    url: 'https://www.kaggle.com/drharikamamidala',
    type: 'link',
  },
  {
    id: 'medium',
    label: 'Medium',
    url: 'https://drharikamamidala.medium.com/',
    type: 'link',
  },
]

export const certifications = [
  {
    id: 'pl300',
    name: 'Power BI Data Analyst Associate',
    issuer: 'Microsoft',
    issuerCode: 'MS',
    logoType: 'microsoft',
    url: 'https://learn.microsoft.com/api/credentials/share/en-us/HarikaMamidala-0900/BD8D65541582DEA1?sharingId=6128EA8E08B2C484',
    year: '2024',
  },
  {
    id: 'hipaa',
    name: 'HIPAA Compliance & Healthcare Data Privacy',
    issuer: 'Alison',
    issuerCode: 'AL',
    logoType: 'alison',
    url: 'https://drive.google.com/file/d/1Ux_ltUyCIcKVInshhLfPu0s7zgsmry7w/view',
    year: '2024',
  },
  {
    id: 'sql',
    name: 'Intermediate SQL for Data Analysis',
    issuer: 'DataCamp',
    issuerCode: 'DC',
    logoType: 'datacamp',
    url: 'https://www.datacamp.com/skill-verification/ISQL0011555176748',
    year: '2024',
  },
  {
    id: 'cms',
    name: 'Diagnosis Coding using ICD-10-CM',
    issuer: 'CMS Certified',
    issuerCode: 'CMS',
    logoType: 'cms',
    url: 'https://drive.google.com/file/d/1NX78u5M1_-W4wrRiLi0w1KzSADoasIA1/view',
    year: '2024',
  },
]

export const projects = [
  {
    id: 'hip-replacement',
    title: 'New York Inpatient Hip Replacement Cost & LOS Analytics',
    bullets: [
      'Built Power BI LOS vs cost model for 26,594 cases using Power Query, star schema, DAX severity adjustment; identified >$40K cost variation among in-state hospitals with 2–3 day LOS, exposing inefficiencies.',
      'Grouped hospitals into low/medium/high surgical-volume tiers and built a slicer-driven LOS vs cost view; disproved "more cases = more cost" by showing ≥600-case programs had lower LOS at similar cost.',
      'Ran exploratory data analysis using DAX measures for LOS, cost, charges; established baselines of 2.65 avg LOS days, $20.9K avg cost, $59.5K avg charges, and ~2.8× charge-to-cost spread to flag facility outliers.',
    ],
    tools: ['Power BI', 'DAX', 'Power Query', 'Star Schema'],
    url: 'https://github.com/drharikamamidala/New_York_Inpatient_Hip_Replacement_Cost_and_LOS_Analytics/blob/main/README.md',
  },
  {
    id: 'excel-dashboard',
    title: 'Excel Healthcare Analytics Dashboard',
    bullets: [
      'Analyzed 54,966 patient records across 6 medical conditions to identify clinical trends and operational insights, creating 8 interactive dashboards using Pivot Tables, Slicers, VLOOKUPs, and Pivot Charts.',
      'Automated data processing workflows with Power Query and VBA macros, analyzing $1.4B+ insurance billing data across 5 major providers (2019–2024) for financial trend analysis.',
    ],
    tools: ['Excel', 'Power Query', 'VBA', 'Pivot Tables'],
    url: 'https://github.com/drharikamamidala/Excel_Healthcare_Analytics_Dashboard/blob/main/README.md',
  },
  {
    id: 'er-visits',
    title: 'Emergency Room Patient Visit Analytics Dashboard',
    bullets: [
      'Developed an interactive Power BI dashboard to analyze 9,216 ER patient visits, using KPI Cards, slicers (AM/PM), trend visuals, and drill-down charts to monitor operational performance.',
      'Tracked key service metrics including Avg. Wait Time (35.26 mins), Avg. Satisfaction (5.47), and % Referred Patients (75.1%), enabling data-driven evaluation of patient flow and experience.',
      'Performed segmentation analysis by age group, gender, and race — highlighting visit concentration in adult patients (7,106 visits) and supporting demographic-based reporting for service planning.',
    ],
    tools: ['Power BI', 'DAX', 'KPI Cards'],
    url: 'https://github.com/drharikamamidala/ER_Visit_Analytics_Dashboard/blob/main/README.md',
  },
  {
    id: 't2d-claims',
    title: 'Type 2 Diabetes Claims Analytics (RCM)',
    bullets: [
      'Built a PostgreSQL CTE pipeline for a 3,000-member T2D cohort (ICD-10 E11) flagging denial outliers and duplicate claims.',
      'Flagged 280 high-risk claim lines (~$190K allowed); RCM team recovered $38K in 90 days and cut duplicate submissions by 22%.',
    ],
    tools: ['SQL', 'PostgreSQL', 'Power BI', 'CTEs'],
    url: null,
  },
  {
    id: 'nlp-capstone',
    title: 'Natural Language Processing vs. Rule-Based Approaches for Type 2 Diabetes Identification',
    bullets: [
      'Conducted systematic literature review and synthesis of 26 peer-reviewed studies (2020–2025) comparing NLP and rule-based methods for identifying T2D and complications in unstructured EHR data.',
      'Performed critical quality appraisal using CASP and JBI tools; thematically analyzed evidence across four dimensions: rule-based limitations, NLP approaches, comparative performance, and implementation challenges.',
      'Synthesized quantitative findings showing NLP achieved F-scores up to 0.88 vs. 0.50–0.60 for rule-based systems; identified NLP\'s superior sensitivity in detecting hypoglycemia (25.1% vs. 12.4% with ICD codes) and context-aware complication tracking.',
      'Documented clinical implications: NLP improves early diagnosis detection, decision-support accuracy, diabetes registry completeness, and patient safety; identified barriers (data quality, governance, domain shift) critical for implementation roadmaps.',
    ],
    tools: ['Systematic Review', 'Evidence Synthesis', 'Healthcare Informatics', 'Critical Appraisal'],
    url: null,
  },
]
