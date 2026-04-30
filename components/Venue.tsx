'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export default function Venue() {
  const { t } = useLanguage()
  const v = t.venue

  return (
    <section className="venue section" id="venue">
      <div className="container">
        <div className="venue-grid">
          <div className="venue-info">
            <span className="section-tag">{v.sectionTag}</span>
            <h2 className="section-title left">{v.sectionTitle}</h2>
            <div className="section-divider left" />
            <h3>{v.venueName}</h3>
            <p className="venue-address">
              <i className="fas fa-map-marker-alt" /> {v.venueAddress}
            </p>
            <p>{v.venueDesc}</p>
            <ul className="venue-features">
              {v.features.map((f) => (
                <li key={f}><i className="fas fa-check-circle" /> {f}</li>
              ))}
            </ul>
            <a href="#travel" className="btn btn-outline-dark">{v.travelBtn}</a>
          </div>

          <div className="venue-map">
            <div className="map-placeholder">
              <div className="map-pin">
                <i className="fas fa-map-marker-alt" />
                <span>{v.mapPin}</span>
              </div>
              <div className="map-grid" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
