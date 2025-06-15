
import React from 'react';
import { Plus, Bell, Users, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">BS</span>
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                BucketSync
              </h1>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <nav className="flex items-center space-x-6">
              <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors">Dashboard</a>
              <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors">My Lists</a>
              <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors">Discover</a>
              <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors">Friends</a>
            </nav>
          </div>

          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs"></span>
            </Button>
            <Button variant="ghost" size="sm">
              <Users className="h-5 w-5" />
            </Button>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
              <Plus className="h-4 w-4 mr-2" />
              New List
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
