'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export default function Sponsors() {
  const { t } = useLanguage()
  const s = t.sponsors

  return (
    <section className="sponsors" id="sponsors">
      <div className="sponsors-bg">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">{s.sectionTag}</span>
            <h2 className="section-title">{s.sectionTitle}</h2>
            <div className="section-divider" />
            <p className="section-desc">{s.sectionDesc}</p>
          </div>

          <div className="sponsor-tiers">
            <div className="tier">
              <h3 className="tier-title platinum">{s.platinum}</h3>
              <div className="sponsor-logos">
                {s.platinumLogos.map((logo) => (
                  <div key={logo} className="sponsor-logo-box">{logo}</div>
                ))}
              </div>
            </div>
            <div className="tier">
              <h3 className="tier-title gold">{s.gold}</h3>
              <div className="sponsor-logos">
                {s.goldLogos.map((logo) => (
                  <div key={logo} className="sponsor-logo-box sm">{logo}</div>
                ))}
              </div>
            </div>
            <div className="tier">
              <h3 className="tier-title silver">{s.silver}</h3>
              <div className="sponsor-logos">
                {s.silverLogos.map((logo) => (
                  <div key={logo} className="sponsor-logo-box xs">{logo}</div>
                ))}
              </div>
            </div>
            <div className="tier">
              <h3 className="tier-title bronze">{s.bronze}</h3>
              <div className="sponsor-logos">
                {s.bronzeLogos.map((logo) => (
                  <div key={logo} className="sponsor-logo-box xs">{logo}</div>
                ))}
              </div>
            </div>
          </div>

          {/* Exhibitors ticker */}
          <div style={{ marginBottom: '40px' }}>
            <h3 style={{ textAlign: 'center', fontFamily: 'var(--font-head)', color: 'var(--green-dark)', fontSize: '1.1rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '16px' }}>
              Exhibitors
            </h3>
            <div style={{ overflow: 'hidden', background: 'var(--off-white)', borderRadius: '8px', border: '1px solid var(--border)', padding: '12px 0' }}>
              <div style={{
                display: 'flex',
                gap: '0',
                animation: 'tickerScroll 30s linear infinite',
                width: 'max-content',
              }}>
                {[
                  'CAA Togo', 'More than 20 Togo companies', 'AU', 'AFCAC', 'AfCFTA',
                  'AUDA-NEPAD', 'COMESA Competition & Consumer Commission', 'Starburst',
                  'EMPIC', 'NIRO Company', 'Aviason', 'Gobi Absorbs', 'Aeroclass',
                  'ATNS', 'ACSA', 'FB Airports', 'Singapore CAA',
                  'CAA Togo', 'More than 20 Togo companies', 'AU', 'AFCAC', 'AfCFTA',
                  'AUDA-NEPAD', 'COMESA Competition & Consumer Commission', 'Starburst',
                  'EMPIC', 'NIRO Company', 'Aviason', 'Gobi Absorbs', 'Aeroclass',
                  'ATNS', 'ACSA', 'FB Airports', 'Singapore CAA',
                ].map((name, i) => (
                  <span key={i} style={{
                    padding: '0 24px',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    color: 'var(--green)',
                    whiteSpace: 'nowrap',
                    borderRight: '2px solid var(--gold)',
                  }}>
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="sponsor-cta">
            <p>{s.ctaText}</p>
            <a href="#register" className="btn btn-primary">{s.ctaBtn}</a>
          </div>
        </div>
      </div>
    </section>
  )
}
