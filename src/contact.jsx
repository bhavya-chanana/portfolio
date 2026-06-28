/* global React, SocialLinks */

const OPEN_TO = ['Freelance projects', 'Consulting', 'Full-time roles', 'A good conversation'];

function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="contact-shell">
          <div className="contact-orbit" aria-hidden="true">
            <span></span><span></span><span></span>
          </div>

          <div className="contact-copy">
            <div className="contact-eyebrow" data-reveal>Get in touch · 04</div>
            <h2 className="contact-headline" data-reveal>
              Let's build something <span style={{ color: 'var(--accent)' }}>sharp.</span>
            </h2>

            <p className="contact-lead" data-reveal>
              I'm currently <strong>open to freelance and consulting work</strong>, and
              the occasional ambitious side project.
            </p>

            <ul className="contact-open" data-reveal aria-label="Open to">
              {OPEN_TO.map((t) => (
                <li key={t} className="contact-open-item">
                  <span className="contact-open-dot" aria-hidden="true"></span>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="contact-actions">
            <div data-reveal>
              <a className="contact-email" href="mailto:bhavyachann@gmail.com">
                bhavyachann@gmail.com
                <span className="arrow">↗</span>
              </a>
            </div>

            <div data-reveal>
              <SocialLinks variant="pill" />
            </div>
          </div>
        </div>

        <footer>
          <div>© 2026 Bhavya Chanana</div>
          <div>Designed & built with care</div>
        </footer>
      </div>
    </section>
  );
}

window.Contact = Contact;
