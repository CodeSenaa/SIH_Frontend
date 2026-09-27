import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  User,
  Users,
  Phone,
  Car,
  MapPin,
  FileText,
  Search,
  Maximize2,
  RotateCcw,
  Plus,
  Minus,
  AlertTriangle,
  ExternalLink,
  ChevronRight,
  HelpCircle,
  X,
  CheckCircle2,
  Info,
  Layers,
  Sparkles
} from 'lucide-react';

/* ================= TYPES & STYLING TOKENS ================= */
export const ENTITY_TYPES = {
  suspect: {
    label: 'Suspect',
    color: '#dc2626',
    border: '#b91c1c',
    bg: '#fef2f2',
    halo: '#fca5a5',
    icon: User,
    badgeBg: 'rgba(220, 38, 38, 0.1)',
    badgeColor: '#b91c1c'
  },
  person: {
    label: 'Associate',
    color: '#ea580c',
    border: '#c2410c',
    bg: '#fff7ed',
    halo: '#fdba74',
    icon: Users,
    badgeBg: 'rgba(234, 88, 12, 0.1)',
    badgeColor: '#c2410c'
  },
  phone: {
    label: 'Phone / SIM',
    color: '#0284c7',
    border: '#0369a1',
    bg: '#f0f9ff',
    halo: '#7dd3fc',
    icon: Phone,
    badgeBg: 'rgba(2, 132, 199, 0.1)',
    badgeColor: '#0369a1'
  },
  vehicle: {
    label: 'Vehicle',
    color: '#b45309',
    border: '#92400e',
    bg: '#fffbeb',
    halo: '#fcd34d',
    icon: Car,
    badgeBg: 'rgba(180, 83, 9, 0.1)',
    badgeColor: '#92400e'
  },
  location: {
    label: 'Location',
    color: '#059669',
    border: '#047857',
    bg: '#ecfdf5',
    halo: '#6ee7b7',
    icon: MapPin,
    badgeBg: 'rgba(5, 150, 105, 0.1)',
    badgeColor: '#047857'
  },
  case: {
    label: 'FIR / Case',
    color: '#7c3aed',
    border: '#6d28d9',
    bg: '#f5f3ff',
    halo: '#c4b5fd',
    icon: FileText,
    badgeBg: 'rgba(124, 58, 237, 0.1)',
    badgeColor: '#6d28d9'
  }
};

