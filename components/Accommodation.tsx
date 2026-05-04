'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export default function Accommodation() {
  const { t } = useLanguage()
  const ac = t.accommodation

  return (
    <section className="accommodation section" id="accommodation">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">{ac.sectionTag}</span>
          <h2 className="section-title">{ac.sectionTitle}</h2>
          <div className="section-divider" />
          <p className="section-desc">{ac.sectionDesc}</p>
          <div className="prog-bulletin-bar" style={{ justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
            <span className="btn btn-primary prog-bulletin-btn" style={{ cursor: 'default', pointerEvents: 'none' }}>
              <i className="fas fa-file-alt" /> Download list of hotels
            </span>
            <div className="prog-bulletin-langs">
              <a href="https://www.afcac.org/wp-content/uploads/2026/05/Hotels-Information.pdf" target="_blank" rel="noopener noreferrer" className="prog-lang-btn">EN</a>
              <a href="https://www.afcac.org/wp-content/uploads/2026/05/Hotels-Information-FR.pdf" target="_blank" rel="noopener noreferrer" className="prog-lang-btn">FR</a>
              <a href="https://www.afcac.org/wp-content/uploads/2026/05/Hotels-Information-PR.pdf" target="_blank" rel="noopener noreferrer" className="prog-lang-btn">PR</a>
            </div>
          </div>
        </div>

        <div className="hotels-grid">
          <div className="hotel-card featured-hotel">
            <div className="hotel-badge">{ac.officialBadge}</div>
            <div className="hotel-icon">
              {Array.from({ length: 5 }).map((_, i) => <i key={i} className="fas fa-star" />)}
            </div>
            <h4>{ac.hotel1Name}</h4>
            <p style={{ whiteSpace: 'pre-line', textAlign: 'justify' }}>{ac.hotel1Desc}</p>
          </div>

          <div className="hotel-card">
            <div className="hotel-icon">
              {Array.from({ length: 4 }).map((_, i) => <i key={i} className="fas fa-star" />)}
            </div>
            <h4>{ac.hotel2Name}</h4>
            <p style={{ whiteSpace: 'pre-line' }}>{ac.hotel2Desc}</p>
          </div>

          <div className="hotel-card">
            <div className="hotel-icon">
              {Array.from({ length: 4 }).map((_, i) => <i key={i} className="fas fa-star" />)}
            </div>
            <h4>{ac.hotel3Name}</h4>
            <p style={{ whiteSpace: 'pre-line' }}>{ac.hotel3Desc}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
