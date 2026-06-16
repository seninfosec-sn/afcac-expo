'use client'

import { useState } from 'react'
import Link from 'next/link'

const CIRCUITS = [
  'Circuit Lomé Ville — Marché central, quartier colonial, artisanat',
  'Circuit Lac Togo & Togoville — Pirogue traditionnelle, village lacustre',
  'Circuit Kpalimé & Chutes d\'Akloa — Forêt tropicale, chutes d\'eau',
  'Circuit Koutammakou — Pays Tamberma (Patrimoine UNESCO)',
  'Circuit Combo (Lomé + Lac Togo)',
]

const PAYS = [
  'Togo', 'Bénin', 'Burkina Faso', 'Cameroun', 'Côte d\'Ivoire', 'Ghana',
  'Mali', 'Nigeria', 'Sénégal', 'Afrique du Sud', 'Égypte', 'Éthiopie',
  'Kenya', 'Maroc', 'Rwanda', 'Tanzanie', 'Tunisie', 'Ouganda',
  'France', 'Royaume-Uni', 'États-Unis', 'Canada', 'Autre',
]

interface FormData {
  prenom: string
  nom: string
  email: string
  telephone: string
  organisation: string
  pays: string
  participants: string
  circuit: string
  date: string
  commentaires: string
}

const EMPTY: FormData = {
  prenom: '', nom: '', email: '', telephone: '',
  organisation: '', pays: '', participants: '1',
  circuit: '', date: '', commentaires: '',
}

