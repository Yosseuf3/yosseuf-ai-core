"use client";

import { useMemo, useState } from "react";

const nav = [
  ["⌘", "Overview"],
  ["◉", "Identity Engine"],
  ["◇", "Asset Manager"],
  ["✦", "Prompt Composer"],
  ["▷", "Production Pipeline"],
  ["◐", "Brand System"],
];

const assets = [
  { name: "Hero product shot", type: "Image", meta: "2400 × 1600", tone: "lilac" },
  { name: "Launch film cut", type: "Video", meta: "00:34", tone: "blue" },
  { name: "Voice guidelines", type: "Document", meta: "12 pages", tone: "paper" },
];

export default function Home() {
  const [active, setActive] = useState("Overview");
  const [copied, setCopied] = useState(false);
  const [draft, setDraft] = useState("A cinematic product portrait of a modular AI workspace, soft directional light, obsidian and electric violet palette, precise editorial composition.");
  const [running, setRunning] = useState(false);
  const [notice, setNotice] = useState("");
  const words = useMemo(() => draft.trim().split(/\s+/).filter(Boolean).length, [draft]);

  function runPipeline() {
    setRunning(true);
    setNotice("Production run #024 queued successfully");
    window.setTimeout(() => setRunning(false), 1400);
  }

  function copyPrompt() {
    navigator.clipboard?.writeText(draft);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <main className="shell" dir="ltr">
      <aside className="sidebar">
        <div className="brand-mark"><span>Y</span><b>YOSSEUF</b><small>AI CORE</small></div>
        <nav aria-label="Primary navigation">
          {nav.map(([icon, label]) => (
            <button key={label} className={active === label ? "nav-item active" : "nav-item"} onClick={() => setActive(label)}>
              <span>{icon}</span>{label}{label === "Production Pipeline" && <i>3</i>}
            </button>
          ))}
        </nav>
        <div className="sidebar-foot">
          <div className="usage"><span>Monthly usage</span><b>68%</b><div><i /></div><small>6,820 / 10,000 credits</small></div>
          <button className="profile"><span>YA</span><div><b>Yosseuf Ali</b><small>Creative director</small></div><em>•••</em></button>
        </div>
      </aside>

      <section className="workspace">
        <header>
          <div><p>YOSSEUF AI CORE / <span>{active.toUpperCase()}</span></p><h1>{active === "Overview" ? "Creative command center" : active}</h1></div>
          <div className="header-actions"><button className="icon-btn" aria-label="Search">⌕</button><button className="icon-btn notification" aria-label="Notifications">○</button><button className="primary" onClick={runPipeline}>{running ? "Queuing…" : "+  New production"}</button></div>
        </header>

        <div className="content">
          <section className="hero-card">
            <div className="eyebrow"><i /> SYSTEM ONLINE · V1.0</div>
            <h2>One intelligent core.<br/><span>Every creative output.</span></h2>
            <p>Build identities, compose high-fidelity prompts, and move ideas through production without losing the signal that makes your brand distinct.</p>
            <div className="hero-actions"><button className="primary" onClick={() => document.getElementById("composer")?.scrollIntoView({behavior:"smooth"})}>Compose a prompt <span>→</span></button><button className="ghost" onClick={() => setActive("Brand System")}>View brand system</button></div>
            <div className="orb" aria-hidden="true"><div className="orb-core"/><div className="orbit one"/><div className="orbit two"/></div>
          </section>

          <section className="metrics" aria-label="Core metrics">
            <article><div><small>ACTIVE IDENTITIES</small><b>12</b></div><span className="up">↗ 2 this month</span></article>
            <article><div><small>ASSETS MANAGED</small><b>1,284</b></div><span>+46 this week</span></article>
            <article><div><small>PRODUCTIONS</small><b>87</b></div><span className="up">92% success</span></article>
            <article><div><small>BRAND CONSISTENCY</small><b>96.4%</b></div><span className="up">↗ 4.2%</span></article>
          </section>

          <div className="grid">
            <section className="panel identity-panel">
              <div className="panel-head"><div><span className="panel-icon violet">◉</span><h3>Identity Engine</h3><small>Your active creative identities</small></div><button onClick={() => setActive("Identity Engine")}>View all →</button></div>
              <div className="identity-list">
                <article><div className="avatar aurora">A</div><div><b>Aurora Labs</b><small>Technology · Visionary</small></div><span className="status">ACTIVE</span></article>
                <article><div className="avatar mono">M</div><div><b>Maison Noire</b><small>Fashion · Minimalist</small></div><span className="status">ACTIVE</span></article>
                <article><div className="avatar terra">T</div><div><b>Terra Forma</b><small>Architecture · Organic</small></div><span className="status muted">DRAFT</span></article>
              </div>
              <button className="add-identity" onClick={() => setNotice("Identity creation is ready for configuration")}>＋ Create new identity</button>
            </section>

            <section className="panel composer" id="composer">
              <div className="panel-head"><div><span className="panel-icon amber">✦</span><h3>Prompt Composer</h3><small>Turn direction into precision</small></div><span className="live"><i/> LIVE</span></div>
              <label>CREATIVE DIRECTION</label>
              <textarea value={draft} onChange={(e) => setDraft(e.target.value)} aria-label="Creative direction" />
              <div className="prompt-meta"><span>{words} words · GPT-4.1 optimized</span><button onClick={copyPrompt}>{copied ? "Copied ✓" : "Copy"}</button></div>
              <div className="chips"><button>Editorial</button><button>Cinematic</button><button>16:9</button><button>＋</button></div>
              <button className="generate" onClick={runPipeline}>{running ? "Building production…" : "Generate production  →"}</button>
            </section>

            <section className="panel assets-panel">
              <div className="panel-head"><div><span className="panel-icon cyan">◇</span><h3>Recent Assets</h3><small>Synced across your workspace</small></div><button onClick={() => setActive("Asset Manager")}>Open library →</button></div>
              <div className="asset-grid">{assets.map(asset => <article key={asset.name}><div className={`thumb ${asset.tone}`}><span>{asset.type === "Video" ? "▶" : asset.type === "Document" ? "Aa" : "✦"}</span></div><b>{asset.name}</b><small>{asset.type} · {asset.meta}</small></article>)}</div>
            </section>

            <section className="panel pipeline-panel">
              <div className="panel-head"><div><span className="panel-icon green">▷</span><h3>Production Pipeline</h3><small>Live operations</small></div><button onClick={() => setActive("Production Pipeline")}>View pipeline →</button></div>
              <div className="pipeline-row"><span>023</span><div><b>Aurora launch campaign</b><small>12 outputs · Started 18m ago</small></div><div className="progress"><i/></div><em>84%</em></div>
              <div className="pipeline-row"><span>022</span><div><b>Maison SS26 editorial</b><small>8 outputs · Completed</small></div><div className="progress done"><i/></div><em>100%</em></div>
              <div className="pipeline-row"><span>021</span><div><b>Terra identity study</b><small>4 outputs · Review needed</small></div><div className="progress review"><i/></div><em>Review</em></div>
            </section>
          </div>
        </div>
      </section>
      {notice && <button className="toast" onClick={() => setNotice("")}>{notice}<span>×</span></button>}
    </main>
  );
}
