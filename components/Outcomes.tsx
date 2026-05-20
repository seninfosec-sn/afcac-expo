'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export default function Outcomes() {
  const { t } = useLanguage()
  const a = t.about

  return (
    <section className="about section" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="outcomes-section">
          <div className="outcomes-header">
            <span className="section-tag outcomes-tag">{a.outcomesTag}</span>
            <h2 className="outcomes-title">{a.outcomesTitle}</h2>
            <div className="outcomes-kente" />
          </div>
          <div className="outcomes-list">
            {a.outcomes.map((item) => (
              <div key={item.letter} className="outcome-item">
                <div className={`outcome-letter outcome-letter--${item.color}`}>{item.letter}</div>
                <div className="outcome-content">
                  <strong>{item.title}</strong>
                  <span>{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
