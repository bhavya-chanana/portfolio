/* global React, SocialLinks, LiveClock */

function Hero() {
  return (
    <section id="top" className="hero">
      <div className="container hero-inner">

        {/* Top bar — left: status, right: live clock */}
        <div className="hero-topbar" data-reveal style={{ '--reveal-delay': '0ms' }}>
          <div className="hero-topbar-block">
            <strong>Bhavya Chanana</strong>
            <span>Portfolio · 2026</span>
          </div>
          <div className="hero-topbar-block" style={{ textAlign: 'center' }}>
            <strong>Bengaluru, IN</strong>
            <span>12.97°N · 77.59°E</span>
          </div>
          <LiveClock />
        </div>

        {/* Availability */}
        <div className="hero-avail" data-reveal style={{ '--reveal-delay': '150ms' }}>
          <span className="dot" aria-hidden="true"></span>
          Open to freelance <span className="sep">·</span> consulting <span className="sep">·</span> full-time
        </div>

        {/* Name — v2-style line slide-up */}
        <h1 className="hero-name" data-reveal aria-label="Bhavya Chanana">
          <span className="hero-name-line"><span>Bhavya</span></span>
          <span className="hero-name-line"><span>Chanana<em className="punct">.</em></span></span>
        </h1>

        <div data-reveal style={{ '--reveal-delay': '500ms', maxWidth: '700px' }}>
          <p style={{ fontSize: 'clamp(16px, 1.35vw, 19px)', color: 'var(--text-dim)', lineHeight: 1.5 }}>
            Software engineer with a soft spot for shipping. Currently engineering
            secured-credit infrastructure at <span style={{ color: 'var(--text)' }}>Spense</span>. Previously
            co-founded and led engineering at <span style={{ color: 'var(--text)' }}>Hapticware Intelligence</span>,
            building agentic AI tooling for risk and onboarding workflows.
          </p>
        </div>

        <div data-reveal style={{ '--reveal-delay': '700ms' }}>
          <SocialLinks variant="icon" />
        </div>

      </div>

      <div className="hero-scroll-cue" aria-hidden="true">
        Scroll
        <div className="hero-scroll-cue-line"></div>
      </div>
    </section>
  );
}

window.Hero = Hero;
