import { useMemo, useState } from 'react';
import { FileText, Network, Search, SendHorizontal, ShieldCheck, UploadCloud } from 'lucide-react';
import { mockGraphData } from '../utils/graphUtils';

const initialPromptSuggestions = [
  'Find me direct links involving Rafiq Hassan.',
  'Map the stolen vehicle network around Amina Noor.',
  'Show relationships around the warehouse assault.',
  'Trace the shared routes between the logistics cell and the drug trade.'
];

const initialMessages = [
  {
    id: 'welcome',
    sender: 'ai',
    text: 'Welcome to the intelligence desk. Upload your files and ask a question to generate the connected crime network.'
  }
];

function NetworkGraph({ data }) {
  const nodeMap = useMemo(() => new Map(data.nodes.map((node) => [node.id, node])), [data]);

  return (
    <div className="graph-canvas" aria-label="Crime network graph">
      <svg className="graph-svg" viewBox="0 0 1100 760" preserveAspectRatio="xMidYMid meet">
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="8" refX="8" refY="4" orient="auto">
            <path d="M0,0 L10,4 L0,8 Z" fill="#8ec5ff" />
          </marker>
        </defs>

        {data.edges.map((edge, index) => {
          const from = nodeMap.get(edge.source);
          const to = nodeMap.get(edge.target);

          if (!from || !to) return null;

          const dx = to.x - from.x;
          const dy = to.y - from.y;
          const bendX = from.x + dx / 2;
          const bendY = from.y + dy / 2 - (index % 2 === 0 ? 52 : 18);
          const textX = from.x + dx / 2;
          const textY = from.y + dy / 2 - (index % 2 === 0 ? 72 : 42);

          return (
            <g key={`${edge.source}-${edge.target}-${index}`}>
              <path
                d={`M ${from.x} ${from.y} Q ${bendX} ${bendY} ${to.x} ${to.y}`}
                className="graph-edge"
                markerEnd="url(#arrowhead)"
              />
              <text x={textX} y={textY} className="graph-label">
                {edge.label}
              </text>
            </g>
          );
        })}
      </svg>

      {data.nodes.map((node) => (
        <div
          key={node.id}
          className={`graph-node ${node.type} ${node.central ? 'central' : ''}`}
          style={{ left: `${node.x}px`, top: `${node.y}px` }}
        >
          <span className="node-tag">{node.type === 'person' ? 'Person' : 'Crime'}</span>
          <strong>{node.name}</strong>
        </div>
      ))}
    </div>
  );
}

export default function CrimeDashboard() {
  const [files, setFiles] = useState([]);
  const [query, setQuery] = useState('Find me direct links involving Rafiq Hassan.');
  const [messages, setMessages] = useState(initialMessages);
  const [graphVisible, setGraphVisible] = useState(false);

  const handleFileUpload = (event) => {
    const fileList = Array.from(event.target.files || []).slice(0, 2);
    setFiles(fileList);
  };

  const handleSendQuery = (promptText) => {
    const trimmedText = (promptText ?? query).trim();
    if (!trimmedText) return;

    setMessages((current) => [
      ...current,
      { id: `${Date.now()}-user`, sender: 'officer', text: trimmedText }
    ]);

    setQuery('');
    setGraphVisible(true);

    window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        {
          id: `${Date.now()}-ai`,
          sender: 'ai',
          text: 'Based on the uploaded case materials and mock intelligence feed, the strongest pattern is a connected chain around Rafiq Hassan. The graph shows overlap between the car-jacking cell, vehicle theft ring, and the logistics network with direct relationship labels tied to shared actors and crimes.'
        }
      ]);
    }, 250);
  };

  return (
    <div className="crime-dashboard">
      <header className="gov-header">
        <div className="brand-block">
          <div className="brand-mark">CL</div>
          <div>
            <p className="eyebrow">Government intelligence portal</p>
            <h1>Crime Lens 2.0</h1>
          </div>
        </div>

        <div className="header-actions">
          <div className="status-pill success">
            <ShieldCheck size={14} />
            Live mock feed
          </div>
          <button type="button" className="ghost-button">
            Export report
          </button>
        </div>
      </header>

      <main className="dashboard-main">
        <section className="chat-panel" aria-label="Officer chat panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Investigation workspace</p>
              <h2>Officer chat</h2>
            </div>
            <div className="panel-chip">
              <Network size={14} />
              Full-screen primary interface
            </div>
          </div>

          <div className="upload-box">
            <label className="file-upload" htmlFor="case-files">
              <UploadCloud size={18} />
              <span>Upload up to 2 files</span>
            </label>
            <input id="case-files" type="file" multiple onChange={handleFileUpload} accept=".pdf,.doc,.docx,.txt,.csv" />
            <div className="file-list">
              {files.length > 0 ? (
                files.map((file) => <span key={file.name}>{file.name}</span>)
              ) : (
                <span className="empty-state">No file selected yet</span>
              )}
            </div>
          </div>

          <div className="chat-history" aria-live="polite">
            {messages.map((message) => (
              <div key={message.id} className={`message ${message.sender}`}>
                <div className="avatar">{message.sender === 'officer' ? 'O' : 'AI'}</div>
                <div className="message-body">
                  <p>{message.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="prompt-suggestions">
            {initialPromptSuggestions.map((prompt) => (
              <button key={prompt} type="button" className="prompt-chip" onClick={() => handleSendQuery(prompt)}>
                <Search size={14} />
                {prompt}
              </button>
            ))}
          </div>

          <div className="composer">
            <textarea
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Type a query, e.g. Find me direct links involving Rafiq Hassan..."
              rows={3}
            />
            <button type="button" className="send-button" onClick={() => handleSendQuery(query)}>
              <SendHorizontal size={18} />
              Send query
            </button>
          </div>
        </section>

        <aside className="graph-panel" aria-label="Crime network graph panel">
          <div className="panel-heading graph-heading">
            <div>
              <p className="eyebrow">Connected intelligence</p>
              <h2>Crime network graph</h2>
            </div>
            <div className="panel-chip muted">
              <FileText size={14} />
              Mock data only
            </div>
          </div>

          <div className="graph-summary">
            <div>
              <span>Central entity</span>
              <strong>Rafiq Hassan</strong>
            </div>
            <div>
              <span>Connected crimes</span>
              <strong>4 linked nodes</strong>
            </div>
            <div>
              <span>Relationship depth</span>
              <strong>Multi-layer</strong>
            </div>
          </div>

          {!graphVisible ? (
            <div className="empty-graph">
              <Network size={42} />
              <h3>Awaiting investigation query</h3>
              <p>The network graph will appear here after the officer asks a targeted question.</p>
            </div>
          ) : (
            <NetworkGraph data={mockGraphData} />
          )}
        </aside>
      </main>
    </div>
  );
}
