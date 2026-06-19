'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import type { Lang } from '@/lib/i18n'

// ── Translations ─────────────────────────────────────────────────────────────

const T = {
  en: {
    back: 'Back to site',
    badge: 'LOMÉ · TOGO',
    title: 'Tourist Circuits',
    subtitle: 'Discover Togo through our exclusive circuits organized alongside AFCAC Expo 2026.',
    choosePrompt: 'Select a circuit below to register.',
    cap1: 'Circuit 1 — Bus', cap2: 'Circuit 2 — Lomé',
    formTitle: 'Registration Form',
    formRequired: 'Fields marked * are required.',
    secPersonal: 'Personal Information',
    secCircuit: 'Circuit Details',
    lPrenom: 'First Name', lNom: 'Last Name', lPoste: 'Job Title',
    lEmail: 'Email Address', lTel: 'WhatsApp Phone Number', lOrg: 'Organisation / Company',
    lPays: 'Country', lCircuit: 'Preferred Circuit', lComment: 'Special Needs / Comments',
    phPrenom: 'John', phNom: 'SMITH', phPoste: 'e.g. Director General, Engineer...',
    phEmail: 'example@organisation.org', phTel: '+228 XX XX XX XX',
    phOrg: 'Name of your organisation', phComment: 'Additional information, special requirements...',
    selDefault: '-- Select --',
    dateLabel: 'Circuit Date', dateValue: 'Friday 19 June 2026', dateTime: '2:00 PM – 5:00 PM',
    submit: 'Submit my registration', submitting: 'Saving...',
    privacy: 'Your data is confidential and will only be used for this event.',
    successTitle: 'Registration confirmed!',
    successMsg: (p: string, n: string, c: string, e: string) =>
      `Thank you ${p} ${n}, your registration for ${c} has been received. A confirmation email will be sent to ${e}.`,
    newReg: 'New registration', backSite: 'Back to site',
    complet: 'FULL', completMsg: 'This circuit is full. Please choose the other circuit.',
    errGeneral: 'An error occurred. Please try again.',
    errConnection: 'Connection error. Please try again.',
    errFull: 'This circuit just reached its maximum capacity (100 people). Please choose the other circuit.',
    errClosed: 'Registrations are closed.',
    closedTitle: 'Registrations are closed',
    closedMsg: 'Registration for the Tourist Circuits is now closed. Thank you for your interest.',
    closedBack: 'Back to site',
    req: 'Required', invalidEmail: 'Invalid email',
    circ1: 'CIRCUIT 1: 100 People max. (Bus circuit)',
    circ2: 'CIRCUIT 2: 100 People max. (City of Lomé)',
    selectBtn: 'Choose this circuit',
    changeCircuit: 'Change circuit',
    selectedLabel: 'Selected circuit',
    c1stops: [
      'AFLAO BORDER WITH GHANA (The only land border in the world adjacent to a capital city)',
      'SANVEE CONDJI BORDER WITH BENIN (It has a juxtaposed control post, a major cross-border infrastructure designed to centralize customs and police controls)',
      'ANEHO TOWN (contemplate the confluence between Lake Togo and the Atlantic Ocean and appreciate the murals of the town hall detailing the rites of the taking of the sacred stone)',
      'SLAVE HOUSE OF AGBODRAFO (Historical vestige of the slave trade, it served as a warehouse for slave traders before slaves departed for America)',
    ],
    c2stops: [
      'PALAIS DE LOMÉ (One of the iconic monuments of the Togolese capital, a major center of art and culture)',
      "CENTRE D'ART D'AFRIQUE (A private center housing a vast collection of thousands of ancient African art objects, from the 10th to the 19th century)",
      "ARTIST KOUMY'S HOUSE (located in a large district of Lomé, the artist's house serves as an artistic villa where he exhibits his works, with a gallery featuring colorful frescoes and mosaics)",
      'ARTISAN VILLAGE (a stop for purchasing Togolese souvenirs)',
    ],
  },
  fr: {
    back: 'Retour au site',
    badge: 'LOMÉ · TOGO',
    title: 'Circuits Touristiques',
    subtitle: 'Découvrez le Togo à travers nos circuits exclusifs organisés en marge de l\'AFCAC Expo 2026.',
    choosePrompt: 'Sélectionnez un circuit ci-dessous pour vous inscrire.',
    cap1: 'Circuit 1 — Bus', cap2: 'Circuit 2 — Lomé',
    formTitle: 'Formulaire d\'inscription',
    formRequired: 'Les champs marqués * sont obligatoires.',
    secPersonal: 'Informations personnelles',
    secCircuit: 'Détails du circuit',
    lPrenom: 'Prénom', lNom: 'Nom', lPoste: 'Poste Occupé',
    lEmail: 'Adresse email', lTel: 'Numéro de téléphone WhatsApp', lOrg: 'Organisation / Entreprise',
    lPays: 'Pays', lCircuit: 'Circuit souhaité', lComment: 'Besoins spéciaux / Commentaires',
    phPrenom: 'Jean', phNom: 'DUPONT', phPoste: 'Ex : Directeur Général, Ingénieur...',
    phEmail: 'exemple@organisation.org', phTel: '+228 XX XX XX XX',
    phOrg: 'Nom de votre structure', phComment: 'Informations complémentaires, besoins particuliers...',
    selDefault: '-- Sélectionnez --',
    dateLabel: 'Date du circuit', dateValue: 'Vendredi 19 juin 2026', dateTime: '14h00 – 17h00',
    submit: 'Soumettre mon inscription', submitting: 'Enregistrement...',
    privacy: 'Vos données sont confidentielles et ne seront utilisées que dans le cadre de cet événement.',
    successTitle: 'Inscription enregistrée !',
    successMsg: (p: string, n: string, c: string, e: string) =>
      `Merci ${p} ${n}, votre inscription au ${c} a bien été reçue. Un email de confirmation sera envoyé à ${e}.`,
    newReg: 'Nouvelle inscription', backSite: 'Retour au site',
    complet: 'COMPLET', completMsg: 'Ce circuit est complet. Veuillez choisir l\'autre circuit.',
    errGeneral: 'Une erreur est survenue. Veuillez réessayer.',
    errConnection: 'Erreur de connexion. Veuillez réessayer.',
    errFull: 'Ce circuit vient d\'atteindre sa capacité maximale (100 personnes). Veuillez choisir l\'autre circuit.',
    errClosed: 'Les inscriptions sont fermées.',
    closedTitle: 'Inscriptions fermées',
    closedMsg: 'Les inscriptions pour les Circuits Touristiques sont désormais clôturées. Merci de votre intérêt.',
    closedBack: 'Retour au site',
    req: 'Requis', invalidEmail: 'Email invalide',
    circ1: 'CIRCUIT 1 : 100 Personnes maxi. (Circuit en bus)',
    circ2: 'CIRCUIT 2 : 100 Personnes maxi. (Ville de Lomé)',
    selectBtn: 'Choisir ce circuit',
    changeCircuit: 'Changer de circuit',
    selectedLabel: 'Circuit sélectionné',
    c1stops: [
      'FRONTIERE AFLAO AVEC LE GHANA (La seule frontière terrestre au monde qui jouxte une capitale)',
      'FRONTIERE SANVEE CONDJI AVEC LE BENIN (Il y existe un poste de contrôle juxtaposé, une infrastructure transfrontalière majeure conçue pour centraliser les contrôles douaniers et policiers)',
      "ANEHO VILLE (contempler l'embouchure entre le Lac Togo et l'océan atlantique et apprécier les fresques murales de la mairie détaillant les rites de la prise de la pierre sacrée)",
      "Maison des esclaves d'Agbodrafo (Vestige historique de la traite négrière, il servait d'entrepôt aux négriers avant le départ des esclaves vers l'Amérique)",
    ],
    c2stops: [
      "PALAIS DE LOME (L'un des monuments emblématiques de la capitale togolaise, il est un grand centre d'art et de culture)",
      "CENTRE D'ART D'AFRIQUE (C'est un centre privé qui abrite une vaste collection de milliers d'objets d'art africain ancien (du Xème au XIXème siècle))",
      "MAISON DE L'ARTISTE KOUMY (située dans un grand quartier de Lomé, la maison de l'artiste fait office de villa artistique où il expose aussi ses œuvres. Il y installe une galerie avec ses fresques et mosaïques colorées)",
      'VILLAGE ARTISANAL (un arrêt pour achat de souvenirs du Togo par les visiteurs)',
    ],
  },
  pt: {
    back: 'Voltar ao site',
    badge: 'LOMÉ · TOGO',
    title: 'Circuitos Turísticos',
    subtitle: 'Descubra o Togo através dos nossos circuitos exclusivos organizados à margem da AFCAC Expo 2026.',
    choosePrompt: 'Selecione um circuito abaixo para se inscrever.',
    cap1: 'Circuito 1 — Autocarro', cap2: 'Circuito 2 — Lomé',
    formTitle: 'Formulário de inscrição',
    formRequired: 'Os campos marcados com * são obrigatórios.',
    secPersonal: 'Informações pessoais',
    secCircuit: 'Detalhes do circuito',
    lPrenom: 'Primeiro Nome', lNom: 'Apelido', lPoste: 'Cargo',
    lEmail: 'Endereço de email', lTel: 'Número de telefone WhatsApp', lOrg: 'Organização / Empresa',
    lPays: 'País', lCircuit: 'Circuito pretendido', lComment: 'Necessidades especiais / Comentários',
    phPrenom: 'João', phNom: 'SILVA', phPoste: 'Ex.: Diretor Geral, Engenheiro...',
    phEmail: 'exemplo@organizacao.org', phTel: '+228 XX XX XX XX',
    phOrg: 'Nome da sua organização', phComment: 'Informações adicionais, requisitos especiais...',
    selDefault: '-- Selecione --',
    dateLabel: 'Data do circuito', dateValue: 'Sexta-feira, 19 de junho de 2026', dateTime: '14h00 – 17h00',
    submit: 'Submeter a minha inscrição', submitting: 'A guardar...',
    privacy: 'Os seus dados são confidenciais e serão utilizados apenas no âmbito deste evento.',
    successTitle: 'Inscrição registada!',
    successMsg: (p: string, n: string, c: string, e: string) =>
      `Obrigado ${p} ${n}, a sua inscrição no ${c} foi recebida. Um email de confirmação será enviado para ${e}.`,
    newReg: 'Nova inscrição', backSite: 'Voltar ao site',
    complet: 'ESGOTADO', completMsg: 'Este circuito está esgotado. Por favor escolha o outro circuito.',
    errGeneral: 'Ocorreu um erro. Por favor tente novamente.',
    errConnection: 'Erro de ligação. Por favor tente novamente.',
    errFull: 'Este circuito atingiu a capacidade máxima (100 pessoas). Por favor escolha o outro circuito.',
    errClosed: 'As inscrições estão encerradas.',
    closedTitle: 'Inscrições encerradas',
    closedMsg: 'As inscrições para os Circuitos Turísticos estão agora encerradas. Obrigado pelo seu interesse.',
    closedBack: 'Voltar ao site',
    req: 'Obrigatório', invalidEmail: 'Email inválido',
    circ1: 'CIRCUITO 1: Máx. 100 Pessoas (Circuito de autocarro)',
    circ2: 'CIRCUITO 2: Máx. 100 Pessoas (Cidade de Lomé)',
    selectBtn: 'Selecionar este circuito',
    changeCircuit: 'Mudar de circuito',
    selectedLabel: 'Circuito selecionado',
    c1stops: [
      'FRONTEIRA AFLAO COM O GANA (A única fronteira terrestre no mundo adjacente a uma capital)',
      'FRONTEIRA SANVEE CONDJI COM O BENIM (Dispõe de um posto de controlo juxtaposto, uma importante infraestrutura transfronteiriça concebida para centralizar os controlos aduaneiros e policiais)',
      'CIDADE DE ANEHO (contemplar a confluência entre o Lago Togo e o oceano Atlântico e apreciar os murais da câmara municipal com os ritos da tomada da pedra sagrada)',
      'CASA DOS ESCRAVOS DE AGBODRAFO (Vestígio histórico do comércio de escravos, servia de armazém antes da partida dos escravos para a América)',
    ],
    c2stops: [
      'PALAIS DE LOMÉ (Um dos monumentos emblemáticos da capital togolesa, é um grande centro de arte e cultura)',
      "CENTRE D'ART D'AFRIQUE (Centro privado com uma vasta coleção de milhares de objetos de arte africana antiga, do século X ao XIX)",
      'CASA DO ARTISTA KOUMY (situada num grande bairro de Lomé, a casa do artista serve como villa artística onde expõe as suas obras, com uma galeria de frescos e mosaicos coloridos)',
      'ALDEIA ARTESANAL (paragem para compra de lembranças do Togo)',
    ],
  },
}

