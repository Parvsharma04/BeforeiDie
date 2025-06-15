
import React from 'react';
import { Plus, Bell, Users, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleNewList = () => {
    // For now, navigate to lists page - in a real app this would open a modal
    navigate('/lists');
  };

  const handleNotifications = () => {
    console.log('Notifications clicked');
    // In a real app, this would open notifications dropdown
  };

  const handleFriendsAction = () => {
    navigate('/friends');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">BS</span>
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                BucketSync
              </h1>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <nav className="flex items-center space-x-6">
              <Link 
                to="/" 
                className={`transition-colors ${
                  isActive('/') 
                    ? 'text-purple-600 font-semibold' 
                    : 'text-gray-700 hover:text-purple-600'
                }`}
              >
                Dashboard
              </Link>
              <Link 
                to="/lists" 
                className={`transition-colors ${
                  isActive('/lists') 
                    ? 'text-purple-600 font-semibold' 
                    : 'text-gray-700 hover:text-purple-600'
                }`}
              >
                My Lists
              </Link>
              <Link 
                to="/discover" 
                className={`transition-colors ${
                  isActive('/discover') 
                    ? 'text-purple-600 font-semibold' 
                    : 'text-gray-700 hover:text-purple-600'
                }`}
              >
                Discover
              </Link>
              <Link 
                to="/friends" 
                className={`transition-colors ${
                  isActive('/friends') 
                    ? 'text-purple-600 font-semibold' 
                    : 'text-gray-700 hover:text-purple-600'
                }`}
              >
                Friends
              </Link>
              <Link 
                to="/progress" 
                className={`transition-colors ${
                  isActive('/progress') 
                    ? 'text-purple-600 font-semibold' 
                    : 'text-gray-700 hover:text-purple-600'
                }`}
              >
                Progress
              </Link>
              <Link 
                to="/settings" 
                className={`transition-colors ${
                  isActive('/settings') 
                    ? 'text-purple-600 font-semibold' 
                    : 'text-gray-700 hover:text-purple-600'
                }`}
              >
                Settings
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" className="relative" onClick={handleNotifications}>
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs"></span>
            </Button>
            <Button variant="ghost" size="sm" onClick={handleFriendsAction}>
              <Users className="h-5 w-5" />
            </Button>
            <Button 
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
              onClick={handleNewList}
            >
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
