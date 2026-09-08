import React from 'react';
import { Lock, ArrowRight, Shield, ShieldCheck } from 'lucide-react';

export default function FinalCta({ onEnterPlatform }) {
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

          {/* 1-2 sentence supporting copy */}
          <p style={{
            fontSize: '1.1rem',
            color: '#334155',
            lineHeight: 1.65,
            marginBottom: '40px'
          }}>
            Connect the dots across fragmented case files, telephone records, and money flows before syndicates alter their footprint. Access the live intelligence analysis workspace below.
          </p>

          {/* Repeat CTA Button (Government Orange) */}
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
