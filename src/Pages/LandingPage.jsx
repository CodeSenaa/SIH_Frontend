import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  X,
  Lock,
  KeyRound,
  CheckCircle,
  CheckCircle2,
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Shield,
  User,
  Network,
  Menu,
  Database,
  Cpu,
  UserCheck,
  AlertTriangle,
  FileSearch,
  GitFork,
  Eye,
  Zap,
  Clock,
  FileCheck2
} from 'lucide-react';

/* ==========================================================================
   1. NAVBAR COMPONENT
   ========================================================================== */
function Navbar({ onEnterPlatform }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 40,
      backgroundColor: 'rgba(255, 255, 255, 0.96)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid #E2E8F0',
      boxShadow: '0 2px 10px rgba(15, 23, 42, 0.05)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '68px'
      }}>
        {/* Logo & Platform Name */}
        <a href="#hero" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          textDecoration: 'none',
          color: '#0F172A'
        }}>
          {/* Official Emblem Badge */}
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #1B2A4A 0%, #2563EB 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(37, 99, 235, 0.25)',
            position: 'relative'
          }}>
            <Network size={22} color="#FFFFFF" />
            <span style={{
              position: 'absolute',
              bottom: '-2px',
              right: '-2px',
              width: '9px',
              height: '9px',
              borderRadius: '50%',
              backgroundColor: '#10B981',
              border: '2px solid #FFFFFF'
            }} title="System Online" />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 800,
                fontSize: '1.2rem',
                letterSpacing: '0.06em',
                color: '#1B2A4A'
              }}>
                NATINT
              </span>
            </div>
            <p style={{
              fontSize: '0.75rem',
              color: '#64748B',
              letterSpacing: '0.01em',
              fontWeight: 500,
              lineHeight: 1
            }}>
              Criminal Network & Intelligence Analysis
            </p>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav style={{
          display: 'none',
          alignItems: 'center',
          gap: '28px'
        }} className="desktop-nav">
          <a href="#officer-access" style={{
            color: '#334155',
            textDecoration: 'none',
            fontSize: '0.9rem',
            fontWeight: 600,
            transition: 'color 0.2s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#2563EB'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#334155'}>
            Officer Access
          </a>
          <a href="#how-it-works" style={{
            color: '#334155',
            textDecoration: 'none',
            fontSize: '0.9rem',
            fontWeight: 600,
            transition: 'color 0.2s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#2563EB'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#334155'}>
            How It Works
          </a>
          <a href="#capabilities" style={{
            color: '#334155',
            textDecoration: 'none',
            fontSize: '0.9rem',
            fontWeight: 600,
            transition: 'color 0.2s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#2563EB'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#334155'}>
            Capabilities
          </a>
          <a href="#trust" style={{
            color: '#334155',
            textDecoration: 'none',
            fontSize: '0.9rem',
            fontWeight: 600,
            transition: 'color 0.2s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#2563EB'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#334155'}>
            Security & Evidence
          </a>
        </nav>

        {/* Desktop Action CTA */}
        <div style={{ display: 'none', alignItems: 'center', gap: '16px' }} className="desktop-nav">
          <button
            onClick={onEnterPlatform}
            className="btn-gov-accent"
            style={{
              padding: '9px 22px',
              fontSize: '0.875rem'
            }}
            aria-label="Enter Platform Secure Login"
          >
            <Lock size={15} />
            <span>Enter Platform</span>
            <ArrowRight size={15} />
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div style={{ display: 'block' }} className="mobile-toggle">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: '#FFFFFF',
              border: '1px solid #CBD5E1',
              color: '#0F172A',
              borderRadius: '6px',
              padding: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            aria-label="Toggle Mobile Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div style={{
          backgroundColor: '#FFFFFF',
          borderTop: '1px solid #E2E8F0',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          boxShadow: '0 8px 20px rgba(0,0,0,0.06)'
        }}>
          <a
            href="#officer-access"
            onClick={() => setMobileMenuOpen(false)}
            style={{ color: '#0F172A', textDecoration: 'none', padding: '8px 0', fontWeight: 600 }}
          >
            Officer Access
          </a>
          <a
            href="#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            style={{ color: '#0F172A', textDecoration: 'none', padding: '8px 0', fontWeight: 600 }}
          >
            How It Works
          </a>
          <a
            href="#capabilities"
            onClick={() => setMobileMenuOpen(false)}
            style={{ color: '#0F172A', textDecoration: 'none', padding: '8px 0', fontWeight: 600 }}
          >
            Capabilities
          </a>
          <a
            href="#trust"
            onClick={() => setMobileMenuOpen(false)}
            style={{ color: '#0F172A', textDecoration: 'none', padding: '8px 0', fontWeight: 600 }}
          >
            Security & Evidence
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onEnterPlatform();
            }}
            className="btn-gov-accent"
            style={{ width: '100%', marginTop: '8px' }}
          >
            <Lock size={16} />
            <span>Enter Platform</span>
          </button>
        </div>
      )}

      <style>{`
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .mobile-toggle { display: none !important; }
        }
      `}</style>
    </header>
  );
}