/* ================= DEFAULT SYNTHETIC INTELLIGENCE DATA ================= */
export const DEFAULT_GRAPH_DATA = {
  nodes: [
    {
      id: 'rahul',
      label: 'Rahul Sharma',
      type: 'suspect',
      dup: 'rsharma',
      role: 'Prime Accused',
      attrs: [
        { key: 'Age', val: '32' },
        { key: 'Residence', val: 'Gwalior (Civil Lines)' },
        { key: 'Alias', val: '“Rahu”' },
        { key: 'Legal Status', val: 'Accused — FIR #102/2026' },
        { key: 'Risk Rating', val: 'CRITICAL (Tier-1)' }
      ],
      ev: [
        { doc: 'FIR #102/2026.pdf', page: 'p. 2', quote: '…Rahul Sharma s/o M., resident of Gwalior, along with 2 unknown operatives…' },
        { doc: 'Case Diary #102', page: 'p. 7', quote: '…two males met near the bypass, 14 Jun, 22:40 hrs in carrier truck…' }
      ]
    },
    {
      id: 'vikram',
      label: 'Vikram Singh',
      type: 'suspect',
      role: 'Co-Accused',
      attrs: [
        { key: 'Age', val: '27' },
        { key: 'Residence', val: 'Bhopal Central' },
        { key: 'Legal Status', val: 'Accused — FIR #051/2026' },
        { key: 'Interception', val: 'Depot Tower CDR ping' }
      ],
      ev: [
        { doc: 'FIR #051/2026.pdf', page: 'p. 2', quote: '…accused Vikram Singh, resident of Bhopal, fleeing scene…' },
        { doc: 'CDR — FIR #051', page: 'p. 1', quote: 'Number +91 XXXXX 4521 active near depot sector 4 on 29 Jun.' }
      ]
    },
    {
      id: 'dinesh',
      label: 'Dinesh Kumar',
      type: 'person',
      role: 'Syndicate Hub / Broker',
      attrs: [
        { key: 'Age', val: '41' },
        { key: 'Network Role', val: 'Central Hub (Connects 3 Clusters)' },
        { key: 'Financial Tie', val: 'Hawala routing nexus' }
      ],
      ev: [
        { doc: 'CDR Intercepts May–Jun', page: 'p. 3', quote: '42 outgoing calls to +91 XXXXX 4521 over 14 days.' },
        { doc: 'Case Diary #102', page: 'p. 12', quote: '…middleman referred to as “Dinesh of Indore” handling consignments…' }
      ]
    },
    {
      id: 'suresh',
      label: 'Suresh Yadav',
      type: 'person',
      role: 'Courier / Driver',
      attrs: [
        { key: 'Age', val: '24' },
        { key: 'Network Role', val: 'Peripheral Transport Node' },
        { key: 'Status', val: 'Under active surveillance' }
      ],
      ev: [
        { doc: 'Case Diary #051', page: 'p. 9', quote: '…Suresh was seen near the depot maneuvering vehicle MP04 XX 1234…' }
      ]
    },
    {
      id: 'rsharma',
      label: 'R. Sharma',
      type: 'person',
      unresolved: true,
      role: 'Unresolved Identity',
      attrs: [
        { key: 'Record Status', val: 'Incomplete Identity — Suspected Alias' },
        { key: 'Similarity', val: '87% match with Rahul Sharma' },
        { key: 'Jurisdiction', val: 'Indore Crime Branch' }
      ],
      ev: [
        { doc: 'FIR #157/2026.pdf', page: 'p. 3', quote: '…consignee named as R. Sharma (full verified particulars pending)…' }
      ]
    },
    {
      id: 'p4521',
      label: '+91 XXXXX 4521',
      type: 'phone',
      role: 'Syndicate Hot SIM',
      attrs: [
        { key: 'Telecom Circle', val: 'MP & CG Circle' },
        { key: 'First Detected', val: '04 Jun 2026' },
        { key: 'Linked Cases', val: 'FIR #102, FIR #051, FIR #157' }
      ],
      ev: [
        { doc: 'FIR #102/2026 Recovery Memo', page: 'p. 4', quote: 'Handset seized with SIM +91 XXXXX 4521 active during offense.' },
        { doc: 'CDR Cross-Analysis #157', page: 'p. 2', quote: 'Direct packet transmission to burner SIM +91 XXXXX 1102.' }
      ]
    },
    {
      id: 'p8830',
      label: '+91 XXXXX 8830',
      type: 'phone',
      role: 'Personal Phone',
      attrs: [
        { key: 'Registered To', val: 'Dinesh Kumar' },
        { key: 'KYC Status', val: 'Verified Aadhaar KYC' },
        { key: 'Call Volume', val: 'High-frequency burst calls' }
      ],
      ev: [
        { doc: 'CDR May–Jun Intercepts', page: 'p. 3', quote: 'Registered subscriber confirmed as Dinesh Kumar, Indore.' }
      ]
    },
    {
      id: 'p1102',
      label: '+91 XXXXX 1102',
      type: 'phone',
      role: 'Burner SIM',
      attrs: [
        { key: 'Activated', val: '28 Jun 2026' },
        { key: 'Usage Pattern', val: 'Dark SIM — Short bursts only' }
      ],
      ev: [
        { doc: 'CDR — FIR #157', page: 'p. 2', quote: 'New SIM activated 28 Jun with 18 calls immediately preceding theft.' }
      ]
    },
    {
      id: 'v1234',
      label: 'MP04 XX 1234',
      type: 'vehicle',
      role: 'Carrier Truck',
      attrs: [
        { key: 'Type', val: 'Heavy Freight Carrier' },
        { key: 'Status', val: 'Seized & Impounded (FIR #102)' },
        { key: 'Alert', val: 'Spotted at depot 18 days after reported recovery' }
      ],
      ev: [
        { doc: 'FIR #102/2026.pdf', page: 'p. 4', quote: '…vehicle MP04 XX 1234 recovered near Gwalior bypass toll…' },
        { doc: 'FIR #051/2026.pdf', page: 'p. 1', quote: 'Identical registration spotted at Bhopal depot perimeter on 30 Jun.' }
      ]
    },
    {
      id: 'v7788',
      label: 'MP09 YY 7788',
      type: 'vehicle',
      role: 'Logistics SUV',
      attrs: [
        { key: 'Vehicle Class', val: 'SUV / Escort Vehicle' },
        { key: 'Status', val: 'Under surveillance' }
      ],
      ev: [
        { doc: 'CCTV ANPR Log — Indore', page: 'p. 2', quote: 'Plate captured crossing warehouse toll gate at 01:14 hrs, 02 Jul.' }
      ]
    },
    {
      id: 'locGw',
      label: 'Gwalior Hub',
      type: 'location',
      role: 'Primary Scene',
      attrs: [
        { key: 'Classification', val: 'Crime Scene (FIR #102)' },
        { key: 'Jurisdiction', val: 'Civil Lines PS, Gwalior' }
      ],
      ev: [
        { doc: 'FIR #102/2026.pdf', page: 'p. 1', quote: 'Primary hijacking scene at National Highway 44 junction.' }
      ]
    },
    {
      id: 'locBh',
      label: 'Bhopal Depot',
      type: 'location',
      role: 'Rendezvous Point',
      attrs: [
        { key: 'Classification', val: 'Transit & Transfer Point' },
        { key: 'Surveillance', val: 'CCTV footage preserved' }
      ],
      ev: [
        { doc: 'FIR #051/2026.pdf', page: 'p. 1', quote: 'Freight yard depot identified as staging location for illicit transfer.' }
      ]
    },
    {
      id: 'locIn',
      label: 'Indore Warehouse',
      type: 'location',
      role: 'Storage Safehouse',
      attrs: [
        { key: 'Classification', val: 'Suspected Stash Warehouse' },
        { key: 'Activity', val: 'Repeated nocturnal entries' }
      ],
      ev: [
        { doc: 'CCTV Log — Industrial Area Indore', page: 'p. 2', quote: 'Repeated night movements between 23:00 and 04:00 May–Jul.' }
      ]
    },
    {
      id: 'fir102',
      label: 'FIR #102',
      type: 'case',
      role: 'Hijacking Case',
      attrs: [
        { key: 'Filing Date', val: '12 Jun 2026' },
        { key: 'IPC Sections', val: 'IPC 379, 411, 120-B' },
        { key: 'Station', val: 'Civil Lines PS, Gwalior' }
      ],
      ev: [
        { doc: 'FIR #102/2026 Official Copy', page: 'p. 1', quote: 'Commercial carrier freight theft with illicit tracking spoof.' }
      ]
    },
    {
      id: 'fir051',
      label: 'FIR #051',
      type: 'case',
      role: 'Depot Theft',
      attrs: [
        { key: 'Filing Date', val: '30 Jun 2026' },
        { key: 'IPC Sections', val: 'IPC 379, 34' },
        { key: 'Station', val: 'Govindpura PS, Bhopal' }
      ],
      ev: [
        { doc: 'FIR #051/2026 Official Copy', page: 'p. 1', quote: 'Stolen goods handoff at Bhopal central goods depot.' }
      ]
    },
    {
      id: 'fir157',
      label: 'FIR #157',
      type: 'case',
      role: 'Interstate Fencing',
      attrs: [
        { key: 'Filing Date', val: '08 Jul 2026' },
        { key: 'IPC Sections', val: 'IPC 411, 414' },
        { key: 'Station', val: 'Palasia PS, Indore' }
      ],
      ev: [
        { doc: 'FIR #157/2026 Official Copy', page: 'p. 3', quote: 'Recovery of diverted parts from unlicensed commercial garage.' }
      ]
    }
  ],
  links: [
    { s: 'rahul', t: 'p4521', l: 'Uses SIM', documented: true },
    {
      s: 'vikram',
      t: 'p4521',
      l: 'Shared SIM',
      flag: true,
      flagReason: 'Common MSISDN shared across two distinct accused records',
      ev: [
        { doc: 'FIR #051/2026.pdf', page: 'p. 2', quote: 'Contact number listed under Vikram Singh secondary disclosures.' },
        { doc: 'CDR — FIR #102', page: 'p. 4', quote: 'Cell tower handshake in Gwalior during commission of offense.' }
      ]
    },
    {
      s: 'rsharma',
      t: 'p4521',
      l: '87% Match',
      inf: true,
      ev: [
        { doc: 'CDR — FIR #157', page: 'p. 2', quote: 'Number active at same geofence coordinate as R. Sharma delivery.' }
      ]
    },
    { s: 'rahul', t: 'v1234', l: 'Driver', documented: true },
    {
      s: 'vikram',
      t: 'v1234',
      l: 'Sighting',
      flag: true,
      flagReason: 'Vehicle MP04 XX 1234 spotted with Vikram 18 days after reported recovery',
      ev: [
        { doc: 'FIR #051/2026.pdf', page: 'p. 1', quote: 'Vehicle MP04 XX 1234 witnessed at depot on 30 Jun with suspect.' }
      ]
    },
    { s: 'v1234', t: 'fir102', l: 'Seized In', documented: true },
    {
      s: 'v1234',
      t: 'fir051',
      l: 'Resurfaced',
      inf: true,
      ev: [
        { doc: 'FIR #051/2026.pdf', page: 'p. 1', quote: 'Sighting logged 18 days post official recovery memo.' }
      ]
    },
    { s: 'rahul', t: 'fir102', l: 'Accused', documented: true },
    { s: 'vikram', t: 'fir051', l: 'Accused', documented: true },
    { s: 'rsharma', t: 'fir157', l: 'Buyer', documented: true },
    { s: 'dinesh', t: 'p8830', l: 'Owner', documented: true },
    { s: 'dinesh', t: 'p1102', l: 'Burner', documented: true },
    {
      s: 'p8830',
      t: 'p4521',
      l: '42 Calls',
      flag: true,
      flagReason: 'High frequency communication cluster preceding each case event',
      ev: [
        { doc: 'CDR Intelligence May–Jun', page: 'p. 3', quote: '42 calls recorded between parties, terminating right before raid.' }
      ]
    },
    { s: 'dinesh', t: 'locIn', l: 'Visits', documented: true },
    { s: 'suresh', t: 'locBh', l: 'Sighted', documented: true },
    { s: 'vikram', t: 'locBh', l: 'Meeting', documented: true },
    { s: 'rahul', t: 'locGw', l: 'Base', documented: true },
    { s: 'locGw', t: 'fir102', l: 'Crime Scene', documented: true },
    { s: 'p1102', t: 'fir157', l: 'Intercept', documented: true },
    { s: 'v7788', t: 'locIn', l: 'Safehouse', documented: true },
    { s: 'suresh', t: 'v7788', l: 'Operator', documented: true },
    {
      s: 'rahul',
      t: 'dinesh',
      l: '2 Mutual',
      inf: true,
      ev: [
        { doc: 'Network Topology Engine', page: '—', quote: 'Mutual graph nodes: +91 XXXXX 4521 and Indore Warehouse perimeter.' }
      ]
    }
  ],
  flags: [
    {
      id: 'f1',
      target: 'p4521',
      icon: Phone,
      title: 'Shared Syndicate Phone',
      description: 'MSISDN +91 XXXXX 4521 is shared across 3 individuals in FIR #102 & #051',
      severity: 'critical'
    },
    {
      id: 'f2',
      target: 'v1234',
      icon: Car,
      title: 'Vehicle Resurfacing Anomaly',
      description: 'Truck MP04 XX 1234 appears in FIR #051 18 days after official seizure in FIR #102',
      severity: 'high'
    },
    {
      id: 'f3',
      target: 'rsharma',
      icon: Users,
      title: 'Identity Resolution Candidate',
      description: 'Candidate duplicate: R. Sharma ↔ Rahul Sharma (87% confidence based on SIM & geography)',
      severity: 'medium'
    }
  ]
};

