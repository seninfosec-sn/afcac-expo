'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import type { Lang } from '@/lib/i18n'

const LANGS: { code: Lang; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'fr', label: 'FR' },
  { code: 'pt', label: 'PT' },
]

export default function TopBar() {
  const { lang, setLang, t } = useLanguage()

  return (
    <div className="topbar">
      <div className="container topbar-inner">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <span><i className="fas fa-envelope" /> {t.topbar.email}</span>
          <span style={{ color: 'rgba(255,255,255,0.4)' }}>|</span>
          <span><i className="fas fa-shield-alt" /> Assistance Sécurité : +228 90 80 56 41</span>
          <span style={{ color: 'rgba(255,255,255,0.4)' }}>|</span>
          <span><i className="fas fa-id-badge" /> Service Protocole : +228 90 80 53 31</span>
          <span style={{ color: 'rgba(255,255,255,0.4)' }}>|</span>
          <span><i className="fas fa-heartbeat" /> Équipe médicale : +228 71 56 09 31</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div className="lang-switcher">
            {LANGS.map((l) => (
              <button
                key={l.code}
                className={`lang-btn${lang === l.code ? ' active' : ''}`}
                onClick={() => setLang(l.code)}
                aria-label={`Switch to ${l.label}`}
              >
                {l.label}
              </button>
            ))}
          </div>
          <div className="topbar-socials">
            <a href="https://www.afcac.org/" target="_blank" rel="noopener noreferrer" aria-label="AFCAC website">
              <i className="fas fa-globe" />
            </a>
            <a href="https://www.facebook.com/afcac.org/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i className="fab fa-facebook-f" /></a>
            <a href="https://x.com/afcac_cafac?s=21&t=gsgmO8Cc86tO1O5L55CqRA" target="_blank" rel="noopener noreferrer" aria-label="Twitter/X"><i className="fab fa-x-twitter" /></a>
            <a href="https://www.linkedin.com/company/afcac/posts/?feedView=all" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i className="fab fa-linkedin-in" /></a>
            <a href="https://www.youtube.com/watch?v=DaTS_W3QaRc" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><i className="fab fa-youtube" /></a>
          </div>
        </div>
      </div>
    </div>
  )
}
