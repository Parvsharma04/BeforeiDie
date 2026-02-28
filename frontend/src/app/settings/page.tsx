"use client";

import React, { useState, useEffect } from "react";
import { User, Bell, Shield, Wallet, LogOut, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthStore } from "@/lib/store";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("profile");
    const { user, token, logout, updateUser } = useAuthStore();
    const router = useRouter();
    const { toast } = useToast();
    const queryClient = useQueryClient();

    const [formData, setFormData] = useState({
        name: "",
        bio: "",
    });

    const tabs = [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'privacy', label: 'Privacy & Security', icon: Shield },
        { id: 'billing', label: 'Subscription', icon: Wallet },
    ];

    const { data: profile, isLoading } = useQuery({
        queryKey: ['profile'],
        queryFn: async () => {
            const res = await api.get('/users/profile');
            return res.data;
        },
        enabled: !!token,
    });

    useEffect(() => {
        if (profile) {
            setFormData({
                name: profile.name || "",
                bio: profile.bio || "",
            });
        }
    }, [profile]);

    const updateMutation = useMutation({
        mutationFn: async (data: typeof formData) => {
            const res = await api.patch('/users/profile', data);
            return res.data;
        },
        onSuccess: (data) => {
            updateUser({ name: data.name });
            queryClient.invalidateQueries({ queryKey: ['profile'] });
            toast({
                title: "Profile Updated",
                description: "Your changes have been saved successfully.",
            });
        },
        onError: () => {
            toast({
                variant: "destructive",
                title: "Update Failed",
                description: "There was a problem saving your changes.",
            });
        }
    });

    const handleSave = () => {
        updateMutation.mutate(formData);
    };

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background flex flex-col">
                <Header />
                <div className="flex-1 flex items-center justify-center">
                    <Loader2 className="w-8 h-8 text-muted-foreground animate-spin" />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20 fade-in pb-32">
            <Header />

            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-5xl">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-border pb-8">
                    <div>
                        <h1 className="text-4xl lg:text-5xl font-serif font-light text-foreground mb-3 tracking-tight">Settings</h1>
                        <p className="text-muted-foreground font-light text-lg">Manage your account and preferences.</p>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Sidebar Tabs */}
                    <div className="w-full lg:w-64 shrink-0 space-y-2">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium text-sm ${activeTab === tab.id
                                        ? "bg-card border border-border text-foreground shadow-sm"
                                        : "text-muted-foreground hover:text-foreground hover:bg-muted border border-transparent"
                                        }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    {tab.label}
                                </button>
                            );
                        })}

                        <div className="pt-8 mt-8 border-t border-border">
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-4 py-3 text-destructive hover:bg-destructive/10 rounded-xl transition-colors font-medium text-sm"
                            >
                                <LogOut className="w-4 h-4" />
                                Sign out
                            </button>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 bg-card border border-border rounded-2xl p-8 lg:p-12 relative shadow-sm">
                        {activeTab === 'profile' ? (
                            <div className="space-y-10 max-w-xl animate-fade-in">
                                <div>
                                    <h2 className="text-2xl font-serif text-card-foreground mb-2">Profile Information</h2>
                                    <p className="text-muted-foreground text-sm font-light">Update your account details and public profile.</p>
                                </div>

                                <div className="flex items-center gap-6">
                                    <Avatar className="h-24 w-24 border border-border">
                                        <AvatarImage src={profile?.avatar || "/placeholder-avatar.jpg"} alt={profile?.name} />
                                        <AvatarFallback className="text-2xl font-serif bg-secondary text-secondary-foreground">
                                            {profile?.name?.substring(0, 2).toUpperCase() || "ME"}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="space-y-2">
                                        <Button variant="outline" className="border-border text-foreground hover:bg-muted">Change Photo</Button>
                                        <p className="text-xs text-muted-foreground">JPG, GIF or PNG. Max size 2MB.</p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-1">
                                        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Preferred Name</label>
                                        <Input
                                            value={formData.name}
                                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                            className="bg-background border-border focus-visible:ring-ring text-foreground"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Email Address</label>
                                        <Input
                                            value={profile?.email || ""}
                                            disabled
                                            className="bg-muted border-border text-muted-foreground cursor-not-allowed"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Bio</label>
                                        <textarea
                                            value={formData.bio}
                                            onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                                            placeholder="A little bit about your dreams and aspirations..."
                                            className="w-full bg-background border border-border rounded-xl p-3 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring resize-none font-light placeholder-muted-foreground"
                                            rows={4}
                                        />
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-border flex justify-end">
                                    <Button
                                        onClick={handleSave}
                                        disabled={updateMutation.isPending}
                                        className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 shadow-sm transition-transform hover:scale-[1.02]"
                                    >
                                        {updateMutation.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                                        Save Changes
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="py-20 text-center animate-fade-in">
                                <h3 className="font-serif text-xl text-card-foreground mb-2">Feature coming soon</h3>
                                <p className="text-muted-foreground font-light">We're still building out this section of the settings.</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
