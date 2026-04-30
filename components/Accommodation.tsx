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
        </div>

        <div className="hotels-grid">
          <div className="hotel-card featured-hotel">
            <div className="hotel-badge">{ac.officialBadge}</div>
            <div className="hotel-icon">
              {Array.from({ length: 5 }).map((_, i) => <i key={i} className="fas fa-star" />)}
            </div>
            <h4>{ac.hotel1Name}</h4>
            <p style={{ whiteSpace: 'pre-line' }}>{ac.hotel1Desc}</p>
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