export default function CircuitsPage() {
  const [form, setForm] = useState<FormData>(EMPTY)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Partial<FormData>>({})

  function validate() {
    const e: Partial<FormData> = {}
    if (!form.prenom.trim()) e.prenom = 'Requis'
    if (!form.nom.trim()) e.nom = 'Requis'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Email invalide'
    if (!form.telephone.trim()) e.telephone = 'Requis'
    if (!form.pays) e.pays = 'Requis'
    if (!form.circuit) e.circuit = 'Requis'
    if (!form.date) e.date = 'Requis'
    return e
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const e2 = validate()
    if (Object.keys(e2).length > 0) { setErrors(e2); return }
    setSubmitted(true)
  }

  function field(
    id: keyof FormData,
    label: string,
    type = 'text',
    required = false,
    placeholder = ''
  ) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <label htmlFor={id} style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--green-dark)' }}>
          {label}{required && <span style={{ color: '#e53935', marginLeft: '3px' }}>*</span>}
        </label>
        <input
          id={id}
          type={type}
          value={form[id]}
          placeholder={placeholder}
          onChange={ev => { setForm(f => ({ ...f, [id]: ev.target.value })); setErrors(er => ({ ...er, [id]: undefined })) }}
          style={{
            padding: '10px 14px',
            border: `1.5px solid ${errors[id] ? '#e53935' : '#cdd5d0'}`,
            borderRadius: '8px',
            fontSize: '0.95rem',
            outline: 'none',
            background: 'white',
            fontFamily: 'var(--font-body)',
            transition: 'border-color 0.2s',
          }}
          onFocus={ev => { ev.currentTarget.style.borderColor = 'var(--green)' }}
          onBlur={ev => { ev.currentTarget.style.borderColor = errors[id] ? '#e53935' : '#cdd5d0' }}
        />
        {errors[id] && <span style={{ fontSize: '0.78rem', color: '#e53935' }}>{errors[id]}</span>}
      </div>
    )
  }

  return (
    <>
      <style>{`
        .circuits-page { min-height: 100vh; background: var(--off-white); font-family: var(--font-body); }
        .circuits-header { background: var(--green-dark); padding: 18px 0; }
        .circuits-header-inner { max-width: 860px; margin: 0 auto; padding: 0 24px; display: flex; align-items: center; gap: 16px; }
        .circuits-back { color: rgba(255,255,255,0.75); font-size: 0.85rem; text-decoration: none; display: flex; align-items: center; gap: 6px; transition: color 0.2s; }
        .circuits-back:hover { color: var(--gold); }
        .circuits-hero { background: linear-gradient(135deg, var(--green-dark) 0%, var(--green) 100%); padding: 56px 24px 48px; text-align: center; }
        .circuits-card { max-width: 860px; margin: -32px auto 0; background: white; border-radius: 16px; box-shadow: 0 8px 40px rgba(0,0,0,0.10); padding: 48px 48px 56px; }
        @media (max-width: 640px) { .circuits-card { padding: 28px 18px 36px; } .form-row { grid-template-columns: 1fr !important; } }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        select { padding: 10px 14px; border: 1.5px solid #cdd5d0; border-radius: 8px; font-size: 0.95rem; font-family: var(--font-body); background: white; appearance: none; outline: none; width: 100%; cursor: pointer; }
        select:focus { border-color: var(--green); }
        textarea { padding: 10px 14px; border: 1.5px solid #cdd5d0; border-radius: 8px; font-size: 0.95rem; font-family: var(--font-body); background: white; outline: none; resize: vertical; width: 100%; transition: border-color 0.2s; }
        textarea:focus { border-color: var(--green); }
        .submit-btn { width: 100%; padding: 14px; background: var(--green-dark); color: white; border: none; border-radius: 10px; font-size: 1rem; font-weight: 700; font-family: var(--font-head); letter-spacing: 0.06em; cursor: pointer; margin-top: 8px; transition: background 0.2s, transform 0.15s; }
        .submit-btn:hover { background: var(--green); transform: translateY(-1px); }
        .success-icon { width: 72px; height: 72px; border-radius: 50%; background: rgba(1,119,100,0.12); display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; font-size: 2rem; color: var(--green); }
      `}</style>

      <div className="circuits-page">
        {/* Header */}
        <div className="circuits-header">
          <div className="circuits-header-inner">
            <Link href="/" className="circuits-back">
              <i className="fas fa-arrow-left" /> Retour au site
            </Link>
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem' }}>|</span>
            <span style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.06em', fontFamily: 'var(--font-head)' }}>
              AFCAC EXPO 2026
            </span>
          </div>
        </div>

        {/* Hero banner */}
        <div className="circuits-hero">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(179,174,65,0.18)', border: '1px solid var(--gold)', borderRadius: '20px', padding: '4px 16px', marginBottom: '20px' }}>
            <i className="fas fa-map-marked-alt" style={{ color: 'var(--gold)', fontSize: '0.8rem' }} />
            <span style={{ color: 'var(--gold)', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.1em' }}>LOMÉ · TOGO</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-head)', color: 'white', fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: 800, marginBottom: '12px' }}>
            Circuits Touristiques
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: '1rem', maxWidth: '560px', margin: '0 auto' }}>
            Découvrez le Togo à travers nos circuits exclusifs organisés en marge de l'AFCAC Expo 2026. Inscrivez-vous ci-dessous.
          </p>
        </div>

        {/* Form card */}
        <div style={{ padding: '0 24px 64px' }}>
          <div className="circuits-card">
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '32px 0' }}>
                <div className="success-icon">
                  <i className="fas fa-check" />
                </div>
                <h2 style={{ fontFamily: 'var(--font-head)', color: 'var(--green-dark)', fontSize: '1.5rem', marginBottom: '12px' }}>
                  Inscription enregistrée !
                </h2>
                <p style={{ color: '#555', marginBottom: '28px', maxWidth: '480px', margin: '0 auto 28px' }}>
                  Merci <strong>{form.prenom} {form.nom}</strong>, votre demande pour le <strong>{form.circuit.split('—')[0].trim()}</strong> a bien été reçue.
                  Un email de confirmation sera envoyé à <strong>{form.email}</strong>.
                </p>
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button onClick={() => { setForm(EMPTY); setSubmitted(false) }} style={{ padding: '10px 24px', border: '1.5px solid var(--green)', borderRadius: '8px', background: 'white', color: 'var(--green-dark)', fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem' }}>
                    Nouvelle inscription
                  </button>
                  <Link href="/" style={{ padding: '10px 24px', background: 'var(--green-dark)', borderRadius: '8px', color: 'white', fontWeight: 700, textDecoration: 'none', fontSize: '0.9rem' }}>
                    Retour au site
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                <div>
                  <h2 style={{ fontFamily: 'var(--font-head)', color: 'var(--green-dark)', fontSize: '1.25rem', marginBottom: '4px' }}>
                    Formulaire d'inscription
                  </h2>
                  <p style={{ color: '#777', fontSize: '0.85rem' }}>Les champs marqués <span style={{ color: '#e53935' }}>*</span> sont obligatoires.</p>
                </div>

                <div style={{ borderTop: '2px solid var(--gold)', paddingTop: '20px' }}>
                  <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--green)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>
                    <i className="fas fa-user" style={{ marginRight: '6px' }} />Informations personnelles
                  </p>
                  <div className="form-row" style={{ gap: '20px' }}>
                    {field('prenom', 'Prénom', 'text', true, 'Jean')}
                    {field('nom', 'Nom', 'text', true, 'DUPONT')}
                  </div>
                </div>

                <div className="form-row">
                  {field('email', 'Adresse email', 'email', true, 'exemple@organisation.org')}
                  {field('telephone', 'Téléphone', 'tel', true, '+228 XX XX XX XX')}
                </div>

                <div className="form-row">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {field('organisation', 'Organisation / Entreprise', 'text', false, 'Nom de votre structure')}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--green-dark)' }}>
                      Pays <span style={{ color: '#e53935' }}>*</span>
                    </label>
                    <select
                      value={form.pays}
                      onChange={e => { setForm(f => ({ ...f, pays: e.target.value })); setErrors(er => ({ ...er, pays: undefined })) }}
                      style={{ border: `1.5px solid ${errors.pays ? '#e53935' : '#cdd5d0'}` }}
                    >
                      <option value="">-- Sélectionnez --</option>
                      {PAYS.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                    {errors.pays && <span style={{ fontSize: '0.78rem', color: '#e53935' }}>{errors.pays}</span>}
                  </div>
                </div>

                <div style={{ borderTop: '2px solid var(--gold)', paddingTop: '20px' }}>
                  <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--green)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>
                    <i className="fas fa-route" style={{ marginRight: '6px' }} />Détails du circuit
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '20px' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--green-dark)' }}>
                      Circuit souhaité <span style={{ color: '#e53935' }}>*</span>
                    </label>
                    <select
                      value={form.circuit}
                      onChange={e => { setForm(f => ({ ...f, circuit: e.target.value })); setErrors(er => ({ ...er, circuit: undefined })) }}
                      style={{ border: `1.5px solid ${errors.circuit ? '#e53935' : '#cdd5d0'}` }}
                    >
                      <option value="">-- Choisissez un circuit --</option>
                      {CIRCUITS.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    {errors.circuit && <span style={{ fontSize: '0.78rem', color: '#e53935' }}>{errors.circuit}</span>}
                  </div>

                  <div className="form-row">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label htmlFor="date" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--green-dark)' }}>
                        Date souhaitée <span style={{ color: '#e53935' }}>*</span>
                      </label>
                      <input
                        id="date"
                        type="date"
                        min="2026-06-15"
                        max="2026-06-19"
                        value={form.date}
                        onChange={e => { setForm(f => ({ ...f, date: e.target.value })); setErrors(er => ({ ...er, date: undefined })) }}
                        style={{ padding: '10px 14px', border: `1.5px solid ${errors.date ? '#e53935' : '#cdd5d0'}`, borderRadius: '8px', fontSize: '0.95rem', fontFamily: 'var(--font-body)', outline: 'none', background: 'white' }}
                      />
                      {errors.date && <span style={{ fontSize: '0.78rem', color: '#e53935' }}>{errors.date}</span>}
                    </div>
                    {field('participants', 'Nombre de participants', 'number', false)}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--green-dark)' }}>
                    Besoins spéciaux / Commentaires
                  </label>
                  <textarea
                    rows={3}
                    value={form.commentaires}
                    placeholder="Informations complémentaires, besoins particuliers..."
                    onChange={e => setForm(f => ({ ...f, commentaires: e.target.value }))}
                  />
                </div>

                <button type="submit" className="submit-btn">
                  <i className="fas fa-paper-plane" style={{ marginRight: '8px' }} />
                  Soumettre mon inscription
                </button>

                <p style={{ textAlign: 'center', fontSize: '0.75rem', color: '#999', marginTop: '-6px' }}>
                  <i className="fas fa-lock" style={{ marginRight: '4px' }} />
                  Vos données sont confidentielles et ne seront utilisées que dans le cadre de cet événement.
                </p>
              </form>
            )}
          </div>

          {/* Circuit info cards */}
          {!submitted && (
            <div style={{ maxWidth: '860px', margin: '32px auto 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
              {[
                { icon: 'fa-city', title: 'Lomé Ville', desc: 'Marché central, architecture coloniale, artisanat' },
                { icon: 'fa-water', title: 'Lac Togo', desc: 'Togoville, pirogue traditionnelle, village lacustre' },
                { icon: 'fa-tree', title: 'Kpalimé', desc: 'Forêt tropicale et chutes d\'Akloa' },
                { icon: 'fa-landmark', title: 'Koutammakou', desc: 'Patrimoine UNESCO, Pays Tamberma' },
              ].map(c => (
                <div key={c.title} style={{ background: 'white', borderRadius: '12px', padding: '20px', borderTop: '3px solid var(--gold)', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', textAlign: 'center' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(1,119,100,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', color: 'var(--green)' }}>
                    <i className={`fas ${c.icon}`} />
                  </div>
                  <h4 style={{ fontFamily: 'var(--font-head)', color: 'var(--green-dark)', fontSize: '0.95rem', marginBottom: '6px' }}>{c.title}</h4>
                  <p style={{ fontSize: '0.8rem', color: '#666' }}>{c.desc}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
