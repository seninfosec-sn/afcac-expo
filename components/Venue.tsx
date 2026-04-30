'use client'

import { useEffect, useRef } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

const HOTEL_LNG = 1.2153
const HOTEL_LAT = 6.1376

export default function Venue() {
  const { t } = useLanguage()
  const v = t.venue
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mapRef.current) return

    let map: import('maplibre-gl').Map | null = null

    import('maplibre-gl').then((maplibregl) => {
      if (!mapRef.current) return

      map = new maplibregl.Map({
        container: mapRef.current,
        style: 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json',
        center: [HOTEL_LNG, HOTEL_LAT],
        zoom: 15,
        attributionControl: false,
      })

      map.addControl(new maplibregl.AttributionControl({ compact: true }), 'bottom-right')
      map.addControl(new maplibregl.NavigationControl(), 'top-right')

      new maplibregl.Marker({ color: '#017764' })
        .setLngLat([HOTEL_LNG, HOTEL_LAT])
        .setPopup(
          new maplibregl.Popup({ offset: 25 }).setHTML(
            '<strong>Hôtel 2 Février</strong><br>Lomé, Togo'
          )
        )
        .addTo(map)
    })

    return () => { map?.remove() }
  }, [])

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
            <div ref={mapRef} className="maplibre-map" />
          </div>
        </div>
      </div>
    </section>
  )
}
