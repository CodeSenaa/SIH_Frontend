import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';

const navItems = ['Overview', 'Entity Graph', 'Timeline', 'Case Workspace', 'Alerts', 'Search', 'Reports', 'Audit Log', 'Admin'];

const stats = [
  { label: 'Active Case Operations', value: '14', detail: 'Ongoing' },
  { label: 'High-Risk Suspects', value: '08', detail: 'Critical watchlist' },
  { label: 'Signal Intercepts', value: '1,429', detail: 'Leads today' },
  { label: 'Evidence Reviews', value: '06', detail: 'Unassigned' },
];

const riskSignals = [
  { risk: 'CRIT', source: 'SIM / Border Zone', confidence: '97%', note: 'Coordinated activation pattern with cross-border handoff' },
  { risk: 'HIGH', source: 'Hawala Ledger', confidence: '91%', note: '₹1.8Cr routing anomaly tied to shell entities' },
  { risk: 'MED', source: 'Vehicle Telemetry', confidence: '76%', note: 'Repeated round trips to safehouse cluster' },
  { risk: 'LOW', source: 'Call Metadata', confidence: '63%', note: 'Low-signal correlation under review' },
];

const graphNodes = [
  { id: 'ravi', name: 'Ravi Desai', role: 'Central Person', x: 50, y: 42, type: 'person', size: 'large' },
  { id: 'mehul', name: 'Mehul Saran', role: 'Driver', x: 23, y: 28, type: 'person' },
  { id: 'asha', name: 'Asha Verma', role: 'Broker', x: 74, y: 25, type: 'person' },
  { id: 'nitin', name: 'Nitin Shah', role: 'Fence', x: 18, y: 63, type: 'person' },
  { id: 'neha', name: 'Neha Kulkarni', role: 'Logistics', x: 66, y: 68, type: 'person' },
  { id: 'karan', name: 'Karan Iyer', role: 'Receiver', x: 38, y: 80, type: 'person' },
  { id: 'ganesh', name: 'G. Street', role: 'Safehouse', x: 82, y: 56, type: 'entity' },
  { id: 'ledger', name: 'Silverline Ledger', role: 'Shell Business', x: 48, y: 15, type: 'entity' },
];

const graphCrimes = [
  { id: 'carJacking', name: 'Car Jacking', x: 35, y: 57 },
  { id: 'smuggling', name: 'Vehicle Smuggling', x: 64, y: 56 },
  { id: 'moneyLaundering', name: 'Money Laundering', x: 55, y: 22 },
  { id: 'fakeDocuments', name: 'Fake IDs', x: 79, y: 38 },
];

const graphLinks = [
  { source: 'ravi', sourceType: 'person', target: 'carJacking', targetType: 'crime', label: 'Mastermind behind' },
  { source: 'ravi', sourceType: 'person', target: 'moneyLaundering', targetType: 'crime', label: 'Funds routed through' },
  { source: 'carJacking', sourceType: 'crime', target: 'mehul', targetType: 'person', label: 'Was involved with Ravi in car jacking.' },
  { source: 'carJacking', sourceType: 'crime', target: 'nitin', targetType: 'person', label: 'Shared getaway plan' },
  { source: 'moneyLaundering', sourceType: 'crime', target: 'asha', targetType: 'person', label: 'Brokered money trail' },
  { source: 'smuggling', sourceType: 'crime', target: 'neha', targetType: 'person', label: 'Coordinated logistics' },
  { source: 'fakeDocuments', sourceType: 'crime', target: 'karan', targetType: 'person', label: 'Identity laundering' },
  { source: 'mehul', sourceType: 'person', target: 'smuggling', targetType: 'crime', label: 'Vehicle transfer chain' },
  { source: 'asha', sourceType: 'person', target: 'fakeDocuments', targetType: 'crime', label: 'Created fake records' },
  { source: 'neha', sourceType: 'person', target: 'ganesh', targetType: 'entity', label: 'Safehouse coordination' },
  { source: 'ledger', sourceType: 'entity', target: 'moneyLaundering', targetType: 'crime', label: 'Shell accounts used' },
  { source: 'ravi', sourceType: 'person', target: 'neha', targetType: 'person', label: 'Operational contact' },
  { source: 'mehul', sourceType: 'person', target: 'asha', targetType: 'person', label: 'Shared vehicle handoff' },
  { source: 'nitin', sourceType: 'person', target: 'karan', targetType: 'person', label: 'Reinforced storage loop' },
];

