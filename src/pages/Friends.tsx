
import React, { useState } from 'react';
import { UserPlus, Search, Users, MessageCircle, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import Header from '../components/Header';

const Friends = () => {
  const [activeTab, setActiveTab] = useState('friends');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friendEmail, setFriendEmail] = useState('');
  const { toast } = useToast();

  const [friends, setFriends] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "S",
      status: "online",
      sharedLists: 3,
      completedTogether: 12,
      lastActive: "2 hours ago"
    },
    {
      id: 2,
      name: "Mike Chen",
      avatar: "M",
      status: "offline",
      sharedLists: 2,
      completedTogether: 8,
      lastActive: "1 day ago"
    },
    {
      id: 3,
      name: "Emma Davis",
      avatar: "E",
      status: "online",
      sharedLists: 4,
      completedTogether: 15,
      lastActive: "30 minutes ago"
    }
  ]);

  const [invitations, setInvitations] = useState([
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
  ]);

  const handleAddFriend = () => {
    if (friendEmail.trim()) {
      console.log('Adding friend:', friendEmail);
      toast({
        title: "Friend Request Sent! ✅",
        description: `Invitation sent to ${friendEmail}`,
      });
      setFriendEmail('');
      setShowAddFriend(false);
    }
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

  const handleAcceptInvitation = (invitationId: number, from: string, listName: string) => {
    console.log('Accept invitation from:', from);
    setInvitations(invitations.filter(inv => inv.id !== invitationId));
    toast({
      title: "Invitation Accepted! ✅",
      description: `You've joined "${listName}" with ${from}!`,
    });
  };

  const handleDeclineInvitation = (invitationId: number, from: string) => {
    console.log('Decline invitation from:', from);
    setInvitations(invitations.filter(inv => inv.id !== invitationId));
    toast({
      title: "Invitation Declined",
      description: `Declined invitation from ${from}.`,
    });
  };

  const filteredFriends = friends.filter(friend =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Header />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-6xl">
        {/* Simple Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Friends</h1>
            <p className="text-gray-600">Connect and share your bucket lists</p>
          </div>
          <Button 
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            onClick={() => setShowAddFriend(true)}
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Add Friend
          </Button>
        </div>

        {/* Add Friend Modal */}
        {showAddFriend && (
          <Card className="mb-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Add New Friend
                <Button variant="ghost" size="sm" onClick={() => setShowAddFriend(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-3">
                <Input
                  placeholder="Enter friend's email address..."
                  value={friendEmail}
                  onChange={(e) => setFriendEmail(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddFriend()}
                  className="flex-1"
                />
                <Button 
                  onClick={handleAddFriend}
                  disabled={!friendEmail.trim()}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  Send Invite
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            placeholder="Search friends..."
            value={searchQuery}
            onChange={handleSearch}
            className="pl-10 bg-white/70 backdrop-blur-sm border-0 shadow-md"
          />
        </div>

        {/* Simple Tabs */}
        <div className="flex space-x-4 mb-8">
          <Button
            variant={activeTab === 'friends' ? 'default' : 'outline'}
            onClick={() => setActiveTab('friends')}
            className={activeTab === 'friends' ? 'bg-gradient-to-r from-purple-500 to-pink-500' : ''}
          >
            <Users className="h-4 w-4 mr-2" />
            My Friends ({filteredFriends.length})
          </Button>
          <Button
            variant={activeTab === 'invitations' ? 'default' : 'outline'}
            onClick={() => setActiveTab('invitations')}
            className={activeTab === 'invitations' ? 'bg-gradient-to-r from-purple-500 to-pink-500' : ''}
          >
            Invitations ({invitations.length})
          </Button>
        </div>

        {/* Friends List */}
        {activeTab === 'friends' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFriends.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {searchQuery ? 'No friends found' : 'No friends yet'}
                </h3>
                <p className="text-gray-500 mb-4">
                  {searchQuery ? 'Try a different search term' : 'Start by adding your first friend!'}
                </p>
                {!searchQuery && (
                  <Button 
                    onClick={() => setShowAddFriend(true)}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add Friend
                  </Button>
                )}
              </div>
            ) : (
              filteredFriends.map((friend) => (
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
                        <p className="text-sm text-gray-500">{friend.lastActive}</p>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Shared Lists</span>
                        <span className="font-semibold">{friend.sharedLists}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Completed Together</span>
                        <span className="font-semibold">{friend.completedTogether}</span>
                      </div>
                    </div>

                    <Button 
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                      onClick={() => handleMessage(friend.name)}
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}

        {/* Invitations */}
        {activeTab === 'invitations' && (
          <div className="space-y-4">
            {invitations.length === 0 ? (
              <div className="text-center py-12">
                <div className="h-12 w-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No invitations</h3>
                <p className="text-gray-500">You're all caught up!</p>
              </div>
            ) : (
              invitations.map((invitation) => (
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
                          onClick={() => handleDeclineInvitation(invitation.id, invitation.from)}
                        >
                          <X className="h-4 w-4 mr-1" />
                          Decline
                        </Button>
                        <Button 
                          size="sm" 
                          className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
                          onClick={() => handleAcceptInvitation(invitation.id, invitation.from, invitation.listName)}
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Accept
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Friends;
