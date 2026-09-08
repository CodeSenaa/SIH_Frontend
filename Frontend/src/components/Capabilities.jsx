import React from 'react';
import { FileSearch, GitFork, Eye, Zap, Clock, ShieldCheck, ArrowUpRight } from 'lucide-react';

export default function Capabilities() {
  const capabilities = [
    {
      title: 'Automated Entity Extraction',
      desc: 'Parses unstructured FIRs, interrogation notes, and telecom dumps into structured suspect, vehicle, and financial records.',
      icon: FileSearch,
      stat: 'Multi-Format Ingest',
      color: '#0284C7',
      bgTint: '#F0F9FF'
    },
    {
      title: 'Multi-Tier Relationship Mapping',
      desc: 'Discovers direct and secondary ties between persons, shell companies, burner MSISDNs, and bank accounts with weighted confidence.',
      icon: GitFork,
      stat: 'Weighted Link Scoring',
      color: '#4F46E5',
      bgTint: '#EEF2FF'
    },
    {
      title: 'Hidden-Connection Discovery',
      desc: 'Calculates shortest-path links to reveal kingpins and controllers deliberately operating behind layers of proxies and mules.',
      icon: Eye,
      stat: 'Shortest-Path Traversal',
      color: '#D97706',
      bgTint: '#FFFBEB'
    },
    {
      title: 'Pattern & Anomaly Detection',
      desc: 'Detects simultaneous burner activations, cash transaction spikes, and geo-fenced rendezvous without manual hypothesis drafting.',
      icon: Zap,
      stat: 'Behavioral Signals',
      color: '#DC2626',
      bgTint: '#FEF2F2'
    },
    {
      title: 'Temporal Evolution Analysis',
      desc: 'Tracks how syndicate relationships shift, expand, or sever over time, exposing tactical re-organizations before major events.',
      icon: Clock,
      stat: 'Time-Series Graphs',
      color: '#16A34A',
      bgTint: '#F0FDF4'
    },
    {
      title: 'Evidence-Linked Insights',
      desc: 'Every generated node, edge, and risk score links directly to raw source documents and timestamps for courtroom-admissible proof.',
      icon: ShieldCheck,
      stat: 'Court-Ready Chain of Custody',
      color: '#0D9488',
      bgTint: '#F0FDFA'
    }
  ];

  return (
    <section id="capabilities" style={{
      padding: '88px 0',
      backgroundColor: '#F8FAFC',
      borderBottom: '1px solid #E2E8F0'
    }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 56px auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
            <span className="badge-pill badge-official">CORE CAPABILITIES</span>
          </div>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 3.2vw, 2.4rem)',
            fontWeight: 800,
            color: '#0F172A',
            marginBottom: '16px',
            letterSpacing: '-0.02em'
          }}>
            Purpose-Built for Law Enforcement & Intelligence Analysis
          </h2>
          <p style={{
            fontSize: '1.05rem',
            color: '#475569',
            lineHeight: 1.6
          }}>
            Engineered to replace slow, manual spreadsheet correlation with deterministic graph analytics and court-grade evidentiary certainty.
          </p>
        </div>

        {/* 6 Capabilities Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px'
        }}>
          {capabilities.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '12px',
                  padding: '30px 26px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                  position: 'relative',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = item.color;
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = `0 12px 28px rgba(15, 23, 42, 0.08), 0 0 0 1px ${item.color}40`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#E2E8F0';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.04)';
                }}
              >
                <div>
                  {/* Top Bar inside Card */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '20px'
                  }}>
                    <div style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '10px',
                      backgroundColor: item.bgTint,
                      border: `1px solid ${item.color}30`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <IconComponent size={24} color={item.color} />
                    </div>

                    <span style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '0.75rem',
                      color: item.color,
                      backgroundColor: item.bgTint,
                      border: `1px solid ${item.color}30`,
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontWeight: 700
                    }}>
                      {item.stat}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 style={{
                    fontSize: '1.18rem',
                    fontWeight: 700,
                    color: '#0F172A',
                    marginBottom: '10px'
                  }}>
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p style={{
                    fontSize: '0.925rem',
                    color: '#475569',
                    lineHeight: 1.65
                  }}>
                    {item.desc}
                  </p>
                </div>

                {/* Subtext Footnote */}
                <div style={{
                  borderTop: '1px solid #F1F5F9',
                  marginTop: '24px',
                  paddingTop: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>
                    Standard Intelligence Primitive
                  </span>
                  <ArrowUpRight size={15} color="#94A3B8" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
