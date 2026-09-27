import React, { useState, useMemo } from 'react';
import {
  Calendar,
  Clock,
  Filter,
  Search,
  Shield,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Layers,
  MapPin,
  Building2,
  Scale,
  Users,
  Eye,
  SlidersHorizontal,
  Table,
  GitBranch,
  X
} from 'lucide-react';
import { timelineEvents, accusedRoster, activeCaseData } from '../../data/indianCasesData';
import AccessibleTimelineTable from './AccessibleTimelineTable';

const categoryLabels = {
  ALL: 'All Events',
  SIGNAL_INTERCEPT: 'Signal & Telecom',
  FINANCIAL_ANOMALY: 'Financial & Hawala',
  SURVEILLANCE: 'Field Surveillance',
  SEARCH_AND_SEIZURE: 'Search & Raid',
  DIGITAL_FORENSICS: 'Digital Forensics',
  ARREST_AND_INTERCEPTION: 'Apprehension / Arrest',
  LEGAL_ORDER: 'Court Order / Attachment',
  PROCEDURAL: 'Chargesheet / Legal',
};

export default function TimelineView() {
  const [viewMode, setViewMode] = useState('visual'); // 'visual' | 'table'
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedSuspect, setSelectedSuspect] = useState('ALL');
  const [selectedSeverity, setSelectedSeverity] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [inspectEvent, setInspectEvent] = useState(null);

  const filteredEvents = useMemo(() => {
    return timelineEvents.filter((evt) => {
      // Category filter
      if (selectedCategory !== 'ALL' && evt.category !== selectedCategory) {
        return false;
      }
      // Suspect filter
      if (selectedSuspect !== 'ALL' && !evt.entities.includes(selectedSuspect)) {
        return false;
      }
      // Severity filter
      if (selectedSeverity !== 'ALL' && evt.severity !== selectedSeverity) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = evt.title.toLowerCase().includes(q);
        const matchesSynopsis = evt.synopsis.toLowerCase().includes(q);
        const matchesAgency = evt.agency.toLowerCase().includes(q);
        const matchesLocation = evt.location.toLowerCase().includes(q);
        const matchesSection = evt.legalSection.toLowerCase().includes(q);
        const matchesCode = evt.referenceCode.toLowerCase().includes(q);
        if (!matchesTitle && !matchesSynopsis && !matchesAgency && !matchesLocation && !matchesSection && !matchesCode) {
          return false;
        }
      }
      return true;
    });
  }, [selectedCategory, selectedSuspect, selectedSeverity, searchQuery]);

  // Group filtered events by Month/Year for clean reading
  const groupedEvents = useMemo(() => {
    const groups = {};
    filteredEvents.forEach((evt) => {
      const d = new Date(evt.date);
      const monthYear = d.toLocaleString('en-US', { month: 'long', year: 'numeric' });
      if (!groups[monthYear]) {
        groups[monthYear] = [];
      }
      groups[monthYear].push(evt);
    });
    return groups;
  }, [filteredEvents]);

  const getSuspectName = (id) => {
    const found = accusedRoster.find((a) => a.id === id);
    return found ? found.name : id;
  };

  const getSeverityBadgeClass = (severity) => {
    switch (severity) {
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

  return (
    <div className="timeline-page-shell">
      {/* Top Header Banner */}
      <div className="panel timeline-header-panel">
        <div className="timeline-title-row">
          <div className="timeline-title-group">
            
            <h2>Temporal Intelligence &amp; Case Milestones</h2>
            <p className="timeline-subtext">
              Chronological sequence of corroborated evidence, telecom wiretaps, Hawala financial triggers, and procedural filings for <strong>{activeCaseData.firNumber}</strong>.
            </p>
          </div>

          <div className="timeline-view-toggle-cluster">
            <div className="view-mode-toggle" role="group" aria-label="Timeline View Switcher">
              <button
                type="button"
                className={`toggle-btn ${viewMode === 'visual' ? 'active' : ''}`}
                onClick={() => setViewMode('visual')}
              >
                <GitBranch size={15} />
                <span>Visual Flow</span>
              </button>
              <button
                type="button"
                className={`toggle-btn ${viewMode === 'table' ? 'active' : ''}`}
                onClick={() => setViewMode('table')}
              >
                <Table size={15} />
                <span>Evidentiary Ledger (WCAG)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Case Metrics Bar */}
        <div className="timeline-metrics-strip">
          <div className="metric-pill">
            <span className="metric-label">TOTAL MILESTONES:</span>
            <strong className="metric-num">{timelineEvents.length} Recorded</strong>
          </div>
          <div className="metric-pill">
            <span className="metric-label">CRITICAL TRIGGERS:</span>
            <strong className="metric-num crit">
              {timelineEvents.filter((e) => e.severity === 'CRITICAL').length} High-Risk
            </strong>
          </div>
          <div className="metric-pill">
            <span className="metric-label">ACTIVE SPAN:</span>
            <strong className="metric-num">Aug 2025 &ndash; Mar 2026</strong>
          </div>
          <div className="metric-pill">
            <span className="metric-label">PRIMARY IO:</span>
            <strong className="metric-num">{activeCaseData.leadInvestigator.name}</strong>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="timeline-filters-section">
          <div className="filter-input-row">
            <div className="search-input-wrap">
              <Search size={15} className="search-icon" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by keywords, statutory section, city, or evidence code..."
                aria-label="Filter timeline events"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="clear-filter-btn"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            <div className="select-filters-group">
              <div className="custom-select-wrap">
                <Users size={14} className="select-icon" />
                <select
                  value={selectedSuspect}
                  onChange={(e) => setSelectedSuspect(e.target.value)}
                  aria-label="Filter by suspect entity"
                >
                  <option value="ALL">All Accused &amp; POIs</option>
                  {accusedRoster.map((acc) => (
                    <option key={acc.id} value={acc.id}>
                      {acc.name} ({acc.alias})
                    </option>
                  ))}
                </select>
              </div>

              <div className="custom-select-wrap">
                <AlertTriangle size={14} className="select-icon" />
                <select
                  value={selectedSeverity}
                  onChange={(e) => setSelectedSeverity(e.target.value)}
                  aria-label="Filter by intelligence severity"
                >
                  <option value="ALL">All Severity Tiers</option>
                  <option value="CRITICAL">Critical Priority</option>
                  <option value="HIGH">High Priority</option>
                  <option value="MEDIUM">Medium Priority</option>
                </select>
              </div>
            </div>
          </div>

          {/* Category Chips Bar */}
          <div className="category-pills-scroll" role="tablist" aria-label="Event category filter">
            {Object.entries(categoryLabels).map(([key, label]) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={selectedCategory === key}
                className={`category-pill-btn ${selectedCategory === key ? 'active' : ''}`}
                onClick={() => setSelectedCategory(key)}
              >
                {label}
                {key !== 'ALL' && (
                  <span className="pill-count">
                    {timelineEvents.filter((e) => e.category === key).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main View Area */}
      {viewMode === 'table' ? (
        <div className="panel table-view-panel">
          <AccessibleTimelineTable events={filteredEvents} />
        </div>
      ) : (
        <div className="visual-timeline-layout">
          {Object.keys(groupedEvents).length === 0 ? (
            <div className="panel empty-timeline-state">
              <Filter size={36} className="empty-icon" />
              <h3>No Case Events Found</h3>
              <p>No recorded timeline events match your current filter combination.</p>
              <button
                type="button"
                className="secondary-button compact"
                onClick={() => {
                  setSelectedCategory('ALL');
                  setSelectedSuspect('ALL');
                  setSelectedSeverity('ALL');
                  setSearchQuery('');
                }}
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="timeline-spine-track">
              {Object.entries(groupedEvents).map(([monthYear, events]) => (
                <div key={monthYear} className="timeline-month-block">
                  <div className="month-divider">
                    <Calendar size={14} />
                    <span>{monthYear}</span>
                    <span className="month-event-count">({events.length} milestones)</span>
                  </div>

                  <div className="month-cards-list">
                    {events.map((evt) => (
                      <article key={evt.id} className="timeline-card">
                        <div className="timeline-card-node">
                          <div className={`node-marker ${evt.severity.toLowerCase()}`}>
                            <span className="node-inner" />
                          </div>
                        </div>

                        <div className="timeline-card-content">
                          <div className="card-top-meta">
                            <div className="meta-left">
                              <span className="timestamp-badge">
                                <Clock size={12} />
                                <code>{evt.timestamp}</code>
                              </span>
                              <span className={getSeverityBadgeClass(evt.severity)}>
                                {evt.severity}
                              </span>
                              <span className="category-tag">
                                {evt.category.replace(/_/g, ' ')}
                              </span>
                            </div>

                            <div className="meta-right">
                              <span className="ref-code-pill" title="Court Exhibit / Seizure Reference">
                                {evt.referenceCode}
                              </span>
                            </div>
                          </div>

                          <h3 className="card-event-title">{evt.title}</h3>

                          <p className="card-synopsis-text">{evt.synopsis}</p>

                          <div className="card-detail-grid">
                            <div className="detail-item">
                              <MapPin size={13} className="detail-icon" />
                              <span className="detail-label">Location:</span>
                              <span className="detail-val">{evt.location}</span>
                            </div>
                            <div className="detail-item">
                              <Building2 size={13} className="detail-icon" />
                              <span className="detail-label">Agency:</span>
                              <span className="detail-val">{evt.agency}</span>
                            </div>
                            <div className="detail-item">
                              <Scale size={13} className="detail-icon" />
                              <span className="detail-label">Section:</span>
                              <span className="detail-val code-val">{evt.legalSection}</span>
                            </div>
                          </div>

                          {evt.entities && evt.entities.length > 0 && (
                            <div className="card-entities-strip">
                              <span className="entities-label">Linked Accused:</span>
                              <div className="entities-chips">
                                {evt.entities.map((entId) => (
                                  <span key={entId} className="entity-chip">
                                    <Users size={12} />
                                    <span>{getSuspectName(entId)}</span>
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="card-footer-strip">
                            <div className="verification-status">
                              <CheckCircle2 size={14} className="verif-icon" />
                              <span>{evt.verification}</span>
                            </div>
                            <button
                              type="button"
                              className="ghost-button compact inspect-btn"
                              onClick={() => setInspectEvent(evt)}
                            >
                              <Eye size={13} />
                              <span>Inspect Exhibit</span>
                            </button>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Inspect Event Modal */}
      {inspectEvent && (
        <div className="modal-backdrop" onClick={() => setInspectEvent(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <div className="modal-header">
              <div>
                <span className="modal-eyebrow">EVIDENTIARY EXHIBIT INSPECTION</span>
                <h3>{inspectEvent.title}</h3>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setInspectEvent(null)}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <div className="modal-body">
              <div className="modal-info-grid">
                <div className="info-field">
                  <span className="info-label">RECORDED TIMESTAMP</span>
                  <code>{inspectEvent.timestamp}</code>
                </div>
                <div className="info-field">
                  <span className="info-label">STATUTORY PROVISION</span>
                  <code>{inspectEvent.legalSection}</code>
                </div>
                <div className="info-field">
                  <span className="info-label">INVESTIGATING AGENCY</span>
                  <span>{inspectEvent.agency}</span>
                </div>
                <div className="info-field">
                  <span className="info-label">INCIDENT LOCATION</span>
                  <span>{inspectEvent.location}</span>
                </div>
                <div className="info-field">
                  <span className="info-label">REFERENCE CODE</span>
                  <code>{inspectEvent.referenceCode}</code>
                </div>
                <div className="info-field">
                  <span className="info-label">CORROBORATION STATUS</span>
                  <span className="verified-badge">{inspectEvent.verification}</span>
                </div>
              </div>

              <div className="modal-section">
                <h4>Full Case Event Synopsis</h4>
                <p className="modal-synopsis-text">{inspectEvent.synopsis}</p>
              </div>

              <div className="modal-section">
                <h4>Associated Persons of Interest</h4>
                <div className="modal-entities-list">
                  {inspectEvent.entities.map((id) => {
                    const suspect = accusedRoster.find((a) => a.id === id);
                    if (!suspect) return null;
                    return (
                      <div key={id} className="modal-suspect-card">
                        <div className="suspect-card-header">
                          <strong>{suspect.name}</strong>
                          <span className={getSeverityBadgeClass(suspect.riskLevel)}>{suspect.riskLevel}</span>
                        </div>
                        <div className="suspect-card-meta">
                          <span>Role: {suspect.role}</span>
                          <span>Custody: {suspect.custodyStatus}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="secondary-button compact"
                onClick={() => setInspectEvent(null)}
              >
                Close Inspection
              </button>
              <button
                type="button"
                className="primary-button compact copy-ref-btn"
                onClick={() => {
                  navigator.clipboard.writeText(inspectEvent.referenceCode);
                  alert(`Copied Reference Code: ${inspectEvent.referenceCode}`);
                }}
              >
                Copy Reference Code
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
