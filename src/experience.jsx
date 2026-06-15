/* global React */

const EXPERIENCE = [
  {
    period: 'Nov 2025 — Present',
    role: 'Software Engineer',
    company: 'Spense',
    location: 'Bengaluru, KA',
    current: true,
    desc: 'Owning end-to-end delivery of a Secured Credit Card program in partnership with a bank — translating BRDs into system architecture, building backend APIs and frontend dashboards, and leading the closed-user-group rollout through go-live. Coordinating parallel product deliveries across engineering and banking workstreams.',
    tags: ['System Design', 'FinTech', 'Backend', 'Stakeholder mgmt'],
  },
  {
    period: 'Mar 2025 — Nov 2025',
    role: 'Co-founder & CTO',
    company: 'Hapticware Intelligence',
    location: 'Pune, MH',
    desc: 'Led product and engineering for RiskBrew (risk analysis), BoardBrew (agentic onboarding) and an AI-powered digital signing platform. Managed a four-person cross-functional team, owned backend architecture and roadmap, and shipped production microservices on serverless and containerized cloud infra with CI/CD and observability. Ran POCs, demos, integrations and diligence for enterprise pilots.',
    tags: ['Agentic AI', 'Microservices', 'CI/CD', 'Founder'],
  },
  {
    period: 'Jan 2025 — Mar 2025',
    role: 'SDE Intern',
    company: 'Intelliod',
    location: 'Remote',
    desc: 'Built a RAG-powered research assistant with citation management, summarization and reference tracking. Created "human digital twins" of 15+ authors on Amazon Bedrock to enable realistic author-style interactions.',
    tags: ['RAG', 'AWS Bedrock', 'LLM'],
  },
  {
    period: 'Jun 2024 — Aug 2024',
    role: 'ML Developer Intern',
    company: 'CoffeeTree (now Hapticware)',
    location: 'Pune, MH',
    desc: 'Designed an Azure-based POC to extract data from 100+ page unstructured financial documents, improving accuracy by 25%. Validated the tool to 98% accuracy across document types and cut latency by 80%.',
    tags: ['Azure', 'OCR', 'NLP'],
  },
  {
    period: 'Dec 2023 — Jan 2024',
    role: 'Software Engineering Trainee',
    company: 'SAIL — Bhilai Steel Plant',
    location: 'Bhilai, CG',
    desc: 'Built a full-stack Android app that improved data-retrieval throughput by 30% and reduced retrieval time by 25%.',
    tags: ['Android', 'Full-stack'],
  },
  {
    period: 'Sept 2023 — Nov 2023',
    role: 'ML Research Intern',
    company: 'IIIT — Naya Raipur',
    location: 'Raipur, CG',
    desc: 'Collected 200+ PPG and Hb measurements from hospitals and donation camps, engineered features, and optimized spectroscopy models to 90% accuracy with 83% faster inference.',
    tags: ['Research', 'PPG', 'Spectroscopy'],
  },
];

function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <div className="section-eyebrow" data-reveal>Experience · 02</div>
        <h2 className="section-title" data-reveal>
          A few years of shipping things <em>across startups, research labs and a steel plant.</em>
        </h2>

        <div className="exp-list">
          {EXPERIENCE.map((e, i) => (
            <article key={i} className="exp-item" data-reveal>
              <div className="exp-period">
                {e.period}
                {e.current && <span className="exp-period-current">Now</span>}
              </div>
              <div className="exp-body">
                <div className="exp-head">
                  <h3 className="exp-role">{e.role}</h3>
                  <span className="exp-company">{e.company}</span>
                </div>
                <div className="exp-location">{e.location}</div>
                <p className="exp-desc">{e.desc}</p>
                <div className="exp-tags">
                  {e.tags.map((t) => (
                    <span key={t} className="exp-tag">{t}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

window.Experience = Experience;
