'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export default function About() {
  const { t } = useLanguage()
  const a = t.about

  return (
    <section className="about section" id="about">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{a.sectionTitle}</h2>
          <div className="section-divider" />
        </div>

        <div className="about-grid">
          <div className="about-card" id="about-afcac">
            <div className="about-card-icon"><i className="fas fa-globe-africa" /></div>
            <h3>{a.card1Title}</h3>
            <p>{a.card1Text}</p>
            <a href="https://www.afcac.org" target="_blank" rel="noopener noreferrer" className="card-link">
              {a.card1Link} <i className="fas fa-arrow-right" />
            </a>
          </div>

          <div className="about-card featured" id="about-expo">
            <div className="about-card-icon"><i className="fas fa-plane-departure" /></div>
            <h3>{a.card2Title}</h3>
            <p>{a.card2Text}</p>
            <a href="#programme" className="card-link">
              {a.card2Link} <i className="fas fa-arrow-right" />
            </a>
          </div>

          <div className="about-card" id="host-state">
            <div className="about-card-icon"><i className="fas fa-landmark" /></div>
            <h3>{a.card3Title}</h3>
            <p>{a.card3Text}</p>
            <a href="https://togotourisme.tg/" target="_blank" rel="noopener noreferrer" className="card-link">
              {a.card3Link} <i className="fas fa-arrow-right" />
            </a>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', margin: '32px 0' }}>
          <a href="/circuits" className="btn btn-primary" style={{ background: 'var(--gold)', borderColor: 'var(--gold)', color: 'var(--green-dark)', fontWeight: 700, fontSize: '1.2rem', padding: '18px 56px', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
            <i className="fas fa-map-marked-alt" /> {t.programme.circuits}
          </a>
        </div>

        <div className="coorg-section">
          <h3 className="coorg-title">{a.coorgTitle}</h3>
          <div className="coorg-logos">
            {a.coorganizers.map((org) => (
              <div key={org.name} className="coorg-logo-box">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={org.logo} alt={org.name} className="coorg-logo-img" />
                <span>{org.name}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
