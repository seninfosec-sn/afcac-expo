'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { type Lang, translations } from '@/lib/i18n'

interface LanguageContextValue {
  lang: Lang
  setLang: (l: Lang) => void
  t: typeof translations.en
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'en',
  setLang: () => {},
  t: translations.en,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en')

  useEffect(() => {
    const saved = localStorage.getItem('afcac-lang') as Lang
    if (saved && ['en', 'fr', 'pt'].includes(saved)) setLangState(saved)
  }, [])

  const setLang = (l: Lang) => {
    setLangState(l)
    localStorage.setItem('afcac-lang', l)
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] as typeof translations.en }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
