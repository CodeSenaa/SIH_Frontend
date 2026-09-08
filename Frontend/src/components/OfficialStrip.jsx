import React from 'react';
import { ShieldAlert, Globe, Eye } from 'lucide-react';

export default function OfficialStrip({ fontScale, setFontScale, theme, setTheme }) {
  const handleScale = (scale) => {
    setFontScale(scale);
    document.documentElement.style.setProperty('--font-scale', scale);
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  return (
    <aside aria-label="Official Government Notification Strip" style={{
      backgroundColor: '#F1F5F9',
      borderBottom: '1px solid #E2E8F0',
      fontSize: '0.75rem',
      color: '#475569',
      padding: '6px 0',
      position: 'relative',
      zIndex: 50
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '8px'
      }}>
        {/* Left: Indian Government & Ministry Identification */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Subtle Tri-Color Accent */}
          <div style={{ display: 'flex', width: '18px', height: '12px', borderRadius: '2px', overflow: 'hidden', border: '1px solid #CBD5E1' }}>
            <div style={{ flex: 1, backgroundColor: '#FF9933' }} />
            <div style={{ flex: 1, backgroundColor: '#FFFFFF' }} />
            <div style={{ flex: 1, backgroundColor: '#138808' }} />
          </div>
          <span style={{ fontWeight: 700, color: '#0F172A', letterSpacing: '0.02em' }}>
            GOVERNMENT OF INDIA
          </span>
          <span style={{ color: '#94A3B8' }}>|</span>
          <span style={{ fontWeight: 500, color: '#334155' }}>Ministry of Home Affairs • Special Crime Intelligence Division</span>
        </div>

        {/* Center: Classification Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <ShieldAlert size={14} color="#D97706" />
          <span style={{
            color: '#B45309',
            backgroundColor: '#FEF3C7',
            border: '1px solid #FCD34D',
            padding: '2px 8px',
            borderRadius: '4px',
            fontWeight: 700,
            letterSpacing: '0.04em',
            fontSize: '0.7rem'
          }}>
            RESTRICTED // LAW ENFORCEMENT & INTELLIGENCE ACCESS ONLY
          </span>
        </div>

        {/* Right: Accessibility Controls (A- / A / A+) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }} role="group" aria-label="Text Size Controls">
            <span style={{ fontSize: '0.7rem', color: '#64748B', marginRight: '2px', fontWeight: 600 }}>Font Size:</span>
            <button
              onClick={() => handleScale(0.9)}
              className={`a11y-btn ${fontScale === 0.9 ? 'active' : ''}`}
              title="Decrease Font Size"
              aria-label="Decrease Font Size"
            >
              A−
            </button>
            <button
              onClick={() => handleScale(1.0)}
              className={`a11y-btn ${fontScale === 1.0 ? 'active' : ''}`}
              title="Reset Font Size"
              aria-label="Default Font Size"
            >
              A
            </button>
            <button
              onClick={() => handleScale(1.15)}
              className={`a11y-btn ${fontScale === 1.15 ? 'active' : ''}`}
              title="Increase Font Size"
              aria-label="Increase Font Size"
            >
              A+
            </button>
          </div>

          <button
            onClick={toggleTheme}
            className="a11y-btn"
            style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
            title="Toggle Light / Dark Theme"
            aria-label="Toggle Theme"
          >
            <Eye size={12} />
            <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
