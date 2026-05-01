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

        <div className="prog-bulletin-bar" style={{ justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
          <a href="#" className="btn btn-primary prog-bulletin-btn">
            <i className="fas fa-file-alt" /> Download the Information Bulletin
          </a>
          <div className="prog-bulletin-langs">
            <a href="https://www.afcac.org/wp-content/uploads/2026/04/EN_up-APRIL-29-ENG-EXPO-Information-Bulletin-Lome-TOGO-28_04_2026-003.pdf" target="_blank" rel="noopener noreferrer" className="prog-lang-btn">EN</a>
            <a href="https://www.afcac.org/wp-content/uploads/2026/04/FR_Draft-Program-and-Annotated-Agenda-April-27-04-26-SG.pdf" target="_blank" rel="noopener noreferrer" className="prog-lang-btn">FR</a>
            <a href="https://www.afcac.org/wp-content/uploads/2026/04/Port_Draft-Program-and-Annotated-Agenda-April-27-04-26-SG.pdf" target="_blank" rel="noopener noreferrer" className="prog-lang-btn">PR</a>
          </div>
        </div>

        <div className="travel-grid">
          {tr.cards.map((c) => (
            <div key={c.title} className="travel-card">
              <div className="travel-icon"><i className={c.icon} /></div>
              <h4 style={'accentTitle' in c && c.accentTitle ? { color: '#e53e3e' } : undefined}>{c.title}</h4>
              <p>{c.desc}</p>
              {'link' in c && c.link && (
                <a href={c.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary travel-evisa-btn">
                  {c.linkLabel}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
