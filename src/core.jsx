/* global React */
const { useEffect, useRef, useState } = React;

// ---------- Scroll subscription (Lenis-aware, with polling) ----------
function subscribeScroll(cb) {
  let attached = null;
  let cancelled = false;
  if (window.__lenis) {
    window.__lenis.on('scroll', cb);
    attached = 'lenis';
  } else {
    window.addEventListener('scroll', cb, { passive: true });
    attached = 'native';
    const start = Date.now();
    const poll = () => {
      if (cancelled || attached === 'lenis') return;
      if (window.__lenis) {
        window.removeEventListener('scroll', cb);
        window.__lenis.on('scroll', cb);
        attached = 'lenis';
        cb();
      } else if (Date.now() - start < 1500) {
        setTimeout(poll, 50);
      }
    };
    setTimeout(poll, 50);
  }
  return () => {
    cancelled = true;
    if (attached === 'lenis' && window.__lenis) window.__lenis.off('scroll', cb);
    if (attached === 'native') window.removeEventListener('scroll', cb);
  };
}

// ---------- Hooks ----------
function useReveal() {
  useEffect(() => {
    const sel = '[data-reveal], [data-stagger], .word-reveal';
    document.documentElement.classList.add('js-reveals');

    const check = () => {
      const vh = window.innerHeight;
      document.querySelectorAll(sel).forEach((el) => {
        if (el.classList.contains('is-visible')) return;
        const r = el.getBoundingClientRect();
        if (r.top < vh * 0.88 && r.bottom > 0) el.classList.add('is-visible');
      });
    };

    check();
    const raf = requestAnimationFrame(check);
    const t = setTimeout(check, 200);
    const unsub = subscribeScroll(check);
    window.addEventListener('resize', check, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
      unsub();
      window.removeEventListener('resize', check);
    };
  }, []);
}

// ---------- Hero → content cinematic transition ----------
function useHeroTransition() {
  useEffect(() => {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    const inner = hero.querySelector('.hero-inner');
    const cue = hero.querySelector('.hero-scroll-cue');
    let raf = 0;
    const apply = () => {
      raf = 0;
      const h = window.innerHeight || 1;
      const p = Math.min(1, Math.max(0, window.scrollY / (h * 0.9)));
      if (inner) {
        inner.style.transform = `translate3d(0, ${p * -160}px, 0) scale(${1 - p * 0.14})`;
        inner.style.opacity = String(Math.max(0, 1 - p * 1.25));
        inner.style.filter = `blur(${(p * 14).toFixed(2)}px)`;
      }
      if (cue) cue.style.opacity = String(Math.max(0, 1 - p * 2.5));
      hero.style.setProperty('--hero-p', p.toFixed(3));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(apply); };
    apply();
    const unsub = subscribeScroll(onScroll);
    window.addEventListener('resize', onScroll, { passive: true });
    return () => { unsub(); window.removeEventListener('resize', onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);
}

function useScrollSpy(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const handler = () => {
      const y = window.scrollY + window.innerHeight * 0.35;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) current = id;
      }
      setActive(current);
    };
    handler();
    const unsub = subscribeScroll(handler);
    return () => unsub();
  }, [ids.join('|')]);
  return active;
}

// ---------- Helpers ----------
function WordReveal({ text, delay = 0 }) {
  const words = text.split(' ');
  return (
    <>
      {words.map((w, i) => (
        <span key={i} className="word-reveal" style={{ marginRight: '0.25em' }}>
          <span style={{ '--word-delay': `${delay + i * 60}ms` }}>{w}</span>
        </span>
      ))}
    </>
  );
}

// ---------- Nav ----------
function Nav() {
  const active = useScrollSpy(['top', 'work', 'experience', 'skills', 'contact']);
  const items = [
    ['work', 'Work'],
    ['experience', 'Experience'],
    ['skills', 'Stack'],
    ['contact', 'Contact'],
  ];
  const go = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (window.__lenis) window.__lenis.scrollTo(el, { offset: -40, duration: 1.4 });
    else el.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <nav className="nav" aria-label="Primary">
      <a href="#top" className="nav-mark" onClick={go('top')}>
        BC<span>.</span>
      </a>
      {items.map(([id, label]) => (
        <a
          key={id}
          href={`#${id}`}
          className={active === id ? 'active' : ''}
          onClick={go(id)}
        >
          {label}
        </a>
      ))}
    </nav>
  );
}

// ---------- Social links (shared: hero + contact) ----------
const SocialIcon = {
  github: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.17c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.08 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.31-.54-1.53.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.25 2.87.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .78 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .78 23.2 0 22.22 0z"/>
    </svg>
  ),
  resume: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="8" y1="13" x2="16" y2="13"/>
      <line x1="8" y1="17" x2="13" y2="17"/>
    </svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <path d="m22 7-10 6L2 7"/>
    </svg>
  ),
};

const SOCIALS = [
  { id: 'github', label: 'GitHub', href: 'https://github.com/bhavya-chanana' },
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/bhavya-chanana' },
  { id: 'resume', label: 'R\u00e9sum\u00e9', href: 'https://drive.google.com/file/d/1-zahpYZq3lLP9SCJrXxjII31JkrImE86/view?usp=drive_link' },
  { id: 'mail', label: 'Email', href: 'mailto:bhavyachann@gmail.com' },
];

function SocialLinks({ variant = 'pill' }) {
  if (variant === 'icon') {
    return (
      <ul className="hero-socials" aria-label="Social links">
        {SOCIALS.map((s) => (
          <li key={s.id}>
            <a className="hero-social" href={s.href} target={s.id === 'mail' ? undefined : '_blank'} rel="noopener noreferrer" aria-label={s.label} title={s.label}>
              {SocialIcon[s.id]}
            </a>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <div className="contact-links">
      {SOCIALS.map((s) => (
        <a key={s.id} className="contact-link" href={s.href} target={s.id === 'mail' ? undefined : '_blank'} rel="noopener noreferrer">
          {SocialIcon[s.id]} {s.label}
        </a>
      ))}
    </div>
  );
}

// ---------- Custom cursor ----------
function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const onMove = (e) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
    };
    let raf;
    const loop = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.18;
      ring.current.y += (pos.current.y - ring.current.y) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    const onOver = (e) => {
      const t = e.target;
      const isInteractive = t.closest && t.closest('a, button, [data-cursor="hover"]');
      const isText = t.closest && t.closest('p, h1, h2, h3, [data-cursor="text"]');
      document.body.classList.toggle('cursor-hover', !!isInteractive);
      document.body.classList.toggle('cursor-text', !!isText && !isInteractive);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true"></div>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true"></div>
    </>
  );
}

// ---------- Live clock (IST) ----------
function LiveClock() {
  const [t, setT] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setT(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const tz = 'Asia/Kolkata';
  const time = t.toLocaleTimeString('en-GB', { timeZone: tz, hour12: false });
  const date = t.toLocaleDateString('en-GB', { timeZone: tz, day: '2-digit', month: 'short', year: '2-digit' });
  return (
    <div className="hero-topbar-block" style={{ textAlign: 'right' }}>
      <div className="hero-clock-time">{time}</div>
      <span>IST · BLR · {date}</span>
    </div>
  );
}

window.Nav = Nav;
window.WordReveal = WordReveal;
window.SocialLinks = SocialLinks;
window.Cursor = Cursor;
window.LiveClock = LiveClock;
window.useReveal = useReveal;
window.useHeroTransition = useHeroTransition;
