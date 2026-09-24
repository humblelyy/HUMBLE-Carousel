import React, { useEffect, useRef } from 'react'
import { LetterCascade } from './components/ui/letter-cascade'
import { MagneticDock, MagneticDownload, DockIconHome, DockIconInstall, DockIconInfo } from './components/ui/magnetic-dock'
import { FlightStatusCardAdaptive } from './components/ui/flight-status-card'
import { ScrollBasedVelocity } from './components/ui/scroll-based-velocity'


function App() {
  const pageRef = useRef(null)
  const audioRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('visible')),
      { threshold: 0.12 },
    )
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const onMove = (event) => {
      document.documentElement.style.setProperty('--mouse-x', `${event.clientX}px`)
      document.documentElement.style.setProperty('--mouse-y', `${event.clientY}px`)
      const cards = document.querySelectorAll('.orbital-card')
      const x = (event.clientX / window.innerWidth - 0.5) * 2
      const y = (event.clientY / window.innerHeight - 0.5) * 2
      cards.forEach((card, index) => {
        card.style.transform = `translate3d(${x * (12 + index * 5)}px, ${y * (10 + index * 3)}px, 0) rotateX(${y * -7}deg) rotateY(${x * 8}deg)`
      })
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  const playClick = () => {
    try {
      if (!audioRef.current) audioRef.current = new AudioContext()
      const ctx = audioRef.current
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(520, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(260, ctx.currentTime + 0.055)
      gain.gain.setValueAtTime(0.035, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.065)
      osc.connect(gain).connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + 0.07)
    } catch {}
  }

  useEffect(() => {
    const handler = (event) => {
      const target = event.target.closest('a,button')
      if (target) playClick()
    }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [])

  return (
    <div ref={pageRef} id="top" className="site-shell">
      <div className="cursor-orb" aria-hidden="true" />
      <div className="noise" aria-hidden="true" />

      <MagneticDock
        items={[
          { id: 'home', label: 'Home', icon: <DockIconHome />, isActive: true, href: '#top' },
          { id: 'install', label: 'Install', icon: <DockIconInstall />, href: '#install' },
          { id: 'info', label: 'Info', icon: <DockIconInfo />, href: '#info' },
        ]}
      />

      <main>
        <section className="hero-section page-pad">
          <div className="hero-copy reveal">
            <div className="brand-lockup">
              <img src="./assets/humble-logo.png" alt="HUMBLE" />
              <span>HUMBLE STUDIO</span>
            </div>
            <p className="hero-kicker">AFTER EFFECTS · 1.0.3</p>
            <h1><LetterCascade text="HUMBLE" /> <span><LetterCascade text="CAROUSEL" /></span></h1>
            <p className="hero-sub">10 ready-made carousel styles for After Effects.</p>
            <div className="hero-actions">
              <a className="primary-button" href="#info">Explore features <span>↘</span></a>
            </div>
            <div className="hero-specs"><span>AE 2022+</span><span>WINDOWS</span><span>MACOS</span></div>
          </div>

          <div className="hero-preview reveal delay-1">
            <div className="preview-window">
              <div className="preview-bar"><span>HUMBLE CAROUSEL</span><span>1.0.3</span></div>
              <video autoPlay muted loop playsInline preload="metadata" poster="./assets/carousel-poster.jpg">
                <source src="./assets/carousel-styles.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="orbital-card card-a"><span>01</span><b>CYLINDER</b></div>
            <div className="orbital-card card-b"><span>08</span><b>RADIAL</b></div>
            <div className="orbital-card card-c"><span>10</span><b>SNAP</b></div>
          </div>
        </section>

        <ScrollBasedVelocity image="./assets/humble-fl.png" />

        <section id="info" className="features-section page-pad">
          <div className="feature-intro reveal">
            <span>02</span>
            <h2><LetterCascade text="MADE TO MOVE" /></h2>
            <p>Built around the things you actually touch: styles, media, text and controls.</p>
          </div>
          <div className="feature-grid">
            {[
              ['10', 'READY STYLES', 'Cylinder, cube, fan, ring and more.'],
              ['01', 'PANEL', 'One focused CEP panel inside After Effects.'],
              ['02+', 'AE SUPPORT', 'Targets After Effects 2022 and newer.'],
              ['∞', 'MEDIA', 'Drop your media in and build from the selected style.'],
            ].map(([number, title, copy], index) => (
              <article className="feature-card reveal" key={title} style={{ '--delay': `${index * 70}ms` }}>
                <span>{number}</span><h3>{title}</h3><p>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="install" className="install-section page-pad reveal">
          <div className="section-head install-heading">
            <div><span>03</span><h2>INSTALL</h2></div>
            <div className="ae-compatibility"><img src="./assets/ae-main-logo-symbol-icon.png" alt="Adobe After Effects" /><div><span>COMPATIBILITY</span><strong>AFTER EFFECTS 2022+</strong></div></div>
          </div>
          <div className="install-grid">
            <div className="install-card"><span>WINDOWS</span><code>C:\Program Files(x86)\Common Files\Adobe\CEP\extensions</code></div>
            <div className="install-card"><span>MACOS</span><code>~/Library/Application Support/Adobe/CEP/extensions/</code></div>
          </div>
          <div className="install-note"><b>01</b><span>Copy <code>HUMBLE_Carousel_1.0.3</code> paste to the extensions folder.</span><b>02</b><span>After Effects → Window → Extensions → HUMBLE Carousel.</span></div>
        </section>

        <section className="download-section page-pad reveal">
          <div className="download-panel">
            <div className="download-copy">
              <span>04</span>
              <div>
                <h2>DOWNLOAD 1.0.3</h2>
                <p>HUMBLE Carousel for After Effects 2022+.</p>
                <div className="download-platforms" aria-label="Supported platforms">
                  <span className="platform-badge"><i className="platform-dot" /> WINDOWS</span>
                  <span className="platform-badge"><i className="platform-dot" /> macOS</span>
                </div>
              </div>
            </div>
            <MagneticDownload href="./assets/HUMBLE_Carousel_1.0.3.zip" />
          </div>
        </section>
      </main>

      <footer className="footer page-pad">
        <div className="footer-top">
          <a className="footer-brand" href="#top"><img src="./assets/sl-humble-final.png" alt="HUMBLE" /></a>
          <div className="social-icons">
            <a href="https://github.com/humblelyy" target="_blank" rel="noreferrer" aria-label="GitHub"><GitHubIcon /></a>
            <a href="https://www.instagram.com/_humble.y_/" target="_blank" rel="noreferrer" aria-label="Instagram"><img className="social-image" src="./assets/instagram-social-bw.png" alt="Instagram" /></a>
            <a href="https://www.youtube.com/@humbleae" target="_blank" rel="noreferrer" aria-label="YouTube"><YouTubeIcon /></a>
            <a href="https://www.linkedin.com/in/mahesh-madhav-602683357" target="_blank" rel="noreferrer" aria-label="LinkedIn"><img className="social-image" src="./assets/linkedin-social-bw.png" alt="LinkedIn" /></a>
          </div>
        </div>
        <div className="footer-bottom">
          <span className="footer-humble"><img src="./assets/sl-humble-final.png" alt="HUMBLE" /><b>© {new Date().getFullYear()}</b></span>
          <div className="footer-links">
            <a href="./privacy.html">Privacy </a>
            <a href="./policy.html">Policy</a> 
            <a href="https://humblelyy.github.io/HumbleStudio/" target="_blank" rel="noreferrer">HUMBLE STUDIO ↗</a>
          </div>
        </div>
        <FlightStatusCardAdaptive />
      </footer>
    </div>
  )
}

const GitHubIcon = () => <svg viewBox="0 0 24 24"><path d="M12 .8a11.2 11.2 0 0 0-3.54 21.83c.56.1.77-.24.77-.54v-2.1c-3.14.68-3.8-1.33-3.8-1.33-.51-1.3-1.25-1.66-1.25-1.66-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 1.71 2.64 1.22 3.29.93.1-.71.39-1.21.71-1.49-2.51-.29-5.15-1.25-5.15-5.55 0-1.23.44-2.23 1.16-3.02-.12-.28-.5-1.43.11-2.98 0 0 .95-.3 3.11 1.16a10.7 10.7 0 0 1 5.66 0c2.15-1.46 3.1-1.16 3.1-1.16.62 1.55.23 2.7.11 2.98.72.79 1.16 1.79 1.16 3.02 0 4.31-2.64 5.26-5.16 5.54.4.34.76 1.03.76 2.08v3.09c0 .3.2.64.78.53A11.2 11.2 0 0 0 12 .8Z"/></svg>
const YouTubeIcon = () => <svg viewBox="0 0 24 24"><path d="M21.5 7.2a2.8 2.8 0 0 0-1.95-1.95C17.8 4.8 12 4.8 12 4.8s-5.8 0-7.55.45A2.8 2.8 0 0 0 2.5 7.2 29 29 0 0 0 2.05 12a29 29 0 0 0 .45 4.8 2.8 2.8 0 0 0 1.95 1.95c1.75.45 7.55.45 7.55.45s5.8 0 7.55-.45a2.8 2.8 0 0 0 1.95-1.95 29 29 0 0 0 .45-4.8 29 29 0 0 0-.45-4.8Z"/><path className="cut" d="m10 9 5 3-5 3V9Z"/></svg>

export default App
