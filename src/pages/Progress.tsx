
import React, { useState } from 'react';
import { Calendar, Trophy, Target, TrendingUp, Award, Camera, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Header from '../components/Header';

const ProgressPage = () => {
  const [timeframe, setTimeframe] = useState('month');

  const stats = {
    totalGoals: 47,
    completed: 23,
    inProgress: 18,
    upcoming: 6,
    completionRate: 49,
    streak: 12,
    totalCategories: 6,
    favoriteCategory: "Travel"
  };

  const categoryProgress = [
    { name: "Travel", completed: 8, total: 12, color: "from-blue-500 to-teal-500" },
    { name: "Food", completed: 5, total: 8, color: "from-orange-500 to-red-500" },
    { name: "Health", completed: 6, total: 10, color: "from-emerald-500 to-teal-500" },
    { name: "Learning", completed: 3, total: 9, color: "from-purple-500 to-pink-500" },
    { name: "Creative", completed: 1, total: 5, color: "from-yellow-500 to-orange-500" },
    { name: "Adventure", completed: 0, total: 3, color: "from-red-500 to-pink-500" }
  ];

  const achievements = [
    {
      id: 1,
      title: "First Steps",
      description: "Complete your first bucket list item",
      earned: true,
      earnedDate: "March 15, 2024",
      icon: "🌟"
    },
    {
      id: 2,
      title: "Travel Bug",
      description: "Complete 5 travel goals",
      earned: true,
      earnedDate: "April 22, 2024",
      icon: "✈️"
    },
    {
      id: 3,
      title: "Streak Master",
      description: "Complete goals for 10 days in a row",
      earned: true,
      earnedDate: "May 8, 2024",
      icon: "🔥"
    },
    {
      id: 4,
      title: "Social Butterfly",
      description: "Complete 3 collaborative goals",
      earned: false,
      progress: 2,
      total: 3,
      icon: "🦋"
    },
    {
      id: 5,
      title: "Century Club",
      description: "Complete 100 bucket list items",
      earned: false,
      progress: 23,
      total: 100,
      icon: "💯"
    }
  ];

  const recentCompletions = [
    {
      id: 1,
      title: "Run a half marathon",
      category: "Health",
      completedDate: "Dec 10, 2024",
      photo: true,
      notes: "Amazing experience! Felt so proud crossing the finish line."
    },
    {
      id: 2,
      title: "Learn to make sushi",
      category: "Food",
      completedDate: "Dec 5, 2024",
      photo: true,
      notes: "Harder than it looks but so rewarding!"
    },
    {
      id: 3,
      title: "Watch sunrise from a mountain",
      category: "Adventure",
      completedDate: "Nov 28, 2024",
      photo: true,
      notes: "Breathtaking view, worth the early wake-up call."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Header />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Progress & Achievements</h1>
            <p className="text-gray-600">Track your journey and celebrate milestones</p>
          </div>
          <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>

        {/* Timeframe Selector */}
        <div className="flex space-x-1 mb-8 p-1 bg-white/70 backdrop-blur-sm rounded-lg w-fit">
          {[
            { key: 'week', label: 'This Week' },
            { key: 'month', label: 'This Month' },
            { key: 'year', label: 'This Year' },
            { key: 'all', label: 'All Time' }
          ].map((period) => (
            <button
              key={period.key}
              onClick={() => setTimeframe(period.key)}
              className={`px-4 py-2 rounded-md transition-all duration-200 ${
                timeframe === period.key
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
              }`}
            >
              {period.label}
            </button>
          ))}
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Target className="h-6 w-6 text-white" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{stats.totalGoals}</p>
              <p className="text-sm text-gray-600">Total Goals</p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="h-12 w-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <p className="text-2xl font-bold text-emerald-600">{stats.completed}</p>
              <p className="text-sm text-gray-600">Completed</p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="h-12 w-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <p className="text-2xl font-bold text-orange-600">{stats.completionRate}%</p>
              <p className="text-sm text-gray-600">Completion Rate</p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="h-12 w-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <p className="text-2xl font-bold text-purple-600">{stats.streak}</p>
              <p className="text-sm text-gray-600">Day Streak</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Category Progress */}
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Progress by Category</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {categoryProgress.map((category) => (
                <div key={category.name}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-700">{category.name}</span>
                    <span className="text-sm text-gray-600">
                      {category.completed}/{category.total}
                    </span>
                  </div>
                  <Progress 
                    value={(category.completed / category.total) * 100} 
                    className="h-2"
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Achievement Badges */}
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="h-5 w-5 mr-2" />
                Achievement Badges
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {achievements.map((achievement) => (
                <div key={achievement.id} className={`flex items-center space-x-4 p-3 rounded-lg ${
                  achievement.earned 
                    ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200' 
                    : 'bg-gray-50 border border-gray-200'
                }`}>
                  <div className={`text-2xl ${achievement.earned ? '' : 'grayscale opacity-50'}`}>
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-semibold ${achievement.earned ? 'text-gray-900' : 'text-gray-500'}`}>
                      {achievement.title}
                    </h4>
                    <p className={`text-sm ${achievement.earned ? 'text-gray-600' : 'text-gray-400'}`}>
                      {achievement.description}
                    </p>
                    {achievement.earned ? (
                      <p className="text-xs text-green-600 font-medium">
                        Earned on {achievement.earnedDate}
                      </p>
                    ) : (
                      <div className="mt-2">
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div 
                            className="bg-gradient-to-r from-purple-500 to-pink-500 h-1.5 rounded-full" 
                            style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {achievement.progress}/{achievement.total}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Recent Completions */}
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Recent Completions
              <Button variant="ghost" size="sm">View All</Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentCompletions.map((completion) => (
              <div key={completion.id} className="flex items-start space-x-4 p-4 rounded-lg bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200">
                <div className="h-10 w-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                  <Trophy className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">{completion.title}</h4>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs">
                      {completion.category}
                    </span>
                    <span>{completion.completedDate}</span>
                    {completion.photo && (
                      <div className="flex items-center">
                        <Camera className="h-4 w-4 mr-1" />
                        Photo
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-700 italic">"{completion.notes}"</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProgressPage;
