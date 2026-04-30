'use client'

import { useState, FormEvent, useRef } from 'react'
import LogoIcon from './LogoIcon'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()
  const f = t.footer
  const [sent, setSent] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleNewsletter = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!inputRef.current?.value) return
    setSent(true)
    setTimeout(() => {
      setSent(false)
      if (inputRef.current) inputRef.current.value = ''
    }, 3000)
  }

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container footer-grid">
          <div className="footer-brand">
            <div className="logo footer-logo">
              <div className="logo-icon"><LogoIcon width={54} height={54} /></div>
              <div className="logo-text">
                <span className="logo-title">AFCAC</span>
                <span className="logo-sub">EXPO 2026</span>
              </div>
            </div>
            <p>{f.tagline}</p>
            <p className="footer-event-details">
              <i className="fas fa-calendar-alt" /> {f.eventDate}<br />
              <i className="fas fa-map-marker-alt" /> {f.eventLocation}
            </p>
          </div>

          <div className="footer-links">
            <h4>{f.quickLinks}</h4>
            <ul>
              {f.links1.map((l) => (
                <li key={l.label}><a href={l.href}>{l.label}</a></li>
              ))}
            </ul>
          </div>

          <div className="footer-links">
            <h4>{f.information}</h4>
            <ul>
              {f.links2.map((l) => (
                <li key={l.label}>
                  <a href={l.href} target={l.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-newsletter">
            <h4>{f.stayUpdated}</h4>
            <p>{f.newsletterDesc}</p>
            <form className="newsletter-form" onSubmit={handleNewsletter}>
              <input ref={inputRef} type="email" placeholder={f.emailPlaceholder} />
              <button type="submit">
                {sent ? <i className="fas fa-check" /> : <i className="fas fa-paper-plane" />}
              </button>
            </form>
            <div className="footer-socials">
              <a href="https://www.afcac.org" target="_blank" rel="noopener noreferrer">
                <i className="fas fa-globe" />
              </a>
              <a href="#"><i className="fab fa-facebook-f" /></a>
              <a href="#"><i className="fab fa-x-twitter" /></a>
              <a href="#"><i className="fab fa-linkedin-in" /></a>
              <a href="#"><i className="fab fa-youtube" /></a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>{f.copyright}</p>
          <div className="footer-bottom-links">
            <a href="#">{f.privacy}</a>
            <a href="#">{f.terms}</a>
            <a href="#">{f.accessibility}</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
