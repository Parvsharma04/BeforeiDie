import React, { useState } from 'react';
import { ArrowLeft, Plus, Users, Camera, Edit, Trash2, Check, Star, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const ListDetail = () => {
  const [newItem, setNewItem] = useState('');
  const [bucketItems, setBucketItems] = useState([
    {
      id: 1,
      text: "Visit Machu Picchu, Peru",
      completed: true,
      completedBy: "Sarah",
      completedDate: "2 days ago",
      photo: true,
      priority: "high"
    },
    {
      id: 2,
      text: "See the Northern Lights in Iceland",
      completed: false,
      addedBy: "Mike",
      addedDate: "1 week ago",
      priority: "high"
    },
    {
      id: 3,
      text: "Safari in Kenya",
      completed: true,
      completedBy: "Alex",
      completedDate: "3 months ago",
      photo: true,
      priority: "medium"
    },
    {
      id: 4,
      text: "Backpack through Southeast Asia",
      completed: false,
      addedBy: "Sarah",
      addedDate: "2 weeks ago",
      priority: "low"
    }
  ]);

  const { toast } = useToast();
  const navigate = useNavigate();

  const listData = {
    title: "🌍 World Adventures",
    description: "Explore amazing destinations around the globe with friends",
    progress: Math.round((bucketItems.filter(item => item.completed).length / bucketItems.length) * 100),
    completed: bucketItems.filter(item => item.completed).length,
    total: bucketItems.length,
    members: [
      { name: "Alex", avatar: "A", isOwner: true },
      { name: "Sarah", avatar: "S", isOwner: false },
      { name: "Mike", avatar: "M", isOwner: false }
    ]
  };

  const handleAddItem = () => {
    if (newItem.trim()) {
      const newBucketItem = {
        id: Date.now(),
        text: newItem.trim(),
        completed: false,
        addedBy: "You",
        addedDate: "Just now",
        priority: "medium"
      };
      
      setBucketItems([newBucketItem, ...bucketItems]);
      setNewItem('');
      toast({
        title: "Goal Added! 🎯",
        description: `"${newItem.trim()}" has been added to your list.`,
      });
    }
  };

  const handleToggleComplete = (itemId: number) => {
    setBucketItems(items => 
      items.map(item => {
        if (item.id === itemId) {
          const updatedItem = {
            ...item,
            completed: !item.completed,
            completedBy: !item.completed ? "You" : undefined,
            completedDate: !item.completed ? "Just now" : undefined
          };
          
          toast({
            title: updatedItem.completed ? "Goal Completed! 🎉" : "Goal Reopened",
            description: updatedItem.completed 
              ? `Congratulations on completing "${item.text}"!`
              : `"${item.text}" has been marked as incomplete.`,
          });
          
          return updatedItem;
        }
        return item;
      })
    );
  };

  const handleDeleteItem = (itemId: number, itemText: string) => {
    setBucketItems(items => items.filter(item => item.id !== itemId));
    toast({
      title: "Goal Deleted",
      description: `"${itemText}" has been removed from your list.`,
      variant: "destructive",
    });
  };

  const handleAddPhoto = (itemId: number, itemText: string) => {
    setBucketItems(items => 
      items.map(item => 
        item.id === itemId ? { ...item, photo: true } : item
      )
    );
    toast({
      title: "Photo Added! 📸",
      description: `Photo added to "${itemText}".`,
    });
  };

  const handleGoBack = () => {
    navigate('/lists');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Header />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button variant="ghost" className="mr-4" onClick={handleGoBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{listData.title}</h1>
            <p className="text-gray-600">{listData.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Card */}
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Progress Overview
                  <span className="text-2xl font-bold text-emerald-600">
                    {listData.completed}/{listData.total}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={listData.progress} className="h-3 mb-2" />
                <p className="text-sm text-gray-600">{listData.progress}% complete</p>
              </CardContent>
            </Card>

            {/* Add New Item */}
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex space-x-3">
                  <Input
                    placeholder="Add a new bucket list item..."
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddItem()}
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleAddItem}
                    disabled={!newItem.trim()}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Bucket List Items */}
            <div className="space-y-4">
              {bucketItems.map((item) => (
                <Card key={item.id} className={`bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${
                  item.completed ? 'opacity-75' : ''
                }`}>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <button 
                        onClick={() => handleToggleComplete(item.id)}
                        className={`mt-1 h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                          item.completed 
                            ? 'bg-emerald-500 border-emerald-500 text-white' 
                            : 'border-gray-300 hover:border-purple-500'
                        }`}
                      >
                        {item.completed && <Check className="h-3 w-3" />}
                      </button>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <p className={`font-medium ${
                            item.completed ? 'line-through text-gray-500' : 'text-gray-900'
                          }`}>
                            {item.text}
                          </p>
                          <div className="flex items-center space-x-2">
                            {item.priority === 'high' && (
                              <Star className="h-4 w-4 text-orange-500 fill-current" />
                            )}
                            {item.photo && (
                              <Camera className="h-4 w-4 text-blue-500" />
                            )}
                            {item.completed && !item.photo && (
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleAddPhoto(item.id, item.text)}
                              >
                                <Upload className="h-4 w-4" />
                              </Button>
                            )}
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleDeleteItem(item.id, item.text)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="text-sm text-gray-500">
                          {item.completed ? (
                            <span>Completed by <strong>{item.completedBy}</strong> {item.completedDate}</span>
                          ) : (
                            <span>Added by <strong>{item.addedBy}</strong> {item.addedDate}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Members */}
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Members
                  </span>
                  <Button variant="ghost" size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {listData.members.map((member, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="h-10 w-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {member.avatar}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{member.name}</p>
                      <p className="text-xs text-gray-500">
                        {member.isOwner ? 'Owner' : 'Collaborator'}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="h-8 w-8 bg-emerald-500 rounded-full flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm"><strong>Sarah</strong> completed "Visit Machu Picchu"</p>
                    <p className="text-xs text-gray-500">2 days ago</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <Plus className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm"><strong>Mike</strong> added "See Northern Lights"</p>
                    <p className="text-xs text-gray-500">1 week ago</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="h-8 w-8 bg-purple-500 rounded-full flex items-center justify-center">
                    <Camera className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm"><strong>Alex</strong> uploaded Safari photos</p>
                    <p className="text-xs text-gray-500">3 months ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListDetail;
