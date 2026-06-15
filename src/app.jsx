/* global React, ReactDOM, useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakColor, TweakToggle,
   Nav, Hero, Work, Experience, Skills, Contact, useReveal, useHeroTransition, Cursor */
const { useEffect, useRef } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "dark",
  "accent": "#ff5c28",
  "fontDisplay": "Bricolage Grotesque",
  "density": "regular",
  "scrollStyle": "apple",
  "showCue": true
}/*EDITMODE-END*/;

const FONT_STACKS = {
  "Bricolage Grotesque": "'Bricolage Grotesque', 'Inter Tight', system-ui, sans-serif",
  "Inter Tight": "'Inter Tight', system-ui, sans-serif",
  "Geist": "'Geist', system-ui, sans-serif",
  "Space Grotesk": "'Space Grotesk', system-ui, sans-serif",
};

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const lenisRef = useRef(null);

  // Apply tweaks to <html> attrs + CSS vars
  useEffect(() => {
    const html = document.documentElement;
    html.dataset.theme = t.theme;
    html.dataset.density = t.density;
    html.style.setProperty('--accent', t.accent);
    // Re-derive accent-soft
    const hex = t.accent.replace('#', '');
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    html.style.setProperty('--accent-soft', `rgba(${r}, ${g}, ${b}, 0.12)`);
    html.style.setProperty('--font-display', FONT_STACKS[t.fontDisplay] || FONT_STACKS["Bricolage Grotesque"]);
  }, [t.theme, t.accent, t.fontDisplay, t.density]);

  // Lenis smooth scroll
  useEffect(() => {
    if (t.scrollStyle === 'native') {
      if (lenisRef.current) { lenisRef.current.destroy(); lenisRef.current = null; window.__lenis = null; }
      document.documentElement.classList.remove('lenis', 'lenis-smooth');
      return;
    }
    if (!window.Lenis) return;
    if (lenisRef.current) return;
    const lenis = new window.Lenis({
      duration: 1.35,
      easing: (x) => Math.min(1, 1.001 - Math.pow(2, -10 * x)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;
    window.__lenis = lenis;
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, [t.scrollStyle]);

  // Reveal observer
  useReveal();
  // Hero → content cinematic transition
  useHeroTransition();

  // Re-run reveal when tweaks change (so new content gets observed)
  useEffect(() => {
    // toggle cue display
    document.documentElement.style.setProperty('--cue-display', t.showCue ? 'flex' : 'none');
  }, [t.showCue]);

  return (
    <>
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <div className="stage">
          <Work />
          <Experience />
          <Skills />
          <Contact />
        </div>
      </main>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Theme" />
        <TweakRadio
          label="Mode"
          value={t.theme}
          options={['dark', 'light', 'cream']}
          onChange={(v) => setTweak('theme', v)}
        />
        <TweakColor
          label="Accent"
          value={t.accent}
          options={['#ff5c28', '#5b8def', '#7cff6b', '#e7e5df', '#ff3b8b']}
          onChange={(v) => setTweak('accent', v)}
        />

        <TweakSection label="Typography" />
        <TweakRadio
          label="Display font"
          value={t.fontDisplay}
          options={['Bricolage Grotesque', 'Inter Tight', 'Space Grotesk']}
          onChange={(v) => setTweak('fontDisplay', v)}
        />

        <TweakSection label="Layout" />
        <TweakRadio
          label="Density"
          value={t.density}
          options={['compact', 'regular', 'spacious']}
          onChange={(v) => setTweak('density', v)}
        />

        <TweakSection label="Motion" />
        <TweakRadio
          label="Scroll"
          value={t.scrollStyle}
          options={['apple', 'native']}
          onChange={(v) => setTweak('scrollStyle', v)}
        />
        <TweakToggle
          label="Scroll cue in hero"
          value={t.showCue}
          onChange={(v) => setTweak('showCue', v)}
        />
      </TweaksPanel>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
