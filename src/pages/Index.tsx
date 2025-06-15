
import React, { useState } from 'react';
import Header from '../components/Header';
import LandingPage from '../components/LandingPage';
import Dashboard from '../components/Dashboard';
import CreateListModal from '../components/CreateListModal';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { toast } = useToast();

  const handleGetStarted = () => {
    setIsAuthenticated(true);
  };

  const handleCreateSuccess = (newList: any) => {
    console.log('New list created:', newList);
    setIsCreateModalOpen(false);
    toast({
      title: "Success! 🎉",
      description: `"${newList.name}" has been created successfully!`,
    });
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
        onSuccess={handleCreateSuccess}
      />
    </div>
  );
};

export default Index;
