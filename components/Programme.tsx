'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Programme() {
  const { t } = useLanguage()
  const p = t.programme
  const [activeDay, setActiveDay] = useState(0)

  return (
    <section className="programme section" id="programme">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">{p.sectionTag}</span>
          <h2 className="section-title">{p.sectionTitle}</h2>
          <div className="section-divider" />
          <p className="section-desc">{p.sectionDesc}</p>
        </div>

        <div className="programme-tabs">
          {p.days.map((day, i) => (
            <button
              key={day.label}
              className={`tab-btn${activeDay === i ? ' active' : ''}`}
              onClick={() => setActiveDay(i)}
            >
              {day.label}
            </button>
          ))}
        </div>

        {p.days.map((day, i) => (
          <div key={day.label} className={`programme-content${activeDay !== i ? ' hidden' : ''}`}>
            <div className="prog-theme">{day.theme}</div>
            <div className="prog-table-wrap">
              <table className="prog-table">
                <thead>
                  <tr>
                    <th>{p.colTime}</th>
                    <th>{p.colRoom}</th>
                    <th>{p.colTitle}</th>
                    <th>{p.colFormat}</th>
                    <th>{p.colResults}</th>
                  </tr>
                </thead>
                <tbody>
                  {day.rows.map((row, j) => (
                    <tr key={j}>
                      <td className="prog-td-time">{row.time}</td>
                      <td className="prog-td-room">{row.room}</td>
                      <td className="prog-td-title">{row.title}</td>
                      <td className="prog-td-format">{row.format}</td>
                      <td className="prog-td-results">{row.results}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
