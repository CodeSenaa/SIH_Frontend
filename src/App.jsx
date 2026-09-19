import React, { useState } from 'react';
import LandingPage from './Pages/LandingPage';
import Dashboard from './Pages/Dashboard';

export default function App() {
  const [showDashboard, setShowDashboard] = useState(false);

  if (showDashboard) {
    return <Dashboard onNavigateToLanding={() => setShowDashboard(false)} />;
  }

  return (
    <LandingPage
      onPrototypeAccess={() => setShowDashboard(true)}
      onEnterPlatform={() => setShowDashboard(true)}
    />
  );
}
