import React from 'react';
import { Database, Cpu, UserCheck, Network, AlertTriangle } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      step: '01',
      title: 'Raw Data In',
      desc: 'Ingests unstructured FIRs, telecom CDR/IPDR dumps, banking spreadsheets, and vehicle ANPR camera logs without pre-formatting.',
      icon: Database,
      highlight: 'Multi-Source Feeds',
      color: '#0284C7'
    },
    {
      step: '02',
      title: 'AI Entity Extraction',
      desc: 'Multi-modal natural language models automatically extract suspect names, burner phone IMEIs, license plates, and Hawala accounts.',
      icon: Cpu,
      highlight: 'Automated Tagging',
      color: '#4F46E5'
    },
    {
      step: '03',
      title: 'Entity Resolution',
      desc: 'Phonetic, biometric, and contextual scoring links aliases and duplicate identities—strictly avoiding blind or false merging.',
      icon: UserCheck,
      highlight: 'Zero Blind Merges',
      color: '#D97706'
    },
    {
      step: '04',
      title: 'Graph Built',
      desc: 'Connects suspect individuals, front shell businesses, phone records, and money flows into a multidimensional knowledge graph.',
      icon: Network,
      highlight: 'Weighted Edges',
      color: '#16A34A'
    },
    {
      step: '05',
      title: 'Risk Signals Surfaced',
      desc: 'Automated link traversal unmasks kingpin intermediaries, simultaneous burner activations, and imminent flight risk anomalies.',
      icon: AlertTriangle,
      highlight: 'Proactive Triage',
      color: '#DC2626'
    }
  ];

  return (
    <section id="how-it-works" style={{
      padding: '88px 0',
      backgroundColor: '#FFFFFF',
      borderBottom: '1px solid #E2E8F0',
      position: 'relative'
    }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 56px auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
            <span className="badge-pill badge-official">INTELLIGENCE PIPELINE</span>
          </div>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 3.2vw, 2.4rem)',
            fontWeight: 800,
            color: '#0F172A',
            marginBottom: '16px',
            letterSpacing: '-0.02em'
          }}>
            How Raw Case Data Becomes Actionable Intelligence
          </h2>
          <p style={{
            fontSize: '1.05rem',
            color: '#475569',
            lineHeight: 1.6
          }}>
            A deterministic, 5-stage pipeline that transforms scattered case records into an interconnected, court-verifiable intelligence network.
          </p>
        </div>

        {/* 5-Step Horizontal Flow Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
          gap: '20px',
          position: 'relative'
        }}>
          {steps.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.step}
                style={{
                  backgroundColor: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderRadius: '12px',
                  padding: '24px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.03)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = '#93C5FD';
                  e.currentTarget.style.boxShadow = '0 12px 24px rgba(37, 99, 235, 0.1)';
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = '#E2E8F0';
                  e.currentTarget.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.03)';
                  e.currentTarget.style.backgroundColor = '#F8FAFC';
                }}
              >
                <div>
                  {/* Step Badge & Icon */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '20px'
                  }}>
                    <span style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontWeight: 800,
                      fontSize: '0.85rem',
                      color: item.color,
                      backgroundColor: '#FFFFFF',
                      border: `1px solid ${item.color}40`,
                      padding: '3px 10px',
                      borderRadius: '6px'
                    }}>
                      STEP {item.step}
                    </span>

                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '8px',
                      backgroundColor: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid #CBD5E1',
                      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
                    }}>
                      <IconComponent size={20} color={item.color} />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 style={{
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    color: '#0F172A',
                    marginBottom: '8px'
                  }}>
                    {item.title}
                  </h3>

                  {/* Description: 1-2 sentences */}
                  <p style={{
                    fontSize: '0.875rem',
                    color: '#475569',
                    lineHeight: 1.6,
                    marginBottom: '18px'
                  }}>
                    {item.desc}
                  </p>
                </div>

                {/* Sub-tag Highlight */}
                <div style={{
                  borderTop: '1px solid #E2E8F0',
                  paddingTop: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: item.color }} />
                  <span style={{
                    fontSize: '0.75rem',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontWeight: 600,
                    color: '#64748B'
                  }}>
                    {item.highlight}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
