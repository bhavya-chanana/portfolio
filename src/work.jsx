/* global React */

const PROJECTS = [
  {
    num: '01',
    year: '2025',
    name: 'Fire & Smoke Detection',
    desc: 'RGB–thermal fusion model trained on 50K+ aligned pairs with 4-channel input adaptation. 99% detection accuracy with Grad-CAM explainability.',
    tech: ['MobileNetV3', 'PyTorch', 'Grad-CAM', 'Computer Vision'],
    href: 'https://github.com/bhavya-chanana/fire-detection',
  },
  {
    num: '02',
    year: '2024',
    name: 'Valorant Esports Team Creator',
    desc: 'Digital assistant that drafts, balances, and explains competitive Valorant rosters from agent-pool and synergy data.',
    tech: ['LLM', 'Agents', 'Python', 'Streamlit'],
    href: 'https://www.youtube.com/watch?v=ig6K2p5thWg',
  },
  {
    num: '03',
    year: '2024',
    name: 'knowURsoil',
    desc: 'Soil analyzer that pairs sensor readings with Gemini to recommend crops, fertilizer dosage, and rotation strategy for small farms.',
    tech: ['Gemini', 'Android', 'IoT', 'Agriculture'],
    href: 'https://www.youtube.com/watch?v=3tznko79Zxw',
  },
  {
    num: '04',
    year: '2023',
    name: 'HemoMeter',
    desc: 'Non-invasive hemoglobin prediction from smartphone-camera PPG signals — feature-engineered from 200+ clinical samples to 90% accuracy.',
    tech: ['Signal Processing', 'ML', 'Android', 'Spectroscopy'],
    href: 'https://github.com/bhavya-chanana/HemoMeter',
  },
];

function Work() {
  return (
    <section id="work" className="section">
      <div className="container">
        <div className="section-eyebrow" data-reveal>Selected Work · 01</div>
        <h2 className="section-title" data-reveal>
          Projects across applied ML, agents, <em>and the occasional weekend hack.</em>
        </h2>

        <div className="work-list">
          {PROJECTS.map((p) => (
            <a
              key={p.num}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="work-item"
              data-reveal
            >
              <div className="work-num">{p.num} / {p.year}</div>
              <div className="work-name">{p.name}</div>
              <div className="work-desc">{p.desc}</div>
              <div className="work-tech">
                {p.tech.map((t) => (
                  <span key={t} className="work-tech-chip">{t}</span>
                ))}
              </div>
              <div className="work-arrow" aria-hidden="true">↗</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

window.Work = Work;
