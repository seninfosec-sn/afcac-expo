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

        {/* Live Stream Card */}
        <div style={{
          maxWidth: '760px',
          margin: '0 auto 48px',
          borderRadius: 'var(--radius)',
          overflow: 'hidden',
          border: '2px solid #e53935',
          boxShadow: '0 4px 24px rgba(229,57,53,0.25)',
        }}>
          <div style={{
            background: '#e53935',
            padding: '10px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'white',
              color: '#e53935',
              fontWeight: 800,
              fontSize: '0.75rem',
              letterSpacing: '0.12em',
              borderRadius: '4px',
              padding: '2px 8px',
            }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#e53935', display: 'inline-block', animation: 'pulse 1.5s infinite' }} />
              LIVE
            </span>
            <span style={{ color: 'white', fontWeight: 700, fontSize: '1rem', letterSpacing: '0.04em' }}>
              {r.liveStreamTitle}
            </span>
            <a
              href="https://www.youtube.com/watch?v=IkbJAhx7QW8"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                marginLeft: 'auto',
                background: 'white',
                color: '#e53935',
                fontWeight: 700,
                fontSize: '0.78rem',
                borderRadius: '4px',
                padding: '4px 12px',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <i className="fab fa-youtube" /> {r.watchYoutube}
            </a>
          </div>
          <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
            <iframe
              src="https://www.youtube.com/embed/IkbJAhx7QW8"
              title="AFCAC Expo 2026 Live Stream"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
            />
          </div>
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
          {r.promoVideos}
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