const initialMessages = [
  { sender: 'system', text: 'Case engine ready. Upload two files or ask for a network summary.' },
  { sender: 'officer', text: 'Find me suspicious links around Ravi Desai and the car jacking network.' },
  { sender: 'system', text: 'I found a linked cluster including Mehul Saran, Nitin Shah, and Asha Verma. The graph highlights the shared car jacking route and financial laundering trail.' },
];

const buildAssistantReply = (query) => {
  const lower = query.toLowerCase();

  if (lower.includes('car') || lower.includes('jacking')) {
    return 'The strongest cluster appears around Ravi Desai, linked to a car jacking ring involving Mehul Saran and Nitin Shah. Asha Verma is tied to the money trail and fake documentation, while Neha Kulkarni coordinates safehouse logistics.';
  }

  if (lower.includes('money') || lower.includes('laundering')) {
    return 'The network shows a laundering chain through Silverline Ledger and Asha Verma, with Ravi Desai acting as the central coordinator. The route connects shell entities, document forgery, and later vehicle transfers.';
  }

  return 'I identified a connected network of suspects and crimes. Ravi Desai remains the central figure, supported by transport, document falsification, and safehouse logistics nodes. The graph is designed to show the relationship and crime context clearly.';
};

export default function App() {
  const [uploads, setUploads] = useState([]);
  const [query, setQuery] = useState('Find me suspicious links around Ravi Desai and the car jacking network.');
  const [messages, setMessages] = useState(initialMessages);
  const [activeQuery, setActiveQuery] = useState('Find me suspicious links around Ravi Desai and the car jacking network.');
  const fileInputRef = useRef(null);
  const statCardRefs = useRef([]);
  const graphRef = useRef(null);
  const prototypeNoteRef = useRef(null);

  useEffect(() => {
    const cards = statCardRefs.current.filter(Boolean);

    cards.forEach((card) => {
      const handleMove = (event) => {
        const rect = card.getBoundingClientRect();
        const offsetX = (event.clientX - rect.left) / rect.width;
        const offsetY = (event.clientY - rect.top) / rect.height;
        const rotateY = (offsetX - 0.5) * 12;
        const rotateX = (0.5 - offsetY) * 12;

        gsap.to(card, {
          rotateX,
          rotateY,
          x: (offsetX - 0.5) * 8,
          y: (offsetY - 0.5) * 8,
          scale: 1.01,
          duration: 0.28,
          ease: 'power2.out',
        });
      };

      const handleLeave = () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.45,
          ease: 'power3.out',
        });
      };

      card.addEventListener('pointermove', handleMove);
      card.addEventListener('pointerleave', handleLeave);

      return () => {
        card.removeEventListener('pointermove', handleMove);
        card.removeEventListener('pointerleave', handleLeave);
      };
    });
  }, []);

  useEffect(() => {
    const container = graphRef.current;
    if (!container) return;

    const lines = container.querySelectorAll('.link-line, .link-label');
    const nodes = container.querySelectorAll('.graph-node, .crime-node');

    if (!lines.length && !nodes.length) return;

    gsap.fromTo(
      lines,
      { opacity: 0, scaleX: 0.3 },
      { opacity: 1, scaleX: 1, duration: 1.1, ease: 'power2.out', stagger: 0.05 }
    );

    gsap.fromTo(
      nodes,
      { opacity: 0, y: 18, scale: 0.92 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.6)', stagger: 0.08, delay: 0.12 }
    );

    nodes.forEach((node) => {
      node.addEventListener('pointerenter', () => {
        gsap.to(node, { scale: 1.08, duration: 0.25, ease: 'power2.out' });
      });

      node.addEventListener('pointerleave', () => {
        gsap.to(node, { scale: 1, duration: 0.3, ease: 'power2.out' });
      });
    });

    return () => {
      nodes.forEach((node) => {
        node.onpointerenter = null;
        node.onpointerleave = null;
      });
    };
  }, []);

  useEffect(() => {
    const card = prototypeNoteRef.current;
    if (!card) return;

    gsap.fromTo(
      card,
      { opacity: 0, y: 18, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power2.out' }
    );

    const handleMove = (event) => {
      const rect = card.getBoundingClientRect();
      const offsetX = (event.clientX - rect.left) / rect.width;
      const offsetY = (event.clientY - rect.top) / rect.height;

      gsap.to(card, {
        rotateX: (0.5 - offsetY) * 3.5,
        rotateY: (offsetX - 0.5) * 4.5,
        y: -2,
        duration: 0.35,
        ease: 'power2.out',
      });
    };

    const handleLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        y: 0,
        duration: 0.45,
        ease: 'power3.out',
      });
    };

    card.addEventListener('pointermove', handleMove);
    card.addEventListener('pointerleave', handleLeave);

    return () => {
      card.removeEventListener('pointermove', handleMove);
      card.removeEventListener('pointerleave', handleLeave);
    };
  }, []);

  const nodeMap = useMemo(
    () => Object.fromEntries(graphNodes.map((node) => [node.id, node])),
    []
  );

  const crimeMap = useMemo(
    () => Object.fromEntries(graphCrimes.map((crime) => [crime.id, crime])),
    []
  );

  const handleUpload = (event) => {
    const selectedFiles = Array.from(event.target.files || []);
    if (!selectedFiles.length) return;

    const nextFiles = selectedFiles.slice(0, 2);
    setUploads((previous) => [...previous, ...nextFiles].slice(0, 2));
    event.target.value = '';
  };

  const handleQuerySubmit = (event) => {
    event.preventDefault();
    const trimmed = query.trim();

    if (!trimmed) return;

    setMessages((previous) => [
      ...previous,
      { sender: 'officer', text: trimmed },
      { sender: 'system', text: buildAssistantReply(trimmed) },
    ]);

    setActiveQuery(trimmed);
    setQuery('');
  };

  return (
    <div className="app-shell">
      <div className="classification-bar">RESTRICTED // FOR AUTHORIZED LAW ENFORCEMENT & INTELLIGENCE PERSONNEL ONLY (FOUO)</div>

      <header className="topbar">
        <div className="brand-block">
          <div className="brand-logo-wrap">
            <img src="/logo.jpeg" alt="NATINT Intelligence Studio logo" className="brand-mark" />
          </div>
          <div className="brand-copy">
            <span className="brand-tag">CrimeLens</span>
            <div className="brand-title">NATINT Intelligence Studio</div>
            <div className="brand-subtitle">Operation Phantom Ledger</div>
          </div>
        </div>

        <div className="case-switcher">
          <span className="label">CASE</span>
          <strong>Op Phantom</strong>
        </div>

        <div className="search-box">
          <span>Search</span>
          <kbd>Ctrl + K</kbd>
        </div>

        <div className="utility-cluster">
          <div className="font-scaler">A- A A+</div>
          <div className="session-pill">09:42 remaining</div>
          <div className="profile-pill">
            <span className="avatar">IO</span>
            <span>Badge 2-17 / Level-4</span>
          </div>
        </div>
      </header>

      <div className="workspace-layout">
        <aside className="sidebar">
          {navItems.map((item, index) => (
            <button key={item} className={index === 1 ? 'nav-item active' : 'nav-item'} type="button">
              <span className="nav-dot" />
              {item}
            </button>
          ))}
        </aside>

        <main className="main-panel">
          <div className="breadcrumb">Home / Operations / Operation Phantom Ledger / Entity Graph</div>

          <section className="stats-grid" aria-label="System metrics">
            {stats.map((stat, index) => (
              <article
                key={stat.label}
                ref={(element) => {
                  statCardRefs.current[index] = element;
                }}
                className="stat-card"
              >
                <div className="stat-label">{stat.label}</div>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-detail">{stat.detail}</div>
              </article>
            ))}
          </section>

          <div className="dashboard-grid">
            <section className="panel graph-panel">
              <div className="panel-header">
                <div>
                  <p className="eyebrow">Criminal network explorer</p>
                  <h2>Crime / Relationship Graph</h2>
                </div>
                <button type="button" className="ghost-button">Filter Risk</button>
              </div>

              <div ref={graphRef} className="graph-shell">
                <svg className="graph-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-label="Crime network graph">
                  {graphLinks.map((link) => {
                    const source = link.sourceType === 'person' ? nodeMap[link.source] : crimeMap[link.source];
                    const target = link.targetType === 'person' ? nodeMap[link.target] : crimeMap[link.target] || nodeMap[link.target];

                    if (!source || !target) return null;

                    const midX = (source.x + target.x) / 2;
                    const midY = (source.y + target.y) / 2;

                    return (
                      <g key={`${link.source}-${link.target}-${link.label}`}>
                        <line x1={source.x} y1={source.y} x2={target.x} y2={target.y} className="link-line" />
                        <text x={midX} y={midY - 2} className="link-label" textAnchor="middle">
                          {link.label}
                        </text>
                      </g>
                    );
                  })}
                </svg>

                {graphNodes.map((node) => (
                  <div key={node.id} className={`graph-node ${node.type} ${node.size === 'large' ? 'large' : ''}`} style={{ left: `${node.x}%`, top: `${node.y}%` }}>
                    <span className="node-badge">{node.role}</span>
                    <strong>{node.name}</strong>
                  </div>
                ))}

                {graphCrimes.map((crime) => (
                  <div key={crime.id} className="crime-node" style={{ left: `${crime.x}%`, top: `${crime.y}%` }}>
                    <span>{crime.name}</span>
                  </div>
                ))}
              </div>
            </section>

            <aside className="intel-panel">
              <div className="panel upload-panel">
                <div className="panel-header compact">
                  <div>
                    <p className="eyebrow">Intelligence intake</p>
                    <h2>File Upload</h2>
                  </div>
                </div>

                <button type="button" className="primary-button" onClick={() => fileInputRef.current?.click()}>
                  Upload case files
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".pdf,.csv,.doc,.docx,.txt,.jpg,.jpeg,.png"
                  onChange={handleUpload}
                  className="hidden-input"
                />

                <div className="file-count">{uploads.length}/2 files uploaded</div>
                <ul className="file-list">
                  {uploads.length ? (
                    uploads.map((file, index) => (
                      <li key={`${file.name}-${index}`}>
                        <span>{file.name}</span>
                        <button type="button" onClick={() => setUploads((prev) => prev.filter((_, itemIndex) => itemIndex !== index))}>Remove</button>
                      </li>
                    ))
                  ) : (
                    <li className="empty-file">No files selected</li>
                  )}
                </ul>
              </div>

              <div className="panel chat-panel">
                <div className="panel-header compact">
                  <div>
                    <p className="eyebrow">Officer assistant</p>
                    <h2>Case Chat</h2>
                  </div>
                </div>

                <div className="message-list">
                  {messages.map((message, index) => (
                    <div key={`${message.sender}-${index}`} className={`message ${message.sender}`}>
                      {message.text}
                    </div>
                  ))}
                </div>

                <form onSubmit={handleQuerySubmit} className="chat-form">
                  <label className="sr-only" htmlFor="chat-query">Chat query</label>
                  <textarea
                    id="chat-query"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Find me suspicious links around Ravi Desai..."
                    rows={3}
                  />
                  <div className="chat-actions">
                    <button type="button" className="secondary-button">Recent</button>
                    <button type="submit" className="primary-button">Run query</button>
                  </div>
                </form>
              </div>
            </aside>
          </div>

          <section className="panel prototype-note" ref={prototypeNoteRef}>
            <p className="eyebrow">Prototype intent</p>
            <h2>What this screen demonstrates</h2>
            <ul>
              <li>Government-portal interface styling for an investigation dashboard.</li>
              <li>Officer can upload a maximum of two files and view them in the intake panel.</li>
              <li>Natural-language queries are entered in chat and mapped to a mock crime network graph.</li>
              <li>The graph visually links people, crimes, and supporting entities with relationship labels.</li>
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
}
