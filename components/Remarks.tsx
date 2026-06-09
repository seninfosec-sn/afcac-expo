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

        <h3 style={{
          textAlign: 'center',
          fontFamily: 'var(--font-head)',
          color: 'var(--gold)',
          fontSize: '1.2rem',
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: '28px',
        }}>
          Promotional Videos
        </h3>

        <div className="remarks-grid">
          {[
            { name: r.speaker1Name, org: r.speaker1Org, quote: r.speaker1Quote, videoId: 'DaTS_W3QaRc' },
            { name: r.speaker2Name, org: r.speaker2Org, quote: r.speaker2Quote, videoId: 'nhJpoh_zD_A' },
          ].map((sp) => (
            <div key={sp.name} className="remark-card">
              <div className="remark-video">
                {sp.videoId ? (
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${sp.videoId}`}
                    title={sp.name}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ display: 'block', borderRadius: 'var(--radius)', border: 'none' }}
                  />
                ) : (
                  <div className="video-placeholder">
                    <div className="play-btn"><i className="fas fa-play" /></div>
                    <div className="video-overlay-text"><span>{r.watchMessage}</span></div>
                  </div>
                )}
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
