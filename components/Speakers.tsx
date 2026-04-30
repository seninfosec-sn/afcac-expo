'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export default function Speakers() {
  const { t } = useLanguage()
  const s = t.speakers

  return (
    <section className="speakers section" id="speakers">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{s.sectionTitle}</h2>
          <div className="section-divider" />
          <p className="section-desc">{s.sectionDesc}</p>
        </div>

        <div className="speakers-grid">
          {s.list.map((sp) => (
            <div key={sp.name} className="speaker-card">
              <div className="speaker-photo"><i className="fas fa-user" /></div>
              <h4>{sp.name}</h4>
              <p>{sp.role}<br /><span>{sp.org}</span></p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
