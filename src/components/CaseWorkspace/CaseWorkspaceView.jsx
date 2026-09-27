import React, { useState } from 'react';
import {
  Briefcase,
  FileText,
  Shield,
  Scale,
  Lock,
  HardDrive,
  Users,
  Clock,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  FileSpreadsheet,
  Plus,
  Search,
  ExternalLink,
  ChevronRight,
  Landmark,
  BadgeAlert,
  Hash,
  Copy,
  Check,
  Building2,
  PhoneCall,
  Smartphone,
  Eye,
  X
} from 'lucide-react';
import {
  activeCaseData,
  accusedRoster,
  evidenceLocker,
  chainOfCustodyLogs,
  caseDiaryNotes,
  operationalActionItems
} from '../../data/indianCasesData';

export default function CaseWorkspaceView() {
  const [activeSubTab, setActiveSubTab] = useState('overview'); // 'overview' | 'evidence' | 'custody' | 'diary' | 'actions'
  const [evidenceFilter, setEvidenceFilter] = useState('ALL');
  const [evidenceSearch, setEvidenceSearch] = useState('');
  const [copiedHash, setCopiedHash] = useState(null);
  const [inspectEvidenceItem, setInspectEvidenceItem] = useState(null);

  // Case Diary interactive state
  const [diaryList, setDiaryList] = useState(caseDiaryNotes);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteCategory, setNewNoteCategory] = useState('INVESTIGATIVE_MILESTONE');
  const [newNoteContent, setNewNoteContent] = useState('');

  // Action Items interactive state
  const [actionList, setActionList] = useState(operationalActionItems);

  const handleCopyHash = (hash) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(hash);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  const handleCreateDiaryNote = (e) => {
    e.preventDefault();
    if (!newNoteTitle.trim() || !newNoteContent.trim()) return;

    const newEntry = {
      id: `CD-${new Date().toISOString().slice(0, 10)}-${Date.now().toString().slice(-4)}`,
      entryDate: `${new Date().toISOString().slice(0, 10)} ${new Date().toLocaleTimeString('en-GB')} IST`,
      officer: 'DSP K. R. Ramanathan (Lead IO)',
      badge: 'IND-CBI-7712',
      sectionCode: 'Section 172 CrPC / Section 192 BNSS 2023',
      category: newNoteCategory,
      title: newNoteTitle.trim(),
      content: newNoteContent.trim(),
      approvalStatus: 'Pending Supervisory Endorsement',
    };

    setDiaryList([newEntry, ...diaryList]);
    setNewNoteTitle('');
    setNewNoteContent('');
    setIsAddingNote(false);
  };

  const filteredEvidence = evidenceLocker.filter((item) => {
    if (evidenceFilter !== 'ALL' && item.category !== evidenceFilter) return false;
    if (evidenceSearch.trim()) {
      const q = evidenceSearch.toLowerCase();
      return (
        item.itemName.toLowerCase().includes(q) ||
        item.malkhanaId.toLowerCase().includes(q) ||
        item.seizedFrom.toLowerCase().includes(q) ||
        item.sha256Hash.toLowerCase().includes(q) ||
        item.status.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const getRiskBadgeClass = (risk) => {
    switch (risk) {
      case 'CRITICAL':
        return 'severity-badge crit';
      case 'HIGH':
        return 'severity-badge high';
      case 'MEDIUM':
        return 'severity-badge med';
      default:
        return 'severity-badge low';
    }
  };

  const getPriorityBadgeClass = (priority) => {
    switch (priority) {
      case 'CRITICAL':
        return 'priority-pill crit';
      case 'HIGH':
        return 'priority-pill high';
      default:
        return 'priority-pill med';
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'COMPLETED':
        return 'status-badge completed';
      case 'IN_PROGRESS':
        return 'status-badge in-progress';
      default:
        return 'status-badge pending';
    }
  };

  return (
    <div className="case-workspace-shell">
      {/* Official Case Masthead */}
      <div className="panel case-header-panel">
        <div className="case-masthead-top">
          <div className="case-badge-group">
            <div className="official-emblem-badge">
              <Shield size={18} />
              <span>CENTRAL BUREAU OF INVESTIGATION // SPECIAL CRIME &amp; BSFB</span>
            </div>
            <span className="case-classification-tag">
              {activeCaseData.classification}
            </span>
          </div>

          <div className="case-status-indicator">
            <span className="status-pulse" />
            <span>{activeCaseData.status}</span>
          </div>
        </div>

        <div className="case-title-row">
          <div className="case-title-copy">
            <h2>{activeCaseData.caseTitle}</h2>
            <div className="case-identifiers-bar">
              <span className="identifier-tag">
                <strong>FIR:</strong> {activeCaseData.firNumber}
              </span>
              <span className="identifier-separator">|</span>
              <span className="identifier-tag">
                <strong>CBI RC:</strong> {activeCaseData.caseId}
              </span>
              <span className="identifier-separator">|</span>
              <span className="identifier-tag">
                <strong>ED ECIR:</strong> {activeCaseData.ecirNumber}
              </span>
            </div>
          </div>
        </div>

        <div className="case-meta-grid">
          <div className="meta-block">
            <span className="meta-label">SPECIAL COURT</span>
            <strong className="meta-val">{activeCaseData.courtJurisdiction}</strong>
          </div>
          <div className="meta-block">
            <span className="meta-label">LEAD INVESTIGATOR</span>
            <strong className="meta-val">
              {activeCaseData.leadInvestigator.name} ({activeCaseData.leadInvestigator.badge})
            </strong>
          </div>
          <div className="meta-block">
            <span className="meta-label">FILING / REGISTRATION</span>
            <strong className="meta-val">18-Aug-2025</strong>
          </div>
          <div className="meta-block">
            <span className="meta-label">CHARGESHEET STATUTORY TARGET</span>
            <strong className="meta-val highlight-val">{activeCaseData.chargeSheetDeadline}</strong>
          </div>
        </div>

        {/* Sub-tab Navigation Bar */}
        <div className="workspace-tabs-strip" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={activeSubTab === 'overview'}
            className={`subtab-btn ${activeSubTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveSubTab('overview')}
          >
            <Scale size={15} />
            <span>Case Overview &amp; Accused</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeSubTab === 'evidence'}
            className={`subtab-btn ${activeSubTab === 'evidence' ? 'active' : ''}`}
            onClick={() => setActiveSubTab('evidence')}
          >
            <HardDrive size={15} />
            <span>Evidence Locker ({evidenceLocker.length})</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeSubTab === 'custody'}
            className={`subtab-btn ${activeSubTab === 'custody' ? 'active' : ''}`}
            onClick={() => setActiveSubTab('custody')}
          >
            <Lock size={15} />
            <span>Chain of Custody Ledger</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeSubTab === 'diary'}
            className={`subtab-btn ${activeSubTab === 'diary' ? 'active' : ''}`}
            onClick={() => setActiveSubTab('diary')}
          >
            <FileText size={15} />
            <span>Case Diary Notes ({diaryList.length})</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeSubTab === 'actions'}
            className={`subtab-btn ${activeSubTab === 'actions' ? 'active' : ''}`}
            onClick={() => setActiveSubTab('actions')}
          >
            <Briefcase size={15} />
            <span>Action Items &amp; Warrants ({actionList.length})</span>
          </button>
        </div>
      </div>

      {/* Sub-tab 1: Case Overview & Legal Framework */}
      {activeSubTab === 'overview' && (
        <div className="workspace-tab-content">

          <div className="overview-two-col-grid">
            {/* Left Column: Synopsis & Statutory Provisions */}
            <div className="panel overview-detail-card">
              <div className="panel-header compact">
                <div>
                  <span className="eyebrow">INVESTIGATIVE SUMMARY</span>
                  <h3>Modus Operandi &amp; Syndicate Architecture</h3>
                </div>
              </div>

              <div className="synopsis-prose">
                <p>{activeCaseData.synopsis}</p>
              </div>

              <div className="statutory-sections-wrap">
                <span className="eyebrow">STATUTORY CHARGES INVOKED</span>
                <div className="sections-list">
                  {activeCaseData.statutorySections.map((sec, idx) => (
                    <div key={idx} className="statute-item">
                      <div className="statute-header">
                        <code>{sec.code}</code>
                        <span className={getRiskBadgeClass(sec.severity)}>{sec.severity}</span>
                      </div>
                      <p className="statute-desc">{sec.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Accused & Co-Conspirators Roster */}
            <div className="panel accused-roster-panel">
              <div className="panel-header compact">
                <div>
                  <span className="eyebrow">PERSONS OF INTEREST</span>
                  <h3>Prime Accused &amp; Co-Conspirators ({accusedRoster.length})</h3>
                </div>
              </div>

              <div className="accused-cards-list">
                {accusedRoster.map((acc) => (
                  <div key={acc.id} className="accused-roster-card">
                    <div className="accused-card-top">
                      <div>
                        <div className="accused-name-row">
                          <strong>{acc.name}</strong>
                          <span className="accused-alias">({acc.alias})</span>
                        </div>
                        <span className="accused-role">{acc.role}</span>
                      </div>
                      <span className={getRiskBadgeClass(acc.riskLevel)}>{acc.riskLevel}</span>
                    </div>

                    <div className="accused-card-details">
                      <div className="accused-detail-row">
                        <span className="d-label">Custody:</span>
                        <strong className="d-val custody-pill">{acc.custodyStatus}</strong>
                      </div>
                      <div className="accused-detail-row">
                        <span className="d-label">Location:</span>
                        <span className="d-val">{acc.custodyDetail}</span>
                      </div>
                      <div className="accused-detail-row">
                        <span className="d-label">Domicile:</span>
                        <span className="d-val">{acc.domicile}</span>
                      </div>
                      <div className="accused-detail-row">
                        <span className="d-label">IDs:</span>
                        <code className="d-val hash-text">{acc.idHash}</code>
                      </div>
                      <div className="accused-detail-row">
                        <span className="d-label">Warrant:</span>
                        <span className="d-val">{acc.warrantStatus}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sub-tab 2: Evidence Locker & Seizures */}
      {activeSubTab === 'evidence' && (
        <div className="workspace-tab-content">
          <div className="panel evidence-locker-panel">
            <div className="panel-header">
              <div>
                <span className="eyebrow">PHYSICAL &amp; DIGITAL SEIZURES</span>
                <h3>Evidence Locker &amp; Forensic Seizures Catalog</h3>
                <p className="panel-subtext">
                  Cataloged property recovered under Section 17 PMLA and Section 105 BNSS, secured with cryptographic SHA-256 digests and Malkhana seals.
                </p>
              </div>

              <div className="evidence-controls-cluster">
                <div className="table-search-box">
                  <Search size={15} className="search-icon-svg" />
                  <input
                    type="text"
                    value={evidenceSearch}
                    onChange={(e) => setEvidenceSearch(e.target.value)}
                    placeholder="Search Malkhana ID, device, hash..."
                  />
                </div>
              </div>
            </div>

            {/* Evidence Category Filter Chips */}
            <div className="category-pills-scroll">
              {[
                { key: 'ALL', label: 'All Exhibits' },
                { key: 'DIGITAL_DEVICE', label: 'Mobile Devices' },
                { key: 'PHYSICAL_DOCUMENT', label: 'Ledgers & Documents' },
                { key: 'CURRENCY_BULLION', label: 'Currency & Bullion' },
                { key: 'DIGITAL_STORAGE', label: 'Storage & Servers' },
                { key: 'COUNTERFEIT_DOCUMENT', label: 'Forged Passports' },
              ].map((cat) => (
                <button
                  key={cat.key}
                  type="button"
                  className={`category-pill-btn ${evidenceFilter === cat.key ? 'active' : ''}`}
                  onClick={() => setEvidenceFilter(cat.key)}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="table-responsive-wrapper">
              <table className="evidentiary-table">
                <thead>
                  <tr>
                    <th>Malkhana Registry</th>
                    <th>Item Description</th>
                    <th>Seized From &amp; Panchnama</th>
                    <th>Seizure Date &amp; Location</th>
                    <th>SHA-256 Integrity Hash</th>
                    <th>Custody Vault</th>
                    <th>Forensic Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEvidence.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="table-empty-row">
                        No evidence items found matching the filter criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredEvidence.map((item) => (
                      <tr key={item.malkhanaId} className="table-data-row">
                        <td className="malkhana-cell">
                          <strong>{item.malkhanaId}</strong>
                          <span className="category-tag small">{item.category.replace(/_/g, ' ')}</span>
                        </td>
                        <td className="item-name-cell">
                          <strong>{item.itemName}</strong>
                          <span className="subtext">Seizing IO: {item.ioOfficer}</span>
                        </td>
                        <td>
                          <span>{item.seizedFrom}</span>
                          <code className="ref-subtext">Panchnama: {item.panchnamaRef}</code>
                        </td>
                        <td>
                          <span>{item.seizureDate}</span>
                          <span className="ref-subtext">{item.seizureLocation}</span>
                        </td>
                        <td className="hash-cell">
                          <div className="hash-wrap">
                            <code title={item.sha256Hash}>
                              {item.sha256Hash.slice(0, 16)}...
                            </code>
                            <button
                              type="button"
                              className="copy-icon-btn"
                              onClick={() => handleCopyHash(item.sha256Hash)}
                              title="Copy Full SHA-256 Hash"
                            >
                              {copiedHash === item.sha256Hash ? <Check size={13} /> : <Copy size={13} />}
                            </button>
                          </div>
                        </td>
                        <td>
                          <span className="vault-tag">{item.custodyLocation}</span>
                        </td>
                        <td>
                          <span className="status-pill verified">
                            <CheckCircle2 size={12} />
                            <span>{item.status}</span>
                          </span>
                        </td>
                        <td>
                          <button
                            type="button"
                            className="ghost-button compact"
                            onClick={() => setInspectEvidenceItem(item)}
                          >
                            <Eye size={13} />
                            <span>Inspect</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Sub-tab 3: Chain of Custody Ledger */}
      {activeSubTab === 'custody' && (
        <div className="workspace-tab-content">
          <div className="panel chain-of-custody-panel">
            <div className="panel-header">
              <div>
                <span className="eyebrow">EVIDENTIARY INTEGRITY</span>
                <h3>Immutable Chain of Custody Ledger</h3>
                <p className="panel-subtext">
                  Statutory record of forensic handovers, lab transfers, and Malkhana custody entries maintained pursuant to Criminal Manual standards.
                </p>
              </div>

              <div className="tamper-seal-badge">
                <Shield size={16} />
                <span>CRYPTOGRAPHIC REGISTER VERIFIED</span>
              </div>
            </div>

            <div className="table-responsive-wrapper">
              <table className="evidentiary-table">
                <thead>
                  <tr>
                    <th>Log ID</th>
                    <th>Exhibit Malkhana ID</th>
                    <th>Transfer Date (IST)</th>
                    <th>Relinquished By</th>
                    <th>Received By</th>
                    <th>Authorized Purpose</th>
                    <th>Custody Location</th>
                    <th>Seal Intact Verification</th>
                  </tr>
                </thead>
                <tbody>
                  {chainOfCustodyLogs.map((log) => (
                    <tr key={log.logId} className="table-data-row">
                      <td>
                        <code>{log.logId}</code>
                      </td>
                      <td>
                        <strong>{log.malkhanaId}</strong>
                      </td>
                      <td className="timestamp-cell">
                        <code>{log.transferDate}</code>
                      </td>
                      <td>{log.relinquishedBy}</td>
                      <td>
                        <strong>{log.receivedBy}</strong>
                      </td>
                      <td>{log.purpose}</td>
                      <td>
                        <span className="location-tag">{log.location}</span>
                      </td>
                      <td>
                        <div className="seal-verif-pill">
                          <CheckCircle2 size={13} className="seal-ok" />
                          <span>{log.sealIntact}</span>
                          <span className="seal-num-tag">({log.sealNumber})</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Sub-tab 4: Case Diary Notes (Sec 172 CrPC) */}
      {activeSubTab === 'diary' && (
        <div className="workspace-tab-content">
          <div className="panel case-diary-panel">
            <div className="panel-header">
              <div>
                <span className="eyebrow">STATUTORY CASE DIARY</span>
                <h3>Daily Investigative Diary Entries (Sec 172 CrPC / Sec 192 BNSS)</h3>
                <p className="panel-subtext">
                  Contemporaneous official diary entries recorded by the investigating team documenting interrogation results, field raids, and judicial proceedings.
                </p>
              </div>

              <button
                type="button"
                className="primary-button compact add-note-btn"
                onClick={() => setIsAddingNote(!isAddingNote)}
              >
                <Plus size={15} />
                <span>{isAddingNote ? 'Cancel Entry' : 'Record New Diary Entry'}</span>
              </button>
            </div>

            {/* Add Diary Entry Form */}
            {isAddingNote && (
              <form onSubmit={handleCreateDiaryNote} className="new-diary-form panel">
                <div className="form-heading">
                  <FileText size={16} />
                  <h4>Record Official Case Diary Entry</h4>
                </div>

                <div className="form-row-two">
                  <div className="form-group">
                    <label htmlFor="note-title">Entry Subject / Milestone</label>
                    <input
                      id="note-title"
                      type="text"
                      value={newNoteTitle}
                      onChange={(e) => setNewNoteTitle(e.target.value)}
                      placeholder="e.g. Interrogation of Mule Account Holder or Search at Safehouse..."
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="note-category">Investigative Category</label>
                    <select
                      id="note-category"
                      value={newNoteCategory}
                      onChange={(e) => setNewNoteCategory(e.target.value)}
                    >
                      <option value="INVESTIGATIVE_MILESTONE">Investigative Milestone</option>
                      <option value="INTERROGATION_RECORD">Interrogation Record</option>
                      <option value="ASSET_VERIFICATION">Asset / Financial Verification</option>
                      <option value="SURVEILLANCE_UPDATE">Surveillance Telemetry Update</option>
                      <option value="COURT_PROCEEDING">Court Proceeding / Remand</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="note-content">Contemporaneous Case Diary Text</label>
                  <textarea
                    id="note-content"
                    rows={4}
                    value={newNoteContent}
                    onChange={(e) => setNewNoteContent(e.target.value)}
                    placeholder="Enter precise statement, witness interactions, seized material, or statutory observations..."
                    required
                  />
                </div>

                <div className="form-actions-row">
                  <span className="endorsement-notice">
                    Will be recorded under Badge IND-CBI-7712 with digital timestamp.
                  </span>
                  <div className="buttons-cluster">
                    <button
                      type="button"
                      className="secondary-button compact"
                      onClick={() => setIsAddingNote(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="primary-button compact">
                      Commit to Case Diary
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* Diary Entries List */}
            <div className="diary-entries-list">
              {diaryList.map((entry) => (
                <article key={entry.id} className="diary-entry-card">
                  <div className="entry-card-header">
                    <div className="entry-left-meta">
                      <span className="entry-date-badge">
                        <Clock size={13} />
                        <code>{entry.entryDate}</code>
                      </span>
                      <span className="entry-section-code">{entry.sectionCode}</span>
                      <span className="category-tag small">{entry.category.replace(/_/g, ' ')}</span>
                    </div>

                    <div className="entry-right-meta">
                      <span className="officer-badge-pill">
                        <strong>{entry.officer}</strong> [{entry.badge}]
                      </span>
                    </div>
                  </div>

                  <h4 className="entry-title">{entry.title}</h4>

                  <div className="entry-body-prose">
                    {entry.content.split('\n\n').map((paragraph, pIdx) => (
                      <p key={pIdx}>{paragraph}</p>
                    ))}
                  </div>

                  <div className="entry-footer-strip">
                    <div className="approval-status-tag">
                      <CheckCircle2 size={13} />
                      <span>{entry.approvalStatus}</span>
                    </div>
                    <code className="diary-entry-id">{entry.id}</code>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Sub-tab 5: Action Items & Pending Warrants */}
      {activeSubTab === 'actions' && (
        <div className="workspace-tab-content">
          <div className="panel action-items-panel">
            <div className="panel-header">
              <div>
                <span className="eyebrow">TASK FORCE DIRECTIVES</span>
                <h3>Operational Action Items &amp; Statutory Warrants</h3>
                <p className="panel-subtext">
                  Pending Section 91 notices, Letter Rogatory international requests, proclamation orders, and court filings.
                </p>
              </div>

              <div className="action-stats-pill">
                <strong>{actionList.filter((a) => a.status === 'IN_PROGRESS').length}</strong> In Progress |{' '}
                <strong>{actionList.filter((a) => a.priority === 'CRITICAL').length}</strong> Critical Priority
              </div>
            </div>

            <div className="table-responsive-wrapper">
              <table className="evidentiary-table">
                <thead>
                  <tr>
                    <th>Directive ID</th>
                    <th>Action Required</th>
                    <th>Assignee Officer</th>
                    <th>Statutory Deadline</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Investigative Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {actionList.map((action) => (
                    <tr key={action.id} className="table-data-row">
                      <td>
                        <code>{action.id}</code>
                      </td>
                      <td>
                        <strong>{action.task}</strong>
                      </td>
                      <td>
                        <span className="assignee-tag">{action.assignee}</span>
                      </td>
                      <td className="deadline-cell">
                        <code>{action.deadline}</code>
                      </td>
                      <td>
                        <span className={getPriorityBadgeClass(action.priority)}>
                          {action.priority}
                        </span>
                      </td>
                      <td>
                        <span className={getStatusBadgeClass(action.status)}>
                          {action.status.replace(/_/g, ' ')}
                        </span>
                      </td>
                      <td>
                        <span className="action-notes-text">{action.notes}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Inspect Evidence Modal */}
      {inspectEvidenceItem && (
        <div className="modal-backdrop" onClick={() => setInspectEvidenceItem(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <div className="modal-header">
              <div>
                <span className="modal-eyebrow">MALKHANA SEIZURE MEMO</span>
                <h3>{inspectEvidenceItem.itemName}</h3>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setInspectEvidenceItem(null)}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <div className="modal-body">
              <div className="modal-info-grid">
                <div className="info-field">
                  <span className="info-label">MALKHANA REGISTER NUMBER</span>
                  <code>{inspectEvidenceItem.malkhanaId}</code>
                </div>
                <div className="info-field">
                  <span className="info-label">SEIZURE DATE &amp; TIME</span>
                  <code>{inspectEvidenceItem.seizureDate}</code>
                </div>
                <div className="info-field">
                  <span className="info-label">SEIZED FROM PERSON / PREMISES</span>
                  <span>{inspectEvidenceItem.seizedFrom}</span>
                </div>
                <div className="info-field">
                  <span className="info-label">PANCHNAMA REFERENCE</span>
                  <code>{inspectEvidenceItem.panchnamaRef}</code>
                </div>
                <div className="info-field">
                  <span className="info-label">SEIZING INVESTIGATING OFFICER</span>
                  <span>{inspectEvidenceItem.ioOfficer}</span>
                </div>
                <div className="info-field">
                  <span className="info-label">CURRENT STORAGE VAULT</span>
                  <span>{inspectEvidenceItem.custodyLocation}</span>
                </div>
              </div>

              <div className="modal-section">
                <h4>SHA-256 Digital Forensics Seal Digest</h4>
                <div className="hash-box">
                  <code>{inspectEvidenceItem.sha256Hash}</code>
                  <button
                    type="button"
                    className="copy-icon-btn"
                    onClick={() => handleCopyHash(inspectEvidenceItem.sha256Hash)}
                  >
                    {copiedHash === inspectEvidenceItem.sha256Hash ? <Check size={14} /> : <Copy size={14} />}
                  </button>
                </div>
              </div>

              <div className="modal-section">
                <h4>Statutory Certification</h4>
                <p className="modal-synopsis-text">{inspectEvidenceItem.verificationCert}</p>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="secondary-button compact"
                onClick={() => setInspectEvidenceItem(null)}
              >
                Dismiss
              </button>
              <button
                type="button"
                className="primary-button compact copy-ref-btn"
                onClick={() => {
                  navigator.clipboard.writeText(inspectEvidenceItem.malkhanaId);
                  alert(`Copied Malkhana ID: ${inspectEvidenceItem.malkhanaId}`);
                }}
              >
                Copy Malkhana ID
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
