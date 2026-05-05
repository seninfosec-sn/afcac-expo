'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export default function Speakers() {
  const { t } = useLanguage()
  const s = t.speakers

  return (
    <section className="speakers section" id="speakers">
      <div className="container">
        <div className="section-header" style={{ marginBottom: '24px' }}>
          <h2 className="section-title">{s.highPatronage}</h2>
          <div className="section-divider" />
          <p style={{ fontWeight: 700, fontSize: '1.25rem', letterSpacing: '0.04em', color: 'var(--primary)', marginTop: '16px', lineHeight: 1.4, textAlign: 'center' }}>
            {s.semprtName}
          </p>
          <p style={{ fontWeight: 600, fontSize: '0.95rem', letterSpacing: '0.06em', color: 'var(--text)', textAlign: 'center', marginTop: '4px' }}>
            {s.semprtFullTitle}
          </p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '48px' }}>
          <div className="speaker-card" style={{ maxWidth: '220px' }}>
            <div style={{ width: '180px', height: '180px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 16px', flexShrink: 0 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/SEMPRT.png" alt="Président du Conseil de la République Togolaise" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%', display: 'block' }} />
            </div>
            <h4>{s.semprtTitle}</h4>
          </div>
        </div>

        <div className="section-header">
          <h2 className="section-title">{s.sectionTitle}</h2>
          <div className="section-divider" />
          <p className="section-desc">{s.sectionDesc}</p>
        </div>

        <div className="speakers-grid">
          {s.list.map((sp) => (
            <div key={sp.name} className="speaker-card">
              {(() => {
                const photo = (sp as Record<string, string>).photo
                return photo ? (
                  <div style={{ width: '180px', height: '180px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 16px', flexShrink: 0 }}>
                    <img src={photo} alt={sp.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%', display: 'block' }} />
                  </div>
                ) : (
                  <div className="speaker-photo"><i className="fas fa-user" /></div>
                )
              })()}
              <h4>{sp.name}</h4>
              <p>{sp.role}<br /><span>{sp.org}</span></p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
