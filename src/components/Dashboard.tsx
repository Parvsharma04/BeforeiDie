
import React from 'react';
import { Target, Users, Trophy, Calendar, ArrowRight, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Alex!</h2>
          <p className="text-gray-600">Ready to turn more dreams into reality?</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Goals</p>
                  <p className="text-2xl font-bold text-gray-900">47</p>
                </div>
                <div className="h-12 w-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Target className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-emerald-600">23</p>
                </div>
                <div className="h-12 w-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                  <Trophy className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Collaborations</p>
                  <p className="text-2xl font-bold text-blue-600">8</p>
                </div>
                <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">This Month</p>
                  <p className="text-2xl font-bold text-orange-600">5</p>
                </div>
                <div className="h-12 w-12 bg-gradient-to-br from-orange-500 to-coral-500 rounded-lg flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <Plus className="h-8 w-8 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Create New List</h3>
              <p className="text-purple-100 mb-4">Start a new adventure with friends</p>
              <Button variant="secondary" className="w-full">Get Started</Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-teal-500 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <Users className="h-8 w-8 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Join Friend's List</h3>
              <p className="text-blue-100 mb-4">Collaborate on shared dreams</p>
              <Button variant="secondary" className="w-full">Browse Invites</Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-500 to-teal-500 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <Target className="h-8 w-8 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Find Inspiration</h3>
              <p className="text-emerald-100 mb-4">Discover trending goals</p>
              <Button variant="secondary" className="w-full">Explore</Button>
            </CardContent>
          </Card>
        </div>

        {/* Active Lists */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Active Lists
                <Button variant="ghost" size="sm">
                  View All <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-purple-800">🌍 World Adventures</h4>
                  <span className="text-sm text-purple-600">with Sarah, Mike</span>
                </div>
                <Progress value={65} className="mb-2" />
                <p className="text-sm text-purple-700">13 of 20 goals completed</p>
              </div>

              <div className="p-4 rounded-lg bg-gradient-to-r from-blue-100 to-teal-100 border border-blue-200">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-blue-800">🍽️ Foodie Experiences</h4>
                  <span className="text-sm text-blue-600">with Emma, Jake</span>
                </div>
                <Progress value={40} className="mb-2" />
                <p className="text-sm text-blue-700">6 of 15 goals completed</p>
              </div>

              <div className="p-4 rounded-lg bg-gradient-to-r from-emerald-100 to-teal-100 border border-emerald-200">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-emerald-800">💪 Fitness Goals</h4>
                  <span className="text-sm text-emerald-600">Personal</span>
                </div>
                <Progress value={80} className="mb-2" />
                <p className="text-sm text-emerald-700">8 of 10 goals completed</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="h-8 w-8 bg-emerald-500 rounded-full flex items-center justify-center">
                  <Trophy className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm"><strong>Sarah</strong> completed "Visit Machu Picchu"</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <Plus className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm"><strong>Mike</strong> added "Try authentic ramen in Tokyo"</p>
                  <p className="text-xs text-gray-500">5 hours ago</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="h-8 w-8 bg-purple-500 rounded-full flex items-center justify-center">
                  <Users className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm"><strong>Emma</strong> invited you to "Art & Culture"</p>
                  <p className="text-xs text-gray-500">1 day ago</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="h-8 w-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <Trophy className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm">You completed "Run a half marathon"</p>
                  <p className="text-xs text-gray-500">2 days ago</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
