/* global React, SocialLinks, LiveClock */

function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero-scene" aria-hidden="true">
        <div className="hero-frame hero-frame-one"></div>
        <div className="hero-frame hero-frame-two"></div>
        <div className="hero-frame hero-frame-three"></div>
        <div className="hero-ribbons">
          <span></span><span></span><span></span>
        </div>
        <div className="hero-lens"></div>
      </div>

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

        <div className="hero-layout">
          <div className="hero-copy-stack">
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

            <div className="hero-copy" data-reveal style={{ '--reveal-delay': '500ms' }}>
              <p>
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

          <div className="hero-showcase" data-reveal style={{ '--reveal-delay': '350ms' }} aria-hidden="true">
            <div className="showcase-slab showcase-slab-main">
              <span></span><span></span><span></span><span></span>
            </div>
            <div className="showcase-slab showcase-slab-side">
              <span></span><span></span><span></span>
            </div>
            <div className="showcase-glow"></div>
          </div>
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
