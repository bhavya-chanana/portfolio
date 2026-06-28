/* global React */

const SKILL_GROUPS = [
  {
    num: '01',
    label: 'Languages',
    items: ['Python', 'TypeScript', 'JavaScript', 'Java', 'Kotlin', 'SQL', 'C++'],
  },
  {
    num: '02',
    label: 'AI / ML',
    items: ['PyTorch', 'TensorFlow', 'RAG', 'LangChain', 'AWS Bedrock', 'Gemini', 'OpenAI', 'Computer Vision'],
  },
  {
    num: '03',
    label: 'Backend & Frontend',
    items: ['FastAPI', 'Node.js', 'Express', 'React', 'Next.js', 'PostgreSQL', 'MongoDB', 'Redis'],
  },
  {
    num: '04',
    label: 'Cloud & Infra',
    items: ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'CI/CD', 'Serverless', 'Observability'],
  },
];

function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <div className="section-head section-head-split">
          <div className="section-eyebrow" data-reveal>Stack · 03</div>
          <h2 className="section-title" data-reveal>
            Tools I reach for. <em>Always learning the next one.</em>
          </h2>
        </div>

        <div className="skills-orbit">
          {SKILL_GROUPS.map((g) => (
            <div key={g.num} className="skill-group" data-reveal>
              <div className="skill-group-label">
                <span className="skill-group-num">{g.num}</span>
                {g.label}
              </div>
              <div className="skill-tags">
                {g.items.map((s) => (
                  <span key={s} className="skill-tag">{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

window.Skills = Skills;
