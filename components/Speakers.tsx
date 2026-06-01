'use client'

import { useState, useEffect, useCallback } from 'react'
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
  const [currentSlide, setCurrentSlide] = useState(0)
  const [ministerIndex, setMinisterIndex] = useState(0)

  const openGallery = () => { setCurrentSlide(0); setGalleryOpen(true) }
  const prev = () => setCurrentSlide((i) => (i - 1 + galleryPhotos.length) % galleryPhotos.length)
  const next = () => setCurrentSlide((i) => (i + 1) % galleryPhotos.length)

  const MINISTERS_VISIBLE = 4
  type MinisterItem = { name: string; title: string; org: string; photo: string }
  const ministers = s.ministers as unknown as MinisterItem[]
  const ministerPages = Math.ceil(ministers.length / MINISTERS_VISIBLE)
  const visibleMinisters = ministers.slice(ministerIndex * MINISTERS_VISIBLE, ministerIndex * MINISTERS_VISIBLE + MINISTERS_VISIBLE)

  const ministerNext = useCallback(() => setMinisterIndex((i) => (i + 1) % ministerPages), [ministerPages])
  const ministerPrev = () => setMinisterIndex((i) => (i - 1 + ministerPages) % ministerPages)

  useEffect(() => {
    const timer = setInterval(ministerNext, 3500)
    return () => clearInterval(timer)
  }, [ministerNext])

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
          <div className="speaker-card" style={{ maxWidth: '280px' }}>
            <div style={{ width: '230px', height: '230px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 16px', flexShrink: 0, boxShadow: '0 4px 24px rgba(0,0,0,0.15)', border: '4px solid var(--gold)' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/SEMPRT.png" alt={s.semprtTitle} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%', display: 'block' }} />
            </div>
            <h4 style={{ fontSize: '1rem' }}>{s.semprtTitle}</h4>
          </div>
        </div>

        {/* Ministers section */}
        {/* Ministers carousel */}
        <div style={{ marginBottom: '48px' }}>
          <h3 style={{ textAlign: 'center', fontFamily: 'var(--font-head)', color: 'var(--green-dark)', fontSize: '1.3rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '24px' }}>
            {s.ministersTitle}
          </h3>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Prev */}
            <button onClick={ministerPrev} style={{ flexShrink: 0, width: '40px', height: '40px', borderRadius: '50%', border: '2px solid var(--green)', background: 'transparent', color: 'var(--green)', fontSize: '1.2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              &#8249;
            </button>

            {/* Cards */}
            <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
              {visibleMinisters.map((m, i) => (
                <div key={i} className="speaker-card" style={{ textAlign: 'center' }}>
                  <div style={{ width: '140px', height: '140px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 12px', flexShrink: 0, background: 'var(--off-white)', border: '2px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {m.photo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={m.photo} alt={m.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%', display: 'block' }} />
                    ) : (
                      <i className="fas fa-user" style={{ fontSize: '3rem', color: 'var(--text-muted)' }} />
                    )}
                  </div>
                  <p style={{ fontWeight: 400, fontSize: '0.85rem', color: 'var(--text)', margin: '0 0 4px', lineHeight: 1.3 }}>{m.name}</p>
                  <h4 style={{ fontSize: '0.78rem', margin: 0, whiteSpace: 'pre-line' }}>{m.title}</h4>
                </div>
              ))}
              {/* Empty slots */}
              {Array.from({ length: MINISTERS_VISIBLE - visibleMinisters.length }).map((_, i) => (
                <div key={`empty-${i}`} style={{ visibility: 'hidden' }} />
              ))}
            </div>

            {/* Next */}
            <button onClick={ministerNext} style={{ flexShrink: 0, width: '40px', height: '40px', borderRadius: '50%', border: '2px solid var(--green)', background: 'transparent', color: 'var(--green)', fontSize: '1.2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              &#8250;
            </button>
          </div>

          {/* Dots */}
          {ministerPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '16px' }}>
              {Array.from({ length: ministerPages }).map((_, i) => (
                <button key={i} onClick={() => setMinisterIndex(i)} style={{ width: i === ministerIndex ? '24px' : '10px', height: '10px', borderRadius: '5px', border: 'none', background: i === ministerIndex ? 'var(--gold)' : 'var(--border)', cursor: 'pointer', transition: 'all 0.3s', padding: 0 }} />
              ))}
            </div>
          )}
        </div>

        {/* Co-Organizer section */}
        <div style={{ marginBottom: '48px' }}>
          <h3 style={{ textAlign: 'center', fontFamily: 'var(--font-head)', color: 'var(--green-dark)', fontSize: '1.3rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '28px' }}>
            {s.coOrganizerTitle}
          </h3>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', flexWrap: 'nowrap', gap: '24px' }}>
            {(s.coOrganizers as unknown as { name: string; title: string; org: string; photo: string }[]).map((c) => (
              <div key={c.name} className="speaker-card" style={{ maxWidth: '180px', textAlign: 'center' }}>
                <div style={{ width: '150px', height: '150px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 12px', flexShrink: 0 }}>
                  {c.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={c.photo} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%', display: 'block' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--off-white)' }}>
                      <i className="fas fa-user" style={{ fontSize: '3.5rem', color: 'var(--text-muted)' }} />
                    </div>
                  )}
                </div>
                <p style={{ fontWeight: 400, fontSize: '0.9rem', color: 'var(--text)', margin: '0 0 6px', lineHeight: 1.3 }}>{c.name}</p>
                <h4 style={{ whiteSpace: 'pre-line', fontSize: '0.82rem', margin: 0 }}>{c.title}</h4>
              </div>
            ))}
          </div>
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
              onClick={openGallery}
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
            background: 'rgba(0,0,0,0.92)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              width: '90vw',
              maxWidth: '960px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            {/* Close */}
            <button
              onClick={() => setGalleryOpen(false)}
              style={{
                position: 'absolute', top: '-48px', right: 0,
                background: 'var(--primary)', color: '#fff',
                border: 'none', borderRadius: '50%',
                width: '36px', height: '36px',
                fontSize: '1.4rem', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >×</button>

            {/* Counter */}
            <p style={{ color: '#fff', fontSize: '0.9rem', margin: 0 }}>
              {currentSlide + 1} / {galleryPhotos.length}
            </p>

            {/* Image + nav */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', width: '100%' }}>
              <button
                onClick={prev}
                style={{
                  flexShrink: 0,
                  background: 'rgba(255,255,255,0.15)', color: '#fff',
                  border: 'none', borderRadius: '50%',
                  width: '48px', height: '48px',
                  fontSize: '1.5rem', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >&#8249;</button>

              {/* Slider track */}
              <div style={{ flex: 1, overflow: 'hidden', borderRadius: '12px' }}>
                <div
                  style={{
                    display: 'flex',
                    transform: `translateX(-${currentSlide * 100}%)`,
                    transition: 'transform 0.45s ease',
                  }}
                >
                  {galleryPhotos.map((src, i) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={src}
                      src={src}
                      alt={`Photo ${i + 1}`}
                      style={{
                        flex: '0 0 100%',
                        width: '100%',
                        height: 'auto',
                        maxHeight: '70vh',
                        objectFit: 'contain',
                        display: 'block',
                      }}
                    />
                  ))}
                </div>
              </div>

              <button
                onClick={next}
                style={{
                  flexShrink: 0,
                  background: 'rgba(255,255,255,0.15)', color: '#fff',
                  border: 'none', borderRadius: '50%',
                  width: '48px', height: '48px',
                  fontSize: '1.5rem', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >&#8250;</button>
            </div>

            {/* Dots */}
            <div style={{ display: 'flex', gap: '8px' }}>
              {galleryPhotos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  style={{
                    width: i === currentSlide ? '24px' : '10px',
                    height: '10px',
                    borderRadius: '5px',
                    border: 'none',
                    background: i === currentSlide ? 'var(--primary)' : 'rgba(255,255,255,0.4)',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    padding: 0,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
