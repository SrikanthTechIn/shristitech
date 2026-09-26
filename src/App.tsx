import React, { useState, useEffect } from 'react';
import { RibbonCuttingScreen } from './components/RibbonCuttingScreen';

type PageRoute = 'home' | 'about' | 'remote' | 'contact' | 'privacy' | 'terms';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [menuOpen, setMenuOpen] = useState(false);

  // Ribbon Cutting Inauguration Screen state
  const [showRibbonScreen, setShowRibbonScreen] = useState(() => {
    try {
      return localStorage.getItem('shristi_ribbon_inaugurated') !== 'true';
    } catch {
      return true;
    }
  });

  const handleRibbonComplete = () => {
    try {
      localStorage.setItem('shristi_ribbon_inaugurated', 'true');
    } catch {
      // ignore
    }
    setShowRibbonScreen(false);
  };

  // Form states
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formType, setFormType] = useState('');
  const [formReqs, setFormReqs] = useState('');
  const [submitText, setSubmitText] = useState('Send Requirements →');

  // Interactive TV state
  const [tvPower, setTvPower] = useState(true);
  const [activeApp, setActiveApp] = useState('Google TV');
  const [tvMessage, setTvMessage] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scannedTvs, setScannedTvs] = useState([
    { name: '📺 LG TV', room: 'Living Room' },
    { name: '🖥️ Samsung TV', room: 'Bedroom' },
    { name: '📱 Android TV', room: 'Hall' },
    { name: '📺 Google TV', room: 'Office' },
  ]);

  // Sync route with URL pathname & hash on load, popstate, & hashchange
  useEffect(() => {
    const handleNavigation = () => {
      const path = window.location.pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
      const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase();
      const validRoutes: PageRoute[] = ['about', 'remote', 'contact', 'privacy', 'terms'];

      let targetRoute: PageRoute = 'home';
      if (validRoutes.includes(path as PageRoute)) {
        targetRoute = path as PageRoute;
      } else if (validRoutes.includes(hash as PageRoute)) {
        targetRoute = hash as PageRoute;
      }

      setCurrentPage(targetRoute);

      if (targetRoute === 'home') {
        const scrollTarget = hash || (path === 'remote' ? 'remote' : '');
        if (scrollTarget && ['remote', 'products', 'ai'].includes(scrollTarget)) {
          setTimeout(() => {
            const el = document.getElementById(scrollTarget);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 50);
          return;
        }
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    handleNavigation();
    window.addEventListener('hashchange', handleNavigation);
    window.addEventListener('popstate', handleNavigation);
    return () => {
      window.removeEventListener('hashchange', handleNavigation);
      window.removeEventListener('popstate', handleNavigation);
    };
  }, []);

  const navigateTo = (page: PageRoute, targetId?: string) => {
    setMenuOpen(false);
    setCurrentPage(page);
    if (page === 'home' && targetId) {
      window.history.pushState(null, '', `/#${targetId}`);
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else if (page === 'home') {
      window.history.pushState(null, '', '/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.history.pushState(null, '', `/${page}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSendReq = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent('Shristi Tech Project Requirement');
    const body = encodeURIComponent(
      `Name: ${formName}\nEmail: ${formEmail}\nPhone: ${formPhone}\nBusiness Type: ${formType}\nRequirements:\n${formReqs}`
    );
    setSubmitText('Opening email…');
    window.location.href = `mailto:Srikanth12231@gmail.com?subject=${subject}&body=${body}`;
    setTimeout(() => {
      setSubmitText('Send Requirements →');
    }, 3000);
  };

  const triggerScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setTvMessage('Found 4 Smart TVs on local Wi-Fi');
      setTimeout(() => setTvMessage(''), 3000);
    }, 1000);
  };

  const renderRequirementForm = () => (
    <form className="form" onSubmit={handleSendReq}>
      <div className="formHead">
        <h3>Get a Custom Solution</h3>
        <span className="response">● Response within 1 business day</span>
      </div>
      <p>Tell us your requirements for AI agents, automation, custom apps or any business solution.</p>

      <label className="field">
        <span>👤</span>
        <input
          required
          name="name"
          placeholder="Your Name *"
          value={formName}
          onChange={(e) => setFormName(e.target.value)}
        />
      </label>

      <label className="field">
        <span>✉</span>
        <input
          required
          type="email"
          name="email"
          placeholder="Email Address *"
          value={formEmail}
          onChange={(e) => setFormEmail(e.target.value)}
        />
      </label>

      <label className="field">
        <span>☎</span>
        <input
          required
          type="tel"
          name="phone"
          placeholder="Phone Number *"
          value={formPhone}
          onChange={(e) => setFormPhone(e.target.value)}
        />
      </label>

      <label className="field">
        <span>▣</span>
        <select
          required
          name="type"
          value={formType}
          onChange={(e) => setFormType(e.target.value)}
        >
          <option value="">Business Type *</option>
          <option value="Startup">Startup</option>
          <option value="Retail">Retail</option>
          <option value="Restaurant">Restaurant</option>
          <option value="Education">Education</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Service Business">Service Business</option>
          <option value="Other">Other</option>
        </select>
      </label>

      <label className="field message">
        <span>▤</span>
        <textarea
          required
          name="requirements"
          placeholder="Your Requirements *"
          value={formReqs}
          onChange={(e) => setFormReqs(e.target.value)}
        />
      </label>

      <button className="send" type="submit">
        {submitText}
      </button>

      <a className="wa" href="https://wa.me/917013707890" target="_blank" rel="noopener noreferrer">
        💬 Chat on WhatsApp
      </a>

      <small className="privacy">
        🔒 We respect your privacy. Your information will only be used to understand your requirements.
      </small>
    </form>
  );

  return (
    <div className="site-wrapper">
      {/* Grand Inauguration Ribbon Cutting Screen */}
      <RibbonCuttingScreen
        isOpen={showRibbonScreen}
        onComplete={handleRibbonComplete}
      />

      {/* Floating Replay Inauguration Button */}
      {!showRibbonScreen && (
        <button
          onClick={() => setShowRibbonScreen(true)}
          className="fixed bottom-5 left-5 z-40 px-3.5 py-2 rounded-full bg-slate-900/90 hover:bg-slate-800 border border-amber-400/50 text-amber-300 hover:text-amber-200 text-xs font-bold shadow-xl flex items-center gap-2 transition-all hover:scale-105 active:scale-95 backdrop-blur-md cursor-pointer"
          title="Replay Official Inauguration Ribbon Cutting Ceremony"
          aria-label="Replay Inauguration"
        >
          <span className="text-sm">🎀</span>
          <span>Inauguration Ceremony</span>
        </button>
      )}

      {/* 100% Exact Header */}
      <header className="site-header">
        <div className="wrap head">
          <a className="logo siteBrand" onClick={() => navigateTo('home')}>
            <img className="logoMark" src="/assets/shristi-tech-logo-mark.png" alt="Shristi Tech logo" />
            <span className="logoText">
              <b>Shristi Tech</b>
              <small className="tag">IDEAS TODAY • BETTER TOMORROW</small>
            </span>
          </a>

          <nav id="nav" className={`site-nav ${menuOpen ? 'open' : ''}`}>
            <button onClick={() => navigateTo('home')}>Home</button>
            <button onClick={() => navigateTo('home', 'remote')}>AG TV Remote</button>
            <button onClick={() => navigateTo('home', 'products')}>Products</button>
            <button onClick={() => navigateTo('home', 'ai')}>AI Development</button>
            <button onClick={() => navigateTo('about')}>About</button>
            <button onClick={() => navigateTo('contact')}>Contact</button>
            <button onClick={() => navigateTo('privacy')}>Privacy</button>
          </nav>

          <a className="btn primary navBtn" onClick={() => navigateTo('home', 'remote')}>
            Get AG TV Remote →
          </a>

          <button className="menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle Menu">
            ☰
          </button>
        </div>
      </header>

      {/* Page Routing */}
      {currentPage === 'home' && (
        <main>
          {/* Hero Section */}
          <section id="home" className="hero">
            <div className="wrap heroGrid">
              <div className="heroText">
                <span className="badge">FEATURED APP</span>
                <h1>
                  AG TV <span>Remote</span>
                </h1>
                <h2>Control your Smart TV from your phone.</h2>
                <p>
                  Supports Android TV, Google TV, Samsung TV, LG TV and more. Simple, fast and easy to use.
                </p>

                <div className="features">
                  <div className="feature">
                    <div className="featureIcon">⌁</div>
                    <b>Auto Detect</b>
                    <small>Your TV</small>
                  </div>
                  <div className="feature">
                    <div className="featureIcon">▣</div>
                    <b>Complete</b>
                    <small>Remote Control</small>
                  </div>
                  <div className="feature">
                    <div className="featureIcon">▦</div>
                    <b>Quick App</b>
                    <small>Shortcuts</small>
                  </div>
                  <div className="feature">
                    <div className="featureIcon">⚙</div>
                    <b>Wide</b>
                    <small>Compatibility</small>
                  </div>
                  <div className="feature">
                    <div className="featureIcon">✓</div>
                    <b>No Personal</b>
                    <small>Data</small>
                  </div>
                  <div className="feature">
                    <div className="featureIcon">⌁</div>
                    <b>Lightweight</b>
                    <small>& Smooth</small>
                  </div>
                </div>

                <div className="heroBtns">
                  <a className="play" href="#remote" onClick={() => navigateTo('home', 'remote')}>
                    ▶ &nbsp; GET IT ON <strong>Google Play</strong>
                  </a>
                  <a className="btn outline" href="#remote" onClick={() => navigateTo('home', 'remote')}>
                    View Screenshots →
                  </a>
                </div>
              </div>

              {/* Visual Mockups: TV + 2 Phones */}
              <div className="visual">
                <div className="tv" style={{ opacity: tvPower ? 1 : 0.4 }}>
                  <div className="tvtop">
                    {activeApp} <span>10:24</span>
                  </div>
                  <div className="mountain" />
                  <div className="tvapps">
                    <span onClick={() => setActiveApp('YouTube')}>YouTube</span>
                    <span onClick={() => setActiveApp('NETFLIX')}>NETFLIX</span>
                    <span onClick={() => setActiveApp('Prime Video')}>prime video</span>
                    <span onClick={() => setActiveApp('Disney+')}>Disney+</span>
                  </div>
                  <div className="tvtiles">
                    <span onClick={() => setActiveApp('Apps Store')}>Apps</span>
                    <span onClick={() => setActiveApp('TV Settings')}>Settings</span>
                    <span onClick={() => setActiveApp('Live TV Channel')}>Live TV</span>
                  </div>
                </div>

                {/* Phone 1: Remote Controller */}
                <div className="phone one">
                  <div className="notch" />
                  <div className="screen remote">
                    <div className="screenTitle">AG TV Remote</div>
                    <button
                      className="power"
                      title="Power Toggle"
                      onClick={() => setTvPower(!tvPower)}
                    >
                      ●
                    </button>
                    <div className="dpad">
                      ⌃<br />‹ <b>OK</b> ›<br />⌄
                    </div>
                    <div className="apps">
                      <span onClick={() => setActiveApp('YouTube')}>YouTube</span>
                      <span onClick={() => setActiveApp('Netflix')}>Netflix</span>
                      <span onClick={() => setActiveApp('Disney+')}>Disney+</span>
                      <span onClick={() => setActiveApp('Prime Video')}>Prime</span>
                    </div>
                    <div className="remoteBottom">
                      <span onClick={() => setActiveApp('Google TV')}>⌂</span>
                      <span onClick={() => setTvMessage('Vol -')}>VOL −</span>
                      <span onClick={() => setTvMessage('Vol +')}>VOL +</span>
                    </div>
                  </div>
                </div>

                {/* Phone 2: TV Selector */}
                <div className="phone two">
                  <div className="notch" />
                  <div className="screen select">
                    <div className="screenTitle">Select TV</div>
                    {scannedTvs.map((tv, idx) => (
                      <div
                        key={idx}
                        className="tvrow"
                        onClick={() => {
                          setActiveApp(tv.name.replace(/[^\w\s]/gi, '').trim());
                          setTvMessage(`Connected to ${tv.name}`);
                          setTimeout(() => setTvMessage(''), 2500);
                        }}
                      >
                        {tv.name}
                        <small>{tv.room}</small>
                      </div>
                    ))}
                    <button className="scan" onClick={triggerScan}>
                      {isScanning ? 'Scanning Network…' : 'Scan for TVs'}
                    </button>
                    {tvMessage && (
                      <div style={{ fontSize: '8px', color: '#0b6df2', textAlign: 'center', marginTop: '4px' }}>
                        {tvMessage}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* AG TV Remote Section */}
          <section id="remote" className="section">
            <div className="wrap">
              <h2>AG TV Remote</h2>
              <p className="muted">Our current live utility product.</p>
              <div style={{ marginTop: '18px', display: 'flex', gap: '10px' }}>
                <a className="btn primary" onClick={() => navigateTo('remote')}>
                  Get the App →
                </a>
                <a className="btn outline" onClick={() => navigateTo('contact')}>
                  Support
                </a>
              </div>
            </div>
          </section>

          {/* Our Other Products Section */}
          <section id="products" className="section">
            <div className="wrap">
              <h2>Our Other Products</h2>
              <p className="muted">More useful apps and solutions are coming soon...</p>
              <div className="productLayout">
                <div className="productGrid">
                  <article className="coming">
                    <div className="ci">🎮</div>
                    <h3>Games</h3>
                    <p>Fun and engaging mobile games.</p>
                    <span className="soon">Coming Soon</span>
                  </article>
                  <article className="coming">
                    <div className="ci">☁</div>
                    <h3>SaaS Products</h3>
                    <p>Scalable web applications.</p>
                    <span className="soon">Coming Soon</span>
                  </article>
                  <article className="coming">
                    <div className="ci">🤖</div>
                    <h3>AI Agents</h3>
                    <p>Business automation with AI agents.</p>
                    <span className="soon">Coming Soon</span>
                  </article>
                  <article className="coming">
                    <div className="ci">⚙</div>
                    <h3>Custom Solutions</h3>
                    <p>Tailored apps for businesses and local organizations.</p>
                    <span className="soon">Coming Soon</span>
                  </article>
                </div>

                <div className="formSlot">{renderRequirementForm()}</div>
              </div>
            </div>
          </section>

          {/* AI Powered Development Section */}
          <section id="ai" className="section ai">
            <div className="wrap">
              <div className="aiTop">
                <div>
                  <h2>AI Powered Development</h2>
                  <p className="muted">
                    We use modern AI tools and automation to build high-quality apps faster, with better design and efficient development.
                  </p>
                </div>
                <div className="formula">
                  <b>AI Tools</b>
                  <span>+</span>
                  <b>Expert Development</b>
                  <span>=</span>
                  <b>Better Products</b>
                  <small>AI-assisted work combined with real-world engineering expertise.</small>
                </div>
              </div>

              <div className="steps">
                <div className="step">
                  <div className="stepIcon">💡</div>
                  <b>Idea & Planning</b>
                  <small>Understand your requirements</small>
                </div>
                <span className="arrow">→</span>

                <div className="step">
                  <div className="stepIcon">🎨</div>
                  <b>AI Assisted Design</b>
                  <small>Generate UI/UX faster with AI</small>
                </div>
                <span className="arrow">→</span>

                <div className="step">
                  <div className="stepIcon">⌘</div>
                  <b>Development</b>
                  <small>Build with modern technologies</small>
                </div>
                <span className="arrow">→</span>

                <div className="step">
                  <div className="stepIcon">✓</div>
                  <b>Testing & Optimization</b>
                  <small>AI assisted testing and bug fixing</small>
                </div>
                <span className="arrow">→</span>

                <div className="step">
                  <div className="stepIcon">🚀</div>
                  <b>Deployment</b>
                  <small>Launch to your platform</small>
                </div>
                <span className="arrow">→</span>

                <div className="step">
                  <div className="stepIcon">◉</div>
                  <b>Support & Updates</b>
                  <small>Continuous improvement</small>
                </div>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="section">
            <div className="wrap about">
              <div>
                <h2>Built Around Real Problems</h2>
                <p className="muted">
                  Shristi Tech creates practical digital products and develops custom apps for ideas that need to become working products.
                </p>
              </div>
              <div className="aboutCards">
                <div className="aboutCard">
                  📱<strong>Utility Apps</strong>
                  <small>Useful everyday products</small>
                </div>
                <div className="aboutCard">
                  🤖<strong>AI & Automation</strong>
                  <small>Agents and workflows</small>
                </div>
                <div className="aboutCard">
                  ⌘<strong>Custom Apps</strong>
                  <small>Built around your requirements</small>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="section contact">
            <div className="wrap contactGrid">
              <div>
                <span className="badge">START A PROJECT</span>
                <h2>Have an idea or need a solution?</h2>
                <p className="muted">
                  Tell us what you need. We will understand the requirement and discuss the right approach.
                </p>
                <a className="wa" href="https://wa.me/917013707890" target="_blank" rel="noopener noreferrer" style={{ marginTop: '16px', display: 'inline-flex', padding: '12px 20px' }}>
                  💬 Chat on WhatsApp
                </a>
              </div>
              <div className="contactCard">
                <div className="formSlot">{renderRequirementForm()}</div>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* About Page */}
      {currentPage === 'about' && (
        <main>
          <section className="hero">
            <div className="wrap-narrow">
              <span className="badge">ABOUT SHRISTI TECH</span>
              <h1 style={{ fontSize: '52px', lineHeight: 1.05, margin: '0 0 15px' }}>
                Digital Products. Practical Solutions.
              </h1>
              <p style={{ fontSize: '18px', color: '#566783', maxWidth: '720px' }}>
                Shristi Tech builds utility apps, games, SaaS products, AI-assisted solutions and custom software.
              </p>
            </div>
          </section>

          <div className="wrap-narrow">
            <div className="card">
              <h2>What Shristi Tech does</h2>
              <p>
                Shristi Tech focuses on practical digital products and custom software for ideas that need to become working products.
              </p>
              <div className="grid">
                <div className="info">
                  <b>Utility Apps</b>
                  <p>Simple products that solve everyday problems, such as AG TV Remote.</p>
                </div>
                <div className="info">
                  <b>Games</b>
                  <p>Mobile games designed around clear gameplay and practical development workflows.</p>
                </div>
                <div className="info">
                  <b>SaaS</b>
                  <p>Web-based products, dashboards and subscription-ready tools.</p>
                </div>
                <div className="info">
                  <b>AI & Automation</b>
                  <p>AI-assisted app development, n8n workflows, agents and business automation.</p>
                </div>
              </div>
              <h3>Development approach</h3>
              <p>
                We combine modern development tools with AI-assisted planning, design, coding, testing and optimization. Human review remains part of the development process before release.
              </p>
            </div>
          </div>
        </main>
      )}

      {/* AG TV Remote Page */}
      {currentPage === 'remote' && (
        <main>
          <section className="hero">
            <div className="wrap-narrow">
              <span className="badge">FEATURED UTILITY</span>
              <h1 style={{ fontSize: '52px', lineHeight: 1.05, margin: '0 0 15px' }}>
                AG TV Remote
              </h1>
              <p style={{ fontSize: '18px', color: '#566783', maxWidth: '720px' }}>
                Control compatible Smart TVs from your phone with a simple remote experience.
              </p>
            </div>
          </section>

          <div className="wrap-narrow">
            <div className="card">
              <h2>AG TV Remote</h2>
              <p>AG TV Remote is Shristi Tech's featured utility app for controlling compatible smart TVs from a phone.</p>
              <div className="grid">
                <div className="info">
                  <b>Core features</b>
                  <p>TV discovery, remote navigation, power and volume controls, app shortcuts and connection management.</p>
                </div>
                <div className="info">
                  <b>Target platforms</b>
                  <p>Android TV, Google TV, Samsung TV, LG TV and other compatible TV environments, subject to model and protocol support.</p>
                </div>
              </div>
              <h3>Compatibility note</h3>
              <p>
                TV manufacturers use different communication protocols and security requirements. Actual functionality can vary by TV model, operating system, network and firmware.
              </p>
              <a className="btn primary" onClick={() => navigateTo('home', 'remote')} style={{ marginTop: '16px' }}>
                Back to AG TV Remote →
              </a>
            </div>
          </div>
        </main>
      )}

      {/* Contact Page */}
      {currentPage === 'contact' && (
        <main>
          <section className="hero">
            <div className="wrap-narrow">
              <span className="badge">CONTACT</span>
              <h1 style={{ fontSize: '52px', lineHeight: 1.05, margin: '0 0 15px' }}>
                Let’s build your idea
              </h1>
              <p style={{ fontSize: '18px', color: '#566783', maxWidth: '720px' }}>
                Contact Shristi Tech for custom apps, utility products, AI agents, automation, SaaS and local business solutions.
              </p>
            </div>
          </section>

          <div className="wrap-narrow">
            <div className="card">
              <h2>Start a project</h2>
              <p>Send your requirements directly to the Shristi Tech team.</p>
              <div className="grid">
                <div className="info">
                  <b>Email</b>
                  <a href="mailto:Srikanth12231@gmail.com" style={{ color: '#086cf1' }}>
                    Srikanth12231@gmail.com
                  </a>
                  <p>Use email for detailed requirements, documents and project discussions.</p>
                </div>
                <div className="info">
                  <b>WhatsApp</b>
                  <a href="https://wa.me/917013707890" target="_blank" rel="noopener noreferrer" style={{ color: '#078f50' }}>
                    +91 70137 07890
                  </a>
                  <p>Use WhatsApp for quick questions and initial discussion.</p>
                </div>
              </div>

              <div className="grid">
                <div className="info">
                  <b>What we can build</b>
                  <p>Utility apps, mobile apps, games, SaaS products, AI agents, n8n workflows, local business tools, dashboards and custom MVPs.</p>
                </div>
                <div className="info">
                  <b>How it works</b>
                  <p>1. Share the requirement → 2. Discuss scope → 3. Confirm approach → 4. Build and test → 5. Deploy and support.</p>
                </div>
              </div>

              <div style={{ marginTop: '20px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <a
                  className="btn primary"
                  href="mailto:Srikanth12231@gmail.com?subject=Shristi%20Tech%20Project%20Requirement"
                >
                  Email Your Requirement →
                </a>
                <a className="btn outline" href="https://wa.me/917013707890" target="_blank" rel="noopener noreferrer">
                  Chat on WhatsApp →
                </a>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* Privacy Policy Page */}
      {currentPage === 'privacy' && (
        <main>
          <section className="hero">
            <div className="wrap-narrow">
              <span className="badge">PRIVACY</span>
              <h1 style={{ fontSize: '52px', lineHeight: 1.05, margin: '0 0 15px' }}>
                Privacy Policy
              </h1>
              <p style={{ fontSize: '18px', color: '#566783', maxWidth: '720px' }}>
                How Shristi Tech handles information submitted through this website and its communication channels.
              </p>
            </div>
          </section>

          <div className="wrap-narrow">
            <div className="card">
              <h2>Privacy at a glance</h2>
              <p>
                Shristi Tech respects your privacy. This website is designed so that you can browse the site without creating an account or submitting personal information.
              </p>
              <div className="note">
                <b>Important:</b> If you choose to send a project requirement, the information you enter is prepared as an email to <b>Srikanth12231@gmail.com</b>. If you choose WhatsApp, the conversation is handled by WhatsApp and its own privacy practices apply.
              </div>

              <h3>1. Information you may provide</h3>
              <p>
                You may voluntarily provide your name, email address, phone number, business type and project requirements when you contact Shristi Tech. These details are used to understand your request and respond to you.
              </p>

              <h3>2. How the website sends requirements</h3>
              <p>
                The current requirement form uses your device's email application through a <b>mailto</b> link. The website itself does not provide a database or server-side account system for storing these form submissions. Your email provider may process the message according to its own policies.
              </p>

              <h3>3. WhatsApp</h3>
              <p>
                The website provides a direct WhatsApp contact option at <b>+91 70137 07890</b>. When you use it, you leave the website and communicate through WhatsApp. WhatsApp's terms and privacy policy govern that service.
              </p>

              <h3>4. Cookies and analytics</h3>
              <p>
                The current static website does not intentionally use advertising cookies, user accounts, or third-party analytics scripts. If analytics, advertising, forms, hosting services or other third-party technologies are added later, this policy should be updated before those technologies are used.
              </p>

              <h3>5. Data retention</h3>
              <p>
                Information sent by email or WhatsApp may remain in those services and in Shristi Tech's communications records for as long as reasonably necessary to respond to requests, provide support, maintain business records, or comply with applicable obligations.
              </p>

              <h3>6. Children's privacy</h3>
              <p>
                The website is intended for general audiences and is not designed to knowingly collect personal information from children.
              </p>

              <h3>7. Third-party links</h3>
              <p>
                Links to Google Play, WhatsApp, television platforms, or other services lead to third-party services. Their privacy practices are controlled by those providers.
              </p>

              <h3>8. Security</h3>
              <p>
                Reasonable measures are used for information handled through Shristi Tech's normal communication channels. No internet transmission can be guaranteed to be completely secure.
              </p>

              <h3>9. Changes to this policy</h3>
              <p>
                This policy may be updated when the website, products, or communication methods change. The latest version will be published on this page.
              </p>

              <h3>10. Contact</h3>
              <p>
                Privacy questions can be sent to{' '}
                <a href="mailto:Srikanth12231@gmail.com" style={{ color: '#086cf1', fontWeight: 700 }}>
                  Srikanth12231@gmail.com
                </a>.
              </p>

              <p>
                <small>Last updated: 24 September 2026</small>
              </p>
            </div>
          </div>
        </main>
      )}

      {/* Terms of Use Page */}
      {currentPage === 'terms' && (
        <main>
          <section className="hero">
            <div className="wrap-narrow">
              <span className="badge">LEGAL</span>
              <h1 style={{ fontSize: '52px', lineHeight: 1.05, margin: '0 0 15px' }}>
                Terms of Use
              </h1>
              <p style={{ fontSize: '18px', color: '#566783', maxWidth: '720px' }}>
                Terms that apply when you use the Shristi Tech website, products information and contact services.
              </p>
            </div>
          </section>

          <div className="wrap-narrow">
            <div className="card">
              <h2>Terms at a glance</h2>
              <p>
                By using the Shristi Tech website, you agree to use it lawfully and to these terms. If you do not agree, please do not use the website.
              </p>

              <h3>1. About Shristi Tech</h3>
              <p>
                Shristi Tech is a digital product and automation studio focused on utility apps, games, SaaS products, AI-assisted development, automation and custom digital solutions.
              </p>

              <h3>2. Website information</h3>
              <p>
                We aim to keep website information useful and current, but product features, compatibility, pricing, availability, timelines and other details may change. Website descriptions are not a guarantee of a particular result.
              </p>

              <h3>3. AG TV Remote</h3>
              <p>
                AG TV Remote is a utility application intended to control compatible televisions and TV platforms. Compatibility can depend on the television model, operating system, network configuration, permissions, manufacturer protocols and software versions. Shristi Tech does not guarantee compatibility with every device or future software update.
              </p>

              <h3>4. Custom projects</h3>
              <p>
                Submitting a requirement does not create a contract, partnership, employment relationship, or obligation for Shristi Tech to accept the project. Scope, price, delivery schedule, ownership and support for an accepted project will be agreed separately.
              </p>

              <h3>5. AI-assisted development</h3>
              <p>
                Shristi Tech may use AI tools during planning, design, coding, testing, documentation or automation. AI output may require human review, correction and validation. Project-specific deliverables will be governed by the agreed scope and terms.
              </p>

              <h3>6. Intellectual property</h3>
              <p>
                The Shristi Tech name, logo, website design, original content and software are protected by applicable intellectual-property laws. You may not copy, redistribute, reverse engineer, or commercially exploit Shristi Tech materials except where permitted by law or written permission.
              </p>

              <h3>7. Acceptable use</h3>
              <p>
                You must not use the website or contact channels for unlawful activity, abuse, harassment, spam, malicious software, unauthorized access, impersonation, or infringement of another person's rights.
              </p>

              <h3>8. Third-party services</h3>
              <p>
                The website may link to third-party services such as Google Play or WhatsApp. Shristi Tech does not control those services and is not responsible for their availability, content, policies or practices.
              </p>

              <h3>9. Availability and warranties</h3>
              <p>
                The website and its information are provided on an as-available basis. To the extent permitted by applicable law, Shristi Tech disclaims warranties that the website will always be uninterrupted, error-free, or suitable for every particular purpose.
              </p>

              <h3>10. Limitation of liability</h3>
              <p>
                To the extent permitted by applicable law, Shristi Tech will not be responsible for indirect, incidental, special, consequential, or business losses arising from use of the website or reliance on its information.
              </p>

              <h3>11. Changes</h3>
              <p>
                These terms may be updated as the business, products or website evolve. Continued use after an update means you are using the latest published terms.
              </p>

              <h3>12. Governing law</h3>
              <p>
                Unless a separate written agreement states otherwise, these terms are intended to be governed by applicable laws of India, with disputes subject to the courts having appropriate jurisdiction in India.
              </p>

              <h3>13. Contact</h3>
              <p>
                For questions about these terms, email{' '}
                <a href="mailto:Srikanth12231@gmail.com" style={{ color: '#086cf1', fontWeight: 700 }}>
                  Srikanth12231@gmail.com
                </a>.
              </p>

              <p>
                <small>Last updated: 24 September 2026</small>
              </p>
            </div>
          </div>
        </main>
      )}

      {/* 100% Exact Footer */}
      <footer className="footer">
        <div className="wrap foot">
          <a className="footerBrand" onClick={() => navigateTo('home')} style={{ cursor: 'pointer' }}>
            <img src="/assets/shristi-tech-logo-mark.png" alt="Shristi Tech logo" />
            <div>
              <b>Shristi Tech</b>
              <small>IDEAS TODAY • BETTER TOMORROW</small>
            </div>
          </a>

          <div className="links">
            <button onClick={() => navigateTo('home')}>Home</button>
            <button onClick={() => navigateTo('home', 'remote')}>AG TV Remote</button>
            <button onClick={() => navigateTo('home', 'products')}>Products</button>
            <button onClick={() => navigateTo('home', 'ai')}>AI Development</button>
            <button onClick={() => navigateTo('about')}>About</button>
            <button onClick={() => navigateTo('contact')}>Contact</button>
            <button onClick={() => navigateTo('privacy')}>Privacy Policy</button>
            <button onClick={() => navigateTo('terms')}>Terms of Use</button>
          </div>

          <div className="copyright">
            © 2026 Shristi Tech. All rights reserved. &nbsp;
            <a onClick={() => navigateTo('privacy')} style={{ cursor: 'pointer' }}>
              Privacy Policy
            </a>{' '}
            &nbsp; | &nbsp;
            <a onClick={() => navigateTo('terms')} style={{ cursor: 'pointer' }}>
              Terms of Use
            </a>{' '}
            &nbsp; | &nbsp;
            <a onClick={() => navigateTo('contact')} style={{ cursor: 'pointer' }}>
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
