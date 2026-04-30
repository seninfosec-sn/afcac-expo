'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

interface Particle {
  id: number; left: number; size: number; duration: number; delay: number; opacity: number
}

export default function Hero() {
  const { t } = useLanguage()
  const [cd, setCd] = useState({ days: '000', hours: '00', minutes: '00', seconds: '00' })
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    setParticles(
      Array.from({ length: 35 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: Math.random() * 4 + 1,
        duration: Math.random() * 12 + 8,
        delay: Math.random() * 8,
        opacity: Math.random() * 0.5 + 0.1,
      }))
    )
    const target = new Date('2026-06-15T08:00:00')
    function update() {
      const diff = target.getTime() - Date.now()
      if (diff <= 0) { setCd({ days: '000', hours: '00', minutes: '00', seconds: '00' }); return }
      const d = Math.floor(diff / 86400000)
      const h = Math.floor((diff % 86400000) / 3600000)
      const m = Math.floor((diff % 3600000) / 60000)
      const s = Math.floor((diff % 60000) / 1000)
      setCd({
        days: String(d).padStart(3, '0'),
        hours: String(h).padStart(2, '0'),
        minutes: String(m).padStart(2, '0'),
        seconds: String(s).padStart(2, '0'),
      })
    }
    update()
    const timer = setInterval(update, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="hero" id="home">
      <div className="hero-overlay" />
      <div className="hero-particles">
        {particles.map((p) => (
          <div key={p.id} className="particle" style={{
            left: `${p.left}%`, width: `${p.size}px`, height: `${p.size}px`,
            animationDuration: `${p.duration}s`, animationDelay: `${p.delay}s`, opacity: p.opacity,
          }} />
        ))}
      </div>

      <div className="container hero-content">
        <div className="hero-badge">{t.hero.badge}</div>
        <h1 className="hero-title">
          {t.hero.title1}<br />
          <span className="hero-accent">{t.hero.title2}</span><br />
          <span className="hero-location">{t.hero.location}</span>
        </h1>
        <p className="hero-subtitle">{t.hero.subtitle}</p>

        <div className="countdown">
          <div className="countdown-item">
            <span className="count-num">{cd.days}</span>
            <span className="count-label">{t.hero.days}</span>
          </div>
          <div className="countdown-sep">:</div>
          <div className="countdown-item">
            <span className="count-num">{cd.hours}</span>
            <span className="count-label">{t.hero.hours}</span>
          </div>
          <div className="countdown-sep">:</div>
          <div className="countdown-item">
            <span className="count-num">{cd.minutes}</span>
            <span className="count-label">{t.hero.minutes}</span>
          </div>
          <div className="countdown-sep">:</div>
          <div className="countdown-item">
            <span className="count-num">{cd.seconds}</span>
            <span className="count-label">{t.hero.seconds}</span>
          </div>
        </div>

        <div className="hero-actions">
          <a href="#register" className="btn btn-primary">{t.hero.cta}</a>
          <a href="#about" className="btn btn-outline">{t.hero.ctaSecondary}</a>
        </div>
      </div>

      <div className="hero-scroll-hint">
        <span>{t.hero.scrollHint}</span>
        <i className="fas fa-chevron-down" />
      </div>
    </section>
  )
}
