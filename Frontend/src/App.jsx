import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import OfficerAccessSection from './components/OfficerAccessSection';
import HowItWorks from './components/HowItWorks';
import Capabilities from './components/Capabilities';
import TrustEvidence from './components/TrustEvidence';
import FinalCta from './components/FinalCta';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import CrimeDashboard from './components/CrimeDashboard';

export default function App() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [showPrototype, setShowPrototype] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light');
  }, []);

  const handleEnterPlatform = () => {
    setAuthModalOpen(true);
  };

  const handlePrototypeAccess = () => {
    setShowPrototype(true);
    setAuthModalOpen(false);
  };

  if (showPrototype) {
    return <CrimeDashboard />;
  }

  return (
    <div className="app-shell" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

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
