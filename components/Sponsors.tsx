'use client'

import { useState, useEffect, useCallback } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

const EXHIBITORS = [
  'CAA Togo',
  'More than 20 Togo companies',
  'AU',
  'AFCAC',
  'AfCFTA',
  'AUDA-NEPAD',
  'COMESA Competition & Consumer Commission',
  'Starburst',
  'EMPIC',
  'NIRO Company',
  'Aviason',
  'Gobi Absorbs',
  'Aeroclass',
  'ATNS',
  'ACSA',
  'FB Airports',
  'Singapore CAA',
]

const VISIBLE = 4

export default function Sponsors() {
  const { t } = useLanguage()
  const s = t.sponsors
  const [index, setIndex] = useState(0)

  const total = Math.ceil(EXHIBITORS.length / VISIBLE)

  const next = useCallback(() => setIndex((i) => (i + 1) % total), [total])
  const prev = () => setIndex((i) => (i - 1 + total) % total)

  useEffect(() => {
    const timer = setInterval(next, 3000)
    return () => clearInterval(timer)
  }, [next])

  const visible = EXHIBITORS.slice(index * VISIBLE, index * VISIBLE + VISIBLE)

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

          {/* Exhibitors carousel */}
          <div style={{ marginBottom: '40px' }}>
            <h3 style={{
              textAlign: 'center',
              fontFamily: 'var(--font-head)',
              color: 'var(--green-dark)',
              fontSize: '1.1rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '20px',
            }}>
              Exhibitors
            </h3>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {/* Prev */}
              <button
                onClick={prev}
                style={{
                  flexShrink: 0,
                  width: '40px', height: '40px',
                  borderRadius: '50%',
                  border: '2px solid var(--green)',
                  background: 'transparent',
                  color: 'var(--green)',
                  fontSize: '1.2rem',
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.2s',
                }}
              >&#8249;</button>

              {/* Cards */}
              <div style={{
                flex: 1,
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '12px',
              }}>
                {visible.map((name, i) => (
                  <div key={i} style={{
                    background: 'var(--off-white)',
                    border: '1px solid var(--border)',
                    borderTop: '3px solid var(--gold)',
                    borderRadius: '8px',
                    padding: '16px 12px',
                    textAlign: 'center',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: 'var(--green-dark)',
                    minHeight: '64px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    {name}
                  </div>
                ))}
                {/* Fill empty slots */}
                {Array.from({ length: VISIBLE - visible.length }).map((_, i) => (
                  <div key={`empty-${i}`} style={{ visibility: 'hidden' }} />
                ))}
              </div>

              {/* Next */}
              <button
                onClick={next}
                style={{
                  flexShrink: 0,
                  width: '40px', height: '40px',
                  borderRadius: '50%',
                  border: '2px solid var(--green)',
                  background: 'transparent',
                  color: 'var(--green)',
                  fontSize: '1.2rem',
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.2s',
                }}
              >&#8250;</button>
            </div>

            {/* Dots */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '16px' }}>
              {Array.from({ length: total }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  style={{
                    width: i === index ? '24px' : '10px',
                    height: '10px',
                    borderRadius: '5px',
                    border: 'none',
                    background: i === index ? 'var(--gold)' : 'var(--border)',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    padding: 0,
                  }}
                />
              ))}
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
