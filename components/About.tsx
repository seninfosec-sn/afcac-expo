'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export default function About() {
  const { t } = useLanguage()
  const a = t.about

  return (
    <section className="about section" id="about">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">{a.sectionTag}</span>
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
            <a href="#venue" className="card-link">
              {a.card3Link} <i className="fas fa-arrow-right" />
            </a>
          </div>
        </div>

        <div className="event-banner">
          <a href="https://www.afcac.org/expo-registration/" target="_blank" rel="noopener noreferrer">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/29-April-Togo-Event-Banner-.gif"
              alt="AFCAC Expo 2026 — Lomé, Togo"
              style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 'var(--radius)', cursor: 'pointer' }}
            />
          </a>
        </div>

        <div className="outcomes-section">
          <div className="outcomes-header">
            <span className="section-tag outcomes-tag">{a.outcomesTag}</span>
            <h2 className="outcomes-title">{a.outcomesTitle}</h2>
            <div className="outcomes-kente" />
          </div>
          <div className="outcomes-list">
            {a.outcomes.map((item) => (
              <div key={item.letter} className="outcome-item">
                <div className={`outcome-letter outcome-letter--${item.color}`}>{item.letter}</div>
                <div className="outcome-content">
                  <strong>{item.title}</strong>
                  <span>{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
