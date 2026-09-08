import React, { useState } from 'react';
import { User, Lock, ArrowRight, ShieldCheck, KeyRound, FileCheck2, ShieldAlert } from 'lucide-react';

export default function OfficerAccessSection({ onEnterPlatform }) {
  const [officerId, setOfficerId] = useState('IND-7741');
  const [passcode, setPasscode] = useState('••••••••••••');

  const handleSubmit = (e) => {
    e.preventDefault();
    onEnterPlatform();
  };

  const steps = [
    {
      num: '01',
      title: 'Credential Validation',
      desc: 'Officer Service ID and classified passcode are authenticated against central law enforcement personnel directories.',
      icon: User,
      color: '#0284C7'
    },
    {
      num: '02',
      title: 'Mandatory Two-Factor OTP',
      desc: 'Time-based 6-digit hardware token or registered mobile authenticator verification enforces strict zero-trust security.',
      icon: KeyRound,
      color: '#EA580C'
    },
    {
      num: '03',
      title: 'Clearance-Gated Workspace',
      desc: 'Cryptographic session initialized with role-based case permissions and tamper-evident audit ledger recording.',
      icon: ShieldCheck,
      color: '#16A34A'
    }
  ];

  return (
    <section id="officer-access" style={{
      padding: '88px 0',
      backgroundColor: '#FFFFFF',
      borderBottom: '1px solid #E2E8F0',
      position: 'relative'
    }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 56px auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '14px' }}>
            <span className="badge-pill badge-official">
              <ShieldAlert size={13} color="#2563EB" />
              <span>OFFICER ACCESS PROTOCOL</span>
            </span>
          </div>
          <h2 style={{
            fontSize: 'clamp(1.85rem, 3.2vw, 2.5rem)',
            fontWeight: 800,
            color: '#0F172A',
            marginBottom: '16px',
            letterSpacing: '-0.025em'
          }}>
            How an Officer Can Access the Platform
          </h2>
          <p style={{
            fontSize: '1.05rem',
            color: '#475569',
            lineHeight: 1.65
          }}>
            Step-by-step verified gateway for authorized law enforcement officers and intelligence analysts to access classified investigation workspaces.
          </p>
        </div>

        {/* 2-Column Grid: 3 Step Cards on Left + Authorized Officer Access Card on Right */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '48px',
          alignItems: 'center'
        }} className="access-grid">

          {/* Left Column: 3 Access Steps */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {steps.map((step) => {
              const IconComp = step.icon;
              return (
                <div
                  key={step.num}
                  style={{
                    backgroundColor: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    borderRadius: '12px',
                    padding: '24px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '20px',
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.03)',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = step.color;
                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(15, 23, 42, 0.06)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#E2E8F0';
                    e.currentTarget.style.backgroundColor = '#F8FAFC';
                    e.currentTarget.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.03)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '10px',
                    backgroundColor: '#FFFFFF',
                    border: `1.5px solid ${step.color}40`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: '0 2px 5px rgba(0,0,0,0.04)'
                  }}>
                    <IconComp size={22} color={step.color} />
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontWeight: 800,
                        fontSize: '0.75rem',
                        color: step.color
                      }}>
                        PHASE {step.num}
                      </span>
                      <span style={{ color: '#CBD5E1' }}>•</span>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A' }}>
                        {step.title}
                      </h3>
                    </div>
                    <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6 }}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Authorized Officer Access Card (The 4th/5th Image) */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{
              width: '100%',
              maxWidth: '430px',
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              border: '1.5px solid #CBD5E1',
              padding: '36px 30px',
              boxShadow: '0 20px 45px -10px rgba(15, 23, 42, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.04)',
              position: 'relative'
            }}>
              {/* Officer Silhouette Avatar Circle at top */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '24px'
              }}>
                <div style={{
                  width: '68px',
                  height: '68px',
                  borderRadius: '50%',
                  backgroundColor: '#FFF7ED',
                  border: '2px solid #FDBA74',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 14px rgba(234, 88, 12, 0.18)'
                }}>
                  <div style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    backgroundColor: '#EA580C',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF'
                  }}>
                    <User size={26} />
                  </div>
                </div>
              </div>

              {/* Card Title & Department */}
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: 800,
                  color: '#0F172A',
                  letterSpacing: '-0.01em'
                }}>
                  Authorized Officer Access
                </h3>
                <p style={{
                  fontSize: '0.825rem',
                  color: '#64748B',
                  marginTop: '4px'
                }}>
                  State Crime Branch • Intelligence Gateway
                </p>
              </div>

              {/* Credentials Form */}
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Field 1: User / Officer ID */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: '#475569',
                    marginBottom: '6px',
                    letterSpacing: '0.02em',
                    textTransform: 'uppercase'
                  }}>
                    Officer Service ID
                  </label>
                  <div style={{ position: 'relative' }}>
                    <div style={{
                      position: 'absolute',
                      left: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#64748B'
                    }}>
                      <User size={18} />
                    </div>
                    <input
                      type="text"
                      value={officerId}
                      onChange={(e) => setOfficerId(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 14px 12px 40px',
                        backgroundColor: '#F8FAFC',
                        border: '1px solid #CBD5E1',
                        borderRadius: '8px',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        color: '#0F172A',
                        fontFamily: "'JetBrains Mono', monospace"
                      }}
                      placeholder="e.g. IND-7741"
                      required
                    />
                  </div>
                </div>

                {/* Field 2: Password / Passcode */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: '#475569',
                    marginBottom: '6px',
                    letterSpacing: '0.02em',
                    textTransform: 'uppercase'
                  }}>
                    Security Passcode
                  </label>
                  <div style={{ position: 'relative' }}>
                    <div style={{
                      position: 'absolute',
                      left: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#64748B'
                    }}>
                      <Lock size={18} />
                    </div>
                    <input
                      type="password"
                      value={passcode}
                      onChange={(e) => setPasscode(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 14px 12px 40px',
                        backgroundColor: '#F8FAFC',
                        border: '1px solid #CBD5E1',
                        borderRadius: '8px',
                        fontSize: '0.9rem',
                        color: '#0F172A'
                      }}
                      placeholder="Enter classified passcode"
                      required
                    />
                  </div>
                </div>

                {/* Government Orange CTA Button */}
                <button
                  type="submit"
                  className="btn-gov-accent"
                  style={{
                    width: '100%',
                    padding: '13px',
                    fontSize: '1rem',
                    marginTop: '8px'
                  }}
                  aria-label="Authenticate Officer"
                >
                  <span>Enter Platform</span>
                  <ArrowRight size={17} />
                </button>
              </form>

              {/* Status Indicator */}
              <div style={{
                marginTop: '20px',
                paddingTop: '16px',
                borderTop: '1px solid #F1F5F9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.75rem',
                color: '#64748B'
              }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981' }} />
                  Gateway Ready
                </span>
                <span style={{ fontWeight: 700, color: '#1E40AF', fontFamily: "'JetBrains Mono', monospace" }}>
                  MHA SEC-L4
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 992px) {
          .access-grid {
            grid-template-columns: 1.15fr 0.85fr !important;
          }
        }
      `}</style>
    </section>
  );
}
