
import React, { useState } from 'react';
import Header from '../components/Header';
import LandingPage from '../components/LandingPage';
import Dashboard from '../components/Dashboard';
import CreateListModal from '../components/CreateListModal';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleGetStarted = () => {
    setIsAuthenticated(true);
  };

  // For demo purposes, we'll show the landing page first
  // In a real app, this would check actual authentication state
  if (!isAuthenticated) {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Dashboard />
      <CreateListModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
      />
    </div>
  );
};

export default Index;
