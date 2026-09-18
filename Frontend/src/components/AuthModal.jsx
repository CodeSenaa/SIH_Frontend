import React, { useState, useEffect } from 'react';
import { ShieldAlert, X, Lock, KeyRound, CheckCircle, ArrowRight, ShieldCheck, User } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onAllowPrototype }) {
  const [step, setStep] = useState(1); // 1: Badge & Passcode, 2: 2FA OTP, 3: Success Clearance
  const [badgeId, setBadgeId] = useState('IND-7741');
  const [passcode, setPasscode] = useState('••••••••••••');
  const [otp, setOtp] = useState(['4', '9', '2', '8', '1', '7']);
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
