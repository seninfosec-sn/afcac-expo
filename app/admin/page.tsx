'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Registration {
  prenom: string; nom: string; titre: string
  email: string; telephone: string
  organisation: string; pays: string
  circuit: string; circuitKey: string
  commentaires: string; registeredAt: string
}

interface AdminData {
  counts: { circuit1: number; circuit2: number }
  registrations: { circuit1: Registration[]; circuit2: Registration[] }
}

const MAX = 100
const COLS = ['#', 'Prénom', 'Nom', 'Poste', 'Email', 'WhatsApp', 'Organisation', 'Pays', 'Circuit', 'Inscrit le']

function toCSV(rows: Registration[], circuitLabel: string): string {
  const header = COLS.slice(1).join(';')
  const lines = rows.map((r, i) =>
    [i + 1, r.prenom, r.nom, r.titre, r.email, r.telephone, r.organisation, r.pays,
      circuitLabel, new Date(r.registeredAt).toLocaleString('fr-FR')
    ].join(';')
  )
  return [header, ...lines].join('\n')
}

function downloadCSV(content: string, filename: string) {
  const blob = new Blob(['﻿' + content], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.download = filename; a.click()
  URL.revokeObjectURL(url)
}

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [data, setData] = useState<AdminData | null>(null)
  const [activeTab, setActiveTab] = useState<'circuit1' | 'circuit2'>('circuit1')
  const [search, setSearch] = useState('')

  async function login(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (res.status === 401) { setError('Mot de passe incorrect.'); return }
      if (!res.ok) { setError('Erreur serveur. Réessayez.'); return }
      setData(await res.json())
    } catch { setError('Erreur de connexion.') }
    finally { setLoading(false) }
  }

  async function refresh() {
    setLoading(true)
    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (res.ok) setData(await res.json())
    } catch {}
    finally { setLoading(false) }
  }

  const circuitLabels: Record<string, string> = {
    circuit1: 'Circuit 1 — Bus',
    circuit2: 'Circuit 2 — Lomé',
  }

  const activeRegs = data?.registrations[activeTab] ?? []
  const filtered = search.trim()
    ? activeRegs.filter(r =>
        [r.prenom, r.nom, r.email, r.organisation, r.pays, r.titre]
          .join(' ').toLowerCase().includes(search.toLowerCase())
      )
    : activeRegs

  if (!data) {
    return (
      <>
        <style>{`
          body { margin:0; font-family: system-ui, sans-serif; background: #f0f4f2; }
          .login-wrap { min-height:100vh; display:flex; align-items:center; justify-content:center; }
          .login-card { background:white; border-radius:16px; box-shadow:0 8px 40px rgba(0,0,0,0.12); padding:48px 40px; width:100%; max-width:380px; }
          .login-card h1 { font-size:1.4rem; color:#004d41; margin-bottom:4px; }
          .login-card p { color:#777; font-size:0.88rem; margin-bottom:28px; }
          .login-input { width:100%; padding:11px 14px; border:1.5px solid #ccc; border-radius:8px; font-size:1rem; outline:none; box-sizing:border-box; margin-bottom:16px; }
          .login-input:focus { border-color:#004d41; }
          .login-btn { width:100%; padding:13px; background:#004d41; color:white; border:none; border-radius:8px; font-size:1rem; font-weight:700; cursor:pointer; }
          .login-btn:hover { background:#017764; }
          .login-btn:disabled { opacity:0.6; cursor:not-allowed; }
          .login-err { color:#c62828; font-size:0.85rem; margin-top:-8px; margin-bottom:12px; }
        `}</style>
        <div className="login-wrap">
          <div className="login-card">
            <div style={{ width:48, height:48, borderRadius:'50%', background:'rgba(0,77,65,0.1)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:20, color:'#004d41', fontSize:'1.4rem' }}>
              <span>🔐</span>
            </div>
            <h1>Admin Panel</h1>
            <p>AFCAC Expo 2026 — Circuits Touristiques</p>
            <form onSubmit={login}>
              <input className="login-input" type="password" placeholder="Mot de passe" value={password}
                onChange={e => setPassword(e.target.value)} autoFocus />
              {error && <p className="login-err">{error}</p>}
              <button className="login-btn" type="submit" disabled={loading || !password}>
                {loading ? 'Connexion...' : 'Se connecter'}
              </button>
            </form>
            <div style={{ marginTop:20, textAlign:'center' }}>
              <Link href="/" style={{ color:'#777', fontSize:'0.82rem', textDecoration:'none' }}>← Retour au site</Link>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <style>{`
        * { box-sizing:border-box; margin:0; padding:0; }
        body { font-family: system-ui, sans-serif; background:#f0f4f2; color:#222; }
        .admin-header { background:#004d41; padding:14px 32px; display:flex; align-items:center; gap:16px; }
        .admin-title { color:#b3ae41; font-weight:800; font-size:1rem; letter-spacing:0.06em; }
        .admin-sub { color:rgba(255,255,255,0.6); font-size:0.8rem; }
        .hbtn { padding:7px 16px; border-radius:6px; font-size:0.82rem; font-weight:600; cursor:pointer; border:none; transition:all 0.2s; }
        .hbtn-outline { background:transparent; border:1px solid rgba(255,255,255,0.3); color:rgba(255,255,255,0.75); }
        .hbtn-outline:hover { border-color:white; color:white; }
        .hbtn-danger { background:#c62828; color:white; }
        .hbtn-danger:hover { background:#e53935; }
        .admin-body { max-width:1200px; margin:0 auto; padding:32px 24px 64px; }
        .stat-cards { display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:16px; margin-bottom:32px; }
        .stat-card { background:white; border-radius:12px; padding:20px 24px; box-shadow:0 2px 10px rgba(0,0,0,0.06); border-top:4px solid; }
        .stat-num { font-size:2rem; font-weight:800; color:#004d41; }
        .stat-label { font-size:0.85rem; color:#666; margin-top:4px; }
        .cap-bar { height:8px; background:#e8ede9; border-radius:4px; margin-top:10px; overflow:hidden; }
        .cap-fill { height:100%; border-radius:4px; transition:width 0.5s; }
        .tabs { display:flex; gap:8px; margin-bottom:20px; }
        .tab { padding:9px 22px; border-radius:8px; font-weight:600; font-size:0.9rem; cursor:pointer; border:none; transition:all 0.2s; }
        .tab.active { background:#004d41; color:white; }
        .tab:not(.active) { background:white; color:#555; border:1px solid #ddd; }
        .tab:not(.active):hover { border-color:#004d41; color:#004d41; }
        .toolbar { display:flex; gap:12px; align-items:center; margin-bottom:16px; flex-wrap:wrap; }
        .search-input { padding:9px 14px; border:1.5px solid #cdd5d0; border-radius:8px; font-size:0.9rem; outline:none; min-width:260px; }
        .search-input:focus { border-color:#004d41; }
        .csv-btn { padding:9px 18px; background:#b3ae41; color:#004d41; border:none; border-radius:8px; font-weight:700; font-size:0.85rem; cursor:pointer; display:flex; align-items:center; gap:6px; }
        .csv-btn:hover { background:#cfc949; }
        .table-wrap { background:white; border-radius:12px; box-shadow:0 2px 10px rgba(0,0,0,0.06); overflow:auto; }
        table { width:100%; border-collapse:collapse; font-size:0.85rem; }
        thead th { background:#004d41; color:white; padding:12px 14px; text-align:left; font-weight:600; white-space:nowrap; position:sticky; top:0; }
        tbody tr:nth-child(even) { background:#f7faf8; }
        tbody tr:hover { background:#edf7f4; }
        td { padding:11px 14px; border-bottom:1px solid #eee; vertical-align:top; }
        td.num { color:#999; font-size:0.78rem; text-align:center; }
        .empty { text-align:center; padding:48px; color:#999; }
        .badge-full { background:#e53935; color:white; font-size:0.7rem; font-weight:700; padding:2px 7px; border-radius:4px; }
      `}</style>

      {/* Header */}
      <div className="admin-header">
        <div style={{ flex:1 }}>
          <div className="admin-title">⚙ ADMIN PANEL — CIRCUITS TOURISTIQUES</div>
          <div className="admin-sub">AFCAC Expo 2026 · Lomé, Togo</div>
        </div>
        <button className="hbtn hbtn-outline" onClick={refresh} disabled={loading}>
          {loading ? '⟳ Actualisation...' : '⟳ Actualiser'}
        </button>
        <button className="hbtn hbtn-danger" onClick={() => setData(null)}>
          Déconnexion
        </button>
        <Link href="/" style={{ color:'rgba(255,255,255,0.6)', fontSize:'0.82rem', textDecoration:'none', marginLeft:8 }}>
          ← Site
        </Link>
      </div>

      <div className="admin-body">

        {/* Stat cards */}
        <div className="stat-cards">
          {(['circuit1', 'circuit2'] as const).map(k => {
            const n = data.counts[k]
            const pct = Math.min((n / MAX) * 100, 100)
            const full = n >= MAX
            return (
              <div key={k} className="stat-card" style={{ borderColor: full ? '#e53935' : '#b3ae41' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                  <div>
                    <div className="stat-num">{n}<span style={{ fontSize:'1rem', color:'#999', fontWeight:400 }}>/{MAX}</span></div>
                    <div className="stat-label">{circuitLabels[k]}</div>
                  </div>
                  {full && <span className="badge-full">COMPLET</span>}
                </div>
                <div className="cap-bar">
                  <div className="cap-fill" style={{ width:`${pct}%`, background: full ? '#e53935' : '#b3ae41' }} />
                </div>
              </div>
            )
          })}
          <div className="stat-card" style={{ borderColor:'#017764' }}>
            <div className="stat-num">{data.counts.circuit1 + data.counts.circuit2}</div>
            <div className="stat-label">Total inscrits</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs">
          {(['circuit1', 'circuit2'] as const).map(k => (
            <button key={k} className={`tab${activeTab === k ? ' active' : ''}`} onClick={() => { setActiveTab(k); setSearch('') }}>
              {circuitLabels[k]} ({data.counts[k]})
            </button>
          ))}
        </div>

        {/* Toolbar */}
        <div className="toolbar">
          <input className="search-input" placeholder="🔍 Rechercher (nom, email, pays...)" value={search}
            onChange={e => setSearch(e.target.value)} />
          <button className="csv-btn" onClick={() => downloadCSV(
            toCSV(activeRegs, circuitLabels[activeTab]),
            `inscrits_${activeTab}_${new Date().toISOString().slice(0,10)}.csv`
          )}>
            ⬇ Exporter CSV ({activeRegs.length})
          </button>
        </div>

        {/* Table */}
        <div className="table-wrap">
          {filtered.length === 0 ? (
            <div className="empty">
              {search ? 'Aucun résultat pour cette recherche.' : 'Aucune inscription pour ce circuit.'}
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th style={{ width:40 }}>#</th>
                  <th>Prénom</th>
                  <th>Nom</th>
                  <th>Poste</th>
                  <th>Email</th>
                  <th>WhatsApp</th>
                  <th>Organisation</th>
                  <th>Pays</th>
                  <th>Commentaires</th>
                  <th>Inscrit le</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r, i) => (
                  <tr key={i}>
                    <td className="num">{activeRegs.indexOf(r) + 1}</td>
                    <td>{r.prenom}</td>
                    <td style={{ fontWeight:600 }}>{r.nom}</td>
                    <td style={{ color:'#555' }}>{r.titre || '—'}</td>
                    <td><a href={`mailto:${r.email}`} style={{ color:'#004d41', textDecoration:'none' }}>{r.email}</a></td>
                    <td>{r.telephone || '—'}</td>
                    <td>{r.organisation || '—'}</td>
                    <td>{r.pays}</td>
                    <td style={{ color:'#777', maxWidth:180, wordBreak:'break-word' }}>{r.commentaires || '—'}</td>
                    <td style={{ whiteSpace:'nowrap', color:'#888', fontSize:'0.78rem' }}>
                      {new Date(r.registeredAt).toLocaleString('fr-FR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <p style={{ marginTop:16, fontSize:'0.78rem', color:'#aaa', textAlign:'right' }}>
          {filtered.length} inscription{filtered.length > 1 ? 's' : ''} affichée{filtered.length > 1 ? 's' : ''}
          {search ? ` sur ${activeRegs.length}` : ''}
        </p>
      </div>
    </>
  )
}