/* ==========================================================================
   2. HERO COMPONENT
   ========================================================================== */
function Hero({ onEnterPlatform }) {
  return (
    <section id="hero" style={{
      position: 'relative',
      minHeight: '840px',
      padding: '96px 0 320px 0',
      background: 'linear-gradient(180deg, #E0E7FF 0%, #EDE9FE 30%, #F1F5F9 75%, #F8FAFC 100%)',
      overflow: 'hidden',
      borderBottom: '1px solid #CBD5E1',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start'
    }}>
      {/* Background Architectural Vector: Neoclassical Government Secretariat & Landscaped Grounds */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '340px',
        pointerEvents: 'none',
        zIndex: 1,
        opacity: 0.95
      }}>
        <svg
          viewBox="0 0 1440 380"
          preserveAspectRatio="xMidYMax slice"
          style={{ width: '100%', height: '100%' }}
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="domeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#E2E8F0" />
            </linearGradient>
            <linearGradient id="facadeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F8FAFC" />
              <stop offset="100%" stopColor="#E2E8F0" />
            </linearGradient>
            <linearGradient id="sunGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FEF3C7" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#EDE9FE" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="waterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#0284C7" stopOpacity="0.6" />
            </linearGradient>
          </defs>

          {/* Morning Sun Glow behind Dome */}
          <circle cx="720" cy="140" r="160" fill="url(#sunGlow)" />

          {/* City Skyline Silhouette Backdrop */}
          <path d="M 0 280 L 150 280 L 150 240 L 220 240 L 220 280 L 380 280 L 420 220 L 480 220 L 520 280 L 920 280 L 960 210 L 1020 210 L 1060 280 L 1260 280 L 1320 235 L 1440 235 L 1440 380 L 0 380 Z" fill="#CBD5E1" opacity="0.35" />

          {/* Trees / Foliage Backdrop */}
          <circle cx="480" cy="270" r="45" fill="#A3E635" opacity="0.5" />
          <circle cx="530" cy="280" r="40" fill="#65A30D" opacity="0.6" />
          <circle cx="910" cy="275" r="42" fill="#65A30D" opacity="0.6" />
          <circle cx="960" cy="270" r="46" fill="#A3E635" opacity="0.5" />

          {/* Neoclassical Secretariat Wings */}
          <rect x="420" y="220" width="600" height="90" fill="url(#facadeGrad)" stroke="#94A3B8" strokeWidth="1.5" />
          
          {/* Windows on Facade */}
          <g fill="#94A3B8" opacity="0.6">
            <rect x="440" y="235" width="12" height="20" rx="2" />
            <rect x="465" y="235" width="12" height="20" rx="2" />
            <rect x="490" y="235" width="12" height="20" rx="2" />
            <rect x="515" y="235" width="12" height="20" rx="2" />
            <rect x="540" y="235" width="12" height="20" rx="2" />
            <rect x="565" y="235" width="12" height="20" rx="2" />

            <rect x="860" y="235" width="12" height="20" rx="2" />
            <rect x="885" y="235" width="12" height="20" rx="2" />
            <rect x="910" y="235" width="12" height="20" rx="2" />
            <rect x="935" y="235" width="12" height="20" rx="2" />
            <rect x="960" y="235" width="12" height="20" rx="2" />
            <rect x="985" y="235" width="12" height="20" rx="2" />

            <rect x="440" y="265" width="12" height="22" rx="2" />
            <rect x="465" y="265" width="12" height="22" rx="2" />
            <rect x="490" y="265" width="12" height="22" rx="2" />
            <rect x="515" y="265" width="12" height="22" rx="2" />
            <rect x="540" y="265" width="12" height="22" rx="2" />
            <rect x="565" y="265" width="12" height="22" rx="2" />

            <rect x="860" y="265" width="12" height="22" rx="2" />
            <rect x="885" y="265" width="12" height="22" rx="2" />
            <rect x="910" y="265" width="12" height="22" rx="2" />
            <rect x="935" y="265" width="12" height="22" rx="2" />
            <rect x="960" y="265" width="12" height="22" rx="2" />
            <rect x="985" y="265" width="12" height="22" rx="2" />
          </g>

          {/* Central Rotunda and Columns */}
          <rect x="620" y="195" width="200" height="115" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="2" />
          <g fill="#F1F5F9" stroke="#94A3B8" strokeWidth="1">
            <rect x="635" y="205" width="12" height="100" />
            <rect x="660" y="205" width="12" height="100" />
            <rect x="685" y="205" width="12" height="100" />
            <rect x="710" y="205" width="12" height="100" />
            <rect x="735" y="205" width="12" height="100" />
            <rect x="760" y="205" width="12" height="100" />
            <rect x="785" y="205" width="12" height="100" />
          </g>

          {/* Grand Dome */}
          <path d="M 645 195 C 645 130, 795 130, 795 195 Z" fill="url(#domeGrad)" stroke="#64748B" strokeWidth="2" />
          <rect x="712" y="105" width="16" height="25" fill="#FFFFFF" stroke="#64748B" strokeWidth="1.5" />
          <path d="M 708 105 L 720 85 L 732 105 Z" fill="#D97706" />
          <line x1="720" y1="85" x2="720" y2="70" stroke="#0F172A" strokeWidth="2" />
          {/* Small National Flag on Dome */}
          <rect x="720" y="70" width="18" height="11" fill="#FF9933" />
          <rect x="720" y="74" width="18" height="4" fill="#FFFFFF" />
          <rect x="720" y="78" width="18" height="3" fill="#138808" />

          {/* Landscaped Plinth & Ground */}
          <rect x="0" y="305" width="1440" height="75" fill="#E2E8F0" />
          <rect x="0" y="315" width="1440" height="65" fill="#F8FAFC" />

          {/* Center Fountain */}
          <ellipse cx="720" cy="355" rx="140" ry="24" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="2" />
          <ellipse cx="720" cy="353" rx="130" ry="20" fill="url(#waterGrad)" />
          <path d="M 720 353 C 715 315, 705 310, 700 325" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
          <path d="M 720 353 C 720 295, 720 295, 720 353" fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
          <path d="M 720 353 C 725 315, 735 310, 740 325" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />

          {/* Left & Right Fountains */}
          <ellipse cx="320" cy="358" rx="70" ry="14" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="1.5" />
          <ellipse cx="320" cy="357" rx="64" ry="12" fill="url(#waterGrad)" />
          <path d="M 320 357 C 320 330, 320 330, 320 357" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />

          <ellipse cx="1120" cy="358" rx="70" ry="14" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="1.5" />
          <ellipse cx="1120" cy="357" rx="64" ry="12" fill="url(#waterGrad)" />
          <path d="M 1120 357 C 1120 330, 1120 330, 1120 357" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        {/* Centered, Majestic Hero Narrative sitting cleanly in the sky portion */}
        <div style={{ maxWidth: '860px', margin: '0 auto', textAlign: 'center' }}>
          {/* Headline */}
          <h1 style={{
            fontSize: 'clamp(2.4rem, 5vw, 3.9rem)',
            fontWeight: 800,
            lineHeight: 1.15,
            color: '#0F172A',
            letterSpacing: '-0.025em',
            marginBottom: '24px'
          }}>
            Uncover Hidden Connections in <span style={{
              color: '#1E40AF',
              backgroundImage: 'linear-gradient(135deg, #1B2A4A 0%, #2563EB 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Fragmented Crime & Intelligence</span> Data.
          </h1>

          {/* Subhead specifically highlighting the fragmented records problem */}
          <p style={{
            fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
            lineHeight: 1.75,
            color: '#334155',
            marginBottom: '42px',
            maxWidth: '760px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            Fragmented data—FIRs, CDRs, financial records, vehicle registries, and surveillance logs—conceals complex criminal syndicates that are nearly impossible to discover manually. NATINT’s AI graph engine automatically resolves identities, maps multi-tier associations, and exposes concealed relationships that are difficult to see manually.
          </p>

          {/* Primary & Secondary Action CTAs with ample clearance above the building */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '18px'
          }}>
            <button
              onClick={onEnterPlatform}
              className="btn-gov-accent"
              style={{ padding: '15px 36px', fontSize: '1.05rem' }}
              aria-label="Enter Platform Access Portal"
            >
              <Lock size={18} />
              <span>Enter Platform</span>
              <ArrowRight size={18} />
            </button>

            <a
              href="#officer-access"
              className="btn-secondary"
              style={{
                padding: '15px 30px',
                fontSize: '1.05rem',
                backgroundColor: '#FFFFFF',
                color: '#0F172A',
                borderColor: '#CBD5E1',
                boxShadow: '0 2px 6px rgba(0,0,0,0.06)'
              }}
            >
              <span>See How It Works</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   3. OFFICER ACCESS SECTION COMPONENT
   ========================================================================== */
function OfficerAccessSection({ onEnterPlatform }) {
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

          {/* Right Column: Authorized Officer Access Card */}
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

/* ==========================================================================
   4. HOW IT WORKS COMPONENT
   ========================================================================== */
function HowItWorks() {
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

                  {/* Description */}
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

/* ==========================================================================
   5. CAPABILITIES COMPONENT
   ========================================================================== */
function Capabilities() {
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

/* ==========================================================================
   6. TRUST & EVIDENCE COMPONENT
   ========================================================================== */
function TrustEvidence() {
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

        {/* 2-Column Content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '40px',
          alignItems: 'center'
        }} className="trust-grid">

          {/* Left Column: Security Pillars */}
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

          {/* Right Column: Forensic Evidence Provenance Specimen Card */}
          <div style={{
            backgroundColor: '#FFFFFF',
            border: '1.5px solid #CBD5E1',
            borderRadius: '16px',
            padding: '28px',
            boxShadow: '0 16px 36px rgba(15, 23, 42, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.03)'
          }}>
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

/* ==========================================================================
   7. FINAL CTA COMPONENT
   ========================================================================== */
function FinalCta({ onEnterPlatform }) {
  return (
    <section style={{
      padding: '96px 0',
      background: 'linear-gradient(180deg, #FFFFFF 0%, #EFF6FF 50%, #F1F5F9 100%)',
      position: 'relative',
      overflow: 'hidden',
      borderBottom: '1px solid #CBD5E1'
    }}>
      <div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
        <div style={{ maxWidth: '740px', margin: '0 auto' }}>
          {/* Official Emblem Badge */}
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '16px',
            backgroundColor: '#FFFFFF',
            border: '2px solid #BFDBFE',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '28px',
            boxShadow: '0 8px 20px rgba(37, 99, 235, 0.15)'
          }}>
            <ShieldCheck size={32} color="#1E40AF" />
          </div>

          {/* Outcome Statement */}
          <h2 style={{
            fontSize: 'clamp(2rem, 3.8vw, 2.9rem)',
            fontWeight: 800,
            color: '#0F172A',
            lineHeight: 1.2,
            letterSpacing: '-0.025em',
            marginBottom: '18px'
          }}>
            Faster Case Connections. Zero Missed Links. Court-Ready Evidence.
          </h2>

          {/* Supporting Copy */}
          <p style={{
            fontSize: '1.1rem',
            color: '#334155',
            lineHeight: 1.65,
            marginBottom: '40px'
          }}>
            Connect the dots across fragmented case files, telephone records, and money flows before syndicates alter their footprint. Access the live intelligence analysis workspace below.
          </p>

          {/* Repeat CTA Button */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px'
          }}>
            <button
              onClick={onEnterPlatform}
              className="btn-gov-accent"
              style={{
                padding: '14px 38px',
                fontSize: '1.05rem',
                borderRadius: '8px'
              }}
              aria-label="Enter Platform Secure Login"
            >
              <Lock size={18} />
              <span>Enter Platform</span>
              <ArrowRight size={18} />
            </button>

            {/* Reassurance Footnote */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.8rem',
              color: '#64748B',
              fontWeight: 500
            }}>
              <Shield size={15} color="#D97706" />
              <span>Restricted Law Enforcement Access • Mandatory Multi-Factor Authentication Required</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   8. FOOTER COMPONENT
   ========================================================================== */
function Footer() {
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

          {/* Column 2: Legal & Statutory Notice */}
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

/* ==========================================================================
   9. AUTH MODAL COMPONENT
   ========================================================================== */
function AuthModal({ isOpen, onClose, onAllowPrototype }) {
  const [step, setStep] = useState(1); // 1: Badge & Passcode, 2: 2FA OTP, 3: Success Clearance
  const [badgeId, setBadgeId] = useState('IND-7741');
  const [passcode, setPasscode] = useState('••••••••••••');
  const [otp] = useState(['4', '9', '2', '8', '1', '7']);
  const [timer, setTimer] = useState(58);

  useEffect(() => {
    let interval = null;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  if (!isOpen) return null;

  const handleNext = (e) => {
    e.preventDefault();
    if (step === 1) setStep(2);
    else if (step === 2) setStep(3);
  };

  const resetModal = () => {
    setStep(1);
    setTimer(58);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '16px'
      }}
      onClick={resetModal}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #CBD5E1',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '460px',
          padding: '32px',
          boxShadow: '0 25px 60px -12px rgba(15, 23, 42, 0.25)',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={resetModal}
          style={{
            position: 'absolute',
            top: '18px',
            right: '18px',
            background: '#F1F5F9',
            border: 'none',
            borderRadius: '6px',
            color: '#64748B',
            cursor: 'pointer',
            padding: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          aria-label="Close Authentication Dialog"
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <ShieldAlert size={18} color="#D97706" />
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.75rem',
              color: '#B45309',
              fontWeight: 800,
              letterSpacing: '0.04em'
            }}>
              OFFICIAL ACCESS GATEWAY // LEVEL-4
            </span>
          </div>
          <h3 id="auth-modal-title" style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0F172A' }}>
            {step === 1 && 'Officer Authentication'}
            {step === 2 && 'Two-Factor OTP Verification'}
            {step === 3 && 'Security Clearance Granted'}
          </h3>
          <p style={{ fontSize: '0.85rem', color: '#64748B', marginTop: '4px' }}>
            {step === 1 && 'Enter your authorized department credentials to initiate secure session.'}
            {step === 2 && 'Enter the 6-digit hardware token generated on your issued terminal.'}
            {step === 3 && 'Encrypted link established with National Crime Intelligence Network.'}
          </p>
        </div>

        {/* Step 1: Credentials Form */}
        {step === 1 && (
          <form onSubmit={handleNext} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', color: '#334155', marginBottom: '6px', fontWeight: 700 }}>
                Officer Service Badge ID
              </label>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }}>
                  <User size={18} />
                </div>
                <input
                  type="text"
                  value={badgeId}
                  onChange={(e) => setBadgeId(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '11px 14px 11px 40px',
                    backgroundColor: '#F8FAFC',
                    border: '1px solid #CBD5E1',
                    borderRadius: '8px',
                    color: '#0F172A',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.9rem',
                    fontWeight: 600
                  }}
                  required
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', color: '#334155', marginBottom: '6px', fontWeight: 700 }}>
                Security Access Passcode
              </label>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }}>
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '11px 14px 11px 40px',
                    backgroundColor: '#F8FAFC',
                    border: '1px solid #CBD5E1',
                    borderRadius: '8px',
                    color: '#0F172A',
                    fontSize: '0.9rem'
                  }}
                  required
                />
              </div>
            </div>

            <div style={{
              backgroundColor: '#FEF3C7',
              border: '1px solid #FCD34D',
              borderRadius: '8px',
              padding: '10px 14px',
              fontSize: '0.75rem',
              color: '#92400E',
              lineHeight: 1.45,
              fontWeight: 500
            }}>
              Notice: All terminal access attempts are cryptographically timestamped and logged in accordance with MHA intelligence directives.
            </div>

            <button type="submit" className="btn-gov-accent" style={{ width: '100%', marginTop: '6px', padding: '12px' }}>
              <Lock size={16} />
              <span>Verify & Proceed to 2FA</span>
              <ArrowRight size={16} />
            </button>
          </form>
        )}

        {/* Step 2: 2FA OTP Form */}
        {step === 2 && (
          <form onSubmit={handleNext} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div style={{ textAlign: 'center' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#334155', marginBottom: '14px', fontWeight: 600 }}>
                Hardware Token / Registered Authenticator Code
              </label>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength={1}
                    value={digit}
                    readOnly
                    style={{
                      width: '46px',
                      height: '50px',
                      textAlign: 'center',
                      fontSize: '1.35rem',
                      fontFamily: "'JetBrains Mono', monospace",
                      fontWeight: 800,
                      backgroundColor: '#F8FAFC',
                      border: '2px solid #38BDF8',
                      borderRadius: '8px',
                      color: '#0284C7'
                    }}
                  />
                ))}
              </div>
              <p style={{ fontSize: '0.8rem', color: '#64748B', marginTop: '12px' }} aria-live="polite">
                Token expires in <strong style={{ color: '#D97706' }}>00:{timer < 10 ? `0${timer}` : timer}</strong>
              </p>
            </div>

            <button type="submit" className="btn-gov-accent" style={{ width: '100%', marginTop: '6px', padding: '12px' }}>
              <KeyRound size={16} />
              <span>Authenticate Session</span>
              <ArrowRight size={16} />
            </button>
          </form>
        )}

        {/* Step 3: Success Confirmation */}
        {step === 3 && (
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: '#DCFCE7',
              border: '2px solid #16A34A',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px'
            }}>
              <ShieldCheck size={36} color="#16A34A" />
            </div>
            <h4 style={{ fontSize: '1.2rem', color: '#0F172A', fontWeight: 800, marginBottom: '8px' }}>
              Terminal Authorized: Inspector Verma
            </h4>
            <p style={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.5, marginBottom: '20px' }}>
              Clearance Level-4 confirmed. All workspace operations are audited under Session #NATINT-8841-SEC.
            </p>
            <div style={{
              backgroundColor: '#F1F5F9',
              padding: '12px',
              borderRadius: '8px',
              fontSize: '0.8rem',
              color: '#64748B',
              marginBottom: '20px',
              border: '1px solid #E2E8F0'
            }}>
              Landing page specification verified. Core platform screens will load in accordance with Phase 2 implementation.
            </div>
            <button onClick={onAllowPrototype || resetModal} className="btn-gov-accent" style={{ width: '100%', padding: '11px' }}>
              Open Prototype Dashboard
            </button>
            <button onClick={resetModal} className="btn-secondary" style={{ width: '100%', padding: '11px', marginTop: '10px' }}>
              Return to Landing Page
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ==========================================================================
   MAIN LANDING PAGE EXPORT
   ========================================================================== */
export default function LandingPage({ onEnterPlatform, onPrototypeAccess }) {
  const [authModalOpen, setAuthModalOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light');
  }, []);

  const handleEnterPlatform = () => {
    if (onEnterPlatform) {
      onEnterPlatform();
    } else {
      setAuthModalOpen(true);
    }
  };

  const handlePrototypeAccess = () => {
    setAuthModalOpen(false);
    if (onPrototypeAccess) {
      onPrototypeAccess();
    }
  };

  return (
    <div className="app-shell" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar onEnterPlatform={handleEnterPlatform} />

      <main id="main-content" tabIndex="-1" style={{ outline: 'none', flex: 1 }}>
        <Hero onEnterPlatform={handleEnterPlatform} />
        <OfficerAccessSection onEnterPlatform={handleEnterPlatform} />
        <HowItWorks />
        <Capabilities />
        <TrustEvidence />
        <FinalCta onEnterPlatform={handleEnterPlatform} />
      </main>

      <Footer />

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onAllowPrototype={handlePrototypeAccess}
      />
    </div>
  );
}
