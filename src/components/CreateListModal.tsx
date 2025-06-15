
import React, { useState } from 'react';
import { X, Users, Lock, Globe, Plus, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';

interface CreateListModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (listData: any) => void;
}

const CreateListModal: React.FC<CreateListModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [step, setStep] = useState(1);
  const [listData, setListData] = useState({
    name: '',
    description: '',
    category: '',
    privacy: 'private',
    collaborators: []
  });

  if (!isOpen) return null;

  const categories = [
    { name: 'Travel & Adventure', icon: '🌍', color: 'from-blue-500 to-teal-500' },
    { name: 'Food & Dining', icon: '🍽️', color: 'from-orange-500 to-red-500' },
    { name: 'Health & Fitness', icon: '💪', color: 'from-emerald-500 to-green-500' },
    { name: 'Learning & Skills', icon: '📚', color: 'from-purple-500 to-indigo-500' },
    { name: 'Career & Business', icon: '💼', color: 'from-gray-600 to-gray-800' },
    { name: 'Entertainment', icon: '🎭', color: 'from-pink-500 to-rose-500' },
    { name: 'Personal Growth', icon: '🌱', color: 'from-green-400 to-emerald-500' },
    { name: 'Other', icon: '✨', color: 'from-yellow-500 to-orange-500' }
  ];

  const handleCreateList = () => {
    const newList = {
      id: Date.now(),
      name: listData.name,
      description: listData.description,
      category: listData.category,
      privacy: listData.privacy,
      createdAt: new Date().toISOString(),
      items: [],
      collaborators: listData.collaborators
    };

    console.log('Creating new list:', newList);
    
    if (onSuccess) {
      onSuccess(newList);
    }

    // Reset form
    setListData({
      name: '',
      description: '',
      category: '',
      privacy: 'private',
      collaborators: []
    });
    setStep(1);
  };

  const handleClose = () => {
    setListData({
      name: '',
      description: '',
      category: '',
      privacy: 'private',
      collaborators: []
    });
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl bg-white shadow-2xl">
        <CardContent className="p-0">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-900">Create New Bucket List</h2>
            <Button variant="ghost" size="sm" onClick={handleClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Progress Steps */}
          <div className="px-6 py-4 bg-gray-50">
            <div className="flex items-center space-x-4">
              <div className={`flex items-center space-x-2 ${step >= 1 ? 'text-purple-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}>
                  1
                </div>
                <span className="font-medium">Details</span>
              </div>
              <div className="h-px bg-gray-300 flex-1"></div>
              <div className={`flex items-center space-x-2 ${step >= 2 ? 'text-purple-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}>
                  2
                </div>
                <span className="font-medium">Category</span>
              </div>
              <div className="h-px bg-gray-300 flex-1"></div>
              <div className={`flex items-center space-x-2 ${step >= 3 ? 'text-purple-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}>
                  3
                </div>
                <span className="font-medium">Privacy</span>
              </div>
            </div>
          </div>

          {/* Step Content */}
          <div className="p-6">
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    List Name *
                  </label>
                  <Input
                    placeholder="e.g., World Adventures, Career Goals, Food Experiences"
                    value={listData.name}
                    onChange={(e) => setListData({...listData, name: e.target.value})}
                    className="text-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <Textarea
                    placeholder="What's this bucket list about? Share your vision and goals..."
                    value={listData.description}
                    onChange={(e) => setListData({...listData, description: e.target.value})}
                    rows={4}
                  />
                </div>

                <div className="flex justify-end">
                  <Button 
                    onClick={() => setStep(2)} 
                    disabled={!listData.name.trim()}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Next: Choose Category
                  </Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose a Category</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {categories.map((category, index) => (
                      <Card 
                        key={index}
                        className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                          listData.category === category.name 
                            ? 'ring-2 ring-purple-500 shadow-lg' 
                            : 'hover:shadow-md'
                        }`}
                        onClick={() => setListData({...listData, category: category.name})}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-3">
                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center text-white text-lg`}>
                              {category.icon}
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">{category.name}</h4>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button 
                    onClick={() => setStep(3)} 
                    disabled={!listData.category}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Next: Privacy Settings
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy & Collaboration</h3>
                  <div className="space-y-4">
                    <Card 
                      className={`cursor-pointer transition-all duration-200 ${
                        listData.privacy === 'private' ? 'ring-2 ring-purple-500 bg-purple-50' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setListData({...listData, privacy: 'private'})}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <Lock className="h-5 w-5 text-gray-600" />
                          <div>
                            <h4 className="font-medium text-gray-900">Private List</h4>
                            <p className="text-sm text-gray-600">Only you and invited collaborators can see this list</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card 
                      className={`cursor-pointer transition-all duration-200 ${
                        listData.privacy === 'friends' ? 'ring-2 ring-purple-500 bg-purple-50' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setListData({...listData, privacy: 'friends'})}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <Users className="h-5 w-5 text-gray-600" />
                          <div>
                            <h4 className="font-medium text-gray-900">Friends Only</h4>
                            <p className="text-sm text-gray-600">Your friends can view this list for inspiration</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card 
                      className={`cursor-pointer transition-all duration-200 ${
                        listData.privacy === 'public' ? 'ring-2 ring-purple-500 bg-purple-50' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setListData({...listData, privacy: 'public'})}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <Globe className="h-5 w-5 text-gray-600" />
                          <div>
                            <h4 className="font-medium text-gray-900">Public</h4>
                            <p className="text-sm text-gray-600">Anyone can discover and get inspired by your list</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setStep(2)}>
                    Back
                  </Button>
                  <Button 
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    onClick={handleCreateList}
                  >
                    Create Bucket List
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateListModal;