/* ================= CLEAN WELL-SPACED NON-OVERLAPPING COORDINATES ================= */
export const INITIAL_COORDINATES = {
  // NW: Case 102 Hijacking & Gwalior Hub
  fir102:   { x: -400, y: -240 },
  locGw:    { x: -540, y: -90 },
  
  // North / Center-North: Prime Accused & Carrier Truck
  rahul:    { x: -170, y: -100 },
  v1234:    { x: 130,  y: -250 },
  
  // NE: Case 051 & Co-Accused & Depot Location
  fir051:   { x: 450,  y: -250 },
  vikram:   { x: 390,  y: -40 },
  locBh:    { x: 170,  y: -50 },

  // West / Mid-Left: SUV & Courier
  v7788:    { x: -480, y: 170 },
  suresh:   { x: -260, y: 190 },

  // Center: Safehouse Hub
  locIn:    { x: -60,  y: 200 },

  // Center-East: Syndicate Hot SIM
  p4521:    { x: 210,  y: 170 },

  // South-West: Broker & personal/burner SIMs
  dinesh:   { x: -130, y: 400 },
  p8830:    { x: -370, y: 470 },
  p1102:    { x: 90,   y: 480 },

  // South-East: Case 157 & Buyer / Candidate
  fir157:   { x: 370,  y: 350 },
  rsharma:  { x: 450,  y: 510 },
};

