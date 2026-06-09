'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

type Exhibitor = { name: string; logo: string | null; subtitle?: string; logoStyle?: React.CSSProperties }
const EXHIBITORS: Exhibitor[] = [
  { name: 'CAA Togo',                                    logo: '/TOGO.png' },
  { name: 'More than 20 Togo companies',                 logo: '/TOGO.png' },
  { name: 'AU',                                          logo: '/african-union.png' },
  { name: 'AFCAC',                                       logo: '/afcac_logo.png' },
  { name: 'AfCFTA',                                      logo: '/AfCFTA.png' },
  { name: 'AUDA-NEPAD',                                  logo: '/AUDA NEPAD 25.png' },
  { name: 'COMESA Competition & Consumer Commission',    logo: '/COMESA 1.jpg' },
  { name: 'Starburst',                                   logo: '/STARTBURST.png' },
  { name: 'Seabury',                                     logo: '/Seabury.png', subtitle: 'Global Scale. Global Reach' },
  { name: 'EMPIC',                                       logo: '/EMPIC.png' },
  { name: 'NIro Company Limited',                        logo: '/NIRO.png' },
  { name: 'Aviason',                                     logo: '/aviason.png' },
  { name: 'Absorbs Liquids',                             logo: '/gobi.jpeg' },
  { name: 'Aeroclass',                                   logo: '/Logotype-Cold.png', logoStyle: { height: '82px', maxWidth: '190px' } },
  { name: 'ATNS',                                        logo: '/ATNS.png' },
  { name: 'ACSA',                                        logo: '/ACSA.png' },
  { name: 'FB Group',                                    logo: '/FB Group 1.png' },
  { name: 'Singapore CAA',                               logo: '/CAAS.avif' },
  { name: 'INKAS',                                       logo: '/INKAS.png' },
  { name: 'ASECNA',                                      logo: '/ASECNA.png' },
  { name: 'AFRICAN AVIATION AND AEROSPACE UNIVERSITY',   logo: '/AAAU.png' },
]

const VISIBLE = 4

export default function Sponsors() {
  const { t } = useLanguage()
  const s = t.sponsors
  const [index, setIndex] = useState(0)

  const total = Math.ceil(EXHIBITORS.length / VISIBLE)

  const next = () => setIndex((i) => (i + 1) % total)
  const prev = () => setIndex((i) => (i - 1 + total) % total)

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
              <h3 className="tier-title gold" style={{ animation: 'goldBlink 1.4s ease-in-out infinite' }}>{s.gold}</h3>
              <div className="sponsor-logos">
                {s.goldLogos.map((name) => {
                  const goldLogoMap: Record<string, string> = {
                    'Ethiopian Airlines': '/Ethiopian_Airlines.png',
                  }
                  const src = goldLogoMap[name]
                  return (
                    <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', padding: '16px 20px', background: 'var(--off-white)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', minWidth: '180px', textAlign: 'center' }}>
                      {src ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={src} alt={name} style={{ height: '80px', width: 'auto', maxWidth: '240px', objectFit: 'contain', display: 'block' }} />
                      ) : (
                        <i className="fas fa-building" style={{ fontSize: '1.6rem', color: 'var(--gold-dark)' }} />
                      )}
                      <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', lineHeight: 1.3 }}>{name}</span>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="tier">
              <h3 className="tier-title silver">{s.silver}</h3>
              <div className="sponsor-logos">
                {s.silverLogos.map((name) => {
                  const silverLogoMap: Record<string, string> = {
                    'Airports Company South Africa': '/ACSA.png',
                    'Weihai International Economic & Technical Cooperative Co. Ltd': '/WIETC.png',
                  }
                  const src = silverLogoMap[name]
                  return (
                    <div key={name} style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                      gap: '8px', padding: '16px 20px',
                      background: 'var(--off-white)', border: '1px solid var(--border)',
                      borderRadius: 'var(--radius)', minWidth: '180px', textAlign: 'center',
                      transition: 'var(--transition)',
                    }}>
                      {src ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={src} alt={name} style={{ height: '72px', width: 'auto', maxWidth: '220px', objectFit: 'contain', display: 'block' }} />
                      ) : (
                        <i className="fas fa-building" style={{ fontSize: '1.6rem', color: 'var(--text-muted)' }} />
                      )}
                      <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', lineHeight: 1.3 }}>{name}</span>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="tier">
              <h3 className="tier-title bronze">{s.bronze}</h3>
              <div className="sponsor-logos">
                {s.bronzeLogos.map((name) => {
                  const logoMap: Record<string, string> = {
                    'ATNS': '/ATNS.png',
                    'Aerovault': '/AEROVAULT.png',
                  }
                  const src = logoMap[name]
                  return (
                    <div key={name} className="sponsor-logo-box xs" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                      {src ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={src} alt={name} style={{ height: '84px', width: 'auto', maxWidth: '210px', objectFit: 'contain' }} />
                      ) : (
                        <i className="fas fa-building" style={{ fontSize: '1.4rem', color: '#cd7f32' }} />
                      )}
                      <span>{name}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Supporting Airlines */}
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
                {visible.map((item, i) => (
                  <div key={i} style={{
                    background: 'var(--off-white)',
                    border: '1px solid var(--border)',
                    borderTop: '3px solid var(--gold)',
                    borderRadius: '8px',
                    padding: '12px 10px',
                    textAlign: 'center',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    color: 'var(--green-dark)',
                    minHeight: '130px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                  }}>
                    {item.logo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={item.logo} alt={item.name} style={{ height: '64px', width: 'auto', maxWidth: '150px', objectFit: 'contain', display: 'block', ...item.logoStyle }} />
                    ) : (
                      <i className="fas fa-building" style={{ fontSize: '1.4rem', color: 'var(--gold)' }} />
                    )}
                    <span>{item.name}</span>
                    {item.subtitle && <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontStyle: 'italic', display: 'block', marginTop: '2px' }}>{item.subtitle}</span>}
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

          {/* Supporting Airlines */}
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
              Supporting Airlines
            </h3>
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <div style={{
                background: 'var(--off-white)',
                border: '1px solid var(--border)',
                borderTop: '3px solid var(--gold)',
                borderRadius: '8px',
                padding: '16px 20px',
                textAlign: 'center',
                fontSize: '0.82rem',
                fontWeight: 600,
                color: 'var(--green-dark)',
                minHeight: '130px',
                minWidth: '160px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
              }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/KQ 1.png" alt="Kenya Airways" style={{ height: '56px', width: 'auto', maxWidth: '140px', objectFit: 'contain', display: 'block' }} />
                <span>KENYA AIRWAYS</span>
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
