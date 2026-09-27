import React, { useState, useMemo } from 'react';
import { ArrowUpDown, Download, Search, Shield, FileText, CheckCircle2 } from 'lucide-react';

export default function AccessibleTimelineTable({ events }) {
  const [sortField, setSortField] = useState('timestamp');
  const [sortAsc, setSortAsc] = useState(true);
  const [filterText, setFilterText] = useState('');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const filteredEvents = useMemo(() => {
    if (!filterText.trim()) return events;
    const q = filterText.toLowerCase();
    return events.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        e.synopsis.toLowerCase().includes(q) ||
        e.agency.toLowerCase().includes(q) ||
        e.location.toLowerCase().includes(q) ||
        e.legalSection.toLowerCase().includes(q) ||
        e.referenceCode.toLowerCase().includes(q)
    );
  }, [events, filterText]);

  const sortedEvents = useMemo(() => {
    return [...filteredEvents].sort((a, b) => {
      let valA = a[sortField] || '';
      let valB = b[sortField] || '';
      if (valA < valB) return sortAsc ? -1 : 1;
      if (valA > valB) return sortAsc ? 1 : -1;
      return 0;
    });
  }, [filteredEvents, sortField, sortAsc]);

  const handleExportCSV = () => {
    const headers = ['Timestamp', 'Category', 'Severity', 'Title', 'Location', 'Agency', 'Legal Section', 'Verification', 'Reference Code'];
    const rows = sortedEvents.map((e) => [
      `"${e.timestamp}"`,
      `"${e.category}"`,
      `"${e.severity}"`,
      `"${e.title.replace(/"/g, '""')}"`,
      `"${e.location.replace(/"/g, '""')}"`,
      `"${e.agency.replace(/"/g, '""')}"`,
      `"${e.legalSection.replace(/"/g, '""')}"`,
      `"${e.verification.replace(/"/g, '""')}"`,
      `"${e.referenceCode}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Evidentiary_Timeline_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
    <div className="accessible-timeline-container" role="region" aria-label="Evidentiary Timeline Data Table">
      <div className="table-controls-bar">
        <div className="table-search-box">
          <Search size={16} className="search-icon-svg" />
          <input
            type="text"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            placeholder="Search events, legal sections, locations, reference codes..."
            aria-label="Filter events table"
          />
          {filterText && (
            <button
              type="button"
              className="clear-search-btn"
              onClick={() => setFilterText('')}
              aria-label="Clear filter"
            >
              ×
            </button>
          )}
        </div>

        <div className="table-actions-cluster">
          <span className="table-results-counter">
            Showing <strong>{sortedEvents.length}</strong> of {events.length} records
          </span>
          <button
            type="button"
            className="secondary-button compact table-export-btn"
            onClick={handleExportCSV}
            title="Download CSV for Court Submission"
          >
            <Download size={14} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      <div className="table-responsive-wrapper">
        <table className="evidentiary-table" aria-label="Chronological Case Events Ledger">
          <thead>
            <tr>
              <th scope="col" onClick={() => handleSort('timestamp')} className="sortable-th">
                <div className="th-content">
                  <span>Timestamp (IST)</span>
                  <ArrowUpDown size={13} />
                </div>
              </th>
              <th scope="col" onClick={() => handleSort('severity')} className="sortable-th">
                <div className="th-content">
                  <span>Severity</span>
                  <ArrowUpDown size={13} />
                </div>
              </th>
              <th scope="col" onClick={() => handleSort('category')} className="sortable-th">
                <div className="th-content">
                  <span>Category</span>
                  <ArrowUpDown size={13} />
                </div>
              </th>
              <th scope="col" onClick={() => handleSort('title')} className="sortable-th">
                <div className="th-content">
                  <span>Event &amp; Synopsis</span>
                  <ArrowUpDown size={13} />
                </div>
              </th>
              <th scope="col" onClick={() => handleSort('agency')} className="sortable-th">
                <div className="th-content">
                  <span>Agency / Unit</span>
                  <ArrowUpDown size={13} />
                </div>
              </th>
              <th scope="col" onClick={() => handleSort('legalSection')} className="sortable-th">
                <div className="th-content">
                  <span>Statutory Provision</span>
                  <ArrowUpDown size={13} />
                </div>
              </th>
              <th scope="col">
                <div className="th-content">
                  <span>Verification Status</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedEvents.length === 0 ? (
              <tr>
                <td colSpan={7} className="table-empty-row">
                  No evidentiary events match the search query.
                </td>
              </tr>
            ) : (
              sortedEvents.map((evt) => (
                <tr key={evt.id} className="table-data-row">
                  <td className="timestamp-cell">
                    <code>{evt.timestamp}</code>
                    <span className="ref-subtext">{evt.referenceCode}</span>
                  </td>
                  <td>
                    <span className={getSeverityBadgeClass(evt.severity)}>
                      {evt.severity}
                    </span>
                  </td>
                  <td>
                    <span className="category-chip">
                      {evt.category.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="event-info-cell">
                    <strong className="event-title-text">{evt.title}</strong>
                    <p className="event-synopsis-text">{evt.synopsis}</p>
                    <div className="event-meta-footer">
                      <span className="location-tag">{evt.location}</span>
                    </div>
                  </td>
                  <td className="agency-cell">
                    <span className="agency-name">{evt.agency}</span>
                  </td>
                  <td className="legal-cell">
                    <code>{evt.legalSection}</code>
                  </td>
                  <td className="verification-cell">
                    <span className="verification-pill">
                      <CheckCircle2 size={13} className="pill-check-icon" />
                      <span>{evt.verification}</span>
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
