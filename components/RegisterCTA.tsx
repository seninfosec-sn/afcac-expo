'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export default function RegisterCTA() {
  const { t } = useLanguage()
  const r = t.register

  return (
    <section className="register-cta" id="register">
      <div className="cta-overlay" />
      <div className="container cta-content">
        <h2>{r.title}</h2>
        <p>{r.desc}</p>
        <div className="cta-actions">
          <a href="https://www.afcac.org/expo-registration/" target="_blank" rel="noopener noreferrer" className="btn btn-gold">{r.btn}</a>
          <a href="https://www.afcac.org/exhibition-opp-and-sponsorship/" target="_blank" rel="noopener noreferrer" className="btn btn-outline-white">{r.exhibitorBtn}</a>
        </div>
      </div>
    </section>
  )
}
