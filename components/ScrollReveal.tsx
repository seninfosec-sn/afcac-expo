'use client'

import { useEffect } from 'react'

const SELECTORS = [
  '.about-card',
  '.remark-card',
  '.speaker-card',
  '.hotel-card',
  '.travel-card',
  '.prog-item',
  '.stat-item',
  '.contact-item',
  '.section-header',
  '.venue-info',
  '.venue-map',
  '.sponsor-logo-box',
].join(', ')

export default function ScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll(SELECTORS)
    elements.forEach((el) => el.classList.add('reveal'))

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return null
}