// ── Countries ────────────────────────────────────────────────────────────────

const PAYS = [
  'Afghanistan', 'Afrique du Sud', 'Albanie', 'Algérie', 'Allemagne',
  'Andorre', 'Angola', 'Antigua-et-Barbuda', 'Arabie Saoudite', 'Argentine',
  'Arménie', 'Australie', 'Autriche', 'Azerbaïdjan',
  'Bahamas', 'Bahreïn', 'Bangladesh', 'Barbade', 'Belgique', 'Belize',
  'Bénin', 'Bhoutan', 'Biélorussie', 'Birmanie (Myanmar)', 'Bolivie',
  'Bosnie-Herzégovine', 'Botswana', 'Brésil', 'Brunei', 'Bulgarie',
  'Burkina Faso', 'Burundi',
  'Cabo Verde', 'Cambodge', 'Cameroun', 'Canada', 'Centrafrique',
  'Chili', 'Chine', 'Chypre', 'Colombie', 'Comores', 'Congo',
  'Congo (RDC)', 'Corée du Nord', 'Corée du Sud', 'Costa Rica',
  'Côte d\'Ivoire', 'Croatie', 'Cuba',
  'Danemark', 'Djibouti', 'Dominique',
  'Égypte', 'El Salvador', 'Émirats Arabes Unis', 'Équateur',
  'Érythrée', 'Espagne', 'Estonie', 'Eswatini', 'États-Unis', 'Éthiopie',
  'Fidji', 'Finlande', 'France',
  'Gabon', 'Gambie', 'Géorgie', 'Ghana', 'Grèce', 'Grenade',
  'Guatemala', 'Guinée', 'Guinée-Bissau', 'Guinée équatoriale', 'Guyana',
  'Haïti', 'Honduras', 'Hongrie',
  'Îles Marshall', 'Îles Salomon', 'Inde', 'Indonésie', 'Irak',
  'Iran', 'Irlande', 'Islande', 'Israël', 'Italie',
  'Jamaïque', 'Japon', 'Jordanie',
  'Kazakhstan', 'Kenya', 'Kirghizstan', 'Kiribati', 'Kosovo', 'Koweït',
  'Laos', 'Lesotho', 'Lettonie', 'Liban', 'Liberia', 'Libye',
  'Liechtenstein', 'Lituanie', 'Luxembourg',
  'Madagascar', 'Malaisie', 'Malawi', 'Maldives', 'Mali', 'Malte',
  'Maroc', 'Maurice', 'Mauritanie', 'Mexique', 'Micronésie', 'Moldavie',
  'Monaco', 'Mongolie', 'Monténégro', 'Mozambique',
  'Namibie', 'Nauru', 'Népal', 'Nicaragua', 'Niger', 'Nigeria',
  'Norvège', 'Nouvelle-Zélande',
  'Oman', 'Ouganda',
  'Pakistan', 'Palaos', 'Palestine', 'Panama', 'Papouasie-Nouvelle-Guinée',
  'Paraguay', 'Pays-Bas', 'Pérou', 'Philippines', 'Pologne', 'Portugal',
  'Qatar',
  'République dominicaine', 'République tchèque', 'Roumanie',
  'Royaume-Uni', 'Russie', 'Rwanda',
  'Saint-Christophe-et-Niévès', 'Saint-Marin', 'Saint-Vincent-et-les-Grenadines',
  'Sainte-Lucie', 'Salvador', 'Samoa', 'São Tomé-et-Príncipe',
  'Sénégal', 'Serbie', 'Seychelles', 'Sierra Leone', 'Singapour',
  'Slovaquie', 'Slovénie', 'Somalie', 'Soudan', 'Soudan du Sud',
  'Sri Lanka', 'Suède', 'Suisse', 'Suriname', 'Syrie',
  'Tadjikistan', 'Tanzanie', 'Tchad', 'Thaïlande', 'Timor oriental',
  'Togo', 'Tonga', 'Trinité-et-Tobago', 'Tunisie', 'Turkménistan', 'Türkiye',
  'Tuvalu',
  'Ukraine', 'Uruguay', 'Ouzbékistan',
  'Vanuatu', 'Vatican', 'Venezuela', 'Vietnam',
  'Yémen',
  'Zambie', 'Zimbabwe',
]

