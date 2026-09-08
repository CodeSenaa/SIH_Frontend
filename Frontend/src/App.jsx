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

export default function App() {
  const [authModalOpen, setAuthModalOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light');
  }, []);

  const handleEnterPlatform = () => {
    setAuthModalOpen(true);
  };

  return (
    <div className="app-shell" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* WCAG Accessible Skip Link */}
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      {/* Section 1: Navbar */}
      <Navbar onEnterPlatform={handleEnterPlatform} />

      {/* Main Content Sections */}
      <main id="main-content" tabIndex="-1" style={{ outline: 'none', flex: 1 }}>
        {/* Section 2: Hero (Neoclassical Government Architecture + Central Narrative) */}
        <Hero onEnterPlatform={handleEnterPlatform} />

        {/* Section: How an Officer Can Access the Platform */}
        <OfficerAccessSection onEnterPlatform={handleEnterPlatform} />

        {/* Section 3: How It Works (5-Step Intelligence Pipeline) */}
        <HowItWorks />

        {/* Section 4: Capabilities */}
        <Capabilities />

        {/* Section 5: Trust / Evidence */}
        <TrustEvidence />

        {/* Section 6: Final CTA */}
        <FinalCta onEnterPlatform={handleEnterPlatform} />
      </main>

      {/* Official Footer */}
      <Footer />

      {/* Interactive Law Enforcement Authentication Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
    </div>
  );
}
