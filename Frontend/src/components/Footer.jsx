import React from 'react';
import { Shield, CheckCircle2, Lock } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: '#F8FAFC',
      borderTop: '1px solid #E2E8F0',
      color: '#475569',
      fontSize: '0.85rem',
      padding: '56px 0 36px 0'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '36px',
          marginBottom: '40px'
        }}>
          {/* Column 1: Agency Brand & Mandate */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 800,
                fontSize: '1.15rem',
                color: '#1B2A4A',
                letterSpacing: '0.04em'
              }}>
                NATINT PLATFORM
              </span>
              <span className="badge-pill badge-official" style={{ fontSize: '0.65rem' }}>
                OFFICIAL USE ONLY
              </span>
            </div>
            <p style={{ lineHeight: 1.65, color: '#64748B', fontSize: '0.85rem', marginBottom: '16px' }}>
              National Artificial Intelligence & Criminal Intelligence Network Analysis System. Dedicated to inter-agency data harmonization, entity resolution, and organized crime dismantlement.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#15803D', fontSize: '0.8rem', fontWeight: 700 }}>
              <CheckCircle2 size={16} />
              <span>WCAG 2.1 Level AA Certified</span>
            </div>
          </div>

          {/* Column 2: Legal & Classification Advisory */}
          <div>
            <h4 style={{ color: '#0F172A', fontWeight: 700, fontSize: '0.925rem', marginBottom: '14px' }}>
              Legal & Statutory Notice
            </h4>
            <p style={{ lineHeight: 1.65, color: '#64748B', fontSize: '0.85rem' }}>
              This system is restricted exclusively to authorized officers under the Information Technology Act and applicable state police directives. Unauthorized access, extraction, or dissemination of intelligence files is strictly punishable under federal law.
            </p>
          </div>

          {/* Column 3: Security & Support */}
          <div>
            <h4 style={{ color: '#0F172A', fontWeight: 700, fontSize: '0.925rem', marginBottom: '14px' }}>
              Security & Chain of Custody
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px', color: '#64748B' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Lock size={14} color="#0284C7" />
                <span>Air-Gapped Sovereign Hardware Compatibility</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Shield size={14} color="#0284C7" />
                <span>SHA-256 Tamper-Evident Ledger Recording</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#16A34A' }} />
                <span>National NIC / Cyber Security Operations Center (CSOC) Monitored</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Timestamp */}
        <div style={{
          borderTop: '1px solid #E2E8F0',
          paddingTop: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          fontSize: '0.8rem',
          color: '#64748B'
        }}>
          <div>
            © 2026 National Intelligence & Criminal Network Analysis Initiative. All Rights Reserved.
          </div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 600 }}>
            Classification: RESTRICTED // FOUO • Time: 2026-09-09 IST
          </div>
        </div>
      </div>
    </footer>
  );
}
