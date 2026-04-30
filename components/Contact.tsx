'use client'

import { useState, FormEvent } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Contact() {
  const { t } = useLanguage()
  const c = t.contact
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      ;(e.target as HTMLFormElement).reset()
    }, 3000)
  }

  return (
    <section className="contact section" id="contact">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">{c.sectionTag}</span>
          <h2 className="section-title">{c.sectionTitle}</h2>
          <div className="section-divider" />
        </div>

        <div className="contact-grid">
          <div className="contact-info">
            <div className="contact-item">
              <div className="contact-icon"><i className="fas fa-envelope" /></div>
              <div>
                <h4>{c.secretariat}</h4>
                <a href="mailto:secretariat@afcac.org">secretariat@afcac.org</a><br />
                <a href="mailto:Smusa@afcac.org">Smusa@afcac.org</a>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon"><i className="fas fa-handshake" /></div>
              <div>
                <h4>{c.sponsoring}</h4>
                <a href="mailto:jdridi@afcac.org">jdridi@afcac.org</a>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon"><i className="fas fa-camera" /></div>
              <div>
                <h4>{c.media}</h4>
                <a href="mailto:rsombacke@afcac.org">rsombacke@afcac.org</a>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon"><i className="fas fa-map-marker-alt" /></div>
              <div>
                <h4>{c.address}</h4>
                <span>{c.addressValue}</span>
              </div>
            </div>
            <div className="contact-socials">
              <a href="https://www.afcac.org" target="_blank" rel="noopener noreferrer">
                <i className="fas fa-globe" />
              </a>
              <a href="#"><i className="fab fa-facebook-f" /></a>
              <a href="#"><i className="fab fa-x-twitter" /></a>
              <a href="#"><i className="fab fa-linkedin-in" /></a>
              <a href="#"><i className="fab fa-youtube" /></a>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <input type="text" placeholder={c.firstName} required />
              <input type="text" placeholder={c.lastName} required />
            </div>
            <input type="email" placeholder={c.email} required />
            <input type="text" placeholder={c.org} />
            <select defaultValue="">
              <option value="" disabled>{c.subject}</option>
              {c.subjectOptions.map((o) => <option key={o}>{o}</option>)}
            </select>
            <textarea rows={4} placeholder={c.message} />
            <button
              type="submit"
              className="btn btn-primary full-width"
              disabled={submitted}
              style={submitted ? { background: 'rgba(20,88,71,1)', color: 'rgb(254,255,255)' } : {}}
            >
              {submitted ? c.sent : c.send}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
