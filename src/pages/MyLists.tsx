
import React, { useState } from 'react';
import { Plus, Search, Filter, MoreVertical, Users, Calendar, Target, Edit, Trash2, Share2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import CreateListModal from '../components/CreateListModal';

const MyLists = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [bucketLists, setBucketLists] = useState([
    {
      id: 1,
      emoji: "✈️",
      title: "Around the World",
      completed: 5,
      total: 10,
      lastUpdated: "1 week ago",
      progress: 50,
      color: "bg-gradient-to-r from-blue-500 to-purple-500",
      tags: ["travel", "adventure"],
      collaborators: 2,
    },
    {
      id: 2,
      emoji: "📚",
      title: "Lifelong Learning",
      completed: 8,
      total: 12,
      lastUpdated: "3 days ago",
      progress: 66,
      color: "bg-gradient-to-r from-green-500 to-teal-500",
      tags: ["education", "books"],
      collaborators: 0,
    },
    {
      id: 3,
      emoji: "💪",
      title: "Fitness Goals",
      completed: 15,
      total: 20,
      lastUpdated: "2 weeks ago",
      progress: 75,
      color: "bg-gradient-to-r from-red-500 to-orange-500",
      tags: ["health", "exercise"],
      collaborators: 1,
    },
    {
      id: 4,
      emoji: "🎨",
      title: "Creative Projects",
      completed: 3,
      total: 7,
      lastUpdated: "5 days ago",
      progress: 42,
      color: "bg-gradient-to-r from-pink-500 to-rose-500",
      tags: ["art", "design"],
      collaborators: 3,
    },
  ]);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleCreateNew = () => {
    setIsCreateModalOpen(true);
  };

  const handleCreateSuccess = (newList: any) => {
    const listWithDefaults = {
      ...newList,
      id: Date.now(),
      title: newList.name,
      completed: 0,
      total: 0,
      lastUpdated: "Just now",
      progress: 0,
      color: "bg-gradient-to-r from-purple-500 to-pink-500",
      tags: [newList.category || "general"],
      collaborators: 0,
    };
    setBucketLists(prev => [listWithDefaults, ...prev]);
    setIsCreateModalOpen(false);
    toast({
      title: "Success! 🎉",
      description: `"${newList.name}" has been created successfully!`,
    });
  };

  const handleViewList = (listId: number, listTitle: string) => {
    navigate(`/lists/${listId}`);
  };

  const handleDeleteList = (listId: number, listTitle: string) => {
    setBucketLists(prev => prev.filter(list => list.id !== listId));
    toast({
      title: "List Deleted",
      description: `"${listTitle}" has been deleted.`,
      variant: "destructive",
    });
  };

  const handleAddGoal = (listId: number, listTitle: string) => {
    navigate(`/lists/${listId}`);
    toast({
      title: "Opening List",
      description: `Adding goals to "${listTitle}"...`,
    });
  };

  const filteredLists = bucketLists.filter(list => {
    const matchesSearch = list.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'all' || list.tags.includes(activeFilter);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Header />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">My Bucket Lists</h1>
            <p className="text-gray-600">Organize and track your dreams and goals</p>
          </div>
          <Button 
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            onClick={handleCreateNew}
          >
            <Plus className="h-4 w-4 mr-2" />
            Create New List
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search your lists..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/70 backdrop-blur-sm border-0 shadow-md"
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-2 mb-8">
          {['all', 'travel', 'learning', 'health'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full transition-all duration-200 capitalize ${
                activeFilter === filter
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                  : 'bg-white/70 backdrop-blur-sm text-gray-600 hover:text-gray-900 hover:bg-white/90'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Lists Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLists.map((list) => (
            <Card key={list.id} className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{list.emoji}</span>
                    <div>
                      <CardTitle className="text-lg">{list.title}</CardTitle>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                        <div className="flex items-center">
                          <Target className="h-4 w-4 mr-1" />
                          {list.completed}/{list.total}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {list.lastUpdated}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Progress</span>
                    <span className="text-sm text-gray-600">{list.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${list.color}`}
                      style={{ width: `${list.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {list.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-xs rounded-full text-gray-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => handleViewList(list.id, list.title)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button 
                    size="sm" 
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    onClick={() => handleAddGoal(list.id, list.title)}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Goal
                  </Button>
                </div>

                {/* Quick Actions */}
                <div className="flex justify-between mt-3 pt-3 border-t border-gray-200">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => toast({ title: "Edit List", description: "Edit functionality coming soon!" })}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => {
                      navigator.clipboard.writeText(`Check out my bucket list: ${list.title}!`);
                      toast({ title: "Share Link Copied! 🔗", description: `Share link copied to clipboard.` });
                    }}
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleDeleteList(list.id, list.title)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                {/* Collaboration Info */}
                {list.collaborators > 0 && (
                  <div className="flex items-center mt-3 text-sm text-gray-500">
                    <Users className="h-4 w-4 mr-1" />
                    {list.collaborators} collaborator{list.collaborators > 1 ? 's' : ''}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredLists.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No lists found</h3>
            <p className="text-gray-600 mb-6">
              {searchQuery ? 'Try adjusting your search terms' : 'Create your first bucket list to get started!'}
            </p>
            <Button 
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              onClick={handleCreateNew}
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Your First List
            </Button>
          </div>
        )}
      </div>

      <CreateListModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={handleCreateSuccess}
      />
    </div>
  );
};

export default MyLists;
