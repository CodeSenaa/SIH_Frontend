import React from 'react';
import { Lock, ArrowRight } from 'lucide-react';

export default function Hero({ onEnterPlatform }) {
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
      {/* Shifted below the text so the dome and building never collide with headline or buttons */}
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
