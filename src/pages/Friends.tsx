import React, { useState } from 'react';
import { UserPlus, Search, Users, Trophy, Calendar, MessageCircle, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import Header from '../components/Header';

const Friends = () => {
  const [activeTab, setActiveTab] = useState('friends');
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  const friends = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "S",
      status: "online",
      sharedLists: 3,
      completedTogether: 12,
      lastActive: "2 hours ago",
      recentActivity: "Completed 'Visit Machu Picchu'"
    },
    {
      id: 2,
      name: "Mike Chen",
      avatar: "M",
      status: "offline",
      sharedLists: 2,
      completedTogether: 8,
      lastActive: "1 day ago",
      recentActivity: "Added 'Learn surfing in Bali'"
    },
    {
      id: 3,
      name: "Emma Davis",
      avatar: "E",
      status: "online",
      sharedLists: 4,
      completedTogether: 15,
      lastActive: "30 minutes ago",
      recentActivity: "Invited you to 'Art & Culture'"
    }
  ];

  const invitations = [
    {
      id: 1,
      from: "Jake Wilson",
      avatar: "J",
      listName: "Extreme Sports Adventures",
      message: "Join me for some adrenaline-pumping experiences!",
      timeAgo: "2 hours ago"
    },
    {
      id: 2,
      from: "Lisa Rodriguez",
      avatar: "L",
      listName: "Foodie World Tour",
      message: "Let's taste the world together!",
      timeAgo: "1 day ago"
    }
  ];

  const publicLists = [
    {
      id: 1,
      title: "📚 Personal Growth Journey",
      owner: "Sarah Johnson",
      ownerAvatar: "S",
      progress: 75,
      completed: 9,
      total: 12,
      category: "Learning",
      likes: 43
    },
    {
      id: 2,
      title: "🏃‍♂️ Fitness Milestones",
      owner: "Mike Chen",
      ownerAvatar: "M",
      progress: 60,
      completed: 6,
      total: 10,
      category: "Health",
      likes: 28
    }
  ];

  const achievements = [
    {
      friend: "Sarah",
      achievement: "Travel Enthusiast",
      description: "Visited 10 countries",
      timeAgo: "3 days ago",
      icon: "🌍"
    },
    {
      friend: "Emma",
      achievement: "Fitness Fanatic",
      description: "Completed 50 workouts",
      timeAgo: "1 week ago",
      icon: "💪"
    },
    {
      friend: "Mike",
      achievement: "Foodie Explorer",
      description: "Tried 25 new cuisines",
      timeAgo: "2 weeks ago",
      icon: "🍽️"
    }
  ];

  const handleAddFriends = () => {
    console.log('Add friends clicked');
    toast({
      title: "Add Friends",
      description: "Friend invitation feature coming soon!",
    });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    console.log('Searching friends:', e.target.value);
  };

  const handleMessage = (friendName: string) => {
    console.log('Message friend:', friendName);
    toast({
      title: "Message Sent! 💬",
      description: `Opening chat with ${friendName}...`,
    });
  };

  const handleViewLists = (friendName: string) => {
    console.log('View lists for:', friendName);
    toast({
      title: "View Lists",
      description: `Viewing ${friendName}'s bucket lists...`,
    });
  };

  const handleAcceptInvitation = (from: string, listName: string) => {
    console.log('Accept invitation from:', from);
    toast({
      title: "Invitation Accepted! ✅",
      description: `You've joined "${listName}" with ${from}!`,
    });
  };

  const handleDeclineInvitation = (from: string) => {
    console.log('Decline invitation from:', from);
    toast({
      title: "Invitation Declined",
      description: `Declined invitation from ${from}.`,
    });
  };

  const handleViewDetails = (listTitle: string) => {
    console.log('View details for:', listTitle);
    toast({
      title: "View Details",
      description: `Opening details for "${listTitle}"...`,
    });
  };

  const handleCelebrate = (friend: string, achievement: string) => {
    console.log('Celebrate achievement:', achievement, 'for', friend);
    toast({
      title: "Celebration Sent! 🎉",
      description: `Congratulated ${friend} on "${achievement}"!`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Header />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Friends & Social</h1>
            <p className="text-gray-600">Connect with friends and share your journey</p>
          </div>
          <Button 
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            onClick={handleAddFriends}
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Add Friends
          </Button>
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            placeholder="Search friends or find new people..."
            value={searchQuery}
            onChange={handleSearch}
            className="pl-10 bg-white/70 backdrop-blur-sm border-0 shadow-md"
          />
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-8 p-1 bg-white/70 backdrop-blur-sm rounded-lg w-fit">
          {[
            { key: 'friends', label: 'My Friends' },
            { key: 'invitations', label: 'Invitations' },
            { key: 'discover', label: 'Discover Lists' },
            { key: 'achievements', label: 'Achievements' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-md transition-all duration-200 ${
                activeTab === tab.key
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* My Friends Tab */}
        {activeTab === 'friends' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {friends.map((friend) => (
              <Card key={friend.id} className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="relative">
                      <div className="h-12 w-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                        {friend.avatar}
                      </div>
                      <div className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white ${
                        friend.status === 'online' ? 'bg-emerald-500' : 'bg-gray-400'
                      }`}></div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{friend.name}</h3>
                      <p className="text-sm text-gray-500">Last active {friend.lastActive}</p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Shared Lists</span>
                      <span className="font-semibold">{friend.sharedLists}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Completed Together</span>
                      <span className="font-semibold">{friend.completedTogether}</span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-3 mb-4">
                    <p className="text-xs text-gray-600 mb-1">Recent Activity</p>
                    <p className="text-sm font-medium text-gray-900">{friend.recentActivity}</p>
                  </div>

                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => handleMessage(friend.name)}
                    >
                      <MessageCircle className="h-4 w-4 mr-1" />
                      Message
                    </Button>
                    <Button 
                      size="sm" 
                      className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                      onClick={() => handleViewLists(friend.name)}
                    >
                      View Lists
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Invitations Tab */}
        {activeTab === 'invitations' && (
          <div className="space-y-4">
            {invitations.map((invitation) => (
              <Card key={invitation.id} className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                        {invitation.avatar}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{invitation.from}</h3>
                        <p className="text-sm text-gray-600">invited you to join</p>
                        <p className="font-semibold text-purple-600">{invitation.listName}</p>
                        <p className="text-sm text-gray-500 mt-1">{invitation.message}</p>
                        <p className="text-xs text-gray-400 mt-1">{invitation.timeAgo}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDeclineInvitation(invitation.from)}
                      >
                        Decline
                      </Button>
                      <Button 
                        size="sm" 
                        className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
                        onClick={() => handleAcceptInvitation(invitation.from, invitation.listName)}
                      >
                        Accept
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Discover Lists Tab */}
        {activeTab === 'discover' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {publicLists.map((list) => (
              <Card key={list.id} className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{list.title}</CardTitle>
                    <span className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-xs font-medium rounded-full">
                      {list.category}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="h-6 w-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold text-xs">
                      {list.ownerAvatar}
                    </div>
                    <span className="text-sm text-gray-600">by {list.owner}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Progress</span>
                        <span className="text-sm text-gray-600">{list.completed}/{list.total}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" 
                          style={{ width: `${list.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <Gift className="h-4 w-4 text-red-500" />
                        <span className="text-sm text-gray-600">{list.likes} likes</span>
                      </div>
                      <Button 
                        size="sm" 
                        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                        onClick={() => handleViewDetails(list.title)}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Achievements Tab */}
        {activeTab === 'achievements' && (
          <div className="space-y-4">
            {achievements.map((achievement, index) => (
              <Card key={index} className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-gray-900">{achievement.friend}</h3>
                        <span className="text-gray-500">earned</span>
                        <span className="font-semibold text-purple-600">{achievement.achievement}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{achievement.description}</p>
                      <p className="text-xs text-gray-400">{achievement.timeAgo}</p>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleCelebrate(achievement.friend, achievement.achievement)}
                    >
                      <Trophy className="h-4 w-4 mr-1" />
                      Celebrate
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Friends;