/* ================= MAIN NETWORK GRAPH COMPONENT ================= */
export default function NetworkGraph({
  data = DEFAULT_GRAPH_DATA,
  activeQuery = '',
  onClose,
  embedded = false
}) {
  const svgRef = useRef(null);
  const containerRef = useRef(null);

  // Nodes & Links state initialized with clean deterministic coordinates
  const [nodes, setNodes] = useState(() => {
    return data.nodes.map(n => {
      const c = INITIAL_COORDINATES[n.id] || { x: 0, y: 0 };
      return { ...n, x: c.x, y: c.y };
    });
  });

  const links = data.links;
  const flags = data.flags || [];

  // Pan / Zoom ViewBox state
  const [view, setView] = useState({ x: -680, y: -380, w: 1360, h: 960 });
  const [isPanning, setIsPanning] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedLink, setSelectedLink] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);

  // Dragging & Panning references
  const dragRef = useRef(null);
  const panRef = useRef(null);
  const didDragNode = useRef(false);
  const didMovePan = useRef(false);
  const toastTimer = useRef(null);
  const pointerRafId = useRef(null);
  const pendingPointerEvent = useRef(null);

  // Synchronous view reference kept updated on every render
  const viewRef = useRef(view);
  viewRef.current = view;

  const nodeMap = useMemo(() => Object.fromEntries(nodes.map(n => [n.id, n])), [nodes]);

  const showToast = (msg) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToastMessage(msg);
    toastTimer.current = setTimeout(() => setToastMessage(''), 2600);
  };

  // Coordinated degrees (connections count)
  const nodeDegrees = useMemo(() => {
    const map = {};
    nodes.forEach(n => (map[n.id] = 0));
    links.forEach(l => {
      if (map[l.s] !== undefined) map[l.s]++;
      if (map[l.t] !== undefined) map[l.t]++;
    });
    return map;
  }, [nodes, links]);

  // Connected node IDs for high-risk / selected highlight
  const neighborIds = useMemo(() => {
    if (!selectedNode && !selectedLink) return null;
    const set = new Set();
    if (selectedNode) {
      set.add(selectedNode.id);
      links.forEach(l => {
        if (l.s === selectedNode.id) set.add(l.t);
        if (l.t === selectedNode.id) set.add(l.s);
      });
    } else if (selectedLink) {
      set.add(selectedLink.s);
      set.add(selectedLink.t);
    }
    return set;
  }, [selectedNode, selectedLink, links]);

  // Fit View to bounds
  const handleFitView = useCallback(() => {
    if (!nodes.length) return;
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    nodes.forEach(n => {
      minX = Math.min(minX, n.x);
      minY = Math.min(minY, n.y);
      maxX = Math.max(maxX, n.x);
      maxY = Math.max(maxY, n.y);
    });

    const pad = 120;
    const svgWidth = svgRef.current?.clientWidth || 1100;
    const svgHeight = svgRef.current?.clientHeight || 800;
    let nw = (maxX - minX) + pad * 2;
    let nh = (maxY - minY) + pad * 2;
    const ar = svgWidth / svgHeight;

    if (nw / nh < ar) {
      nw = nh * ar;
    } else {
      nh = nw / ar;
    }

    const nx = (minX + maxX) / 2 - nw / 2;
    const ny = (minY + maxY) / 2 - nh / 2;
    const next = { x: nx, y: ny, w: nw, h: nh };
    viewRef.current = next;
    setView(next);
  }, [nodes]);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleFitView();
    }, 60);
    window.addEventListener('resize', handleFitView);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleFitView);
    };
  }, [handleFitView]);

  const handleReset = () => {
    setSelectedNode(null);
    setSelectedLink(null);
    setSearchQuery('');
    setActiveFilter('all');
    handleFitView();
  };

  // Zoom by factor around viewport center
  const handleZoom = useCallback((factor) => {
    const cur = viewRef.current;
    const svgEl = svgRef.current;
    const svgW = svgEl?.clientWidth || 1000;
    const svgH = svgEl?.clientHeight || 700;

    const centerX = cur.x + cur.w / 2;
    const centerY = cur.y + cur.h / 2;

    const nw = Math.max(250, Math.min(7500, cur.w * factor));
    const nh = Math.max(180, Math.min(5400, cur.h * factor));
    const nx = centerX - nw / 2;
    const ny = centerY - nh / 2;

    const next = { x: nx, y: ny, w: nw, h: nh };
    viewRef.current = next;
    setView(next);
  }, []);

  // Convert client pointer to graph coordinate
  const toGraphCoord = useCallback((clientX, clientY) => {
    if (!svgRef.current) return { x: 0, y: 0 };
    const p = svgRef.current.createSVGPoint();
    p.x = clientX;
    p.y = clientY;
    const ctm = svgRef.current.getScreenCTM();
    if (!ctm) return { x: 0, y: 0 };
    return p.matrixTransform(ctm.inverse());
  }, []);

  // Pan Start
  const handleSvgPointerDown = useCallback((e) => {
    if (e.button !== 0) return;
    if (e.target.closest('.interactive-node')) return;
    if (e.target.closest('.netra-floating-controls')) return;
    if (e.target.closest('.netra-canvas-legend')) return;

    panRef.current = {
      startClientX: e.clientX,
      startClientY: e.clientY,
      startView: { ...viewRef.current }
    };
    didMovePan.current = false;
    setIsPanning(true);
  }, []);

  // Node Drag Start
  const handleNodePointerDown = useCallback((e, node) => {
    e.stopPropagation();
    if (e.button !== 0) return;
    const coord = toGraphCoord(e.clientX, e.clientY);
    dragRef.current = {
      id: node.id,
      startX: node.x,
      startY: node.y,
      startCoordX: coord.x,
      startCoordY: coord.y
    };
    didDragNode.current = false;
  }, [toGraphCoord]);

  // Global Pointer Move & Up with requestAnimationFrame throttling for butter-smooth 60fps interaction
  useEffect(() => {
    const processPointerMove = () => {
      pointerRafId.current = null;
      const coords = pendingPointerEvent.current;
      if (!coords) return;

      if (dragRef.current) {
        const dragInfo = dragRef.current;
        const coord = toGraphCoord(coords.clientX, coords.clientY);
        const dx = coord.x - dragInfo.startCoordX;
        const dy = coord.y - dragInfo.startCoordY;

        if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
          didDragNode.current = true;
        }

        const newX = dragInfo.startX + dx;
        const newY = dragInfo.startY + dy;

        setNodes(prev =>
          prev.map(n => (n.id === dragInfo.id ? { ...n, x: newX, y: newY } : n))
        );
        return;
      }

      if (panRef.current) {
        const panInfo = panRef.current;
        if (!panInfo || !panInfo.startView) return;

        const deltaX = coords.clientX - panInfo.startClientX;
        const deltaY = coords.clientY - panInfo.startClientY;

        if (Math.abs(deltaX) > 2 || Math.abs(deltaY) > 2) {
          didMovePan.current = true;
        }

        const svgEl = svgRef.current;
        const svgW = svgEl?.clientWidth || 1000;
        const svgH = svgEl?.clientHeight || 700;
        const scaleX = panInfo.startView.w / svgW;
        const scaleY = panInfo.startView.h / svgH;

        const next = {
          ...panInfo.startView,
          x: panInfo.startView.x - deltaX * scaleX,
          y: panInfo.startView.y - deltaY * scaleY
        };

        viewRef.current = next;
        setView(next);
      }
    };

    const handlePointerMove = (e) => {
      if (!dragRef.current && !panRef.current) return;
      pendingPointerEvent.current = { clientX: e.clientX, clientY: e.clientY };
      if (!pointerRafId.current) {
        pointerRafId.current = requestAnimationFrame(processPointerMove);
      }
    };

    const handlePointerUp = () => {
      dragRef.current = null;
      panRef.current = null;
      pendingPointerEvent.current = null;
      setIsPanning(false);
      if (pointerRafId.current) {
        cancelAnimationFrame(pointerRafId.current);
        pointerRafId.current = null;
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerup', handlePointerUp, { passive: true });
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      if (pointerRafId.current) {
        cancelAnimationFrame(pointerRafId.current);
        pointerRafId.current = null;
      }
    };
  }, [toGraphCoord]);

  // Smooth cursor-centered wheel zoom with passive: false to prevent browser console warnings & page scrolling
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    let wheelRafId = null;
    let pendingZoomFactor = 1;
    let pendingMouseX = 0;
    let pendingMouseY = 0;

    const applyZoom = () => {
      wheelRafId = null;
      const curView = viewRef.current;
      const svgW = svg.clientWidth || 1000;
      const svgH = svg.clientHeight || 700;

      const graphX = curView.x + (pendingMouseX / svgW) * curView.w;
      const graphY = curView.y + (pendingMouseY / svgH) * curView.h;

      const nw = Math.max(250, Math.min(7500, curView.w * pendingZoomFactor));
      const nh = Math.max(180, Math.min(5400, curView.h * pendingZoomFactor));

      const nx = graphX - (pendingMouseX / svgW) * nw;
      const ny = graphY - (pendingMouseY / svgH) * nh;

      pendingZoomFactor = 1;
      const nextView = { x: nx, y: ny, w: nw, h: nh };
      viewRef.current = nextView;
      setView(nextView);
    };

    const onWheelNative = (e) => {
      e.preventDefault();
      e.stopPropagation();

      const rect = svg.getBoundingClientRect();
      pendingMouseX = e.clientX - rect.left;
      pendingMouseY = e.clientY - rect.top;

      const factor = e.deltaY > 0 ? 1.08 : 0.925;
      pendingZoomFactor *= factor;

      if (!wheelRafId) {
        wheelRafId = requestAnimationFrame(applyZoom);
      }
    };

    svg.addEventListener('wheel', onWheelNative, { passive: false });
    return () => {
      svg.removeEventListener('wheel', onWheelNative);
      if (wheelRafId) {
        cancelAnimationFrame(wheelRafId);
      }
    };
  }, []);

  // Esc key clears selection
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedNode(null);
        setSelectedLink(null);
        setSearchQuery('');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filter & Search Matches
  const searchMatchedIds = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const q = searchQuery.toLowerCase().trim();
    const matches = new Set();
    nodes.forEach(n => {
      if (
        n.label.toLowerCase().includes(q) ||
        n.role?.toLowerCase().includes(q) ||
        n.attrs?.some(a => a.val.toLowerCase().includes(q) || a.key.toLowerCase().includes(q))
      ) {
        matches.add(n.id);
      }
    });
    return matches;
  }, [searchQuery, nodes]);

  // Jump to specific entity
  const jumpToNode = (id) => {
    const target = nodeMap[id];
    if (!target) return;
    setSelectedNode(target);
    setSelectedLink(null);
    setIsSidePanelOpen(true);
  };

  return (
    <div className={`netra-graph-container ${embedded ? 'embedded' : ''}`} ref={containerRef}>
      {/* Top Professional Header Bar */}
      <header className="netra-graph-topbar">

        {/* Filter Badges / Chips */}
        <div className="netra-filter-row">
          <span className="netra-filter-label">Filter:</span>
          {['all', 'suspect', 'person', 'phone', 'vehicle', 'location', 'case'].map(type => {
            const isAll = type === 'all';
            const meta = isAll ? null : ENTITY_TYPES[type];
            return (
              <button
                key={type}
                type="button"
                className={`netra-filter-chip ${activeFilter === type ? 'active' : ''}`}
                onClick={() => setActiveFilter(type)}
              >
                {meta && (
                  <span
                    className="filter-dot"
                    style={{ backgroundColor: meta.color }}
                  />
                )}
                <span>{isAll ? 'All' : meta.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search & Actions */}
        <div className="netra-top-actions">
          <div className="netra-search-wrapper">
            <Search size={14} className="netra-search-icon" />
            <input
              type="text"
              className="netra-search-input"
              placeholder="Search suspect, phone, vehicle..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                className="netra-search-clear"
                onClick={() => setSearchQuery('')}
              >
                <X size={12} />
              </button>
            )}
          </div>

          <button
            type="button"
            className="netra-icon-btn"
            onClick={handleFitView}
            title="Fit Entire Graph"
          >
            <Maximize2 size={14} />
            <span>Fit</span>
          </button>

          <button
            type="button"
            className="netra-icon-btn"
            onClick={handleReset}
            title="Reset Filters & Selection"
          >
            <RotateCcw size={14} />
            <span>Reset</span>
          </button>

          {onClose && (
            <button
              type="button"
              className="netra-icon-btn close-action"
              onClick={onClose}
              title="Return to primary chat focus"
            >
              <X size={15} />
            </button>
          )}
        </div>
      </header>

      {/* Main Canvas + Side Panel Layout */}
      <div className="netra-workspace">
        {/* SVG Viewport */}
        <div className="netra-canvas-stage">
          <svg
            ref={svgRef}
            className={`netra-svg-canvas ${isPanning ? 'is-panning' : ''}`}
            viewBox={`${view.x} ${view.y} ${view.w} ${view.h}`}
            preserveAspectRatio="xMidYMid meet"
            onPointerDown={handleSvgPointerDown}
            onClick={() => {
              if (!didMovePan.current) {
                setSelectedNode(null);
                setSelectedLink(null);
              }
            }}
          >
            <defs>
              {/* Subtle grid pattern */}
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(203, 213, 225, 0.4)" strokeWidth="0.8" />
              </pattern>
              {/* Arrow marker for directed edges */}
              <marker
                id="arrow-documented"
                viewBox="0 0 10 10"
                refX="22"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#94a3b8" />
              </marker>
              <marker
                id="arrow-flagged"
                viewBox="0 0 10 10"
                refX="22"
                refY="5"
                markerWidth="6.5"
                markerHeight="6.5"
                orient="auto-start-reverse"
              >
                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#d97706" />
              </marker>
            </defs>

            {/* Background Grid */}
            <rect
              x={view.x - 2000}
              y={view.y - 2000}
              width={view.w + 4000}
              height={view.h + 4000}
              fill="url(#grid)"
            />

            {/* Edges Group */}
            <g className="edges-group">
              {links.map((link, idx) => {
                const source = nodeMap[link.s];
                const target = nodeMap[link.t];
                if (!source || !target) return null;

                const isFlagged = Boolean(link.flag);
                const isInferred = Boolean(link.inf);
                const isSelected = selectedLink === link;
                const isConnectedToSelected =
                  selectedNode && (link.s === selectedNode.id || link.t === selectedNode.id);

                let isDimmed = false;
                if (selectedNode && !isConnectedToSelected) isDimmed = true;
                if (selectedLink && !isSelected) isDimmed = true;
                if (searchMatchedIds && (!searchMatchedIds.has(link.s) && !searchMatchedIds.has(link.t))) {
                  isDimmed = true;
                }
                if (activeFilter !== 'all' && source.type !== activeFilter && target.type !== activeFilter) {
                  isDimmed = true;
                }

                const dx = target.x - source.x;
                const dy = target.y - source.y;
                const dist = Math.sqrt(dx * dx + dy * dy) || 1;

                // Subtle perpendicular offset based on link index to prevent overlapping parallel links
                const perpX = -dy / dist;
                const perpY = dx / dist;
                const offset = (idx % 2 === 0 ? 8 : -8);
                const midX = (source.x + target.x) / 2 + perpX * offset;
                const midY = (source.y + target.y) / 2 + perpY * offset;

                const labelW = Math.max(30, Math.round(link.l.length * 6.2 + 10));

                return (
                  <g
                    key={`${link.s}-${link.t}-${idx}`}
                    className={`edge-item ${isDimmed ? 'dimmed' : ''} ${isSelected ? 'selected' : ''} ${isConnectedToSelected ? 'highlighted' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedLink(link);
                      setSelectedNode(null);
                      setIsSidePanelOpen(true);
                    }}
                  >
                    {/* Thick invisible click hit target */}
                    <line
                      x1={source.x}
                      y1={source.y}
                      x2={target.x}
                      y2={target.y}
                      className="edge-hit-area"
                    />

                    {/* Visible line */}
                    <line
                      x1={source.x}
                      y1={source.y}
                      x2={target.x}
                      y2={target.y}
                      className={`edge-stroke ${isFlagged ? 'flagged' : ''} ${isInferred ? 'inferred' : ''} ${isSelected || isConnectedToSelected ? 'active' : ''}`}
                      markerEnd={isFlagged ? 'url(#arrow-flagged)' : 'url(#arrow-documented)'}
                    />

                    {/* Clean concise edge label */}
                    <g transform={`translate(${midX}, ${midY})`} className="edge-label-group">
                      <rect
                        x={-labelW / 2}
                        y="-7.5"
                        width={labelW}
                        height="15"
                        rx="3"
                        className={`edge-label-bg ${isFlagged ? 'flagged' : ''} ${isSelected ? 'selected' : ''}`}
                      />
                      <text y="3.5" className="edge-label-text">
                        {link.l}
                      </text>
                    </g>
                  </g>
                );
              })}
            </g>

            {/* Nodes Group */}
            <g className="nodes-group">
              {nodes.map(node => {
                const meta = ENTITY_TYPES[node.type] || ENTITY_TYPES.person;
                const IconComponent = meta.icon;
                const isSelected = selectedNode?.id === node.id;
                const isNeighbor = neighborIds?.has(node.id);
                const isMatch = searchMatchedIds ? searchMatchedIds.has(node.id) : true;
                const matchesFilter = activeFilter === 'all' || node.type === activeFilter;

                let isDimmed = false;
                if ((selectedNode || selectedLink) && !isSelected && !isNeighbor) {
                  isDimmed = true;
                }
                if (!isMatch || !matchesFilter) {
                  isDimmed = true;
                }

                return (
                  <g
                    key={node.id}
                    transform={`translate(${node.x}, ${node.y})`}
                    className={`interactive-node ${isDimmed ? 'dimmed' : ''} ${isSelected ? 'selected' : ''}`}
                    onPointerDown={(e) => handleNodePointerDown(e, node)}
                    onClick={(e) => {
                      if (didDragNode.current) return;
                      e.stopPropagation();
                      setSelectedNode(node);
                      setSelectedLink(null);
                      setIsSidePanelOpen(true);
                    }}
                  >
                    {/* Unresolved / Candidate Entity Halo */}
                    {node.unresolved && (
                      <circle
                        r="28"
                        className="unresolved-halo"
                      />
                    )}

                    {/* Selection Ring */}
                    <circle
                      r="25"
                      className="selection-ring"
                    />

                    {/* Invisible Hit Area */}
                    <circle r="26" className="node-hit-circle" />

                    {/* Outer Drop Ring */}
                    <circle
                      r="20"
                      fill={meta.bg}
                      stroke={meta.border}
                      strokeWidth="2"
                      className="node-main-circle"
                    />

                    {/* Center Icon badge */}
                    <foreignObject x="-10" y="-10" width="20" height="20" className="node-icon-fo">
                      <div className="node-icon-wrapper" style={{ color: meta.color }}>
                        <IconComponent size={14} strokeWidth={2.4} />
                      </div>
                    </foreignObject>

                    {/* Entity Name Label */}
                    <g transform="translate(0, 27)">
                      <text className="node-title-text" textAnchor="middle">
                        {node.label}
                      </text>
                      {node.role && (
                        <text className="node-role-text" textAnchor="middle" y="11">
                          {node.role}
                        </text>
                      )}
                    </g>
                  </g>
                );
              })}
            </g>
          </svg>

          {/* Graph Overlays: Minimal Professional Legend */}
          <div className="netra-canvas-legend">
            <div className="legend-header">
              <Layers size={13} />
              <span>CLASSIFICATION</span>
            </div>
            <div className="legend-grid">
              {Object.entries(ENTITY_TYPES).map(([typeKey, meta]) => {
                const IconComp = meta.icon;
                return (
                  <div key={typeKey} className="legend-item">
                    <span className="legend-indicator" style={{ backgroundColor: meta.color }}>
                      <IconComp size={10} color="#fff" />
                    </span>
                    <span className="legend-text">{meta.label}</span>
                  </div>
                );
              })}
            </div>
            <div className="legend-divider" />
            <div className="legend-relations">
              <div className="relation-row">
                <span className="relation-line documented" />
                <span>Documented Link</span>
              </div>
              <div className="relation-row">
                <span className="relation-line inferred" />
                <span>Inferred / Correlated</span>
              </div>
              <div className="relation-row">
                <span className="relation-line flagged" />
                <span>Flagged Nexus</span>
              </div>
            </div>
          </div>

          {/* Floating Navigation Controls */}
          <div className="netra-floating-controls">
            <button
              type="button"
              className="netra-float-btn"
              onClick={() => handleZoom(0.82)}
              title="Zoom In"
            >
              <Plus size={16} />
            </button>
            <button
              type="button"
              className="netra-float-btn"
              onClick={() => handleZoom(1.22)}
              title="Zoom Out"
            >
              <Minus size={16} />
            </button>
            <div className="netra-float-divider" />
            <button
              type="button"
              className="netra-float-btn"
              onClick={handleFitView}
              title="Fit Entire Graph"
            >
              <Maximize2 size={15} />
            </button>
            <button
              type="button"
              className="netra-float-btn"
              onClick={handleReset}
              title="Reset View & Filters"
            >
              <RotateCcw size={15} />
            </button>
          </div>
        </div>

        {/* Slide-out Entity & Link Inspector Drawer (Only opens when node/edge is clicked) */}
        {isSidePanelOpen && (selectedNode || selectedLink) && (
          <aside className="netra-side-panel">
            {/* When a Node is Selected */}
            {selectedNode ? (
              <div className="side-content">
                <div className="side-top-header">
                  <div className="entity-type-badge" style={{
                    backgroundColor: ENTITY_TYPES[selectedNode.type]?.badgeBg,
                    color: ENTITY_TYPES[selectedNode.type]?.badgeColor,
                    borderColor: ENTITY_TYPES[selectedNode.type]?.border
                  }}>
                    {React.createElement(ENTITY_TYPES[selectedNode.type]?.icon || User, { size: 12 })}
                    <span>{ENTITY_TYPES[selectedNode.type]?.label.toUpperCase()}</span>
                  </div>
                  <button
                    type="button"
                    className="side-close-btn"
                    onClick={() => {
                      setSelectedNode(null);
                      setIsSidePanelOpen(false);
                    }}
                    title="Close Inspector"
                  >
                    <X size={14} />
                  </button>
                </div>

                <div className="entity-title-section">
                  <h2 className="entity-name">{selectedNode.label}</h2>
                  <div className="entity-meta">
                    <span>{selectedNode.role || 'Entity Record'}</span>
                    <span className="meta-dot">·</span>
                    <span>{nodeDegrees[selectedNode.id] || 0} Direct Connections</span>
                  </div>
                </div>

                {/* Candidate Resolution / Merge Banner if unresolved */}
                {selectedNode.unresolved && (
                  <div className="resolution-card">
                    <div className="resolution-header">
                      <Sparkles size={15} className="resolution-icon" />
                      <span>AI Entity Resolution Candidate</span>
                    </div>
                    <p className="resolution-desc">
                      High-probability match detected with <strong>Rahul Sharma</strong> (87% confidence based on co-occurring CDR and freight telemetry).
                    </p>
                    <div className="resolution-actions">
                      <button
                        type="button"
                        className="resolution-btn primary"
                        onClick={() => showToast('Entity merge recorded in Case Diary verification log.')}
                      >
                        <CheckCircle2 size={13} />
                        <span>Confirm Merge</span>
                      </button>
                      <button
                        type="button"
                        className="resolution-btn secondary"
                        onClick={() => showToast('Marked as distinct entity record.')}
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                )}

                {/* Known Attributes */}
                <div className="side-section">
                  <div className="side-section-heading">Verified Attributes</div>
                  <div className="attr-table">
                    {selectedNode.attrs?.map((attr, i) => (
                      <div key={i} className="attr-row">
                        <span className="attr-key">{attr.key}</span>
                        <span className="attr-val">{attr.val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Connected Linked Entities */}
                <div className="side-section">
                  <div className="side-section-heading">Connected Network Links</div>
                  <div className="linked-nodes-list">
                    {links
                      .filter(l => l.s === selectedNode.id || l.t === selectedNode.id)
                      .map((l, i) => {
                        const otherId = l.s === selectedNode.id ? l.t : l.s;
                        const other = nodeMap[otherId];
                        if (!other) return null;
                        const otherMeta = ENTITY_TYPES[other.type];
                        const OtherIcon = otherMeta.icon;

                        return (
                          <div
                            key={i}
                            className="linked-node-item"
                            onClick={() => jumpToNode(other.id)}
                          >
                            <div className="linked-node-left">
                              <span className="linked-type-icon" style={{ color: otherMeta.color }}>
                                <OtherIcon size={12} />
                              </span>
                              <div>
                                <div className="linked-node-name">{other.label}</div>
                                <div className="linked-rel-type">{l.l}</div>
                              </div>
                            </div>
                            <ChevronRight size={14} className="linked-chevron" />
                          </div>
                        );
                      })}
                  </div>
                </div>

                {/* Evidentiary Citations & Page References */}
                <div className="side-section">
                  <div className="side-section-heading">Source Evidence &amp; Documents</div>
                  <div className="evidence-list">
                    {selectedNode.ev && selectedNode.ev.length > 0 ? (
                      selectedNode.ev.map((item, idx) => (
                        <div key={idx} className="evidence-item">
                          <div className="evidence-source">
                            <FileText size={12} />
                            <span>{item.doc}</span>
                            <span className="evidence-page">· {item.page}</span>
                          </div>
                          <blockquote className="evidence-quote">“{item.quote}”</blockquote>
                        </div>
                      ))
                    ) : (
                      <div className="empty-evidence">Evidence citation inferred from connected case diary files.</div>
                    )}
                  </div>
                </div>
              </div>
            ) : selectedLink ? (
              /* When an Edge/Link is Selected */
              <div className="side-content">
                <div className="side-top-header">
                  <div className="entity-type-badge edge-badge">
                    <span>RELATIONSHIP LINK</span>
                  </div>
                  <button
                    type="button"
                    className="side-close-btn"
                    onClick={() => {
                      setSelectedLink(null);
                      setIsSidePanelOpen(false);
                    }}
                    title="Close Inspector"
                  >
                    <X size={14} />
                  </button>
                </div>

                <div className="entity-title-section">
                  <h2 className="entity-name">
                    {nodeMap[selectedLink.s]?.label} <span className="rel-arrow">↔</span> {nodeMap[selectedLink.t]?.label}
                  </h2>
                  <div className="entity-meta">
                    <span>Relationship: “{selectedLink.l}”</span>
                  </div>
                </div>

                {/* Link Status Pill */}
                <div className="edge-status-banner">
                  {selectedLink.flag && (
                    <div className="flag-alert-badge">
                      <AlertTriangle size={14} />
                      <span>Flagged Syndicate Nexus</span>
                    </div>
                  )}
                  {selectedLink.inf ? (
                    <span className="inferred-badge">Algorithmically Inferred Link</span>
                  ) : (
                    <span className="documented-badge">Documented in Police Records</span>
                  )}
                </div>

                {selectedLink.flagReason && (
                  <div className="flag-reason-box">
                    <strong>Investigation Lead:</strong> {selectedLink.flagReason}
                  </div>
                )}

                {/* Endpoint Entities */}
                <div className="side-section">
                  <div className="side-section-heading">Endpoints</div>
                  <div className="endpoint-cards">
                    {[selectedLink.s, selectedLink.t].map((endId, idx) => {
                      const endNode = nodeMap[endId];
                      if (!endNode) return null;
                      const endMeta = ENTITY_TYPES[endNode.type];
                      const EndIcon = endMeta.icon;

                      return (
                        <div
                          key={endId}
                          className="endpoint-row"
                          onClick={() => jumpToNode(endId)}
                        >
                          <span className="endpoint-label">{idx === 0 ? 'From' : 'To'}:</span>
                          <span className="endpoint-name">
                            <EndIcon size={12} style={{ color: endMeta.color, marginRight: 6 }} />
                            {endNode.label}
                          </span>
                          <ExternalLink size={12} className="endpoint-jump" />
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Link Evidence */}
                <div className="side-section">
                  <div className="side-section-heading">Supporting Record Citations</div>
                  <div className="evidence-list">
                    {selectedLink.ev ? (
                      selectedLink.ev.map((item, idx) => (
                        <div key={idx} className="evidence-item">
                          <div className="evidence-source">
                            <FileText size={12} />
                            <span>{item.doc}</span>
                            <span className="evidence-page">· {item.page}</span>
                          </div>
                          <blockquote className="evidence-quote">“{item.quote}”</blockquote>
                        </div>
                      ))
                    ) : (
                      <div className="empty-evidence">Direct correlation established across primary case filings.</div>
                    )}
                  </div>
                </div>
              </div>
            ) : null}
          </aside>
        )}
      </div>

      {/* Floating Action Toast Notification */}
      {toastMessage && (
        <div className="netra-toast">
          <CheckCircle2 size={15} color="#059669" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
