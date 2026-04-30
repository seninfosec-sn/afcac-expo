'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export default function Remarks() {
  const { t } = useLanguage()
  const r = t.remarks

  return (
    <section className="remarks section" id="remarks">
      <div className="remarks-bg-overlay" />
      <div className="container">
        <div className="section-header light">
          <span className="section-tag">{r.sectionTag}</span>
          <h2 className="section-title">{r.sectionTitle}</h2>
          <div className="section-divider" />
        </div>

        <div className="remarks-grid">
          {[
            { name: r.speaker1Name, org: r.speaker1Org, quote: r.speaker1Quote },
            { name: r.speaker2Name, org: r.speaker2Org, quote: r.speaker2Quote },
          ].map((sp) => (
            <div key={sp.name} className="remark-card">
              <div className="remark-video">
                <div className="video-placeholder">
                  <div className="play-btn"><i className="fas fa-play" /></div>
                  <div className="video-overlay-text"><span>{r.watchMessage}</span></div>
                </div>
              </div>
              <div className="remark-info">
                <div className="remark-avatar"><i className="fas fa-user-tie" /></div>
                <div>
                  <h4>{sp.name}</h4>
                  <p>{sp.org}</p>
                </div>
              </div>
              <blockquote>&ldquo;{sp.quote}&rdquo;</blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
