'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="footer-minimal">
      <div className="container">
        <p>{t.footer.copyright}</p>
      </div>
    </footer>
  )
}
