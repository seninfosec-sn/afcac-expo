'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export default function Travel() {
  const { t } = useLanguage()
  const tr = t.travel

  return (
    <section className="travel section" id="travel">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">{tr.sectionTag}</span>
          <h2 className="section-title">{tr.sectionTitle}</h2>
          <div className="section-divider" />
        </div>

        <div className="travel-grid">
          {tr.cards.map((c) => (
            <div key={c.title} className="travel-card">
              <div className="travel-icon"><i className={c.icon} /></div>
              <h4>{c.title}</h4>
              <p>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
