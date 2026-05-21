'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

const galleryPhotos = [
  '/gallery/1.png',
  '/gallery/2.png',
  '/gallery/3.png',
  '/gallery/4.png',
  '/gallery/5.png',
  '/gallery/6.png',
  '/gallery/7.png',
]

export default function Speakers() {
  const { t } = useLanguage()
  const s = t.speakers
  const [galleryOpen, setGalleryOpen] = useState(false)

  type SpeakerItem = { name: string; role: string; org: string; photo?: string; gallery?: boolean }
  const list = s.list as unknown as SpeakerItem[]
  const regularSpeakers = list.filter((sp) => !sp.gallery)
  const galleryEntry = list.find((sp) => sp.gallery)

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
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
          <div className="speaker-card" style={{ maxWidth: '220px' }}>
            <div style={{ width: '180px', height: '180px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 16px', flexShrink: 0 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/SEMPRT.png" alt={s.semprtTitle} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%', display: 'block' }} />
            </div>
            <h4>{s.semprtTitle}</h4>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '24px', marginBottom: '48px' }}>
          {[
            { photo: '/IE AU HA.png', title: s.ieAuTitle },
            { photo: '/H. E WAMKELE MENE.png', title: s.wamkeleTitle },
            { photo: '/AUDA NEPAD HA.png', title: s.audaNepadTitle },
          ].map((p) => (
            <div key={p.title} className="speaker-card" style={{ maxWidth: '220px' }}>
              <div style={{ width: '180px', height: '180px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 16px', flexShrink: 0 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.photo} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%', display: 'block' }} />
              </div>
              <h4 style={{ whiteSpace: 'pre-line' }}>{p.title}</h4>
            </div>
          ))}
        </div>

        <div className="section-header">
          <h2 className="section-title">{s.sectionTitle}</h2>
          <div className="section-divider" />
          <p className="section-desc">{s.sectionDesc}</p>
        </div>

        <div className="speakers-grid">
          {regularSpeakers.map((sp) => (
            <div key={sp.name} className="speaker-card">
              {sp.photo ? (
                <div style={{ width: '180px', height: '180px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 16px', flexShrink: 0 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={sp.photo} alt={sp.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%', display: 'block' }} />
                </div>
              ) : (
                <div className="speaker-photo"><i className="fas fa-user" /></div>
              )}
              <h4>{sp.name}</h4>
              <p>{sp.role}<br /><span>{sp.org}</span></p>
            </div>
          ))}
        </div>

        {galleryEntry && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
            <div
              className="speaker-card"
              style={{ cursor: 'pointer', maxWidth: '220px', textAlign: 'center' }}
              onClick={() => setGalleryOpen(true)}
            >
              <div className="speaker-photo" style={{ fontSize: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <i className="fas fa-images" />
              </div>
              <h4>{galleryEntry.name}</h4>
              <p>{galleryEntry.role}<br /><span>{galleryEntry.org}</span></p>
            </div>
          </div>
        )}
      </div>

      {galleryOpen && (
        <div
          onClick={() => setGalleryOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(0,0,0,0.85)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '24px',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#fff',
              borderRadius: '16px',
              padding: '32px',
              maxWidth: '900px',
              width: '100%',
              maxHeight: '85vh',
              overflowY: 'auto',
              position: 'relative',
            }}
          >
            <button
              onClick={() => setGalleryOpen(false)}
              style={{
                position: 'sticky', top: 0, float: 'right',
                background: 'var(--primary)', color: '#fff',
                border: 'none', borderRadius: '50%',
                width: '36px', height: '36px',
                fontSize: '1.25rem', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '16px',
              }}
            >
              ×
            </button>
            <h3 style={{ textAlign: 'center', marginBottom: '24px', color: 'var(--primary)' }}>
              {galleryEntry?.name}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', clear: 'both' }}>
              {galleryPhotos.map((src, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={src}
                  src={src}
                  alt={`Speaker ${i + 1}`}
                  style={{ width: '100%', height: 'auto', borderRadius: '10px', display: 'block' }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
