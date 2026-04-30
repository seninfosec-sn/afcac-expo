'use client'

import { Fragment, useEffect, useRef } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Stats() {
  const { t } = useLanguage()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const els = ref.current?.querySelectorAll<HTMLSpanElement>('.stat-num')
    if (!els) return
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const el = entry.target as HTMLSpanElement
        const raw = el.textContent?.replace(/\D/g, '') ?? ''
        const end = parseInt(raw, 10)
        if (isNaN(end)) return
        const suffix = el.textContent?.replace(/\d/g, '').trim() ?? ''
        let current = 0
        const step = end / 50
        const timer = setInterval(() => {
          current = Math.min(current + step, end)
          el.textContent = Math.floor(current) + suffix
          if (current >= end) { el.textContent = end + suffix; clearInterval(timer) }
        }, 30)
        observer.unobserve(el)
      })
    }, { threshold: 0.5 })
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="stats-strip" ref={ref}>
      <div className="container stats-grid">
        {t.stats.map((s, i) => (
          <Fragment key={s.label}>
            <div className="stat-item">
              <span className="stat-num">{s.num}</span>
              <span className="stat-label">{s.label}</span>
            </div>
            {i < t.stats.length - 1 && <div className="stat-divider" />}
          </Fragment>
        ))}
      </div>
    </section>
  )
}
