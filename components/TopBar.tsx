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
        <span>
          <i className="fas fa-envelope" /> {t.topbar.email}
        </span>
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
            <a href="https://www.afcac.org" target="_blank" rel="noopener noreferrer" aria-label="AFCAC website">
              <i className="fas fa-globe" />
            </a>
            <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f" /></a>
            <a href="#" aria-label="Twitter/X"><i className="fab fa-x-twitter" /></a>
            <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in" /></a>
            <a href="#" aria-label="YouTube"><i className="fab fa-youtube" /></a>
          </div>
        </div>
      </div>
    </div>
  )
}
