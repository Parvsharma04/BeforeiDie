
import React, { useState } from 'react';
import { Plus, Users, Lock, Calendar, MoreVertical, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Header from '../components/Header';

const MyLists = () => {
  const [filter, setFilter] = useState('all');

  const bucketLists = [
    {
      id: 1,
      title: "🌍 World Adventures",
      description: "Explore amazing destinations around the globe",
      progress: 65,
      completed: 13,
      total: 20,
      isCollaborative: true,
      members: ["Sarah", "Mike"],
      category: "Travel",
      lastUpdated: "2 days ago",
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 2,
      title: "🍽️ Foodie Experiences",
      description: "Taste the world's most incredible cuisines",
      progress: 40,
      completed: 6,
      total: 15,
      isCollaborative: true,
      members: ["Emma", "Jake"],
      category: "Food",
      lastUpdated: "5 hours ago",
      color: "from-blue-500 to-teal-500"
    },
    {
      id: 3,
      title: "💪 Fitness Goals",
      description: "Personal health and fitness milestones",
      progress: 80,
      completed: 8,
      total: 10,
      isCollaborative: false,
      members: [],
      category: "Health",
      lastUpdated: "1 day ago",
      color: "from-emerald-500 to-teal-500"
    },
    {
      id: 4,
      title: "🎨 Creative Projects",
      description: "Artistic endeavors and creative challenges",
      progress: 25,
      completed: 3,
      total: 12,
      isCollaborative: false,
      members: [],
      category: "Creative",
      lastUpdated: "3 days ago",
      color: "from-orange-500 to-coral-500"
    }
  ];

  const filteredLists = bucketLists.filter(list => {
    if (filter === 'collaborative') return list.isCollaborative;
    if (filter === 'personal') return !list.isCollaborative;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Header />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">My Bucket Lists</h1>
            <p className="text-gray-600">Manage your dreams and adventures</p>
          </div>
          <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
            <Plus className="h-4 w-4 mr-2" />
            Create New List
          </Button>
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-1 mb-8 p-1 bg-white/70 backdrop-blur-sm rounded-lg w-fit">
          {[
            { key: 'all', label: 'All Lists' },
            { key: 'collaborative', label: 'Collaborative' },
            { key: 'personal', label: 'Personal' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`px-4 py-2 rounded-md transition-all duration-200 ${
                filter === tab.key
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Lists Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLists.map((list) => (
            <Card key={list.id} className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-semibold text-gray-900 mb-2">
                      {list.title}
                    </CardTitle>
                    <p className="text-sm text-gray-600 mb-3">{list.description}</p>
                    <span className="text-xs text-gray-500">Updated {list.lastUpdated}</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="space-y-4">
                  {/* Progress */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Progress</span>
                      <span className="text-sm text-gray-600">{list.completed}/{list.total}</span>
                    </div>
                    <Progress value={list.progress} className="h-2" />
                  </div>

                  {/* Members or Personal indicator */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {list.isCollaborative ? (
                        <>
                          <Users className="h-4 w-4 text-blue-500" />
                          <span className="text-sm text-gray-600">
                            with {list.members.join(', ')}
                          </span>
                        </>
                      ) : (
                        <>
                          <Lock className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600">Personal</span>
                        </>
                      )}
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                  </div>

                  {/* Category badge */}
                  <div className="flex justify-end">
                    <span className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-xs font-medium rounded-full">
                      {list.category}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty state if no lists match filter */}
        {filteredLists.length === 0 && (
          <div className="text-center py-12">
            <div className="h-24 w-24 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-12 w-12 text-purple-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No lists found</h3>
            <p className="text-gray-600 mb-4">Create your first bucket list to get started!</p>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
              <Plus className="h-4 w-4 mr-2" />
              Create List
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLists;
