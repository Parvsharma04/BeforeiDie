import React, { useState } from 'react';
import { User, Bell, Shield, Database, Palette, HelpCircle, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Header from '../components/Header';

const Settings = () => {
  const [activeSection, setActiveSection] = useState('profile');

  const menuItems = [
    { key: 'profile', label: 'Profile', icon: User },
    { key: 'notifications', label: 'Notifications', icon: Bell },
    { key: 'privacy', label: 'Privacy & Security', icon: Shield },
    { key: 'data', label: 'Data & Storage', icon: Database },
    { key: 'appearance', label: 'Appearance', icon: Palette },
    { key: 'help', label: 'Help & Support', icon: HelpCircle }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Header />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">Manage your account and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-4">
                <nav className="space-y-2">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.key}
                        onClick={() => setActiveSection(item.key)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                          activeSection === item.key
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                            : 'text-gray-700 hover:bg-white/50'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Profile Settings */}
            {activeSection === 'profile' && (
              <div className="space-y-6">
                <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center space-x-6">
                      <div className="h-20 w-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                        A
                      </div>
                      <div>
                        <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 mr-3">
                          Change Avatar
                        </Button>
                        <Button variant="outline">Remove</Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" defaultValue="Alex" />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" defaultValue="Johnson" />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue="alex@example.com" />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" defaultValue="+1 (555) 123-4567" />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <textarea
                        id="bio"
                        className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        rows={4}
                        defaultValue="Adventure seeker and dream chaser. Always looking for the next big experience!"
                      />
                    </div>

                    <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                      Save Changes
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Notification Settings */}
            {activeSection === 'notifications' && (
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {[
                    { title: 'Goal Reminders', description: 'Get reminded about upcoming deadlines', enabled: true },
                    { title: 'Friend Activity', description: 'Notifications when friends complete goals', enabled: true },
                    { title: 'Achievement Celebrations', description: 'Celebrate when you unlock new badges', enabled: true },
                    { title: 'Weekly Progress', description: 'Weekly summary of your progress', enabled: false },
                    { title: 'New Features', description: 'Updates about new app features', enabled: true },
                    { title: 'Marketing Emails', description: 'Tips and inspiration emails', enabled: false }
                  ].map((setting, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50">
                      <div>
                        <h4 className="font-medium text-gray-900">{setting.title}</h4>
                        <p className="text-sm text-gray-600">{setting.description}</p>
                      </div>
                      <button className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
                        setting.enabled ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gray-300'
                      }`}>
                        <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
                          setting.enabled ? 'transform translate-x-6' : ''
                        }`}></div>
                      </button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Privacy Settings */}
            {activeSection === 'privacy' && (
              <div className="space-y-6">
                <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Privacy Controls</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {[
                      { title: 'Profile Visibility', description: 'Who can see your profile', value: 'Friends Only' },
                      { title: 'List Visibility', description: 'Default visibility for new lists', value: 'Private' },
                      { title: 'Activity Sharing', description: 'Share your completions with friends', value: 'Enabled' },
                      { title: 'Search Visibility', description: 'Allow others to find you in search', value: 'Enabled' }
                    ].map((setting, index) => (
                      <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50">
                        <div>
                          <h4 className="font-medium text-gray-900">{setting.title}</h4>
                          <p className="text-sm text-gray-600">{setting.description}</p>
                        </div>
                        <Button variant="outline" size="sm">
                          {setting.value}
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Security</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">Password</h4>
                        <p className="text-sm text-gray-600">Last updated 3 months ago</p>
                      </div>
                      <Button variant="outline">Change Password</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
                        <p className="text-sm text-gray-600">Add extra security to your account</p>
                      </div>
                      <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600">
                        Enable
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Data Settings */}
            {activeSection === 'data' && (
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Data Management</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 rounded-lg bg-gradient-to-r from-blue-50 to-teal-50">
                      <h4 className="font-semibold text-gray-900">Storage Used</h4>
                      <p className="text-2xl font-bold text-blue-600">2.3 GB</p>
                      <p className="text-sm text-gray-600">of 5 GB</p>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50">
                      <h4 className="font-semibold text-gray-900">Photos</h4>
                      <p className="text-2xl font-bold text-purple-600">1,247</p>
                      <p className="text-sm text-gray-600">uploaded</p>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-gradient-to-r from-emerald-50 to-teal-50">
                      <h4 className="font-semibold text-gray-900">Lists</h4>
                      <p className="text-2xl font-bold text-emerald-600">23</p>
                      <p className="text-sm text-gray-600">created</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                      Export My Data
                    </Button>
                    <Button variant="outline" className="w-full">
                      Clear Cache
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Other sections would follow similar patterns */}
            {activeSection === 'appearance' && (
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Appearance Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Theme and display preferences coming soon!</p>
                </CardContent>
              </Card>
            )}

            {activeSection === 'help' && (
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Help & Support</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <HelpCircle className="h-4 w-4 mr-2" />
                    FAQ & Help Center
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Contact Support
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Feature Requests
                  </Button>
                  <hr className="my-6" />
                  <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
