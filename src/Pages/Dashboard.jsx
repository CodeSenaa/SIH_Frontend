import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import {
  Paperclip,
  Zap,
  AlertCircle,
  CheckCircle2,
  FileSpreadsheet,
  FileText,
  UploadCloud,
  X,
  Lock
} from 'lucide-react';
import NetworkGraph, { DEFAULT_GRAPH_DATA } from './NetworkGraph';
import TimelineView from '../components/Timeline/TimelineView';
import CaseWorkspaceView from '../components/CaseWorkspace/CaseWorkspaceView';

const navItems = ['Investigate', 'Entity Graph', 'Timeline', 'Case Workspace', 'Alerts', 'Search', 'Reports', 'Audit Log', 'Admin'];

const stats = [
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

const samplePrompts = [
  'Find me suspicious links around Ravi Desai and the car jacking network.',
  'Trace money laundering trail and shell accounts tied to Silverline Ledger.',
  'Map safehouse coordinates and logistics handoffs via Neha Kulkarni.',
];

const sampleEvidencePresets = [
  { name: 'FIR_442_CarJacking_Nexus.pdf', size: 1840000, type: 'application/pdf' },
  { name: 'Hawala_Ledger_Silverline.csv', size: 3420000, type: 'text/csv' },
  { name: 'CDR_Interception_Dump_Ravi.csv', size: 2150000, type: 'text/csv' },
];

const initialMessages = [];

const buildAssistantReply = (query, attachedFiles = []) => {
  const lower = query.toLowerCase();
  const fileContext = attachedFiles && attachedFiles.length > 0
    ? ` Evidence ingested from ${attachedFiles.join(' & ')}.`
    : '';

  if (lower.includes('car') || lower.includes('jacking')) {
    return `Cross-referencing entity links from case evidence.${fileContext} The strongest cluster appears around Ravi Desai, linked to a car jacking ring involving Mehul Saran and Nitin Shah. Asha Verma is tied to the money trail and fake documentation, while Neha Kulkarni coordinates safehouse logistics.`;
  }

  if (lower.includes('money') || lower.includes('laundering')) {
    return `Cross-referencing financial ledgers and shell routing.${fileContext} The network shows a laundering chain through Silverline Ledger and Asha Verma, with Ravi Desai acting as the central coordinator. The route connects shell entities, document forgery, and later vehicle transfers.`;
  }

  return `Parsed case evidence records.${fileContext} I identified a connected network of suspects and crimes. Ravi Desai remains the central figure, supported by transport, document falsification, and safehouse logistics nodes. The graph is designed to show the relationship and crime context clearly.`;
};

export default function Dashboard({ onNavigateToLanding }) {
  const [activeTab, setActiveTab] = useState('Entity Graph');
  const [uploads, setUploads] = useState([]);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState(initialMessages);
  const [activeQuery, setActiveQuery] = useState('');
  const [isGraphOpen, setIsGraphOpen] = useState(false);
  const [isLoadingGraph, setIsLoadingGraph] = useState(false);
  const [loadingStep, setLoadingStep] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  // Font scale accessibility state
  const [fontScale, setFontScale] = useState('md'); // 'sm' | 'md' | 'lg'

  // Interactive session countdown timer (initialized to 09:42 = 582s)
  const [sessionSeconds, setSessionSeconds] = useState(582);
  const [showSessionNotice, setShowSessionNotice] = useState(false);

  useEffect(() => {
    const scaleMap = {
      sm: '14px',
      md: '16px',
      lg: '18px',
    };
    document.documentElement.style.fontSize = scaleMap[fontScale] || '16px';
    return () => {
      document.documentElement.style.fontSize = '';
    };
  }, [fontScale]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSessionSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleExtendSession = () => {
    setSessionSeconds((prev) => (prev <= 0 ? 600 : prev + 600));
    setShowSessionNotice(true);
    setTimeout(() => setShowSessionNotice(false), 2400);
  };

  const formatSessionTime = (seconds) => {
    if (seconds <= 0) return '00:00';
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const timerRef = useRef(null);
  const stepTimerRef = useRef([]);
  const fileInputRef = useRef(null);
  const statCardRefs = useRef([]);
  const graphRef = useRef(null);
  const prototypeNoteRef = useRef(null);
  const messagesEndRef = useRef(null);
  const sideMessagesEndRef = useRef(null);

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
    if (!isGraphOpen) return;
    const container = graphRef.current;
    if (!container) return;

    const lines = container.querySelectorAll('.link-line, .link-label');
    const nodes = container.querySelectorAll('.graph-node, .crime-node');

    gsap.fromTo(
      container,
      { opacity: 0, y: 20, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power2.out' }
    );

    if (!lines.length && !nodes.length) return;

    gsap.fromTo(
      lines,
      { opacity: 0, scaleX: 0.3 },
      { opacity: 1, scaleX: 1, duration: 1.1, ease: 'power2.out', stagger: 0.05, delay: 0.1 }
    );

    gsap.fromTo(
      nodes,
      { opacity: 0, y: 18, scale: 0.92 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.6)', stagger: 0.08, delay: 0.2 }
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
  }, [isGraphOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    sideMessagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isGraphOpen]);

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

  const formatFileSize = (bytes) => {
    if (!bytes) return '1.8 MB';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const handleUpload = (event) => {
    const selectedFiles = Array.from(event.target.files || []);
    if (!selectedFiles.length) return;

    const formattedFiles = selectedFiles.map((file) => ({
      name: file.name,
      size: file.size,
      type: file.type,
      isLocal: true,
    }));

    setUploads((previous) => {
      const combined = [...previous, ...formattedFiles].slice(0, 2);
      if (combined.length > 0) {
        setUploadError('');
      }
      return combined;
    });
    event.target.value = '';
  };

  const handleAddPresetFile = (preset) => {
    setUploads((previous) => {
      if (previous.some((f) => f.name === preset.name)) return previous;
      const updated = [...previous, preset].slice(0, 2);
      if (updated.length > 0) {
        setUploadError('');
      }
      return updated;
    });
  };

  const handleRemoveFile = (index) => {
    setUploads((previous) => previous.filter((_, i) => i !== index));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files || []);
    if (!droppedFiles.length) return;

    const formattedFiles = droppedFiles.map((file) => ({
      name: file.name,
      size: file.size,
      type: file.type,
      isLocal: true,
    }));

    setUploads((previous) => {
      const combined = [...previous, ...formattedFiles].slice(0, 2);
      if (combined.length > 0) {
        setUploadError('');
      }
      return combined;
    });
  };

  const triggerGraphSynthesis = (submittedText) => {
    setIsLoadingGraph(true);
    setLoadingStep('Ingesting case dossiers & CDR call records...');

    if (timerRef.current) clearTimeout(timerRef.current);
    stepTimerRef.current.forEach((t) => clearTimeout(t));
    stepTimerRef.current = [];

    const steps = [
      { delay: 1200, text: 'Cross-referencing IMEI identifiers & Hawala shell ledgers...' },
      { delay: 2600, text: 'Resolving entity aliases & high-risk suspect clusters...' },
      { delay: 4100, text: 'Computing safehouse coordinates & link weights...' },
      { delay: 5200, text: 'Finalizing interactive relationship graph...' },
    ];

    steps.forEach(({ delay, text }) => {
      const t = setTimeout(() => {
        setLoadingStep(text);
      }, delay);
      stepTimerRef.current.push(t);
    });

    timerRef.current = setTimeout(() => {
      setIsLoadingGraph(false);
      setIsGraphOpen(true);
      setActiveTab('Entity Graph');
    }, 6000); // 6.0s realistic synthesis delay (between 5-7s)
  };

  const handleQuerySubmit = (event) => {
    if (event) event.preventDefault();
    if (isLoadingGraph) return;

    const trimmed = query.trim() || 'Ravi Desai syndicate & car jacking nexus';
    const fileNames = uploads.length > 0
      ? uploads.map((f) => f.name)
      : ['FIR_442_CarJacking_Nexus.pdf', 'Hawala_Ledger_Silverline.csv'];

    setUploadError('');
    setMessages((previous) => [
      ...previous,
      { sender: 'officer', text: trimmed, attachedFiles: fileNames },
      { sender: 'system', text: buildAssistantReply(trimmed, fileNames) },
    ]);

    setActiveQuery(trimmed);
    setQuery('');
    triggerGraphSynthesis(trimmed);
  };

  const handleSelectPrompt = (promptText) => {
    if (isLoadingGraph) return;
    setQuery(promptText);

    const fileNames = uploads.length > 0
      ? uploads.map((f) => f.name)
      : ['FIR_442_CarJacking_Nexus.pdf', 'Hawala_Ledger_Silverline.csv'];

    setUploadError('');
    setMessages((previous) => [
      ...previous,
      { sender: 'officer', text: promptText, attachedFiles: fileNames },
      { sender: 'system', text: buildAssistantReply(promptText, fileNames) },
    ]);

    setActiveQuery(promptText);
    setQuery('');
    triggerGraphSynthesis(promptText);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      stepTimerRef.current.forEach((t) => clearTimeout(t));
    };
  }, []);

  return (
    <div className="app-shell">

      <header className="topbar">
        <div className="brand-block" onClick={onNavigateToLanding} role="button" tabIndex={0} style={{ cursor: 'pointer' }} title="Return to Overview / Landing">
          <div className="brand-logo-wrap">
            <img src="/logo.jpeg" alt="CrimeLens logo" className="brand-mark" />
          </div>
          <div className="brand-copy">
            <span className="brand-tag">CrimeLens</span>
          </div>
        </div>

        <div className="case-switcher">
          <span className="label">CASE</span>
          <strong>FIR 10-30256</strong>
        </div>


        <div className="utility-cluster">
          <div className="font-scaler" role="group" aria-label="Font size controls">
            <button
              type="button"
              className={`font-scaler-btn ${fontScale === 'sm' ? 'active' : ''}`}
              onClick={() => setFontScale('sm')}
              title="Decrease font size (Small)"
            >
              A-
            </button>
            <button
              type="button"
              className={`font-scaler-btn ${fontScale === 'md' ? 'active' : ''}`}
              onClick={() => setFontScale('md')}
              title="Default font size (Normal)"
            >
              A
            </button>
            <button
              type="button"
              className={`font-scaler-btn ${fontScale === 'lg' ? 'active' : ''}`}
              onClick={() => setFontScale('lg')}
              title="Increase font size (Large)"
            >
              A+
            </button>
          </div>

          <button
            type="button"
            className={`session-pill ${sessionSeconds <= 60 ? 'danger' : sessionSeconds <= 180 ? 'warning' : ''}`}
            onClick={handleExtendSession}
            title="Click to extend session (+10m)"
          >
            <span className="session-pill-dot" />
            <span>
              {sessionSeconds > 0
                ? `${formatSessionTime(sessionSeconds)} remaining`
                : 'Session expired (Extend)'}
            </span>
            {showSessionNotice && (
              <span className="session-extend-toast">+10m Extended</span>
            )}
          </button>
        </div>
      </header>

      <div className="workspace-layout">
        <aside className="sidebar">
          {navItems.map((item) => (
            <button
              key={item}
              className={item === activeTab ? 'nav-item active' : 'nav-item'}
              type="button"
              onClick={() => {
                if (item === 'Overview') {
                  setActiveTab('Overview');
                } else {
                  setActiveTab(item);
                  if (item === 'Entity Graph') {
                    setIsGraphOpen(true);
                  }
                }
              }}
            >
              <span className="nav-dot" />
              {item}
            </button>
          ))}
        </aside>

        <main className={`main-panel ${activeTab === 'Entity Graph' ? 'graph-fullspace' : ''}`}>
          {activeTab !== 'Entity Graph' && (
            <div className="breadcrumb">Home / Operations / Operation Phantom Ledger / {activeTab}</div>
          )}

          {activeTab === 'Entity Graph' ? (
            <section className="fullspace-graph-container">
              <NetworkGraph
                activeQuery={activeQuery}
                onClose={() => setActiveTab('Overview')}
              />
            </section>
          ) : activeTab === 'Timeline' ? (
            <TimelineView />
          ) : activeTab === 'Case Workspace' ? (
            <CaseWorkspaceView />
          ) : (
            <>
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

              <section className="panel chat-focus-panel">
                <div className="chat-focus-header">
                  <div className="chat-focus-heading-group">

                    <h2>Entity Graph Intelligence Chat</h2>

                  </div>

                  <div className="intake-actions-group">
                    <button
                      type="button"
                      className="primary-button compact"
                      onClick={() => {
                        setActiveTab('Entity Graph');
                        setIsGraphOpen(true);
                      }}
                      title="Open full interactive entity graph directly"
                    >
                      Open Entity Graph
                    </button>


                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept=".pdf,.csv,.doc,.docx,.txt,.jpg,.jpeg,.png"
                      onChange={handleUpload}
                      className="hidden-input"
                    />
                  </div>
                </div>

                {uploads.length > 0 && (
                  <div className="chat-focus-files-bar">
                    <span className="files-bar-label">Active Case Dossier Files:</span>
                    {uploads.map((file, index) => (
                      <span key={`${file.name}-${index}`} className="file-chip">
                        {file.name.endsWith('.csv') ? <FileSpreadsheet size={13} /> : <FileText size={13} />}
                        <span className="chip-file-name">{file.name}</span>
                        <span className="chip-file-size">({formatFileSize(file.size)})</span>
                        <button
                          type="button"
                          aria-label={`Remove ${file.name}`}
                          onClick={() => handleRemoveFile(index)}
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                    <span className="files-bar-ready-tag"><CheckCircle2 size={12} style={{ display: 'inline', marginRight: 4 }} /> Evidence Indexed</span>
                  </div>
                )}

                <div className="chat-focus-message-feed">
                  {messages.map((message, index) => (
                    <div
                      key={`${message.sender}-${index}`}
                      className={`focus-message ${message.sender}`}
                    >
                      <div className="focus-message-role">
                        {message.sender === 'system' ? '' : 'Officer (Badge 2-17)'}
                      </div>
                      <div className="focus-message-text">{message.text}</div>
                      {message.attachedFiles && message.attachedFiles.length > 0 && (
                        <div className="message-attached-evidence">
                          <span className="evidence-tag-title"><Paperclip size={12} style={{ display: 'inline', marginRight: 4 }} /> Evidence Transmitted:</span>
                          <div className="evidence-tags-list">
                            {message.attachedFiles.map((fn, fIdx) => (
                              <span key={`${fn}-${fIdx}`} className="evidence-tag-chip">
                                {fn}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {isLoadingGraph && (
                  <div className="graph-loading-overlay">
                    <div className="graph-loading-modal">
                      <div className="spinner-ring">
                        <div className="spinner-core" />
                      </div>
                      <div className="loading-status-wrap">
                        <div className="loading-title">Synthesizing Entity Graph...</div>
                        <div className="loading-step-text">{loadingStep}</div>
                        <div className="loading-bar-track">
                          <div className="loading-bar-fill" />
                        </div>
                        <div className="loading-subnote">Processing CDR links, Hawala logs &amp; cross-border safehouses</div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="quick-prompts-container">
                  <div className="quick-prompts-header">
                    <span className="quick-prompts-title">Select quick inquiry to synthesize network:</span>
                    {uploads.length === 0 && (
                      <span className="quick-prompts-note">
                        *Pick an inquiry or attach evidence to proceed
                      </span>
                    )}
                  </div>
                  <div className="quick-prompts-chips">
                    {samplePrompts.map((prompt) => (
                      <button
                        key={prompt}
                        type="button"
                        disabled={isLoadingGraph}
                        className="prompt-chip-btn"
                        onClick={() => handleSelectPrompt(prompt)}
                      >
                        <span className="chip-icon"><Zap size={13} /></span>
                        <span>{prompt}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <form onSubmit={handleQuerySubmit} className="chat-focus-input-form">
                  {uploadError && (
                    <div className="upload-requirement-alert" role="alert">
                      <div className="alert-content">
                        <AlertCircle size={18} className="alert-icon" />
                        <div className="alert-text">
                          <strong>Evidence File Required:</strong> {uploadError}
                        </div>
                      </div>
                      <button
                        type="button"
                        className="alert-attach-btn"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Paperclip size={13} /> Attach File Now
                      </button>
                    </div>
                  )}

                  <div
                    className={`chat-input-container ${isDragging ? 'drag-active' : ''} ${uploads.length === 0 ? 'needs-file' : 'file-attached'}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    {/* Evidence Intake Dock */}
                    <div className="evidence-dock-header">
                      <div className="evidence-dock-title">
                        <Paperclip size={14} className="dock-clip-icon" />
                        <span>Case Evidence Intake</span>
                        {uploads.length === 0 ? (
                          <span className="dock-req-tag mandatory">
                            <span className="pulsing-warn-dot" /> Min. 1 File Required
                          </span>
                        ) : (
                          <span className="dock-req-tag validated">
                            <CheckCircle2 size={13} /> {uploads.length}/2 Files Attached &amp; Validated
                          </span>
                        )}
                      </div>

                      <div className="evidence-dock-controls">
                        {uploads.length < 2 && (
                          <button
                            type="button"
                            className="dock-browse-btn"
                            onClick={() => fileInputRef.current?.click()}
                          >
                            <UploadCloud size={13} /> Browse Computer
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Attached cards or empty dropzone */}
                    {uploads.length > 0 ? (
                      <div className="attached-files-row">
                        {uploads.map((file, index) => (
                          <div key={`${file.name}-${index}`} className="evidence-pill-card">
                            <div className="evidence-pill-icon">
                              {file.name.endsWith('.csv') ? (
                                <FileSpreadsheet size={16} />
                              ) : (
                                <FileText size={16} />
                              )}
                            </div>
                            <div className="evidence-pill-meta">
                              <span className="evidence-pill-name" title={file.name}>{file.name}</span>
                              <span className="evidence-pill-size">{formatFileSize(file.size)}</span>
                            </div>
                            <span className="evidence-ready-badge">Ready</span>
                            <button
                              type="button"
                              className="evidence-pill-del"
                              onClick={() => handleRemoveFile(index)}
                              title="Remove file"
                              aria-label={`Remove ${file.name}`}
                            >
                              <X size={13} />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div
                        className="empty-evidence-dropzone"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <div className="dropzone-callout">
                          <UploadCloud size={22} className="dropzone-cloud-icon" />
                          <div className="dropzone-callout-text">
                            <strong>Attach Case Evidence (At least 1 file required)</strong>
                            <span>Drag &amp; drop or click to upload CDR logs, Hawala records, FIR, or forensic data (.pdf, .csv, .doc, .png)</span>
                          </div>
                        </div>
                        <div className="dropzone-presets" onClick={(e) => e.stopPropagation()}>
                          <span className="presets-caption">Quick evidence samples:</span>
                          <div className="preset-buttons-row">
                            {sampleEvidencePresets.map((preset) => (
                              <button
                                key={preset.name}
                                type="button"
                                className="preset-file-btn"
                                onClick={() => handleAddPresetFile(preset)}
                                title={`Quick attach ${preset.name}`}
                              >
                                + {preset.name.split('_')[0]} Sample
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Textarea */}
                    <textarea
                      id="chat-focus-input"
                      value={query}
                      disabled={isLoadingGraph}
                      onChange={(event) => {
                        setQuery(event.target.value);
                        if (uploadError && uploads.length > 0) setUploadError('');
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleQuerySubmit(e);
                        }
                      }}
                      placeholder={
                        isLoadingGraph
                          ? 'Synthesizing entity network graph... please wait'
                          : uploads.length === 0
                            ? 'Attach at least 1 case file above, then enter suspect name or query (e.g. Find me suspicious links around Ravi Desai)...'
                            : 'Enter suspect name, syndicate query, or crime nexus (e.g. Find me suspicious links around Ravi Desai and the car jacking network)...'
                      }
                      rows={3}
                      autoFocus
                    />

                    {/* Action Bar */}
                    <div className="chat-focus-actions">
                      <div className="actions-meta-bar">
                        <button
                          type="button"
                          className={`dock-attach-trigger-btn ${uploads.length >= 2 ? 'disabled' : ''}`}
                          onClick={() => fileInputRef.current?.click()}
                          disabled={uploads.length >= 2}
                        >
                          <Paperclip size={14} />
                          <span>{uploads.length ? `Attach File (${uploads.length}/2)` : 'Attach Evidence'}</span>
                        </button>

                        <span className="input-shortcut-hint">
                          {isLoadingGraph ? (
                            <span className="hint-processing">
                              <span className="mini-spinner" /> Loading graph...
                            </span>
                          ) : (
                            <>Press <kbd>Enter</kbd> to transmit &amp; open Entity Graph</>
                          )}
                        </span>
                      </div>

                      <button
                        type="submit"
                        disabled={isLoadingGraph}
                        className="primary-button send-and-open-btn"
                        title="Transmit query and open entity graph"
                      >
                        {isLoadingGraph ? (
                          <>
                            <span className="btn-spinner" />
                            <span>Opening Graph...</span>
                          </>
                        ) : (
                          <>
                            <span>Transmit &amp; Open Entity Graph</span>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                              <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </section>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
