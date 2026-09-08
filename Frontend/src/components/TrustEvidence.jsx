import React from 'react';
import { ShieldCheck, Lock, FileCheck2, Database, KeyRound, CheckCircle } from 'lucide-react';

export default function TrustEvidence() {
  const securityPoints = [
    {
      title: 'Full Source Traceability',
      desc: 'Every node and relationship links back to specific FIR paragraphs, CDR timestamps, and ledger rows with measurable confidence.',
      icon: FileCheck2,
      color: '#0284C7',
      bgTint: '#F0F9FF'
    },
    {
      title: 'Role-Gated Access Control',
      desc: 'Granular permissions (Investigator, Lead Analyst, Supervisor) strictly enforce need-to-know access with mandatory hardware/OTP 2FA.',
      icon: KeyRound,
      color: '#D97706',
      bgTint: '#FFFBEB'
    },
    {
      title: 'Immutable Audit Logging',
      desc: 'Every dossier viewed, query run, and report exported is permanently logged in a tamper-evident audit ledger for legal admissibility.',
      icon: ShieldCheck,
      color: '#16A34A',
      bgTint: '#F0FDF4'
    },
    {
      title: 'Sovereign Data Protection',
      desc: 'Engineered for on-premise air-gapped government servers with zero external telemetry and state-grade data encryption at rest and in transit.',
      icon: Database,
      color: '#4F46E5',
      bgTint: '#EEF2FF'
    }
  ];

  return (
    <section id="trust" style={{
      padding: '88px 0',
      backgroundColor: '#FFFFFF',
      borderBottom: '1px solid #E2E8F0'
    }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 56px auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
            <span className="badge-pill badge-official">TRUST & INTEGRITY</span>
          </div>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 3.2vw, 2.4rem)',
            fontWeight: 800,
            color: '#0F172A',
            marginBottom: '16px',
            letterSpacing: '-0.02em'
          }}>
            Court-Ready Traceability & Defense-Grade Security
          </h2>
          <p style={{
            fontSize: '1.05rem',
            color: '#475569',
            lineHeight: 1.6
          }}>
            Every insight provides an auditable forensic trail back to source records, protected by strict chain of custody and military-grade access controls.
          </p>
        </div>

        {/* 2-Column Content: Security Pillars + Forensic Traceability Visual Card */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '40px',
          alignItems: 'center'
        }} className="trust-grid">

          {/* Left Column: Security Basics Pillars */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
            {securityPoints.map((item, index) => {
              const IconComp = item.icon;
              return (
                <div
                  key={index}
                  style={{
                    backgroundColor: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    borderRadius: '10px',
                    padding: '20px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '16px',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.03)',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#CBD5E1';
                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.06)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#E2E8F0';
                    e.currentTarget.style.backgroundColor = '#F8FAFC';
                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.03)';
                  }}
                >
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '8px',
                    backgroundColor: item.bgTint,
                    border: `1px solid ${item.color}35`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <IconComp size={20} color={item.color} />
                  </div>

                  <div>
                    <h3 style={{
                      fontSize: '1.05rem',
                      fontWeight: 700,
                      color: '#0F172A',
                      marginBottom: '6px'
                    }}>
                      {item.title}
                    </h3>
                    <p style={{
                      fontSize: '0.9rem',
                      color: '#475569',
                      lineHeight: 1.55
                    }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Forensic Evidence Provenance Specimen Card (Light Theme) */}
          <div style={{
            backgroundColor: '#FFFFFF',
            border: '1.5px solid #CBD5E1',
            borderRadius: '16px',
            padding: '28px',
            boxShadow: '0 16px 36px rgba(15, 23, 42, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.03)'
          }}>
            {/* Specimen Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid #E2E8F0',
              paddingBottom: '16px',
              marginBottom: '20px'
            }}>
              <div>
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.75rem',
                  color: '#1E40AF',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  letterSpacing: '0.06em'
                }}>
                  FORENSIC PROVENANCE SPECIMEN
                </span>
                <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#0F172A', marginTop: '3px' }}>
                  Exhibit #EX-2026-9041 • Chain of Custody
                </h4>
              </div>

              <span style={{
                backgroundColor: '#DCFCE7',
                border: '1px solid #86EFAC',
                color: '#15803D',
                fontSize: '0.75rem',
                padding: '4px 10px',
                borderRadius: '6px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}>
                <CheckCircle size={13} />
                VERIFIED SOURCE
              </span>
            </div>

            {/* Specimen Metadata List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{
                backgroundColor: '#F8FAFC',
                padding: '14px 16px',
                borderRadius: '8px',
                border: '1px solid #E2E8F0'
              }}>
                <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>Extracted Relationship</span>
                <p style={{ fontSize: '0.925rem', fontWeight: 700, color: '#0F172A', marginTop: '3px' }}>
                  Hawala Routing: Suspect Singhania → FinLogix Shell Overseas (₹1.85 Cr)
                </p>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px'
              }}>
                <div style={{
                  backgroundColor: '#F8FAFC',
                  padding: '12px 14px',
                  borderRadius: '8px',
                  border: '1px solid #E2E8F0'
                }}>
                  <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>Primary Source</span>
                  <p style={{ fontSize: '0.85rem', fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: '#0F172A', marginTop: '3px' }}>
                    FIR-2026/041 • Para 18
                  </p>
                </div>

                <div style={{
                  backgroundColor: '#F8FAFC',
                  padding: '12px 14px',
                  borderRadius: '8px',
                  border: '1px solid #E2E8F0'
                }}>
                  <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>Telecom Intercept</span>
                  <p style={{ fontSize: '0.85rem', fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: '#0F172A', marginTop: '3px' }}>
                    Tower #DEL-04 @ 22:14 IST
                  </p>
                </div>
              </div>

              <div style={{
                backgroundColor: '#F8FAFC',
                padding: '12px 14px',
                borderRadius: '8px',
                border: '1px solid #E2E8F0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>Cryptographic Hash (SHA-256)</span>
                  <p style={{
                    fontSize: '0.8rem',
                    fontFamily: "'JetBrains Mono', monospace",
                    color: '#0284C7',
                    fontWeight: 700,
                    marginTop: '3px'
                  }}>
                    8f9b4c0291e5...3c11da087f
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>Model Confidence</span>
                  <p style={{
                    fontSize: '0.95rem',
                    fontFamily: "'JetBrains Mono', monospace",
                    color: '#15803D',
                    fontWeight: 800
                  }}>
                    99.2%
                  </p>
                </div>
              </div>

              {/* Chain of Custody Stamp */}
              <div style={{
                borderTop: '1px dashed #CBD5E1',
                paddingTop: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.8rem',
                color: '#64748B'
              }}>
                <span>Digital Custody Signature:</span>
                <span style={{ color: '#0F172A', fontWeight: 700, fontFamily: "'JetBrains Mono', monospace" }}>
                  INSP_R_VERMA // SEC-L4
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 992px) {
          .trust-grid {
            grid-template-columns: 1.1fr 0.9fr !important;
          }
        }
      `}</style>
    </section>
  );
}
