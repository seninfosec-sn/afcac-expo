'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Registration {
  prenom: string; nom: string; titre: string
  email: string; telephone: string
  organisation: string; pays: string
  circuit: string; circuit_key: string
  commentaires: string; registeredAt: string
}

interface AdminData {
  counts: { circuit1: number; circuit2: number }
  registrations: { circuit1: Registration[]; circuit2: Registration[] }
}

const MAX = 100
const HEADERS = ['#', 'Prénom', 'Nom', 'Poste', 'Email', 'WhatsApp', 'Organisation', 'Pays', 'Circuit', 'Inscrit le']

const circuitLabels: Record<string, string> = {
  circuit1: 'Circuit 1 — Bus',
  circuit2: 'Circuit 2 — Ville de Lomé',
}

function toRows(regs: Registration[], label: string) {
  return regs.map((r, i) => [
    i + 1,
    r.prenom, r.nom, r.titre || '',
    r.email, r.telephone || '',
    r.organisation || '', r.pays,
    label,
    new Date(r.registeredAt).toLocaleString('fr-FR'),
  ])
}

// ── Excel export (both circuits in separate sheets) ───────────────────────────
async function exportExcel(data: AdminData) {
  const XLSX = await import('xlsx')
  const wb = XLSX.utils.book_new()

  for (const key of ['circuit1', 'circuit2'] as const) {
    const regs = data.registrations[key]
    const rows = [HEADERS, ...toRows(regs, circuitLabels[key])]
    const ws = XLSX.utils.aoa_to_sheet(rows)

    // Column widths
    ws['!cols'] = [
      { wch: 4 }, { wch: 14 }, { wch: 16 }, { wch: 22 },
      { wch: 28 }, { wch: 18 }, { wch: 24 }, { wch: 18 },
      { wch: 30 }, { wch: 20 },
    ]

    // Header style
    const range = XLSX.utils.decode_range(ws['!ref'] || 'A1')
    for (let col = range.s.c; col <= range.e.c; col++) {
      const cell = ws[XLSX.utils.encode_cell({ r: 0, c: col })]
      if (cell) {
        cell.s = {
          font: { bold: true, color: { rgb: 'FFFFFF' } },
          fill: { fgColor: { rgb: '004D41' } },
          alignment: { horizontal: 'center' },
        }
      }
    }

    XLSX.utils.book_append_sheet(wb, ws, circuitLabels[key].slice(0, 31))
  }

  XLSX.writeFile(wb, `AFCAC_Expo_Circuits_${new Date().toISOString().slice(0, 10)}.xlsx`)
}

