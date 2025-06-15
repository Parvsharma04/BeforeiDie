
import React, { useState } from 'react';
import { Search, Filter, TrendingUp, Shuffle, Heart, Users, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Header from '../components/Header';

const Discovery = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { key: 'all', label: 'All', icon: '🌟' },
    { key: 'travel', label: 'Travel', icon: '🌍' },
    { key: 'food', label: 'Food', icon: '🍽️' },
    { key: 'adventure', label: 'Adventure', icon: '🏔️' },
    { key: 'learning', label: 'Learning', icon: '📚' },
    { key: 'health', label: 'Health', icon: '💪' },
    { key: 'creative', label: 'Creative', icon: '🎨' }
  ];

  const trendingGoals = [
    {
      id: 1,
      title: "Learn a new language in 6 months",
      category: "Learning",
      popularity: 95,
      participants: 2847,
      description: "Master conversational skills in a foreign language"
    },
    {
      id: 2,
      title: "Complete a solo backpacking trip",
      category: "Travel",
      popularity: 92,
      participants: 1923,
      description: "Experience independence and self-discovery"
    },
    {
      id: 3,
      title: "Run a half marathon",
      category: "Health",
      popularity: 89,
      participants: 3156,
      description: "Build endurance and achieve a fitness milestone"
    }
  ];

  const inspirationGoals = [
    {
      id: 1,
      title: "Watch sunrise from a mountaintop",
      category: "Adventure",
      image: "🌅",
      likes: 1234,
      savedBy: 892
    },
    {
      id: 2,
      title: "Learn to cook authentic Italian pasta",
      category: "Food",
      image: "🍝",
      likes: 967,
      savedBy: 543
    },
    {
      id: 3,
      title: "Write and publish a short story",
      category: "Creative",
      image: "✍️",
      likes: 743,
      savedBy: 421
    },
    {
      id: 4,
      title: "Volunteer at a local animal shelter",
      category: "Service",
      image: "🐕",
      likes: 1098,
      savedBy: 667
    },
    {
      id: 5,
      title: "Learn to play a musical instrument",
      category: "Learning",
      image: "🎸",
      likes: 1456,
      savedBy: 789
    },
    {
      id: 6,
      title: "Go skydiving",
      category: "Adventure",
      image: "🪂",
      likes: 2134,
      savedBy: 1203
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Header />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Discover Inspiration</h1>
          <p className="text-gray-600">Find new adventures and goals to add to your bucket list</p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search for bucket list ideas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/70 backdrop-blur-sm border-0 shadow-md"
            />
          </div>
          <Button variant="outline" className="bg-white/70 backdrop-blur-sm border-0 shadow-md">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
            <Shuffle className="h-4 w-4 mr-2" />
            Surprise Me
          </Button>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => setActiveCategory(category.key)}
              className={`px-4 py-2 rounded-full transition-all duration-200 flex items-center space-x-2 ${
                activeCategory === category.key
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                  : 'bg-white/70 backdrop-blur-sm text-gray-600 hover:text-gray-900 hover:bg-white/90'
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.label}</span>
            </button>
          ))}
        </div>

        {/* Trending Goals */}
        <section className="mb-12">
          <div className="flex items-center mb-6">
            <TrendingUp className="h-6 w-6 text-orange-500 mr-2" />
            <h2 className="text-2xl font-bold text-gray-900">Trending This Month</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trendingGoals.map((goal, index) => (
              <Card key={goal.id} className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-purple-600">#{index + 1}</span>
                    <span className="px-3 py-1 bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 text-xs font-medium rounded-full">
                      {goal.category}
                    </span>
                  </div>
                  <CardTitle className="text-lg">{goal.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4">{goal.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {goal.participants.toLocaleString()}
                    </div>
                    <div className="flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      {goal.popularity}%
                    </div>
                  </div>
                  <Button className="w-full mt-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                    Add to List
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Inspiration Gallery */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Popular Ideas</h2>
            <Button variant="ghost">View All</Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {inspirationGoals.map((goal) => (
              <Card key={goal.id} className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-3">{goal.image}</div>
                    <h3 className="font-semibold text-gray-900 mb-2">{goal.title}</h3>
                    <span className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-xs font-medium rounded-full">
                      {goal.category}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Heart className="h-4 w-4 mr-1 text-red-500" />
                      {goal.likes}
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1 text-yellow-500" />
                      {goal.savedBy}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Heart className="h-4 w-4 mr-1" />
                      Like
                    </Button>
                    <Button size="sm" className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                      Add to List
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Discovery;
