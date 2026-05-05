'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export default function Contact() {
  const { t } = useLanguage()
  const c = t.contact

  return (
    <section className="contact section" id="contact">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">{c.sectionTag}</span>
          <h2 className="section-title">{c.sectionTitle}</h2>
          <div className="section-divider" />
        </div>

        <div className="contact-info contact-info--centered">
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
    </section>
  )
}
