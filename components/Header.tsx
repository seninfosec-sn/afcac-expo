'use client'

import { useState, useEffect, useRef } from 'react'
import LogoIcon from './LogoIcon'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Header() {
  const { t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60)
      const sections = document.querySelectorAll<HTMLElement>('section[id]')
      const scrollY = window.scrollY + 100
      sections.forEach((section) => {
        const top = section.offsetTop
        const height = section.offsetHeight
        const id = section.getAttribute('id') ?? ''
        if (scrollY >= top && scrollY < top + height) setActiveSection(id)
      })
    }
    const handleOutsideClick = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) setMenuOpen(false)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    document.addEventListener('click', handleOutsideClick)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [])

  const closeMenu = () => setMenuOpen(false)
  const lc = (id: string) => `nav-link${activeSection === id ? ' active' : ''}`

  return (
    <header id="header" ref={headerRef} className={scrolled ? 'scrolled' : ''}>
      <div className="container header-inner">
        <a className="logo" href="https://www.afcac.org/" target="_blank" rel="noopener noreferrer">
          <div className="logo-icon"><LogoIcon width={64} height={64} /></div>
          <div className="logo-text">
            <span className="logo-title">AFCAC</span>
            <span className="logo-sub">EXPO 2026</span>
          </div>
        </a>

        <button
          className={`hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={t.header.toggleMenu}
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>

        <nav className={`nav${menuOpen ? ' open' : ''}`} id="nav">
          <ul>
            <li>
              <a href="#home" className={lc('home')} onClick={closeMenu}>{t.header.home}</a>
            </li>
            <li className="dropdown">
              <a href="#about" className={lc('about')} onClick={closeMenu}>
                {t.header.about} <i className="fas fa-chevron-down fa-xs" />
              </a>
              <ul className="dropdown-menu">
                <li><a href="#about-afcac" onClick={closeMenu}>{t.header.aboutAfcac}</a></li>
                <li><a href="#about-expo" onClick={closeMenu}>{t.header.aboutExpo}</a></li>
                <li><a href="#host-state" onClick={closeMenu}>{t.header.hostState}</a></li>
                <li><a href="#contact" onClick={closeMenu}>{t.header.contact}</a></li>
              </ul>
            </li>
            <li>
              <a href="#programme" className={lc('programme')} onClick={closeMenu}>{t.header.programme}</a>
            </li>
            <li>
              <a href="#speakers" className={lc('speakers')} onClick={closeMenu}>{t.header.speakers}</a>
            </li>
            <li>
              <a href="#sponsors" className={lc('sponsors')} onClick={closeMenu}>{t.header.sponsors}</a>
            </li>
            <li>
              <a href="#travel" className={lc('travel')} onClick={closeMenu}>{t.header.travel}</a>
            </li>
            <li>
              <a href="#accommodation" className={lc('accommodation')} onClick={closeMenu}>{t.header.accommodation}</a>
            </li>
            <li>
              <a href="#register" className="nav-link btn-register" onClick={closeMenu}>{t.header.register}</a>
            </li>
            <li>
              <a href="https://afcac-meet-main.vercel.app" target="_blank" rel="noopener noreferrer" className="nav-link btn-register" style={{ background: 'var(--gold)', borderColor: 'var(--gold)', color: 'var(--green-dark)' }} onClick={closeMenu}>
                <i className="fas fa-calendar-check" style={{ marginRight: '5px' }} />Bilateral Meetings
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
