
import React, { useState } from 'react';
import { ArrowRight, Users, Target, Trophy, Star, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const LandingPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-blue-600 relative overflow-hidden">
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-white/10 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-white/10 rounded-full animate-pulse delay-2000"></div>
        <div className="absolute bottom-40 right-10 w-12 h-12 bg-white/10 rounded-full animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Hero Content */}
          <div className="text-white">
            <div className="flex items-center space-x-2 mb-6">
              <div className="h-10 w-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <span className="text-white font-bold">BS</span>
              </div>
              <h1 className="text-2xl font-bold">BucketSync</h1>
            </div>

            <h2 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Turn Dreams into
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                {" "}Shared Adventures
              </span>
            </h2>

            <p className="text-xl text-purple-100 mb-8 leading-relaxed">
              Create collaborative bucket lists with friends, track your progress together, 
              and celebrate every achievement along the journey.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button size="lg" className="bg-white text-purple-700 hover:bg-gray-100 font-semibold px-8">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-semibold px-8">
                Watch Demo
              </Button>
            </div>

            {/* Feature highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Collaborate</h4>
                  <p className="text-purple-200 text-xs">Share with friends</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <Target className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Track Progress</h4>
                  <p className="text-purple-200 text-xs">Visual insights</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <Trophy className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Celebrate</h4>
                  <p className="text-purple-200 text-xs">Achievement rewards</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Auth Card */}
          <div className="flex justify-center">
            <Card className="w-full max-w-md bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {isLogin ? 'Welcome Back' : 'Join BucketSync'}
                  </h3>
                  <p className="text-purple-100">
                    {isLogin ? 'Sign in to continue your journey' : 'Start your adventure today'}
                  </p>
                </div>

                <form className="space-y-6">
                  {!isLogin && (
                    <div>
                      <Input 
                        type="text" 
                        placeholder="Full Name"
                        className="bg-white/10 border-white/20 text-white placeholder:text-purple-200 focus:border-white/40"
                      />
                    </div>
                  )}
                  
                  <div>
                    <Input 
                      type="email" 
                      placeholder="Email"
                      className="bg-white/10 border-white/20 text-white placeholder:text-purple-200 focus:border-white/40"
                    />
                  </div>
                  
                  <div>
                    <Input 
                      type="password" 
                      placeholder="Password"
                      className="bg-white/10 border-white/20 text-white placeholder:text-purple-200 focus:border-white/40"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3"
                  >
                    {isLogin ? 'Sign In' : 'Create Account'}
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-purple-200 text-sm">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button 
                      onClick={() => setIsLogin(!isLogin)}
                      className="text-white font-semibold hover:underline"
                    >
                      {isLogin ? 'Sign Up' : 'Sign In'}
                    </button>
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-white/20">
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                      Google
                    </Button>
                    <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                      Facebook
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="mt-20 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-white">
              <div className="text-3xl font-bold mb-2">10K+</div>
              <div className="text-purple-200">Dreams Achieved</div>
            </div>
            <div className="text-white">
              <div className="text-3xl font-bold mb-2">25K+</div>
              <div className="text-purple-200">Active Users</div>
            </div>
            <div className="text-white">
              <div className="text-3xl font-bold mb-2">5K+</div>
              <div className="text-purple-200">Collaborative Lists</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
