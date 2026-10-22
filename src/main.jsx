import React, { useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const findings = [
  { severity: 'critical', tag: 'Contrast', title: 'Muted text falls below AA', detail: 'Body copy on the mist surface measures 3.2:1.', fix: 'Raise text token from #8B96A7 to #566171.' },
  { severity: 'serious', tag: 'Keyboard', title: 'Menu trigger has no visible focus', detail: 'Keyboard users lose their position after opening navigation.', fix: 'Apply a 3px, 3:1 minimum focus ring using :focus-visible.' },
  { severity: 'serious', tag: 'Labels', title: 'Email input is unnamed', detail: 'The placeholder disappears and is not an accessible name.', fix: 'Pair the field with a persistent <label>.' },
  { severity: 'moderate', tag: 'Structure', title: 'Heading level skips from H1 to H3', detail: 'Section boundaries are unclear in a screen reader outline.', fix: 'Use a sequential heading hierarchy.' },
  { severity: 'moderate', tag: 'Motion', title: 'Ambient animation cannot be paused', detail: 'Continuous movement may distract vestibular-sensitive visitors.', fix: 'Respect prefers-reduced-motion and offer a pause control.' }
]

function App() {
  const [active, setActive] = useState('Overview')
  const [filter, setFilter] = useState('all')
  const [done, setDone] = useState([])
  const [mode, setMode] = useState('standard')
  const [toast, setToast] = useState('')
  const visible = useMemo(() => findings.filter(f => filter === 'all' || f.severity === filter), [filter])
  const complete = (i) => setDone(x => x.includes(i) ? x.filter(n => n !== i) : [...x, i])
  const runAudit = () => { setToast('Audit refreshed — 5 findings mapped to WCAG guidance.'); setTimeout(() => setToast(''), 3600) }
  return <div className={`app ${mode}`}>
    <a className="skip" href="#workspace">Skip to workspace</a>
    <header>
      <div className="brand"><span className="brandmark" aria-hidden="true">a</span><span>accessibility <b>Studio</b><em>1021</em></span></div>
      <div className="header-actions"><button className="quiet" onClick={() => setMode(mode === 'standard' ? 'calm' : 'standard')}>{mode === 'standard' ? '◐ Calm view' : '◑ Standard view'}</button><button className="avatar" aria-label="Open profile">SM</button></div>
    </header>
    <div className="layout">
      <nav aria-label="Primary navigation"><p className="nav-label">WORKSPACE</p>{['Overview','Audit runs','Issue library','Patterns'].map(item => <button key={item} className={active === item ? 'nav-active' : ''} onClick={() => setActive(item)}><span>{item === 'Overview' ? '◈' : item === 'Audit runs' ? '◷' : item === 'Issue library' ? '◎' : '◇'}</span>{item}</button>)}<div className="nav-bottom"><button><span>?</span>Help center</button><button><span>⚙</span>Preferences</button></div></nav>
      <main id="workspace">
        <section className="intro"><div><p className="eyebrow">WEDNESDAY, OCTOBER 21</p><h1>Make the next click<br/><i>work for everyone.</i></h1><p className="lede">A calm place to spot barriers, turn findings into fixes, and keep your product team moving.</p></div><button className="primary" onClick={runAudit}><span>✦</span> Run new audit</button></section>
        {toast && <div role="status" className="toast">✓ {toast}</div>}
        <section className="metrics" aria-label="Audit summary"><article><span className="metric-icon violet">◒</span><div><b>78</b><small>Accessibility score</small></div><span className="up">+6 this week</span></article><article><span className="metric-icon coral">!</span><div><b>5</b><small>Open findings</small></div><span className="neutral">2 need review</span></article><article><span className="metric-icon gold">✓</span><div><b>14</b><small>Resolved this month</small></div><span className="up">On a roll</span></article></section>
        <section className="workgrid">
          <article className="journey"><div className="section-head"><div><p className="eyebrow">YOUR AUDIT JOURNEY</p><h2>Checkout flow</h2></div><button className="more" aria-label="More options">•••</button></div><div className="progress"><div><span>Discovery</span><b>100%</b><i className="full"/></div><div><span>Fixing</span><b>60%</b><i className="sixty"/></div><div><span>Verification</span><b>—</b><i/></div></div><div className="journey-foot"><div className="faces"><span>J</span><span>M</span><span>A</span></div><span>Last updated 14 min ago</span><button>Open audit <b>→</b></button></div></article>
          <aside className="lens"><p className="eyebrow">VIEWING LENS</p><h2>Experience it differently</h2><p>See common friction points before your customers do.</p><div className="lens-buttons"><button className={mode === 'contrast' ? 'selected' : ''} onClick={() => setMode('contrast')}>◐ <span>High contrast</span></button><button className={mode === 'large' ? 'selected' : ''} onClick={() => setMode('large')}>A<span>Text size</span></button><button className={mode === 'calm' ? 'selected' : ''} onClick={() => setMode('calm')}>≋ <span>Reduce motion</span></button></div></aside>
        </section>
        <section className="findings"><div className="finding-head"><div><p className="eyebrow">PRIORITY QUEUE</p><h2>Findings that deserve a look</h2></div><div className="filters" role="group" aria-label="Filter findings">{[['all','All'],['critical','Critical'],['serious','Serious'],['moderate','Moderate']].map(([key, label]) => <button key={key} onClick={() => setFilter(key)} className={filter === key ? 'filter-active' : ''}>{label}</button>)}</div></div><div className="finding-list">{visible.map((item, index) => <article className="finding" key={item.title}><button className={`check ${done.includes(index) ? 'checked' : ''}`} onClick={() => complete(index)} aria-label={`Mark ${item.title} resolved`}>{done.includes(index) ? '✓' : ''}</button><div className={`severity ${item.severity}`}>{item.severity}</div><div className="finding-copy"><div><b>{item.title}</b><span className="tag">{item.tag}</span></div><p>{item.detail}</p></div><button className="fix" onClick={() => { setToast(`Fix guidance: ${item.fix}`); setTimeout(() => setToast(''), 5000) }}>View fix <span>→</span></button></article>)}</div></section>
      </main>
    </div>
  </div>
}
createRoot(document.getElementById('root')).render(<App />)
