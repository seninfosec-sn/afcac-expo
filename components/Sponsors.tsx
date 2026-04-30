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
          </div>

          <div className="sponsor-cta">
            <p>{s.ctaText}</p>
            <a href="mailto:jdridi@afcac.org" className="btn btn-primary">{s.ctaBtn}</a>
          </div>
        </div>
      </div>
    </section>
  )
}
