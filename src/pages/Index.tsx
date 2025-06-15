
import React, { useState } from 'react';
import Header from '../components/Header';
import LandingPage from '../components/LandingPage';
import CreateListModal from '../components/CreateListModal';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, List, Target, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [bucketLists, setBucketLists] = useState([
    {
      id: 1,
      name: "Travel Adventures",
      emoji: "✈️",
      description: "Places I want to visit around the world",
      completed: 3,
      total: 8,
      category: "travel"
    },
    {
      id: 2,
      name: "Learning Goals",
      emoji: "📚",
      description: "Skills and knowledge I want to acquire",
      completed: 5,
      total: 10,
      category: "learning"
    }
  ]);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    setIsAuthenticated(true);
  };

  const handleCreateSuccess = (newList: any) => {
    const listWithId = {
      ...newList,
      id: Date.now(),
      completed: 0,
      total: 0
    };
    setBucketLists(prev => [listWithId, ...prev]);
    setIsCreateModalOpen(false);
    toast({
      title: "Success! 🎉",
      description: `"${newList.name}" has been created successfully!`,
    });
  };

  const handleViewList = (listId: number) => {
    navigate(`/lists/${listId}`);
  };

  // For demo purposes, we'll show the landing page first
  if (!isAuthenticated) {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Header />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome to BucketSync! 🎯</h1>
          <p className="text-gray-600 text-lg">Create and manage your bucket lists with friends</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => setIsCreateModalOpen(true)}>
            <CardContent className="p-6 text-center">
              <div className="h-12 w-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Create New List</h3>
              <p className="text-sm text-gray-600">Start a new bucket list adventure</p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => navigate('/lists')}>
            <CardContent className="p-6 text-center">
              <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <List className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">View All Lists</h3>
              <p className="text-sm text-gray-600">Browse your bucket lists</p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => navigate('/discover')}>
            <CardContent className="p-6 text-center">
              <div className="h-12 w-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Discover Ideas</h3>
              <p className="text-sm text-gray-600">Find inspiration for new goals</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Lists */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Your Recent Lists</h2>
            <Button 
              variant="outline"
              onClick={() => navigate('/lists')}
              className="bg-white/70 backdrop-blur-sm border-0 shadow-md"
            >
              View All
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bucketLists.slice(0, 3).map((list) => (
              <Card key={list.id} className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
                    onClick={() => handleViewList(list.id)}>
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{list.emoji}</span>
                    <div>
                      <CardTitle className="text-lg">{list.name}</CardTitle>
                      <p className="text-sm text-gray-600 mt-1">{list.description}</p>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Target className="h-4 w-4 mr-1" />
                      {list.completed}/{list.total} completed
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Recently updated
                    </div>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                      style={{ width: `${list.total > 0 ? (list.completed / list.total) * 100 : 0}%` }}
                    ></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <CreateListModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
        onSuccess={handleCreateSuccess}
      />
    </div>
  );
};

export default Index;