// ── PDF export (both circuits, one per page) ──────────────────────────────────
async function exportPDF(data: AdminData) {
  const { default: jsPDF } = await import('jspdf')
  const { default: autoTable } = await import('jspdf-autotable')

  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' })
  const date = new Date().toLocaleDateString('fr-FR')

  const colDefs = [
    { header: '#',            dataKey: 'num' },
    { header: 'Prénom',       dataKey: 'prenom' },
    { header: 'Nom',          dataKey: 'nom' },
    { header: 'Poste',        dataKey: 'titre' },
    { header: 'Email',        dataKey: 'email' },
    { header: 'WhatsApp',     dataKey: 'telephone' },
    { header: 'Organisation', dataKey: 'organisation' },
    { header: 'Pays',         dataKey: 'pays' },
    { header: 'Inscrit le',   dataKey: 'date' },
  ]

  for (let i = 0; i < 2; i++) {
    const key = i === 0 ? 'circuit1' : 'circuit2'
    const regs = data.registrations[key]
    const label = circuitLabels[key]
    const count = data.counts[key]

    if (i > 0) doc.addPage()

    // Title
    doc.setFontSize(14)
    doc.setTextColor(0, 77, 65)
    doc.setFont('helvetica', 'bold')
    doc.text(`AFCAC Expo 2026 — ${label}`, 14, 16)

    doc.setFontSize(9)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(100)
    doc.text(`Exporté le ${date}  |  ${count} / ${MAX} inscrits`, 14, 23)

    const tableData = regs.map((r, idx) => ({
      num: idx + 1,
      prenom: r.prenom,
      nom: r.nom,
      titre: r.titre || '—',
      email: r.email,
      telephone: r.telephone || '—',
      organisation: r.organisation || '—',
      pays: r.pays,
      date: new Date(r.registeredAt).toLocaleString('fr-FR'),
    }))

    autoTable(doc, {
      startY: 27,
      columns: colDefs,
      body: tableData,
      theme: 'grid',
      headStyles: {
        fillColor: [0, 77, 65],
        textColor: 255,
        fontStyle: 'bold',
        fontSize: 8,
      },
      bodyStyles: { fontSize: 7.5 },
      alternateRowStyles: { fillColor: [240, 248, 244] },
      columnStyles: {
        num:          { cellWidth: 8,  halign: 'center' },
        prenom:       { cellWidth: 22 },
        nom:          { cellWidth: 24 },
        titre:        { cellWidth: 30 },
        email:        { cellWidth: 40 },
        telephone:    { cellWidth: 24 },
        organisation: { cellWidth: 32 },
        pays:         { cellWidth: 22 },
        date:         { cellWidth: 28 },
      },
      didDrawPage: (d: { pageNumber: number }) => {
        doc.setFontSize(7)
        doc.setTextColor(160)
        doc.text(
          `Page ${d.pageNumber}`,
          doc.internal.pageSize.width - 20,
          doc.internal.pageSize.height - 6
        )
      },
    })
  }

  doc.save(`AFCAC_Expo_Circuits_${new Date().toISOString().slice(0, 10)}.pdf`)
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [data, setData] = useState<AdminData | null>(null)
  const [activeTab, setActiveTab] = useState<'circuit1' | 'circuit2'>('circuit1')
  const [search, setSearch] = useState('')
  const [exporting, setExporting] = useState<'excel' | 'pdf' | null>(null)

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

  async function handleExport(type: 'excel' | 'pdf') {
    if (!data) return
    setExporting(type)
    try {
      if (type === 'excel') await exportExcel(data)
      else await exportPDF(data)
    } finally { setExporting(null) }
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
          body { margin:0; font-family: system-ui, sans-serif; background:#f0f4f2; }
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
              🔐
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
        .admin-header { background:#004d41; padding:14px 32px; display:flex; align-items:center; gap:16px; flex-wrap:wrap; }
        .admin-title { color:#b3ae41; font-weight:800; font-size:1rem; letter-spacing:0.06em; }
        .admin-sub { color:rgba(255,255,255,0.6); font-size:0.8rem; }
        .hbtn { padding:7px 16px; border-radius:6px; font-size:0.82rem; font-weight:600; cursor:pointer; border:none; transition:all 0.2s; display:flex; align-items:center; gap:6px; }
        .hbtn:disabled { opacity:0.6; cursor:not-allowed; }
        .hbtn-outline { background:transparent; border:1px solid rgba(255,255,255,0.3); color:rgba(255,255,255,0.75); }
        .hbtn-outline:hover:not(:disabled) { border-color:white; color:white; }
        .hbtn-excel { background:#1D6F42; color:white; }
        .hbtn-excel:hover:not(:disabled) { background:#22874f; }
        .hbtn-pdf { background:#c62828; color:white; }
        .hbtn-pdf:hover:not(:disabled) { background:#e53935; }
        .hbtn-danger { background:#7f0000; color:white; }
        .hbtn-danger:hover { background:#b71c1c; }
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
        .search-input { padding:9px 14px; border:1.5px solid #cdd5d0; border-radius:8px; font-size:0.9rem; outline:none; min-width:240px; flex:1; }
        .search-input:focus { border-color:#004d41; }
        .table-wrap { background:white; border-radius:12px; box-shadow:0 2px 10px rgba(0,0,0,0.06); overflow:auto; }
        table { width:100%; border-collapse:collapse; font-size:0.85rem; }
        thead th { background:#004d41; color:white; padding:12px 14px; text-align:left; font-weight:600; white-space:nowrap; position:sticky; top:0; }
        tbody tr:nth-child(even) { background:#f7faf8; }
        tbody tr:hover { background:#edf7f4; }
        td { padding:11px 14px; border-bottom:1px solid #eee; vertical-align:top; }
        .empty { text-align:center; padding:48px; color:#999; }
        .badge-full { background:#e53935; color:white; font-size:0.7rem; font-weight:700; padding:2px 7px; border-radius:4px; }
        .export-group { display:flex; gap:8px; align-items:center; }
        .export-label { color:rgba(255,255,255,0.5); font-size:0.78rem; white-space:nowrap; }
      `}</style>

      {/* Header */}
      <div className="admin-header">
        <div style={{ flex:1, minWidth:200 }}>
          <div className="admin-title">⚙ ADMIN PANEL — CIRCUITS TOURISTIQUES</div>
          <div className="admin-sub">AFCAC Expo 2026 · Lomé, Togo — {data.registrations.circuit1.length + data.registrations.circuit2.length} inscrits au total</div>
        </div>

        {/* Export buttons */}
        <div className="export-group">
          <span className="export-label">Exporter tout :</span>
          <button className="hbtn hbtn-excel" onClick={() => handleExport('excel')} disabled={exporting !== null}>
            {exporting === 'excel' ? '...' : '📊'} Excel
          </button>
          <button className="hbtn hbtn-pdf" onClick={() => handleExport('pdf')} disabled={exporting !== null}>
            {exporting === 'pdf' ? '...' : '📄'} PDF
          </button>
        </div>

        <button className="hbtn hbtn-outline" onClick={refresh} disabled={loading}>
          {loading ? '⟳' : '⟳'} Actualiser
        </button>
        <button className="hbtn hbtn-danger" onClick={() => setData(null)}>
          Déconnexion
        </button>
        <Link href="/" style={{ color:'rgba(255,255,255,0.5)', fontSize:'0.82rem', textDecoration:'none' }}>
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
                  <th>Prénom</th><th>Nom</th><th>Poste</th>
                  <th>Email</th><th>WhatsApp</th>
                  <th>Organisation</th><th>Pays</th>
                  <th>Commentaires</th><th>Inscrit le</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r, i) => (
                  <tr key={i}>
                    <td style={{ color:'#999', fontSize:'0.78rem', textAlign:'center' }}>{activeRegs.indexOf(r) + 1}</td>
                    <td>{r.prenom}</td>
                    <td style={{ fontWeight:600 }}>{r.nom}</td>
                    <td style={{ color:'#555' }}>{r.titre || '—'}</td>
                    <td><a href={`mailto:${r.email}`} style={{ color:'#004d41', textDecoration:'none' }}>{r.email}</a></td>
                    <td>{r.telephone || '—'}</td>
                    <td>{r.organisation || '—'}</td>
                    <td>{r.pays}</td>
                    <td style={{ color:'#777', maxWidth:160, wordBreak:'break-word' }}>{r.commentaires || '—'}</td>
                    <td style={{ whiteSpace:'nowrap', color:'#888', fontSize:'0.78rem' }}>
                      {new Date(r.registeredAt).toLocaleString('fr-FR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <p style={{ marginTop:12, fontSize:'0.78rem', color:'#aaa', textAlign:'right' }}>
          {filtered.length} inscription{filtered.length > 1 ? 's' : ''} affichée{filtered.length > 1 ? 's' : ''}
          {search ? ` sur ${activeRegs.length}` : ''}
        </p>
      </div>
    </>
  )
}
