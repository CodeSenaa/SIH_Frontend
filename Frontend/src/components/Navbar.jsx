import React, { useState } from 'react';
import { Network, Lock, ArrowRight, Menu, X } from 'lucide-react';

export default function Navbar({ onEnterPlatform }) {
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