// ── Types ─────────────────────────────────────────────────────────────────────

interface FormData {
  prenom: string; nom: string; titre: string
  email: string; telephone: string
  organisation: string; pays: string
  circuit: string; date: string; commentaires: string
}

const EMPTY: FormData = {
  prenom: '', nom: '', titre: '', email: '', telephone: '',
  organisation: '', pays: '', circuit: '', date: '2026-06-19', commentaires: '',
}

const MAX = 100
const LANGS: { code: Lang; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'fr', label: 'FR' },
  { code: 'pt', label: 'PT' },
]

// ── Component ─────────────────────────────────────────────────────────────────

export default function CircuitsPage() {
  const { lang, setLang } = useLanguage()
  const t = T[lang]

  const CIRCUIT_KEYS: Record<string, 'circuit1' | 'circuit2'> = {
    [t.circ1]: 'circuit1', [t.circ2]: 'circuit2',
  }

  const [selectedCircuitKey, setSelectedCircuitKey] = useState<'circuit1' | 'circuit2' | null>(null)
  const [form, setForm] = useState<FormData>(EMPTY)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [counts, setCounts] = useState<{ circuit1: number; circuit2: number; closed?: boolean }>({ circuit1: 0, circuit2: 0 })
  const formRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch('/api/register').then(r => r.json()).then(d => setCounts(d)).catch(() => {})
  }, [])

  // Keep form.circuit in sync with current language when a circuit is selected
  useEffect(() => {
    if (selectedCircuitKey) {
      const label = selectedCircuitKey === 'circuit1' ? t.circ1 : t.circ2
      setForm(f => ({ ...f, circuit: label }))
    }
  }, [lang, selectedCircuitKey, t.circ1, t.circ2])

  function pickCircuit(key: 'circuit1' | 'circuit2') {
    const label = key === 'circuit1' ? t.circ1 : t.circ2
    setSelectedCircuitKey(key)
    setForm(f => ({ ...f, circuit: label }))
    setErrors({})
    setSubmitError('')
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80)
  }

  function changeCircuit() {
    setSelectedCircuitKey(null)
    setForm(f => ({ ...f, circuit: '' }))
    setErrors({})
    setSubmitError('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function isComplet(key: 'circuit1' | 'circuit2') {
    return counts[key] >= MAX
  }

  function validate() {
    const e: Partial<FormData> = {}
    if (!form.prenom.trim()) e.prenom = t.req
    if (!form.nom.trim()) e.nom = t.req
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = t.invalidEmail
    if (!form.telephone.trim()) e.telephone = t.req
    if (!form.pays) e.pays = t.req
    return e
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const e2 = validate()
    if (Object.keys(e2).length > 0) { setErrors(e2); return }
    if (selectedCircuitKey && isComplet(selectedCircuitKey)) { setSubmitError(t.completMsg); return }
    setSubmitting(true); setSubmitError('')
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.status === 403) {
        setCounts(c => ({ ...c, closed: true }))
      } else if (res.status === 409) {
        setSubmitError(t.errFull)
        if (selectedCircuitKey) setCounts(c => ({ ...c, [selectedCircuitKey]: MAX }))
      } else if (!res.ok) {
        setSubmitError(t.errGeneral)
      } else {
        const data = await res.json()
        const key = CIRCUIT_KEYS[form.circuit]
        if (key) setCounts(c => ({ ...c, [key]: data.count }))
        setSubmitted(true)
      }
    } catch { setSubmitError(t.errConnection) }
    finally { setSubmitting(false) }
  }

  function field(id: keyof FormData, label: string, required = false, type = 'text', placeholder = '') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <label htmlFor={id} style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--green-dark)' }}>
          {label}{required && <span style={{ color: '#e53935', marginLeft: '3px' }}>*</span>}
        </label>
        <input
          id={id} type={type} value={form[id]} placeholder={placeholder}
          onChange={ev => { setForm(f => ({ ...f, [id]: ev.target.value })); setErrors(er => ({ ...er, [id]: undefined })) }}
          style={{ padding: '10px 14px', border: `1.5px solid ${errors[id] ? '#e53935' : '#cdd5d0'}`, borderRadius: '8px', fontSize: '0.95rem', outline: 'none', background: 'white', fontFamily: 'var(--font-body)', transition: 'border-color 0.2s' }}
          onFocus={ev => { ev.currentTarget.style.borderColor = 'var(--green)' }}
          onBlur={ev => { ev.currentTarget.style.borderColor = errors[id] ? '#e53935' : '#cdd5d0' }}
        />
        {errors[id] && <span style={{ fontSize: '0.78rem', color: '#e53935' }}>{errors[id]}</span>}
      </div>
    )
  }

  const circuits = [
    { key: 'circuit1' as const, title: t.circ1, stops: t.c1stops, icon: 'fa-bus', capLabel: t.cap1 },
    { key: 'circuit2' as const, title: t.circ2, stops: t.c2stops, icon: 'fa-city', capLabel: t.cap2 },
  ]

  return (
    <>
      <style>{`
        .circuits-page { min-height: 100vh; background: var(--off-white); font-family: var(--font-body); }
        .circuits-header { background: var(--green-dark); padding: 18px 0; }
        .circuits-header-inner { max-width: 960px; margin: 0 auto; padding: 0 24px; display: flex; align-items: center; gap: 16px; }
        .circuits-back { color: rgba(255,255,255,0.75); font-size: 0.85rem; text-decoration: none; display: flex; align-items: center; gap: 6px; transition: color 0.2s; }
        .circuits-back:hover { color: var(--gold); }
        .circuits-hero { background: linear-gradient(135deg, var(--green-dark) 0%, var(--green) 100%); padding: 52px 24px 40px; text-align: center; }
        .circuit-select-section { max-width: 960px; margin: 0 auto; padding: 40px 24px 0; }
        .circuit-cards-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        @media (max-width: 700px) { .circuit-cards-grid { grid-template-columns: 1fr; } }
        .circuit-select-card { background: white; border-radius: 16px; box-shadow: 0 4px 24px rgba(0,0,0,0.08); border: 2px solid transparent; overflow: hidden; transition: border-color 0.2s, box-shadow 0.2s; display: flex; flex-direction: column; }
        .circuit-select-card:hover { border-color: var(--gold); box-shadow: 0 8px 32px rgba(0,0,0,0.13); }
        .circuit-select-card.full { opacity: 0.7; }
        .circuits-card { max-width: 860px; margin: 0 auto; background: white; border-radius: 16px; box-shadow: 0 8px 40px rgba(0,0,0,0.10); padding: 48px 48px 56px; }
        @media (max-width: 640px) { .circuits-card { padding: 28px 18px 36px; } .form-row { grid-template-columns: 1fr !important; } }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        select { padding: 10px 14px; border: 1.5px solid #cdd5d0; border-radius: 8px; font-size: 0.95rem; font-family: var(--font-body); background: white; appearance: none; outline: none; width: 100%; cursor: pointer; }
        select:focus { border-color: var(--green); }
        textarea { padding: 10px 14px; border: 1.5px solid #cdd5d0; border-radius: 8px; font-size: 0.95rem; font-family: var(--font-body); background: white; outline: none; resize: vertical; width: 100%; transition: border-color 0.2s; }
        textarea:focus { border-color: var(--green); }
        .submit-btn { width: 100%; padding: 14px; background: var(--green-dark); color: white; border: none; border-radius: 10px; font-size: 1rem; font-weight: 700; font-family: var(--font-head); letter-spacing: 0.06em; cursor: pointer; margin-top: 8px; transition: background 0.2s, transform 0.15s; }
        .submit-btn:hover:not(:disabled) { background: var(--green); transform: translateY(-1px); }
        .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .success-icon { width: 72px; height: 72px; border-radius: 50%; background: rgba(1,119,100,0.12); display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; font-size: 2rem; color: var(--green); }
        .capacity-bar-bg { height: 6px; background: #e8ede9; border-radius: 4px; overflow: hidden; margin-top: 5px; }
        .capacity-bar-fill { height: 100%; border-radius: 4px; transition: width 0.5s; }
        .c-lang-btn { background: transparent; border: 1px solid rgba(255,255,255,0.3); color: rgba(255,255,255,0.7); border-radius: 4px; padding: 3px 10px; font-size: 0.78rem; font-weight: 700; cursor: pointer; transition: all 0.2s; font-family: var(--font-head); }
        .c-lang-btn.active { background: var(--gold); border-color: var(--gold); color: var(--green-dark); }
        .c-lang-btn:hover:not(.active) { border-color: white; color: white; }
        .select-circ-btn { width: 100%; padding: 12px; border: none; border-radius: 0; font-size: 0.95rem; font-weight: 700; font-family: var(--font-head); letter-spacing: 0.05em; cursor: pointer; transition: background 0.2s; display: flex; align-items: center; justify-content: center; gap: 8px; }
        .select-circ-btn:not(.full) { background: var(--gold); color: var(--green-dark); }
        .select-circ-btn:not(.full):hover { background: #c9a84c; }
        .select-circ-btn.full { background: #ccc; color: #888; cursor: not-allowed; }
      `}</style>

      {/* ── Registrations closed popup ─────────────────────────────────── */}
      {counts.closed && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '24px' }}>
          <div style={{ background: 'white', borderRadius: '20px', padding: '48px 40px', maxWidth: '460px', width: '100%', textAlign: 'center', boxShadow: '0 24px 60px rgba(0,0,0,0.35)' }}>
            <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#ffeaea', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '2rem' }}>🔒</div>
            <h2 style={{ fontFamily: 'var(--font-head)', color: 'var(--green-dark)', fontSize: '1.4rem', marginBottom: '12px' }}>{t.closedTitle}</h2>
            <p style={{ color: '#555', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '28px' }}>{t.closedMsg}</p>
            <Link href="/" style={{ display: 'inline-block', background: 'var(--green-dark)', color: 'white', padding: '12px 32px', borderRadius: '10px', fontWeight: 700, textDecoration: 'none', fontSize: '0.95rem' }}>
              ← {t.closedBack}
            </Link>
          </div>
        </div>
      )}

      <div className="circuits-page">
        {/* Header */}
        <div className="circuits-header">
          <div className="circuits-header-inner">
            <Link href="/" className="circuits-back">
              <i className="fas fa-arrow-left" /> {t.back}
            </Link>
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem' }}>|</span>
            <span style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.06em', fontFamily: 'var(--font-head)' }}>
              AFCAC EXPO 2026
            </span>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: '6px' }}>
              {LANGS.map(l => (
                <button key={l.code} className={`c-lang-btn${lang === l.code ? ' active' : ''}`} onClick={() => setLang(l.code)}>
                  {l.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Hero */}
        <div className="circuits-hero">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(179,174,65,0.18)', border: '1px solid var(--gold)', borderRadius: '20px', padding: '4px 16px', marginBottom: '16px' }}>
            <i className="fas fa-map-marked-alt" style={{ color: 'var(--gold)', fontSize: '0.8rem' }} />
            <span style={{ color: 'var(--gold)', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.1em' }}>{t.badge}</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-head)', color: 'white', fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: 800, marginBottom: '10px' }}>
            {t.title}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: '1rem', maxWidth: '560px', margin: '0 auto 20px' }}>
            {t.subtitle}
          </p>

          {/* Circuit date info */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '14px', background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.22)', borderRadius: '12px', padding: '14px 24px', marginBottom: '20px' }}>
            <i className="fas fa-calendar-alt" style={{ color: 'var(--gold)', fontSize: '1.4rem', flexShrink: 0 }} />
            <div style={{ textAlign: 'left' }}>
              <p style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '4px' }}>{t.secCircuit}</p>
              <p style={{ fontSize: '0.72rem', fontWeight: 600, color: 'rgba(255,255,255,0.65)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '2px' }}>{t.dateLabel}</p>
              <p style={{ fontSize: '1rem', fontWeight: 800, color: 'white', marginBottom: '2px' }}>{t.dateValue}</p>
              <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.75)' }}>{t.dateTime}</p>
            </div>
          </div>

          <p style={{ color: 'var(--gold)', fontSize: '0.9rem', fontWeight: 600, margin: '0 auto 24px' }}>
            <i className="fas fa-hand-pointer" style={{ marginRight: '6px' }} />{t.choosePrompt}
          </p>

        </div>

        {/* Circuit selection cards */}
        {!submitted && (
          <div className="circuit-select-section">
            <div className="circuit-cards-grid">
              {circuits.map(c => {
                const full = isComplet(c.key)
                const isSelected = selectedCircuitKey === c.key
                return (
                  <div key={c.key} className={`circuit-select-card${full ? ' full' : ''}`}
                    style={{ borderColor: isSelected ? 'var(--green)' : undefined }}>
                    {/* Card header */}
                    <div style={{ background: isSelected ? 'var(--green-dark)' : 'var(--green)', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ background: 'var(--gold)', borderRadius: '8px', width: '34px', height: '34px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <i className={`fas ${c.icon}`} style={{ color: 'var(--green-dark)', fontSize: '0.9rem' }} />
                      </span>
                      <span style={{ color: 'var(--gold)', fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.04em', lineHeight: 1.3 }}>{c.title}</span>
                      {isSelected && (
                        <span style={{ marginLeft: 'auto', background: 'var(--gold)', color: 'var(--green-dark)', fontSize: '0.7rem', fontWeight: 800, borderRadius: '4px', padding: '3px 8px', flexShrink: 0 }}>
                          <i className="fas fa-check" style={{ marginRight: '4px' }} />OK
                        </span>
                      )}
                    </div>
                    {/* Stops list */}
                    <div style={{ padding: '18px 20px', flex: 1 }}>
                      <ol style={{ margin: 0, paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {c.stops.map((s, i) => {
                          const parenIdx = s.indexOf('(')
                          const name = parenIdx > -1 ? s.slice(0, parenIdx).trim() : s
                          const desc = parenIdx > -1 ? s.slice(parenIdx) : ''
                          return (
                            <li key={i} style={{ fontSize: '0.83rem', lineHeight: 1.55, color: '#333' }}>
                              <span style={{ color: 'var(--green-dark)', fontWeight: 700 }}>{name}</span>
                              {desc && <span style={{ color: '#666', fontWeight: 400 }}> {desc}</span>}
                            </li>
                          )
                        })}
                      </ol>
                    </div>
                    {/* CTA button */}
                    <button
                      className={`select-circ-btn${full ? ' full' : ''}`}
                      disabled={full}
                      onClick={() => !full && pickCircuit(c.key)}
                    >
                      {full
                        ? <><i className="fas fa-ban" /> {t.complet}</>
                        : isSelected
                          ? <><i className="fas fa-check-circle" /> {t.selectBtn}</>
                          : <><i className="fas fa-arrow-right" /> {t.selectBtn}</>
                      }
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Registration form — shown only after circuit selection */}
        <div style={{ padding: '32px 24px 64px' }} ref={formRef}>
          {selectedCircuitKey && (
            <div className="circuits-card">
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '32px 0' }}>
                  <div className="success-icon"><i className="fas fa-check" /></div>
                  <h2 style={{ fontFamily: 'var(--font-head)', color: 'var(--green-dark)', fontSize: '1.5rem', marginBottom: '12px' }}>
                    {t.successTitle}
                  </h2>
                  <p style={{ color: '#555', maxWidth: '480px', margin: '0 auto 28px' }}
                    dangerouslySetInnerHTML={{ __html: t.successMsg(form.prenom, form.nom, `<strong>${form.circuit.split(':')[0]}</strong>`, `<strong>${form.email}</strong>`) }}
                  />
                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button onClick={() => { setForm(EMPTY); setSubmitted(false); setSelectedCircuitKey(null) }} style={{ padding: '10px 24px', border: '1.5px solid var(--green)', borderRadius: '8px', background: 'white', color: 'var(--green-dark)', fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem' }}>
                      {t.newReg}
                    </button>
                    <Link href="/" style={{ padding: '10px 24px', background: 'var(--green-dark)', borderRadius: '8px', color: 'white', fontWeight: 700, textDecoration: 'none', fontSize: '0.9rem' }}>
                      {t.backSite}
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                  <div>
                    <h2 style={{ fontFamily: 'var(--font-head)', color: 'var(--green-dark)', fontSize: '1.25rem', marginBottom: '4px' }}>{t.formTitle}</h2>
                    <p style={{ color: '#777', fontSize: '0.85rem' }}>{t.formRequired}</p>
                  </div>

                  {/* Selected circuit banner */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', background: 'rgba(1,119,100,0.07)', border: '2px solid var(--green)', borderRadius: '10px', padding: '14px 18px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <i className="fas fa-check-circle" style={{ color: 'var(--green)', fontSize: '1.3rem', flexShrink: 0 }} />
                      <div>
                        <p style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--green)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '2px' }}>{t.selectedLabel}</p>
                        <p style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--green-dark)' }}>
                          {selectedCircuitKey === 'circuit1' ? t.circ1 : t.circ2}
                        </p>
                      </div>
                    </div>
                    <button type="button" onClick={changeCircuit}
                      style={{ background: 'transparent', border: '1.5px solid var(--green)', borderRadius: '6px', color: 'var(--green-dark)', fontWeight: 700, fontSize: '0.82rem', padding: '6px 14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-head)' }}>
                      <i className="fas fa-exchange-alt" /> {t.changeCircuit}
                    </button>
                  </div>

                  {/* Personal info */}
                  <div style={{ borderTop: '2px solid var(--gold)', paddingTop: '20px' }}>
                    <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--green)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>
                      <i className="fas fa-user" style={{ marginRight: '6px' }} />{t.secPersonal}
                    </p>
                    <div className="form-row">
                      {field('prenom', t.lPrenom, true, 'text', t.phPrenom)}
                      {field('nom', t.lNom, true, 'text', t.phNom)}
                    </div>
                    <div style={{ marginTop: '16px' }}>
                      {field('titre', t.lPoste, false, 'text', t.phPoste)}
                    </div>
                  </div>

                  <div className="form-row">
                    {field('email', t.lEmail, true, 'email', t.phEmail)}
                    {field('telephone', t.lTel, true, 'tel', t.phTel)}
                  </div>

                  <div className="form-row">
                    {field('organisation', t.lOrg, false, 'text', t.phOrg)}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--green-dark)' }}>
                        {t.lPays} <span style={{ color: '#e53935' }}>*</span>
                      </label>
                      <select value={form.pays} onChange={e => { setForm(f => ({ ...f, pays: e.target.value })); setErrors(er => ({ ...er, pays: undefined })) }}
                        style={{ border: `1.5px solid ${errors.pays ? '#e53935' : '#cdd5d0'}` }}>
                        <option value="">{t.selDefault}</option>
                        {PAYS.map(p => <option key={p} value={p}>{p}</option>)}
                      </select>
                      {errors.pays && <span style={{ fontSize: '0.78rem', color: '#e53935' }}>{errors.pays}</span>}
                    </div>
                  </div>

                  {/* Date */}
                  <div style={{ borderTop: '2px solid var(--gold)', paddingTop: '20px' }}>
                    <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--green)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>
                      <i className="fas fa-route" style={{ marginRight: '6px' }} />{t.secCircuit}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(1,119,100,0.07)', border: '1.5px solid var(--green)', borderRadius: '10px', padding: '14px 18px' }}>
                      <i className="fas fa-calendar-alt" style={{ color: 'var(--green)', fontSize: '1.3rem', flexShrink: 0 }} />
                      <div>
                        <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--green)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '2px' }}>{t.dateLabel}</p>
                        <p style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--green-dark)' }}>{t.dateValue}</p>
                        <p style={{ fontSize: '0.85rem', color: '#555' }}>{t.dateTime}</p>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--green-dark)' }}>{t.lComment}</label>
                    <textarea rows={3} value={form.commentaires} placeholder={t.phComment}
                      onChange={e => setForm(f => ({ ...f, commentaires: e.target.value }))} />
                  </div>

                  {selectedCircuitKey && isComplet(selectedCircuitKey) && (
                    <div style={{ background: '#ffeaea', border: '1px solid #e53935', borderRadius: '8px', padding: '10px 14px', fontSize: '0.85rem', color: '#c62828' }}>
                      <i className="fas fa-ban" style={{ marginRight: '6px' }} />{t.completMsg}
                    </div>
                  )}

                  {submitError && (
                    <div style={{ background: '#ffeaea', border: '1px solid #e53935', borderRadius: '8px', padding: '12px 16px', fontSize: '0.88rem', color: '#c62828' }}>
                      <i className="fas fa-exclamation-circle" style={{ marginRight: '6px' }} />{submitError}
                    </div>
                  )}

                  <button type="submit" className="submit-btn" disabled={submitting || (!!selectedCircuitKey && isComplet(selectedCircuitKey))}>
                    {submitting
                      ? <><i className="fas fa-spinner fa-spin" style={{ marginRight: '8px' }} />{t.submitting}</>
                      : <><i className="fas fa-paper-plane" style={{ marginRight: '8px' }} />{t.submit}</>
                    }
                  </button>

                  <p style={{ textAlign: 'center', fontSize: '0.75rem', color: '#999', marginTop: '-6px' }}>
                    <i className="fas fa-lock" style={{ marginRight: '4px' }} />{t.privacy}
                  </p>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
